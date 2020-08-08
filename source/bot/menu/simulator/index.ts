import {MenuTemplate} from 'telegraf-inline-menu'

import {backButtons} from '../general'
import {MyContext} from '../../my-context'

export const menu = new MenuTemplate<MyContext>('Some units will probably die.\nMore detailed simulation should be available soon…')

menu.manualRow(backButtons)
