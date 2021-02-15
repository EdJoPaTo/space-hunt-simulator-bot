import {SimulationUnit} from './simulation-units'

interface Result {
	readonly attacker: readonly SimulationUnit[];
	readonly defender: readonly SimulationUnit[];
}

export function simulateRound(attacker: readonly SimulationUnit[], defender: readonly SimulationUnit[]): Result {
	return {
		attacker: simulateOneParticipant(defender, attacker),
		defender: simulateOneParticipant(attacker, defender)
	}
}

export function simulateOneParticipant(shooters: readonly SimulationUnit[], targets: readonly SimulationUnit[]): readonly SimulationUnit[] {
	const remainingDefenses = targets.map(o => o.defense)
	const remainingHealths = targets.map(o => o.healthRemaining)
	const possibleTargetAmount = targets.length

	for (const unit of shooters) {
		const {attack} = unit
		const targetIndex = Math.floor(Math.random() * possibleTargetAmount)

		const damageOnDefense = Math.min(attack, remainingDefenses[targetIndex]!)
		remainingDefenses[targetIndex] -= damageOnDefense

		const remainingAttackForHealth = attack - damageOnDefense
		remainingHealths[targetIndex] -= remainingAttackForHealth
	}

	return targets
		.map((o, i): SimulationUnit => ({...o, healthRemaining: remainingHealths[i]!}))
		.filter(o => o.healthRemaining > 0)
}
