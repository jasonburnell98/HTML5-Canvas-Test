import play  from './App.vue'

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


describe('Testing App', ()=>{
    test('Should Play ', () => { 
		const userChoice = "rock";
		choice.value = userChoice;
		const choices = ['rock', 'paper', 'scissors']
		const random = Math.floor(Math.random() * choices.length)
		computerChoice.value = choices[random]

		const outcome = outcomes[choice.value][computerChoice.value]
		const result = play.play(userChoice);
		except(outcome).toBE(result);
	}),
	test('Should Play ', () => { 
		const userChoice = "paper";
		choice.value = userChoice;
		const choices = ['rock', 'paper', 'scissors']
		const random = Math.floor(Math.random() * choices.length)
		computerChoice.value = choices[random]

		const outcome = outcomes[choice.value][computerChoice.value]
		const result = play.play(userChoice);
		except(outcome).toBE(result);
	}),
	test('Should Play ', () => { 
		const userChoice = "scissors";
		choice.value = userChoice;
		const choices = ['rock', 'paper', 'scissors']
		const random = Math.floor(Math.random() * choices.length)
		computerChoice.value = choices[random]

		const outcome = outcomes[choice.value][computerChoice.value]
		const result = play.play(userChoice);
		except(outcome).toBE(result);
	})
});