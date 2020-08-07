import {MenuTemplate} from 'telegraf-inline-menu'

import {MyContext} from '../my-context'

import {menu as settingsMenu} from './settings'

export const menu = new MenuTemplate<MyContext>(context => context.i18n.t('welcome'))

menu.interact('Simulator', 'simulator', {
	do: async ctx => {
		await ctx.answerCbQuery('soon…')
		return false
	}
})

menu.interact('Player Locations', 'locations', {
	do: async ctx => {
		await ctx.answerCbQuery('soon…')
		return false
	}
})

menu.submenu(context => '⚙️' + context.i18n.t('menu.settings'), 'settings', settingsMenu)
