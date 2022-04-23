<template>
	<div class="w-440 flex items-center bg-grey-fill border-grey-border border border-solid rounded-5 relative mobile:w-328" :class="{ searchable: isOptionsShown }">
		<!-- Input -->
		<input class="w-290 font-normal text-16 text-black bg-grey-fill py-14 px-16 rounded-l-5 mobile:w-178" type="text" :placeholder="minimalAmount" v-model="userValue" @input="userChangeValue">
		<span class="inline-block w-1 h-30 bg-grey-border"></span>

		<!-- Custom select + options -->
		<div class="flex flex-col py-14 px-16 cursor-pointer mobile:w-150 text-center" @click="showOptions"> 
			<div class="flex items-center w-150 overflow-x-auto overflow-y-hidden bg-grey-fill text-black text-16 uppercase select-none after:content-[url('./assets/arrow.svg')] after:absolute after:top-19 after:right-0 after:mr-8 mobile:w-100" v-if="isOptionsShown === false">
				<img class="ml-32 mr-16 mobile:ml-16" :src="selectedImage" alt="icon">
				<span> {{ selectedTicker }} </span>
			</div> 

			<div class="absolute top-30 left-0 w-440 -ml-1 bg-grey-fill hidden overflow-hidden border-grey-border border border-t-0 rounded-t-none border-solid rounded-5 mobile:w-328 z-[1000]" :class="{ active: isOptionsShown }"> 
				<div class="text-black text-16 cursor-pointer leading-52 px-16 hover:bg-grey-hover" 
						v-for="(currency, index) in filteredCurrencies" 
						:key="index" 
						@click="setSelected"> 
					<label class="flex items-center cursor-pointer text-black uppercase select-none h-50 whitespace-nowrap overflow-x-auto overflow-y-hidden" :for="currency.ticker"> 
						<img class="w-20 mr-16" :src="currency.image" alt="icon">
						<div class="ticker"> {{ currency.ticker }} </div> 
						<span class="normal-case text-grey ml-16"> {{ currency.name }} </span> 
					</label>
				</div>
			</div>
		</div>

		<!-- Custom search through options -->
		<div class="absolute w-full z-100 hidden" :class="{ search: isOptionsShown }">
			<input class="w-full bg-grey-fill font-normal text-16 text-grey py-14 px-16 rounded-5" type="text" placeholder="Search" v-model="search">
			<img class="mr-16 cursor-pointer" src="../assets/close.svg" alt="close" @click="showOptions">
		</div>
	</div>
</template>

<script>
export default {
	props: ['availableCurrencies', 'selectedTicker', 'selectedImage', 'minimalAmount', 'exchangeValue'],
	data() {
		return {
			isOptionsShown: false,
			userValue: '',
			search: '',
		}
	},
	methods: {
		showOptions() { // Change the data for display and styles
			this.isOptionsShown = !this.isOptionsShown
		},
		setSelected(e) { // Emit the event when user has clicked the option
			this.$emit('changeTicker', e)
		},
		userChangeValue() { // Emit the event when user has changed the input value
			this.$emit('value', this.userValue)
		}
	},
	computed: {
		filteredCurrencies() { // Create new array with filter method to search through options
			return this.availableCurrencies.filter(currency => {
				return currency.ticker.toLowerCase().includes(this.search.toLowerCase())
			})
		}
	},
	watch: { // Check new value to update data
		exchangeValue(val) {
			this.userValue = val
		}
	}
}
</script>

<style scoped>
	.active {
		display: block;
		max-height: 150px;
		overflow-y: scroll;
	}
	.search {
		display: flex;
	}
	.searchable {
		border-radius: 5px 5px 0 0;
	}
</style>