import {Location} from '../../location'
import {Research} from '../types'

import {replaceTinyLetters} from './tiny-letters'

export interface Dashboard {
	readonly location: Location;
	readonly research: Readonly<Record<Research, number>>;
}

export const DASHBOARD_REGEX = /🌐[\s\S]+Research[\s\S]+Units[\s\S]+Metal[\s\S]+Crystal/

export function parseDashboard(text: string): Dashboard {
	const locationMatch = /🌐(\d+)x(\d+)/.exec(text)!
	const researchLine = /Research: (.+)/.exec(text)![1]

	const location: Location = {x: Number(locationMatch[1]), y: Number(locationMatch[2])}

	return {
		location,
		research: parseResearch(researchLine)
	}
}

export function parseResearch(text: string): Readonly<Record<Research, number>> {
	const normalized = replaceTinyLetters(text)

	const numbers: number[] = []
	const regex = /\d+/g
	let match

	while ((match = regex.exec(normalized))) {
		numbers.push(Number(match[0]))
	}

	if (numbers.length !== 9) {
		throw new Error('something is fishy about the research input')
	}

	return {
		technology: numbers[0],
		production: numbers[1],
		storage: numbers[2],
		repair: numbers[3],
		intelligence: numbers[4],
		attack: numbers[5],
		defence: numbers[6],
		health: numbers[7],
		speed: numbers[8]
	}
}
