<script setup>
import { ref, computed, onMounted } from 'vue'
import "./game.css"
import 'animate.css';

const wins = ref(0)
const draws = ref(0)
const losses = ref(0)
const plays = ref(0)

const choice = ref(null)
const computerChoice = ref(null)
const verdict = ref(null)


const outcomes = {
	'rock': {
		'rock': 'draw',
		'paper': 'loss',
		'scissors': 'win'
	},
	'paper': {
		'rock': 'win',
		'paper': 'draw',
		'scissors': 'loss'
	},
	'scissors': {
		'rock': 'loss',
		'paper': 'win',
		'scissors': 'draw'
	}
}

const play = (c) => {

	choice.value = c
	const choices = ['rock', 'paper', 'scissors']
	const random = Math.floor(Math.random() * choices.length)
	computerChoice.value = choices[random]

	const outcome = outcomes[choice.value][computerChoice.value]

	
	
	if (outcome === 'win') {
		wins.value++
		verdict.value = 'You win!'
	} else if (outcome === 'loss') {
		losses.value++
		verdict.value = 'You Lose!'
	} else {
		draws.value++
		verdict.value = 'It\'s a draw'
	}
	SaveGame()
	
}

const winPercentage = computed(() => {
	const total = wins.value + draws.value + losses.value
	return total ? (wins.value / total) * 100 : 0
})

const SaveGame = () => {
	debugger
	localStorage.setItem('wins', wins.value)
	localStorage.setItem('draws', draws.value)
	localStorage.setItem('losses', losses.value)
}

const LoadGame = () => {
	wins.value = parseInt(localStorage.getItem('wins')) || 0
	draws.value = parseInt(localStorage.getItem('draws')) || 0
	losses.value = parseInt(localStorage.getItem('losses')) || 0
}

const ResetRound = () => {
	choice.value = null
	computerChoice.value = null
	verdict.value = null
}

const Reset = () => {
	choice.value = null
	computerChoice.value = null
	verdict.value = null
	wins.value=0
	draws.value=0
	losses.value=0
	plays.value=0
}

const TotalRounds = (count) => {
	plays.value=count
	choice.value = null
	computerChoice.value = null
	verdict.value = null
	wins.value=0
	draws.value=0
	losses.value=0
}

const checkRound = () => {
	if(wins.value + losses.value + draws.value == plays.value) {
		return false;
	}
	else 
		return true;
}

onMounted(() => {
	LoadGame()

	window.addEventListener('keypress', (e) => {
		if (e.key === 'r') {
			ResetRound()
		}
	})
})
// module.exports = App;
</script>
<script>
	export default { methods:{play(){}}};
</script>
<template>
	<body>
		<div id="content">
				<div class="text-white text-center min-h-screen flex flex-col" style="background-color:#603b61; color:white">
					<header class="container mx-auto p-6">
						<h1 class="text-4xl font-bold">Rock, Paper, Scissors!</h1>
					</header>

					<main class="container mx-auto p-6 flex-1">
						<div v-if="plays === 0" class="animate__animated animate__fadeInUp" style="margin-top: 230px;">
							<div class="text-3xl" style=" margin-right: 12px; margin-top: 92px;">Select the rounds you want to play !</div>
							<button @click="TotalRounds(3)" class="text-lg py-2 px-4" style="background-color: #002366; color:azure;margin-right: 65px;     margin-top: 56px;">3 Round Series</button>
							<button @click="TotalRounds(5)" class="text-lg py-2 px-4" style="background-color: red; color:azure;">5 Round Series</button>
							
						</div>

						<div v-else-if="choice === null && plays !=0" class="animate__animated animate__fadeIn animate__slow flex items-center justify-center -mx-6">
							<button @click="play('rock')"
								class="animate__animated animate__bounce animate__slow bg-white rounded-full shadow-lg w-64 p-12 mx-6 transition-colors duration-300 hover:bg-pink-500">
								<img src="./assets/RockIcon.svg" alt="Rock" class="w-full" />
							</button>

							<button @click="play('paper')"
								class="animate__animated animate__bounce animate__slow bg-white rounded-full shadow-lg w-64 p-12 mx-6 transition-colors duration-300 hover:bg-green-500">
								<img src="./assets/PaperIcon.svg" alt="Paper" />
							</button>

							<button @click="play('scissors')"
								class="animate__animated animate__bounce animate__slow bg-white rounded-full shadow-lg w-64 p-12 mx-6 transition-colors duration-300 hover:bg-yellow-500">
								<img src="./assets/ScissorsIcon.svg" alt="Scissors" />
							</button>
							
						</div>

						<div v-else class="animate__animated animate__fadeIn animate__slower ">
							<div class="text-3xl mb-4">
								You picked <span class="text-red-500">{{ choice }}</span>
							</div>
							<div class="text-3xl mb-4">
								The computer picked <span style="color:yellow">{{ computerChoice }}</span>
							</div>
							<div class="text-6xl mb-12">
								{{ verdict }}
							</div>

							<button v-if="checkRound()" @click="ResetRound" class="text-lg py-2 px-4" style="background-color: #002366; color:azure;margin-right: 65px;">Re-Match</button>
							<button @click="Reset" class="text-lg py-2 px-4" style="background-color: red; color:azure;">Reset</button>
							
						</div>
						<div v-if="plays !=0">
							<div class="mt-12 text-3xl mb-4">Win: {{ wins }} - Draw: {{ draws }} - Losses: {{ losses }}</div>
							<div class="text-lg">Win rate: {{ Math.round(winPercentage) }}%</div>
						</div>
					</main>

					<footer class="container mx-auto p-6">
						<a>Rock Paper Scissors Game</a>
					</footer>
				</div>
			</div>
			<canvas></canvas>
	</body>
</template>

<style>


</style>
