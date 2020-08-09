import {UnitName, UNITS, UNIT_STATS} from './units'
import {DefensiveBuildingName, DEFENSIVE_BUILDINGS, DEFENSIVE_BUILDING_STATS} from './defensive-buildings'
import {CombatParticipantStats} from './types'

export type CombatParticipantName = UnitName | DefensiveBuildingName

export const COMBAT_PARTICIPANTS: readonly CombatParticipantName[] = [...UNITS, ...DEFENSIVE_BUILDINGS]

export const COMBAT_PARTICIPANT_STATS: Readonly<Record<CombatParticipantName, CombatParticipantStats>> = {
	...UNIT_STATS,
	...DEFENSIVE_BUILDING_STATS
}
