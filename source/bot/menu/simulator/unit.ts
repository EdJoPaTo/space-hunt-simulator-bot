import {MenuTemplate} from 'telegraf-inline-menu'

import {backButtons} from '../general'
import {CombatParticipantName} from '../../../game'
import {MyContext} from '../../my-context'

import {isAttacker} from './helper'
import {menuBody} from './body'

export const menu = new MenuTemplate(menuBody)

menu.select('A', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], {
	columns: 5,
	isSet,
	set
})

menu.select('B', [10, 20, 30, 40, 50, 60, 70, 80, 90, 100], {
	columns: 5,
	isSet,
	set
})

menu.select('C', [125, 150, 175, 200], {
	columns: 4,
	isSet,
	set
})

menu.select('D', [250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750, 800, 850, 900, 950, 1000], {
	columns: 4,
	isSet,
	set
})

menu.select('E', [1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900, 2000], {
	columns: 5,
	isSet,
	set
})

menu.manualRow(backButtons)

function isSet(context: MyContext, key: string): boolean {
	const numericKey = Number(key)
	const simulation = context.session.simulation!
	const fleet = isAttacker(context) ? simulation.attackerFleet : simulation.defenderFleet
	const unit = getUnit(context)
	return numericKey === (fleet[unit] ?? 0)
}

function set(context: MyContext, key: string): boolean {
	const amount = Number(key)
	const unit = getUnit(context)
	setUnitAmount(context, unit, amount)
	return true
}

function getUnit(context: MyContext): CombatParticipantName {
	if (!('data' in context.callbackQuery!)) {
		throw new TypeError('has to be DataCallbackQuery')
	}

	const {data} = context.callbackQuery
	const unit = /\/unit:([^/]+)/.exec(data)![1]
	return unit as any
}

function setUnitAmount(context: MyContext, unit: CombatParticipantName, amount: number): void {
	const simulation = context.session.simulation!
	const fleet = isAttacker(context) ? simulation.attackerFleet : simulation.defenderFleet
	fleet[unit] = amount
}
