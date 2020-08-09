import {Body} from 'telegraf-inline-menu'
import {html as format} from 'telegram-format'

import {MyContext, Fleet} from '../../my-context'
import {CombatResearchLevels, simulateBattle} from '../../../simulation'
import {COMBAT_PARTICIPANTS} from '../../../game'

import {calculateUnitAmount} from './helper'

export function menuBody(context: MyContext): Body {
	if (!context.session.simulation) {
		context.session.simulation = {
			attackerFleet: {},
			defenderFleet: {},
			attackerResearch: {attack: 0, defense: 0, health: 0},
			defenderResearch: {attack: 0, defense: 0, health: 0}
		}
	}

	const {simulation} = context.session

	let text = ''
	text += format.bold('Simulator')
	text += '\n\n'

	text += format.bold('Attacker')
	text += ' ('
	text += unitAmount(simulation.attackerFleet)
	text += '; '
	text += researchLine(simulation.attackerResearch)
	text += ')'
	text += '\n'
	text += unitLines(simulation.attackerFleet).join('\n')
	text += '\n\n'

	text += format.bold('Defender')
	text += ' ('
	text += unitAmount(simulation.defenderFleet)
	text += '; '
	text += researchLine(simulation.defenderResearch)
	text += ')'
	text += '\n'
	text += unitLines(simulation.defenderFleet).join('\n')
	text += '\n\n'

	const result = simulateBattle(simulation)

	text += format.bold('Result')
	text += '\n'

	text += 'Winner'
	text += ': '
	text += result.winner ?? 'draw'
	text += '\n'

	text += 'Rounds'
	text += ': '
	text += result.finalRound
	text += '\n'

	text += '\n'
	text += format.bold('Attacker remaining')
	text += ' ('
	text += unitAmount(result.attackerRemaining)
	text += ')'
	text += '\n'
	text += unitLines(result.attackerRemaining).join('\n')
	text += '\n\n'

	text += format.bold('Defender remaining')
	text += ' ('
	text += unitAmount(result.defenderRemaining)
	text += ')'
	text += '\n'
	text += unitLines(result.defenderRemaining).join('\n')
	text += '\n\n'

	return {text, parse_mode: format.parse_mode}
}

function researchLine(research: CombatResearchLevels): string {
	return `⚔️${research.attack} 🛡${research.defense} ❤️${research.health}`
}

function unitAmount(units: Fleet): string {
	return `✈️${calculateUnitAmount(units)}`
}

function unitLines(units: Fleet): string[] {
	return COMBAT_PARTICIPANTS
		.filter(o => units[o]! > 0)
		.map(o => `${units[o]!}x ${o}`)
}
