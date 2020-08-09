import {CombatParticipantName, CombatResearch} from '../game'

export type ParticipantAmount = Readonly<Partial<Record<CombatParticipantName, number>>>
export type CombatResearchLevels = Readonly<Record<CombatResearch, number>>
export type Winner = 'attacker' | 'defender' | undefined

export interface Battle {
	readonly attackerFleet: ParticipantAmount;
	readonly defenderFleet: ParticipantAmount;
	readonly attackerResearch: CombatResearchLevels;
	readonly defenderResearch: CombatResearchLevels;
}

export interface BattleResult {
	readonly finalRound: number;
	readonly winner: Winner;
	readonly attackerRemaining: ParticipantAmount;
	readonly defenderRemaining: ParticipantAmount;
}
