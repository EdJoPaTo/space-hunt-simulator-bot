import {MenuTemplate} from 'telegraf-inline-menu'

import {backButtons} from '../general'
import {MyContext} from '../../my-context'

import {calculateUnitAmount} from './helper'
import {menuBody} from './body'

import {menu as researchMenu} from './research'
import {menu as unitsMenu} from './units'

const SIDES = ['attacker', 'defender']

export const menu = new MenuTemplate<MyContext>(menuBody)

// TODO: simulate many times per default
menu.navigate('simulate again…', '.', {
	hide: context => {
		const attackerUnitAmount = calculateUnitAmount(context.session.simulation!.attackerFleet)
		const defenderUnitAmount = calculateUnitAmount(context.session.simulation!.defenderFleet)
		return attackerUnitAmount === 0 || defenderUnitAmount === 0
	}
})

menu.chooseIntoSubmenu('units', SIDES, unitsMenu, {
	buttonText: (_, key) => '✈️ ' + sideButtonText(key)
})

menu.chooseIntoSubmenu('research', SIDES, researchMenu, {
	buttonText: (_, key) => '⚔️🛡❤️ ' + sideButtonText(key)
})

menu.manualRow(backButtons)

function sideButtonText(side: string) {
	return side === 'attacker' ? 'Attacker' : 'Defender'
}
