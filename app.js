// declare the random attack function
function randomAttack(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
	data() {
		return {
			user: 100,
			monster: 100,
			currentRound: 0,
		};
	},
	computed: {
		damage() {
			if (this.monster < 100) {
				return { width: `${this.monster}%`, "background-color": "gold" };
			}
		},
		damage2() {
			if (this.monster < 50) {
				return { "background-color": "red" };
			}
		},
		damage3() {
			if (this.user < 100) {
				return { width: `${this.user}%`, "background-color": "gold" };
			}
		},
		damage4() {
			if (this.user < 50) {
				return { "background-color": "red" };
			}
		},
		special() {
			return this.currentRound % 3 !== 0;
		},
	},
	methods: {
		attackMonster() {
			// increment the current round by 1 after every attack
			this.currentRound++;
			const result = this.monster - randomAttack(5, 12);
			this.monster = result;
			// call the attackPlayer method after the monster method has ran to run it next.
			this.attackPlayer();
		},
		attackPlayer() {
			const result = this.user - randomAttack(5, 12);
			this.user = result;
		},
		SpecialAttackMonster() {
			this.currentRound++;
			const result = this.monster - randomAttack(10, 25);
			this.monster = result;
			this.attackPlayer();
		},
		healPlayer() {
			this.currentRound++;
			const heal = this.user + randomAttack(8, 20);
			if (heal > 100) {
				this.user = 100;
			} else {
				this.user = heal;
			}
			this.attackPlayer();
		},
	},
});

app.mount("#game");
