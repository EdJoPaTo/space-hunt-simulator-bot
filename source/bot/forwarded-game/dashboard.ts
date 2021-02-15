import {Composer} from 'telegraf'

import {DASHBOARD_REGEX, parseDashboard} from '../../game'

import {MyContext} from '../my-context'

export const bot = new Composer<MyContext>()

bot.hears(DASHBOARD_REGEX, async ctx => {
	ctx.session.dashboard = {
		unixSeconds: ctx.message.forward_date!,
		...parseDashboard(ctx.message.text)
	}

	await ctx.reply('Awesome! Now I know your research and location in order to calculate stuff better for you.')
})
