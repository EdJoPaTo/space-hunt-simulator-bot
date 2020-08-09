import {Context as TelegrafContext} from 'telegraf'
import I18n from 'telegraf-i18n'

import {CombatResearchLevels} from '../simulation'
import {Dashboard, CombatParticipantName} from '../game'

export interface SessionDashboard extends Dashboard {
	unixSeconds: number;
}

export type Fleet = Partial<Record<CombatParticipantName, number>>

export interface SimulationState {
	attackerFleet: Fleet;
	defenderFleet: Fleet;
	attackerResearch: CombatResearchLevels;
	defenderResearch: CombatResearchLevels;
}

export interface Session {
	dashboard?: SessionDashboard;
	simulation?: SimulationState;
	page?: number;
}

export interface MyContext extends TelegrafContext {
	i18n: I18n;
	session: Session;
}
