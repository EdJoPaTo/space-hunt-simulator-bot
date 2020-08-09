import {MenuTemplate} from 'telegraf-inline-menu'

import {backButtons} from '../general'
import {CombatResearchLevels} from '../../../simulation'
import {MyContext} from '../../my-context'

import {isAttacker} from './helper'
import {menuBody} from './body'

export const menu = new MenuTemplate(menuBody)

menu.interact('My research', 'my', {
	hide: context => !context.session.dashboard,
	do: async context => {
		setNewResarch(context, context.session.dashboard!.research)
		return true
	}
})

menu.select('preset', [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100], {
	columns: 4,
	isSet: (context, key) => {
		const numericKey = Number(key)
		const simulation = context.session.simulation!
		const {attack, defense, health} = isAttacker(context) ? simulation.attackerResearch : simulation.defenderResearch
		return numericKey === attack && numericKey === defense && numericKey === health
	},
	set: (context, key) => {
		const numericKey = Number(key)
		setNewResarch(context, {
			attack: numericKey,
			defense: numericKey,
			health: numericKey
		})

		return true
	}
})

menu.manualRow(backButtons)

function setNewResarch(context: MyContext, newResearch: CombatResearchLevels): void {
	const simulation = context.session.simulation!

	if (isAttacker(context)) {
		simulation.attackerResearch = newResearch
	} else {
		simulation.defenderResearch = newResearch
	}
}
