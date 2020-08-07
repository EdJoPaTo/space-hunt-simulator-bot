import {DefensiveBuildingStats} from './types'

export type DefensiveBuildingName = 'lightlaser' | 'heavylaser' | 'ioncannon' | 'smallplanetaryshield' | 'gausscannon' | 'largeplanetaryshield' | 'plasmaturret'

export const DEFENSIVE_BUILDINGS: readonly DefensiveBuildingName[] = ['lightlaser', 'heavylaser', 'ioncannon', 'smallplanetaryshield', 'gausscannon', 'largeplanetaryshield', 'plasmaturret']

export const DEFENSIVE_BUILDING_STATS: Readonly<Record<DefensiveBuildingName, DefensiveBuildingStats>> = {
	lightlaser: {
		attack: 450,
		defense: 50,
		health: 2400
	},
	heavylaser: {
		attack: 1500,
		defense: 100,
		health: 6000
	},
	ioncannon: {
		attack: 1200,
		defense: 250,
		health: 16200
	},
	smallplanetaryshield: {
		attack: 1,
		defense: 1000,
		health: 2000
	},
	gausscannon: {
		attack: 4000,
		defense: 1200,
		health: 35000
	},
	largeplanetaryshield: {
		attack: 1,
		defense: 10000,
		health: 10000
	},
	plasmaturret: {
		attack: 9000,
		defense: 2000,
		health: 44000
	}
}
