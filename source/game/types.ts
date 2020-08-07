export interface CombatParticipantStats {
	readonly attack: number;
	readonly defense: number;
	readonly health: number;
}

export interface DefensiveBuildingStats extends CombatParticipantStats {
}

export interface UnitStats extends CombatParticipantStats {
	readonly speed: number;
	readonly capacity: number;
}

export type ResourceResearch = 'production' | 'storage'
export type CombatResearch = 'attack' | 'defence' | 'health' | 'speed'
export type Research = 'technology' | ResourceResearch | CombatResearch | 'repair' | 'intelligence'
