import {MenuTemplate} from 'telegraf-inline-menu'

import {backButtons} from '../general'
import {UNITS, DEFENSIVE_BUILDINGS, DefensiveBuildingName} from '../../../game'

import {isAttacker, calculateUnitAmount} from './helper'
import {menu as unitMenu} from './unit'
import {menuBody} from './body'

export const menu = new MenuTemplate(menuBody)

menu.interact('Clear', 'clear', {
	hide: context => {
		const simulation = context.session.simulation!
		const fleet = isAttacker(context) ? simulation.attackerFleet : simulation.defenderFleet
		const amount = calculateUnitAmount(fleet)
		return amount === 0
	},
	do: async context => {
		if (isAttacker(context)) {
			context.session.simulation!.attackerFleet = {}
		} else {
			context.session.simulation!.defenderFleet = {}
		}

		return true
	}
})

menu.chooseIntoSubmenu('unit', UNITS, unitMenu, {
	columns: 2
})

menu.select('d', DEFENSIVE_BUILDINGS, {
	columns: 2,
	hide: context => isAttacker(context),
	isSet: (context, key) => {
		const simulation = context.session.simulation!
		const fleet = isAttacker(context) ? simulation.attackerFleet : simulation.defenderFleet
		return fleet[key as DefensiveBuildingName]! > 0
	},
	set: (context, key, newState) => {
		const simulation = context.session.simulation!
		const fleet = isAttacker(context) ? simulation.attackerFleet : simulation.defenderFleet
		const newAmount = newState ? 1 : 0
		fleet[key as DefensiveBuildingName] = newAmount
		return true
	}
})

menu.manualRow(backButtons)
