import {Composer} from 'telegraf'

import {getPlayers, PLAYER_REGEX} from '../../game'
import {MyContext} from '../my-context'
import * as playerHistory from '../../player-history'

export const bot = new Composer<MyContext>()

bot.hears(PLAYER_REGEX, async ctx => {
	const unixSeconds = ctx.message.forward_date!
	const players = getPlayers(ctx.message.text)

	for (const player of players) {
		// eslint-disable-next-line no-await-in-loop
		await playerHistory.add(player, unixSeconds)
	}

	await ctx.reply(`Awesome! Now I know a bit more about ${players.length} players locations.`, {
		reply_to_message_id: ctx.message.message_id
	})
})
