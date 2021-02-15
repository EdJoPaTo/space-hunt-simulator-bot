import {MyContext, Fleet} from '../../my-context'

export function isAttacker(context: MyContext): boolean {
	if (!context.callbackQuery || !('data' in context.callbackQuery)) {
		throw new TypeError('needs to be DataCallbackQuery')
	}

	return context.callbackQuery.data.includes('attacker')
}

export function calculateUnitAmount(units: Fleet): number {
	let sum = 0
	for (const current of Object.values(units)) {
		sum += current ?? 0
	}

	return sum
}
