export default (config = {}) => ({
	bitcoinPrice: null,

	init() {
		this.fetchBitcoinPrices();
		this.fetchBlockChainInformation();

		// SET UP WEBSOCKET FOR REAL TIME BITCOIN PRICE
		const pricesWs = new WebSocket("wss://ws.coincap.io/prices?assets=bitcoin");
		pricesWs.onmessage = (msg) =>
			(this.bitcoinPrice = JSON.parse(msg.data)?.bitcoin);
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
