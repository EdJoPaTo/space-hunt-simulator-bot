import test from 'ava'

import {parseDashboard} from './dashboard'

test('example', t => {
	const message = `🌕 Bob 🎖326.1ᴋ 🌐1000x300
🧪 Research: 🔬⁵⁴ ⚙️⁴⁸ 🏢⁶ 🔧⁴ 🧠⁶ ⚔️¹⁰ 🛡¹⁰ ❤️¹⁰ 💨¹⁰
✈️ Units: 213 /240
🏭 Buildings: 100 /100
⚡️ Electricity: 23912 /40000 ¹⁰⁰ᐟᵐ
🔩 Metal: 9989 /86400 ⁴¹⁷ᐟᵐ
💎 Crystal: 54489 /86400 ¹⁶⁴ᐟᵐ
🔮 Ether: 10 /500
💬 Join the community chat!`

	t.deepEqual(parseDashboard(message), {
		location: {
			x: 1000,
			y: 300
		},
		research: {
			technology: 54,
			production: 48,
			storage: 6,
			repair: 4,
			intelligence: 6,
			attack: 10,
			defense: 10,
			health: 10,
			speed: 10
		}
	})
})
