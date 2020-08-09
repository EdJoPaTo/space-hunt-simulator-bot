import {UnitName, UNIT_STATS} from './units'

export function calculateUnitAttack(unit: UnitName, researchLevel = 0): number {
	const {attack} = UNIT_STATS[unit]
	const researchFactor = 1 + (0.02 * researchLevel)
	return Math.round(attack * researchFactor)
}

export function calculateUnitDefense(unit: UnitName, researchLevel = 0): number {
	const {defense} = UNIT_STATS[unit]
	const researchFactor = 1 + (0.02 * researchLevel)
	return Math.round(defense * researchFactor)
}

export function calculateUnitHealth(unit: UnitName, researchLevel = 0): number {
	const {health} = UNIT_STATS[unit]
	const researchFactor = 1 + (0.02 * researchLevel)
	return Math.round(health * researchFactor)
}

export function calculateUnitSpeed(unit: UnitName, researchLevel = 0): number {
	const {speed} = UNIT_STATS[unit]
	const researchFactor = 1 + (0.05 * researchLevel)
	return Math.round(speed * researchFactor)
}
