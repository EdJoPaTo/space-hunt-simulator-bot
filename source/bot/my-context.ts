import {Context as TelegrafContext} from 'telegraf'
import I18n from 'telegraf-i18n'

import {Dashboard} from '../game'

export interface SessionDashboard extends Dashboard {
	unixSeconds: number;
}

export interface Session {
	dashboard?: SessionDashboard;
	page?: number;
}

export interface MyContext extends TelegrafContext {
	i18n: I18n;
	session: Session;
}
