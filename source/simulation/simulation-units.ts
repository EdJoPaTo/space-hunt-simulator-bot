import {CombatParticipantName, COMBAT_PARTICIPANTS, calculateUnitAttack, calculateUnitDefense, calculateUnitHealth} from '../game'

import {ParticipantAmount, CombatResearchLevels} from './types'

export interface SimulationUnit {
	readonly unit: CombatParticipantName;
	readonly attack: number;
	readonly defense: number;
	readonly healthMax: number;
	readonly healthRemaining: number;
}

export function getSimulationUnitsFromAmounts(units: ParticipantAmount, research: CombatResearchLevels): readonly SimulationUnit[] {
	const result: SimulationUnit[] = []
	for (const participant of COMBAT_PARTICIPANTS) {
		const amount = units[participant] ?? 0
		result.push(...getSimulationUnitsFromAmount(participant, amount, research))
	}

	return result
}

export function getSimulationUnitsFromAmount(unit: CombatParticipantName, amount: number, research: CombatResearchLevels): readonly SimulationUnit[] {
	const attack = calculateUnitAttack(unit, research.attack)
	const defense = calculateUnitDefense(unit, research.defense)
	const health = calculateUnitHealth(unit, research.health)

	const result: SimulationUnit[] = []
	for (let i = 0; i < amount; i++) {
		result.push({
			unit,
			attack,
			defense,
			healthMax: health,
			healthRemaining: health
		})
	}

	return result
}

export function getAmountsFromSimulationUnits(units: readonly SimulationUnit[]): ParticipantAmount {
	const result: Partial<Record<CombatParticipantName, number>> = {}
	for (const participant of COMBAT_PARTICIPANTS) {
		const amount = units.filter(o => o.unit === participant).length
		if (amount > 0) {
			result[participant] = amount
		}
	}

	return result
}
