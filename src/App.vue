<template>
	<div class="max-w-960 m-center mobile:px-16">
		<Header />
		<div class="flex justify-between items-center mb-32 mobile:flex-col mobile:items-start mobile:w-328">
			<ExchangeInput class="mr-32 mobile:mb-16 mobile:mr-0" 
										:availableCurrencies="availableCurrencies" 
										:selectedTicker="selectedTicker" 
										@changeTicker="newSelectedTicker" 
										:selectedImage="selectedImage" 
										:minimalAmount="minimalAmount" 
										@value="countEstimated" />
			<img class="w-24 mobile:rotate-90 mobile:mb-16 mobile:self-end" src="./assets/swap.svg" alt="arrows">
			<ExchangeInput class="ml-25 mobile:ml-0" 
										:availableCurrencies="allowedCurrencies" 
										:selectedTicker="selectedSecondTicker" 
										:selectedImage="selectedSecondImage" 
										@changeTicker="newSecondeSelectedTicker" 
										:exchangeValue="exchangeValue" />
		</div>
		<div class="flex justify-between items-end mobile:flex-col mobile:items-start">
			<AdressInput class="mr-32" />
			<Button />
		</div>
	</div>
</template>

<script>
import Header from './components/Header.vue'
import ExchangeInput from './components/ExchangeInput.vue'
import AdressInput from './components/AdressInput.vue'
import Button from './components/Button.vue'
import axios from 'axios'

export default {
	components: { Header, ExchangeInput, AdressInput, Button },
	data() {
		return {
			selectedTicker: 'BTC',
			selectedImage: 'https://changenow.io/images/sprite/currencies/btc.svg',
			selectedSecondTicker: 'ETH',
			selectedSecondImage: 'https://changenow.io/images/sprite/currencies/eth.svg',
			availableCurrencies: [],
			allowedCurrencies: [],
			APIKey: 'c9155859d90d239f909d2906233816b26cd8cf5ede44702d422667672b58b0cd',
			minimalAmount: '',
			exchangeValue: '',
			userValue: '',
			disabledPair: '',
		}
	},
	methods: {
		// Hot fix needs to be united after discussion
		newSelectedTicker(e) { // Click on the left input
			if (e.target.localName == 'label') {
				this.selectedTicker = e.target.children[1].innerText
				this.selectedImage = e.target.firstElementChild.src
			} else if (e.target.parentElement.localName == 'label') {
				this.selectedTicker = e.target.parentElement.children[1].innerText
				this.selectedImage = e.target.parentElement.children[0].src
			}
			this.countMinimal()
			this.countEstimated(this.userValue)
		},
		newSecondeSelectedTicker(e) { // Click on the right input
			if (e.target.localName == 'label') {
				this.selectedSecondTicker = e.target.children[1].innerText
				this.selectedSecondImage = e.target.firstElementChild.src
			} else if (e.target.parentElement.localName == 'label') {
				this.selectedSecondTicker = e.target.parentElement.children[1].innerText
				this.selectedSecondImage = e.target.parentElement.children[0].src
			}
			this.countMinimal()
			this.countEstimated(this.userValue)
		},
		countMinimal() { // Request to get a minimal amount for two currencies
	 		axios.get(`https://api.changenow.io/v1/min-amount/${this.selectedTicker}_${this.selectedSecondTicker}?api_key=${this.APIKey}`) 
			.then(responce => (this.minimalAmount = responce.data.minAmount))
		},
		countEstimated(userValue) { // Request to get an estimated amount for two currencies
			axios.get(`https://api.changenow.io/v1/exchange-amount/${userValue}/${this.selectedTicker}_${this.selectedSecondTicker}/?api_key=${this.APIKey}`)
			.then(responce => (this.exchangeValue = responce.data.estimatedAmount))
			this.userValue = userValue
		}, 
		newArray() { // Request to get all available currencies for the specific currency
			axios.get(`https://api.changenow.io/v1/currencies-to/${this.selectedTicker}?fixedRate=true`)
			.then(responce => (this.allowedCurrencies = responce.data))
		},
	},
	mounted() {
		axios.get('https://api.changenow.io/v1/currencies?active=true&fixedRate=true') // Request to get all available currencies
		.then(responce => (this.availableCurrencies = responce.data))
		this.countMinimal()
		this.countEstimated(this.userValue)
		this.newArray()
	},
	computed: {
		exchangeValue() { // Check the value in left input
			if (this.userValue > 0 && this.userValue < this.minimalAmount) {
				return 'Value is less than the minimum'
			} else if (this.userValue == '') {
				return ''
			} else {
				return this.exchangeValue
			}
		}
	},
	watch: { // Check the new value in left input to get new array for the specific value
		selectedTicker() {
			this.newArray()
		}
	}
}
</script>