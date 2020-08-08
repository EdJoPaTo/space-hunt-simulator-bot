import test, {ExecutionContext} from 'ava'

import {calculateUnitSpeed} from './unit-speed'
import {UNITS, UNIT_STATS, UnitName} from './units'

for (const unit of UNITS) {
	test(`calculateUnitSpeed level 0 is base ${unit}`, t => {
		const normalSpeed = UNIT_STATS[unit].speed
		t.is(calculateUnitSpeed(unit, 0), normalSpeed)
	})
}

function calculateUnitSpeedMacro(t: ExecutionContext, unit: UnitName, speedResearchLevel: number, expected: number): void {
	t.is(calculateUnitSpeed(unit, speedResearchLevel), expected)
}

calculateUnitSpeedMacro.title = (_title: string, unit: UnitName, speedResearchLevel: number, expected: number) => {
	return `calculateUnitSpeed ${unit} ${speedResearchLevel} ${expected}`
}

test(calculateUnitSpeedMacro, 'liberator', 10, 22500)
test(calculateUnitSpeedMacro, 'observer', 10, 112500)
