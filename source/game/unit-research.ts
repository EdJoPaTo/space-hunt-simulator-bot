import {UnitName, UNIT_STATS} from './units'
import {CombatParticipantName, COMBAT_PARTICIPANT_STATS} from './combat-participant'

export function calculateUnitAttack(unit: CombatParticipantName, researchLevel = 0): number {
	const {attack} = COMBAT_PARTICIPANT_STATS[unit]
	const researchFactor = 1 + (0.02 * researchLevel)
	return Math.round(attack * researchFactor)
}

export function calculateUnitDefense(unit: CombatParticipantName, researchLevel = 0): number {
	const {defense} = COMBAT_PARTICIPANT_STATS[unit]
	const researchFactor = 1 + (0.02 * researchLevel)
	return Math.round(defense * researchFactor)
}

export function calculateUnitHealth(unit: CombatParticipantName, researchLevel = 0): number {
	const {health} = COMBAT_PARTICIPANT_STATS[unit]
	const researchFactor = 1 + (0.02 * researchLevel)
	return Math.round(health * researchFactor)
}

export function calculateUnitSpeed(unit: UnitName, researchLevel = 0): number {
	const {speed} = UNIT_STATS[unit]
	const researchFactor = 1 + (0.05 * researchLevel)
	return Math.round(speed * researchFactor)
}
