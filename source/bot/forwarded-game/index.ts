import {Composer} from 'telegraf'

import {MyContext} from '../my-context'

import {bot as containsPlayerBot} from './contains-players'
import {bot as dashboardBot} from './dashboard'

export const bot = new Composer<MyContext>()

bot.use(containsPlayerBot)
bot.use(dashboardBot)

bot.use(async ctx => {
	if (process.env.NODE_ENV !== 'production') {
		console.log('unknown game message', ctx.message)
	}

	let text = ''
	text += 'This message is from the game but I dont know what do to with it.'
	text += '\n\n'
	text += 'Maybe I will just count the amount of characters in it: '
	text += ctx.message!.text?.length
	text += '\n'
	text += 'It was originally sent at '
	text += new Date(ctx.message!.forward_date! * 1000).toISOString()

	await ctx.reply(text)
})
