import {Composer} from 'telegraf'
import {InlineQueryResultArticle} from 'typegram'
import arrayFilterUnique from 'array-filter-unique'
import * as fuzzysort from 'fuzzysort'

import {locationString, locationCommand} from '../game'
import * as playerHistory from '../player-history'

import {MyContext} from './my-context'

interface AnswerInlineQueryOptions {
	cache_time?: number;
	is_personal?: boolean;
	next_offset?: string;
	switch_pm_text?: string;
	switch_pm_parameter?: string;
}

export const bot = new Composer<MyContext>()

bot.on('inline_query', async ctx => {
	const {query} = ctx.inlineQuery
	const offset = Number(ctx.inlineQuery.offset) || 0

	let players: string[] = []
	const options: AnswerInlineQueryOptions = {
		is_personal: true,
		cache_time: 20
	}

	options.switch_pm_text = 'How does this player location search work?'
	options.switch_pm_parameter = 'locations'

	if (query && query.length > 0) {
		const allPlayers = [...playerHistory.getNames()]
		const result = await fuzzysort.goAsync(ctx.inlineQuery.query, allPlayers)
		players = result
			.map(o => o.target)
			.filter(arrayFilterUnique())
	}

	const playerResults = players
		.slice(offset, offset + 20)
		.map((name): InlineQueryResultArticle => {
			const stats = playerHistory.getByName(name)!
			return {
				type: 'article',
				id: `location-${name}`,
				title: name,
				description: `🌐 ${locationString(stats.location)}`,
				input_message_content: {
					message_text: locationCommand(stats.location)
				}
			}
		})

	if (players.length > offset + 20) {
		options.next_offset = String(offset + 20)
	}

	if (process.env['NODE_ENV'] !== 'production') {
		options.cache_time = 2
	}

	return ctx.answerInlineQuery([
		...playerResults
	], options)
})
