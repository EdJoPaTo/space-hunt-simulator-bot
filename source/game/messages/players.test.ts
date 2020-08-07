import test from 'ava'

import {getPlayers} from './players'

test('raid example', t => {
	const message = `🚀 Raid 294 /mission294
Status: ⏭ Enemy contact 15m09s
Target: 🌕 Bob 🎖326.1ᴋ 🌐 /d1000x300 🕒13h37m
Units: 5 🇮🇲 Liberator. 5 🇲🇴 Observer.`

	const players = getPlayers(message)
	t.deepEqual(players, [{
		guild: '🌕',
		conquerer: undefined,
		name: 'Bob',
		score: 326100,
		location: {
			x: 1000,
			y: 300
		}
	}])
})
