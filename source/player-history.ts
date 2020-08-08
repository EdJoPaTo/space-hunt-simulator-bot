import {TtlKeyValueInMemoryFile} from '@edjopato/datastore'

import {DAY} from './unix-seconds'
import {Player, Location, locationsAreEqual} from './game'

type UnixSeconds = number

interface LastKnown extends Player {
	readonly timestamp: UnixSeconds;
}

const ENTRY_MAX_AGE_SECONDS = 10 * DAY

const data = new TtlKeyValueInMemoryFile<LastKnown>('persist/player-history.json')

export function getNames(): readonly string[] {
	return data.keys()
}

export function getByName(name: string): LastKnown | undefined {
	return data.get(name)
}

export function getByLocation(location: Location): string | undefined {
	return data.keys()
		.find(name => locationsAreEqual(data.get(name)!.location, location))
}

export async function add(player: Player, confirmationUnixSeconds: UnixSeconds): Promise<void> {
	const current: LastKnown | undefined = data.get(player.name)
	if (current && current.timestamp >= confirmationUnixSeconds) {
		// The current information is already newer
		return
	}

	await data.set(player.name, {
		...player,
		timestamp: confirmationUnixSeconds
	}, ENTRY_MAX_AGE_SECONDS * 1000)
}
