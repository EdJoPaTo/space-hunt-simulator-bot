import {MenuTemplate} from 'telegraf-inline-menu'

import {MyContext} from '../my-context'

import {menu as settingsMenu} from './settings'
import {menu as simulatorMenu} from './simulator'
import {menu as locationsMenu} from './locations'

export const menu = new MenuTemplate<MyContext>(context => context.i18n.t('welcome'))

menu.submenu('Simulator', 'simulator', simulatorMenu)

menu.submenu('Player Locations', 'locations', locationsMenu)

menu.submenu(context => '⚙️' + context.i18n.t('menu.settings'), 'settings', settingsMenu)
