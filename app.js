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
			winner: null,
			battleLog: [],
		};
	},
	computed: {
		damage() {
			if (this.monster < 0) {
				this.monster = 0;
				return { width: "0%" };
			} else if (this.monster < 100) {
				return { width: `${this.monster}%`, "background-color": "yellow" };
			}
		},
		damage2() {
			if (this.monster <= 50) {
				return { "background-color": "red" };
			}
		},
		damage3() {
			if (this.user < 0) {
				this.user = 0;
				return { width: "0%" };
			} else if (this.user < 100) {
				return { width: `${this.user}%`, "background-color": "yellow" };
			}
		},
		damage4() {
			if (this.user <= 50) {
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
		restart() {
			this.user = 100;
			this.monster = 100;
			this.winner = null;
			this.currentRound = 0;
			this.log = [];
		},
		surrender() {
			this.user = 0;
			this.winner = "monster";
		},
	},
	watch: {
		user(value) {
			if (value <= 0 && this.monster <= 0) {
				// draw
				this.winner = "draw";
			} else if (value <= 0) {
				// player lost
				this.winner = "monster";
			}
		},
		monster(value) {
			if (value <= 0 && this.user <= 0) {
				// draw
				this.winner = "draw";
			} else if (value <= 0) {
				// monster lost
				this.winner = "user";
			}
		},
	},
});

app.mount("#game");
