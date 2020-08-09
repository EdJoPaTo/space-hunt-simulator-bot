import {UnitStats} from './types'

export type UnitName = 'observer' | 'scout' | 'smallcargoship' | 'wraith' | 'liberator' | 'largecargoship' | 'piercingmissile' | 'battlecruiser' | 'guardian' | 'bomber' | 'destroyer' | 'massivecargoship' | 'deathstar'

export const UNIT_STATS: Readonly<Record<UnitName, UnitStats>> = {
	observer: {
		attack: 1,
		defense: 5,
		health: 100,
		speed: 75000,
		capacity: 5
	},
	scout: {
		attack: 75,
		defense: 10,
		health: 400,
		speed: 12500,
		capacity: 50
	},
	smallcargoship: {
		attack: 1,
		defense: 25,
		health: 400,
		speed: 10000,
		capacity: 5000
	},
	wraith: {
		attack: 250,
		defense: 25,
		health: 1000,
		speed: 10000,
		capacity: 100
	},
	liberator: {
		attack: 600,
		defense: 50,
		health: 2700,
		speed: 15000,
		capacity: 800
	},
	largecargoship: {
		attack: 5,
		defense: 75,
		health: 1200,
		speed: 7500,
		capacity: 25000
	},
	piercingmissile: {
		attack: 7000,
		defense: 0,
		health: 1,
		speed: 75000,
		capacity: 0
	},
	battlecruiser: {
		attack: 1000,
		defense: 400,
		health: 7000,
		speed: 10000,
		capacity: 750
	},
	guardian: {
		attack: 600,
		defense: 800,
		health: 6000,
		speed: 10000,
		capacity: 1500
	},
	bomber: {
		attack: 1500,
		defense: 500,
		health: 7500,
		speed: 5000,
		capacity: 500
	},
	destroyer: {
		attack: 3000,
		defense: 500,
		health: 11000,
		speed: 5000,
		capacity: 2000
	},
	massivecargoship: {
		attack: 1,
		defense: 100,
		health: 1000,
		speed: 1000,
		capacity: 100000
	},
	deathstar: {
		attack: 80000,
		defense: 20000,
		health: 200000,
		speed: 500,
		capacity: 200000
	}
}

export const UNITS: readonly UnitName[] = Object.keys(UNIT_STATS) as any[]

export function isUnit(something: any): something is UnitName {
	return typeof something === 'string' && UNITS.includes(something as any)
}
