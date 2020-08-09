import test from 'ava'

import {CombatResearchLevels} from './types'
import {simulateBattle} from './simulate-battle'

const ZERO_RESEARCH: CombatResearchLevels = {
	attack: 0,
	defense: 0,
	health: 0
}

test('destroyer wins instantly against empty defender', t => {
	const result = simulateBattle({
		attackerFleet: {destroyer: 1},
		defenderFleet: {},
		attackerResearch: ZERO_RESEARCH,
		defenderResearch: ZERO_RESEARCH
	})

	t.log(result)
	t.is(result.finalRound, 0)
	t.is(result.winner, 'attacker')
	t.deepEqual(result.attackerRemaining, {destroyer: 1})
	t.deepEqual(result.defenderRemaining, {})
})

test('destroyer wins against observer', t => {
	const result = simulateBattle({
		attackerFleet: {destroyer: 1},
		defenderFleet: {observer: 1},
		attackerResearch: ZERO_RESEARCH,
		defenderResearch: ZERO_RESEARCH
	})

	t.log(result)
	t.is(result.finalRound, 1)
	t.is(result.winner, 'attacker')
	t.deepEqual(result.attackerRemaining, {destroyer: 1})
	t.deepEqual(result.defenderRemaining, {})
})

test('observer vs observer ends in draw', t => {
	const result = simulateBattle({
		attackerFleet: {observer: 1},
		defenderFleet: {observer: 1},
		attackerResearch: ZERO_RESEARCH,
		defenderResearch: ZERO_RESEARCH
	})

	t.log(result)
	t.is(result.finalRound, 100)
	t.is(result.winner, undefined)
	t.deepEqual(result.attackerRemaining, {observer: 1})
	t.deepEqual(result.defenderRemaining, {observer: 1})
})

test('observer loses against 80 observers', t => {
	const result = simulateBattle({
		attackerFleet: {observer: 1},
		defenderFleet: {observer: 80},
		attackerResearch: ZERO_RESEARCH,
		defenderResearch: ZERO_RESEARCH
	})

	t.log(result)
	t.is(result.finalRound, 2)
	t.is(result.winner, 'defender')
	t.deepEqual(result.attackerRemaining, {})
	t.deepEqual(result.defenderRemaining, {observer: 80})
})
