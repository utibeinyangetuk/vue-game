// declare the random attack function
function randomAttack(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
	data() {
		return {
			user: 100,
			monster: 100,
		};
	},
	methods: {
		attackMonster() {
			const result = this.monster - randomAttack(5, 12);
			this.user = result;
			// call the attackPlayer method after the monster method has ran.
			this.attackPlayer();
		},
		attackPlayer() {
			const result = this.monster - randomAttack(5, 12);
			this.monster = result;
		},
	},
});

app.mount("#game");
