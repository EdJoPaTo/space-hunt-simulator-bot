import {MenuTemplate, Body} from 'telegraf-inline-menu'
import {html as format} from 'telegram-format'

import {MyContext} from '../my-context'

import {backButtons} from './general'

function menuBody(context: MyContext): Body {
	let text = ''
	text += format.bold(context.i18n.t('locations.title'))
	text += '\n\n'
	text += context.i18n.t('locations.help')

	return {text, parse_mode: format.parse_mode}
}

export const menu = new MenuTemplate<MyContext>(menuBody)

menu.switchToChat('Inline Search…', '')

menu.manualRow(backButtons)
