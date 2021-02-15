export interface Location {
	readonly x: number;
	readonly y: number;
}

export const INFINITY_LOCATION = {x: Number.POSITIVE_INFINITY, y: Number.POSITIVE_INFINITY}

export function locationString(location: Location | undefined): string {
	const x = location && Number.isFinite(location.x) ? location.x : '???'
	const y = location && Number.isFinite(location.y) ? location.y : '???'
	return `${x}x${y}`
}

export function locationCommand(location: Location): string {
	return `/d${location.x}x${location.y}`
}

export function distanceBetween(a: Location, b: Location): number {
	const xDifference = a.x - b.x
	const yDifference = a.y - b.y
	const squared = (xDifference ** 2) + (yDifference ** 2)
	return Math.sqrt(squared)
}

export function locationsAreEqual(...locations: readonly Location[]): boolean {
	if (locations.length <= 1) {
		return true
	}

	const first = locations[0]!
	if (Number.isNaN(first.x) || Number.isNaN(first.y)) {
		return false
	}

	return locations.slice(1).every(o => distanceBetween(first, o) < 0.001)
}
