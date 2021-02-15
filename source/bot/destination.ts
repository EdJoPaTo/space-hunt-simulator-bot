import {Composer} from 'telegraf'
import {html as format} from 'telegram-format'

import {Location, locationString, INFINITY_LOCATION, distanceBetween, UnitName, calculateUnitSpeed} from '../game'
import * as playerHistory from '../player-history'

import {MyContext} from './my-context'

export const bot = new Composer<MyContext>()

bot.hears(/^\/d(\d+)x(\d+)$/, async context => {
	const location: Location = {x: Number(context.match[1]), y: Number(context.match[2])}
	const name = playerHistory.getByLocation(location)

	if (!name) {
		await context.reply(context.i18n.t('locations.emptySpot'))
		return
	}

	let text = ''
	text += format.bold(format.escape(name))
	text += '\n'
	text += locationString(location)
	text += '\n\n'

	text += travelTimePart(context, location)

	await context.reply(text, {
		parse_mode: format.parse_mode
	})
})

function travelTimePart(context: MyContext, targetLocation: Location): string {
	const ownLocation = context.session.dashboard?.location ?? INFINITY_LOCATION
	const speedResearchLevel = context.session.dashboard?.research.speed ?? 0
	const distance = distanceBetween(targetLocation, ownLocation)

	let text = ''

	text += format.bold(context.i18n.t('locations.unitTravelTime'))
	text += ' ('
	text += locationString(ownLocation)
	text += ')'
	text += '\n'
	text += 'soon…?\nRight now its completly different than the game… For whatever reason my math isnt the game math…\n'

	text += '\n'
	text += 'Distance'
	text += ': '
	text += distance.toFixed(2)

	const speedEntries: string[] = []
	speedEntries.push(speedLine('Reference', 10000, distance))
	speedEntries.push(unitLine('liberator', speedResearchLevel, distance))
	text += '\n'
	text += speedEntries.join('\n')

	return text
}

function unitLine(unit: UnitName, speedResearchLevel: number, distance: number): string {
	return speedLine(unit, calculateUnitSpeed(unit, speedResearchLevel), distance)
}

function speedLine(title: string, _speed: number, _distance: number): string {
	const totalMinutes = 42
	const minutes = totalMinutes % 60
	const hours = Math.floor(totalMinutes / 60)
	return `${title}: ${hours}h${minutes.toFixed(0)}m`
}
