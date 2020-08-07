import test from 'ava'

import {UNITS, UNIT_STATS} from '../source/game/units'

for (const unit of UNITS) {
	test(`${unit} has speed greater 0`, t => {
		t.true(UNIT_STATS[unit].speed > 0)
	})
}
