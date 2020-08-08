import {UnitName, UNIT_STATS} from './units'

export function calculateUnitSpeed(unit: UnitName, speedResearchLevel = 0): number {
	const {speed} = UNIT_STATS[unit]
	const researchFactor = 1 + (0.05 * speedResearchLevel)
	return speed * researchFactor
}

export function calculateTravelTimeInMinutes(_distance: number, _slowestUnitSpeed: number): number {
	// TODO: what the?
	return NaN
}
