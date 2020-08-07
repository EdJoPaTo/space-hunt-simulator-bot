export interface Location {
	readonly x: number;
	readonly y: number;
}

export function distanceBetween(a: Location, b: Location): number {
	const xDifference = a.x - b.x
	const yDifference = a.y - b.y
	return (xDifference ** 2) + (yDifference ** 2)
}

export function locationsAreEqual(...locations: readonly Location[]): boolean {
	if (locations.length <= 1) {
		return true
	}

	const first = locations[0]
	if (Number.isNaN(first.x) || Number.isNaN(first.y)) {
		return false
	}

	return locations.slice(1).every(o => distanceBetween(first, o) < 0.001)
}
