export default (config = {}) => ({
	// blockInformation
	init() {
		this.fetchBitcoinPrices();
		this.fetchBlockChainInformation();
	},

	fetchBitcoinPrices() {
		axios
			.get(
				"https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd"
			)
			.then((response) => {
				// Handle success, 'response.data' will contain the fetched data
				console.log(response.data);
			})
			.catch((error) => {
				// Handle error
				console.error("Error fetching data:", error);
			});
	},

	fetchBlockChainInformation() {
		axios
			.get("https://blockchain.info/latestblock")
			.then((response) => {
				// Handle success, 'response.data' will contain the fetched data
				console.log(response.data);
			})
			.catch((error) => {
				// Handle error
				console.error("Error fetching data:", error);
			});
	},
});
