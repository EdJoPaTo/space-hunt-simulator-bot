import {Composer} from 'telegraf'

import {MyContext} from '../my-context'
import {PLAYER_REGEX, getPlayers} from '../../game/messages/players'
import * as playerLocations from '../../player-locations'

export const bot = new Composer<MyContext>()

bot.hears(PLAYER_REGEX, async ctx => {
	const unixSeconds = ctx.message!.forward_date!
	const players = getPlayers(ctx.message!.text!)

	for (const player of players) {
		// eslint-disable-next-line no-await-in-loop
		await playerLocations.add(player.name, player.location, unixSeconds)
	}

	await ctx.reply(`Awesome! Now I know a bit more about ${players.length} players locations.`, {
		reply_to_message_id: ctx.message!.message_id
	})
})
