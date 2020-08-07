import {TtlKeyValueInMemoryFile} from '@edjopato/datastore'

import {DAY} from './unix-seconds'
import {Location, locationsAreEqual} from './location'

type UnixSeconds = number

interface LastKnownLocation {
	readonly location: Location;
	readonly confirmation: UnixSeconds;
}

const ENTRY_MAX_AGE_SECONDS = 10 * DAY

const data = new TtlKeyValueInMemoryFile<LastKnownLocation>('persist/player-locations.json')

export function getNames(): readonly string[] {
	return data.keys()
}

export function get(name: string): LastKnownLocation | undefined {
	return data.get(name)
}

export async function add(name: string, location: Location, confirmationUnixSeconds: UnixSeconds): Promise<void> {
	let current: LastKnownLocation | undefined = data.get(name)

	if (!current || !locationsAreEqual(current.location, location)) {
		if (current) {
			if (confirmationUnixSeconds < current.confirmation) {
				// Different location but older than the newest supplied one
				return
			}
		}

		current = {location, confirmation: confirmationUnixSeconds}
	}

	if (current.confirmation >= confirmationUnixSeconds) {
		// The current information is already newer
		return
	}

	await data.set(name, {
		location,
		confirmation: confirmationUnixSeconds
	}, ENTRY_MAX_AGE_SECONDS * 1000)
}
