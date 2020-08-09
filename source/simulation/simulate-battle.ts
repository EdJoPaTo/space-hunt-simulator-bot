import {Battle, BattleResult, Winner} from './types'
import {getSimulationUnitsFromAmounts, getAmountsFromSimulationUnits} from './simulation-units'
import {simulateRound} from './simulate-round'

const MAX_ROUNDS = 100

export function simulateBattle(battle: Battle): BattleResult {
	let attacker = getSimulationUnitsFromAmounts(battle.attackerFleet, battle.attackerResearch)
	let defender = getSimulationUnitsFromAmounts(battle.defenderFleet, battle.defenderResearch)

	for (let i = 0; i < MAX_ROUNDS; i++) {
		if (attacker.length === 0 || defender.length === 0) {
			return {
				finalRound: i,
				winner: determineWinner(attacker.length, defender.length),
				attackerRemaining: getAmountsFromSimulationUnits(attacker),
				defenderRemaining: getAmountsFromSimulationUnits(defender)
			}
		}

		const result = simulateRound(attacker, defender)
		attacker = result.attacker
		defender = result.defender
	}

	return {
		finalRound: MAX_ROUNDS,
		winner: determineWinner(attacker.length, defender.length),
		attackerRemaining: getAmountsFromSimulationUnits(attacker),
		defenderRemaining: getAmountsFromSimulationUnits(defender)
	}
}

function determineWinner(attackerAmount: number, defenderAmount: number): Winner {
	if (attackerAmount === 0) {
		return 'defender'
	}

	if (defenderAmount === 0) {
		return 'attacker'
	}

	return undefined
}
