import test, {ExecutionContext} from 'ava'

import {calculateUnitAttack, calculateUnitDefense, calculateUnitHealth, calculateUnitSpeed} from './unit-research'
import {UnitResearch} from './types'
import {UNITS, UNIT_STATS, UnitName} from './units'

const RESEARCH_FUNCTION = {
	attack: calculateUnitAttack,
	defense: calculateUnitDefense,
	health: calculateUnitHealth,
	speed: calculateUnitSpeed
}

function researchLevel0IsStillBase(t: ExecutionContext, unit: UnitName, key: UnitResearch): void {
	const base = UNIT_STATS[unit][key]
	const actual = RESEARCH_FUNCTION[key](unit, 0)
	t.is(actual, base)
}

researchLevel0IsStillBase.title = (_title: string, unit: UnitName, key: UnitResearch) => `research level 0 is still base ${unit} ${key}`

for (const unit of UNITS) {
	test(researchLevel0IsStillBase, unit, 'attack')
	test(researchLevel0IsStillBase, unit, 'defense')
	test(researchLevel0IsStillBase, unit, 'health')
	test(researchLevel0IsStillBase, unit, 'speed')
}

function calculateUnitMacro(t: ExecutionContext, research: UnitResearch, unit: UnitName, researchLevel: number, expected: number): void {
	t.is(RESEARCH_FUNCTION[research](unit, researchLevel), expected)
}

calculateUnitMacro.title = (_title: string, research: UnitResearch, unit: UnitName, researchLevel: number) => {
	return `calculateUnit ${research} ${researchLevel} ${unit}`
}

test(calculateUnitMacro, 'attack', 'liberator', 10, 720)
test(calculateUnitMacro, 'attack', 'observer', 10, 1)
test(calculateUnitMacro, 'attack', 'piercingmissile', 10, 8400)

test(calculateUnitMacro, 'defense', 'liberator', 10, 60)
test(calculateUnitMacro, 'defense', 'observer', 10, 6)
test(calculateUnitMacro, 'defense', 'piercingmissile', 10, 0)

test(calculateUnitMacro, 'health', 'liberator', 10, 3240)
test(calculateUnitMacro, 'health', 'observer', 10, 120)
test(calculateUnitMacro, 'health', 'piercingmissile', 10, 1)

test(calculateUnitMacro, 'speed', 'liberator', 10, 22500)
test(calculateUnitMacro, 'speed', 'observer', 10, 112500)
test(calculateUnitMacro, 'speed', 'piercingmissile', 10, 112500)
