import emojiRegex from 'emoji-regex'

import {Location} from '../location'

import {replaceTinyLetters} from './tiny-letters'

export interface Player {
	readonly guild: string;
	readonly conquerer?: string;
	readonly debris: 'large' | 'small' | false;
	readonly name: string;
	readonly score: number;
	readonly location: Location;
}

export const SCORE_K = 'ᴋ'
export const SCORE_M = 'ᴍ'

export const PLAYER_REGEX = /(\S+) (\w+) (?:(🔆|🔅) )?🎖([\d.]+[ᴋᴍ]?) 🌐 \/d(\d+x\d+)/

export function getPlayers(text: string): readonly Player[] {
	const result: Player[] = []

	const regex = new RegExp(PLAYER_REGEX, 'g')
	let match
	while ((match = regex.exec(text))) {
		const debrisPart = match[3]
		const debris = debrisPart === '🔆' ? 'large' : (debrisPart ? 'small' : false)

		result.push({
			...parseGuild(match[1]!),
			name: match[2]!,
			debris,
			score: parseScore(match[4]!),
			location: parseLocation(match[5]!)
		})
	}

	return result
}

export function parseGuild(text: string): Readonly<{guild: string; conquerer?: string}> {
	const normalized = replaceTinyLetters(text)

	const guild = emojiRegex().exec(normalized)?.[0] ?? 'undefined'
	const conquerer = /\w+/.exec(normalized)?.[0]

	return {guild, conquerer}
}

export function parseScore(score: string): number {
	const numeric = Number(/[\d.]+/.exec(score)![0])

	if (score.endsWith(SCORE_M)) {
		return numeric * 1000000
	}

	if (score.endsWith(SCORE_K)) {
		return numeric * 1000
	}

	return numeric
}

export function parseLocation(location: string): Location {
	const [, x, y] = /(\d+)x(\d+)/.exec(location)!
	return {x: Number(x), y: Number(y)}
}
