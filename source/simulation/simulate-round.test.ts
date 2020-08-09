import test from 'ava'

import {simulateOneParticipant, simulateRound} from './simulate-round'
import {SimulationUnit} from './simulation-units'

export const DESTROYER: SimulationUnit = {
	unit: 'destroyer',
	attack: 3000,
	defense: 500,
	healthMax: 11000,
	healthRemaining: 11000
}

export const OBSERVER: SimulationUnit = {
	unit: 'observer',
	attack: 1,
	defense: 5,
	healthMax: 100,
	healthRemaining: 100
}

export const PIERCING_MISSILE: SimulationUnit = {
	unit: 'piercingmissile',
	attack: 7000,
	healthMax: 1,
	healthRemaining: 1,
	defense: 0
}

test('piercingmissile kills observer', t => {
	const result = simulateOneParticipant([PIERCING_MISSILE], [OBSERVER])
	t.deepEqual(result, [])
})

test('1 destroyer damages destroyer', t => {
	const result = simulateOneParticipant([DESTROYER], [DESTROYER])
	t.deepEqual(result, [{
		...DESTROYER,
		// First attack still has shield reducing the damage
		healthRemaining: 11000 - (3000 - 500)
	}])
})

test('2 destroyer damage destroyer', t => {
	const result = simulateOneParticipant([DESTROYER, DESTROYER], [DESTROYER])
	t.deepEqual(result, [{
		...DESTROYER,
		healthRemaining: 11000 - (3000 - 500) - 3000
	}])
})

test('2 piercing missiles kill each other', t => {
	const result = simulateRound([PIERCING_MISSILE], [PIERCING_MISSILE])
	t.deepEqual(result, {
		attacker: [],
		defender: []
	})
})
