function getRandomValue(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;

}
const app = Vue.createApp({
    data() {
        return {
            monsterHealth: 100,
            playerHealth: 100,
            currentRound: 0,
            winner: null
        }
    },
    methods: {
        attackMonster() {
            // calculate the damage and deduct from monster health by a random value
            const attackValue = getRandomValue(5, 12);
            this.monsterHealth -= attackValue;

            this.currentRound++;

            // whenever we attack the moster, the monster should attack back
            this.attackPlayer();
        },

        attackPlayer() {
            const attackValue = getRandomValue(8, 15);
            this.playerHealth -= attackValue;

        },
        specialAttackMonster() {
            this.currentRound++;
            // more damage but used on every three rounds
            const attackValue = getRandomValue(10, 25)
            this.monsterHealth -= attackValue;

            this.attackPlayer();
        },
        healPlayer() {
            this.currentRound++;
            const healValue = getRandomValue(8, 20);
            if (this.playerHealth + healValue > 100) {
                this.playerHealth = 100;
            } else { this.playerHealth += healValue; }
            this.attackPlayer();
        },
        startNewGame() {
            this.monsterHealth = 100;
            this.playerHealth = 100;
            this.currentRound = 0;
            this.winner = null;
        },
        surrender() {
            this.winner = 'monster';
        }
    },
    computed: {
        monsterBarStyle() {
            if (this.monsterHealth < 0) {
                return { width: '0%' };
            }
            return { width: this.monsterHealth + '%' }
        },
        playerBarStyle() {
            if (this.playerHealth < 0) {
                return { width: '0%' };
            }
            return { width: this.playerHealth + '%' }
        },
        mayUseSpecialAttack() {
            return this.currentRound % 3 !== 0;
        }

    },
    watch: {
        playerHealth(value) {
            if (value <= 0 && this.monsterHealth <= 0) {
                // draw
                this.winner = 'draw';
            } else if (value <= 0) {
                this.winner = 'monster';
            }
        },
        monsterHealth(value) {
            if (value <= 0 && this.playerHealth <= 0) {
                // a draw
                this.winner = 'draw';
            } else if (value <= 0) {
                // monster lost
                this.winner = 'player';
            }
        }
    }
});

app.mount('#game')