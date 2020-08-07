import test, {ExecutionContext} from 'ava'

import {Location, distanceBetween, locationsAreEqual} from './location'

function distanceBetweenMacro(t: ExecutionContext, ax: number, ay: number, bx: number, by: number, expectedDistance: number): void {
	const a: Location = {x: ax, y: ay}
	const b: Location = {x: bx, y: by}
	const distance = distanceBetween(a, b)
	t.is(distance, expectedDistance)
}

distanceBetweenMacro.title = (_title: string, ax: number, ay: number, bx: number, by: number, expectedDistance: number) => {
	return `distanceBetween {${ax} ${ay}} {${bx} ${by}}  ${expectedDistance}`
}

test(distanceBetweenMacro, 0, 0, 0, 0, 0)
test(distanceBetweenMacro, 0, 0, 0, 1, 1)
test(distanceBetweenMacro, 0, 0, 1, 0, 1)
test(distanceBetweenMacro, 1, 0, 1, 0, 0)
test(distanceBetweenMacro, 0, 1, 0, 1, 0)
test(distanceBetweenMacro, 0, 1, 1, 1, 1)
test(distanceBetweenMacro, 1, 0, 1, 1, 1)

function locationsAreEqualMacro(t: ExecutionContext, ax: number, ay: number, bx: number, by: number, expected: boolean): void {
	const a: Location = {x: ax, y: ay}
	const b: Location = {x: bx, y: by}
	const distance = locationsAreEqual(a, b)
	t.is(distance, expected)
}

locationsAreEqualMacro.title = (_title: string, ax: number, ay: number, bx: number, by: number, expected: boolean) => {
	return `locationsAreEqual {${ax} ${ay}} {${bx} ${by}}  ${String(expected)}`
}

test(locationsAreEqualMacro, 0, 0, 0, 0, true)
test(locationsAreEqualMacro, 0, 1, 0, 1, true)
test(locationsAreEqualMacro, 1, 0, 1, 0, true)
test(locationsAreEqualMacro, 1, 1, 1, 1, true)
test(locationsAreEqualMacro, 0, 1, 1, 0, false)
test(locationsAreEqualMacro, 1, 0, 0, 1, false)
test(locationsAreEqualMacro, Number.NaN, 0, 0, 0, false)
test(locationsAreEqualMacro, 0, Number.NaN, 0, 0, false)

test('locationsAreEqual with 1 location', t => {
	t.true(locationsAreEqual({x: 0, y: 2}))
})
