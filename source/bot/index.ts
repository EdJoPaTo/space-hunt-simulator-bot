import {existsSync, readFileSync} from 'fs'

import {generateUpdateMiddleware} from 'telegraf-middleware-console-time'
import {I18n as TelegrafI18n} from '@edjopato/telegraf-i18n'
import {MenuMiddleware} from 'telegraf-inline-menu'
import {Telegraf, Composer} from 'telegraf'
import TelegrafSessionLocal from 'telegraf-session-local'

import {CHAT_ID} from '../game'

import {MyContext} from './my-context'
import {menu} from './menu'
import {bot as destinationBot} from './destination'
import {bot as forwardedFromGameBot} from './forwarded-game'
import {bot as inlineQueryBot} from './inline-query'

const token = (existsSync('/run/secrets/bot-token.txt') && readFileSync('/run/secrets/bot-token.txt', 'utf8').trim()) ||
	(existsSync('bot-token.txt') && readFileSync('bot-token.txt', 'utf8').trim()) ||
	process.env['BOT_TOKEN']
if (!token) {
	throw new Error('You have to provide the bot-token from @BotFather via file (bot-token.txt) or environment variable (BOT_TOKEN)')
}

const bot = new Telegraf<MyContext>(token)

const localSession = new TelegrafSessionLocal({
	database: 'persist/sessions.json',
	getSessionKey: context => String(context.from?.id ?? '')
})

bot.use(localSession.middleware())

const i18n = new TelegrafI18n({
	directory: 'locales',
	defaultLanguage: 'en',
	defaultLanguageOnMissing: true,
	useSession: true
})

bot.use(i18n.middleware())

if (process.env['NODE_ENV'] !== 'production') {
	bot.use(generateUpdateMiddleware())
}

bot.hears(['/help', '/start help'], async context => context.reply(context.i18n.t('help')))

const menuMiddleware = new MenuMiddleware('/', menu)
bot.hears(['/locations', '/start locations'], async context => menuMiddleware.replyToContext(context, '/locations/'))
bot.command('start', async context => menuMiddleware.replyToContext(context))
bot.command('simulator', async context => menuMiddleware.replyToContext(context, '/simulator/'))
bot.command('settings', async context => menuMiddleware.replyToContext(context, '/settings/'))
bot.use(menuMiddleware.middleware())

bot.use(Composer.optional(
	context => Boolean(context.message && 'forward_from' in context.message && context.message?.forward_from?.id === CHAT_ID),
	forwardedFromGameBot
))
bot.use(destinationBot)
bot.use(inlineQueryBot)

bot.catch((error: any) => {
	console.error('telegraf error occured', error)
})

export async function start(): Promise<void> {
	await bot.telegram.setMyCommands([
		{command: 'start', description: 'open the menu'},
		{command: 'simulator', description: 'open the simulator'},
		{command: 'settings', description: 'open the settings'}
	])

	await bot.launch()
	console.log(new Date(), 'Bot started as', bot.botInfo?.username)
}
