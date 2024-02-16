// import * as ccxt from "ccxt";
export default (config = {}) => ({
	bitcoinPrice: null,

	init() {
		this.fetchBitcoinPrices();
		this.fetchBlockChainInformation();
		this.fetchBitcoinPrice();

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

	fetchBitcoinPrice() {
		// Send GET request using Axios
		axios
			.get(
				"https://api.coingecko.com/api/v3/coins/bitcoin/ohlc?vs_currency=usd&days=max"
			)
			.then((response) => {
				// Check if request was successful (status code 200)
				if (response.status !== 200) {
					throw new Error("Failed to fetch data");
				}

				this.drawChart(response.data);
			})
			.catch((error) => {
				console.error("Error:", error.message);
			});
	},

	drawChart(data) {
		var options = {
			series: [
				{
					name: "50D MA",
					type: "line",
					data: this.computeMovingAverages(data, 50),
				},
				// {
				// 	name: "100D MA",
				// 	type: "line",
				// 	data: this.computeMovingAverages(data, 100),
				// },
				// {
				// 	name: "200D MA",
				// 	type: "line",
				// 	data: this.computeMovingAverages(data, 200),
				// },
				{
					name: "Bitcoin Prices",
					type: "candlestick",
					data: this.formatData(data),
				},
			],
			chart: {
				height: 400,
				type: "line",
			},
			title: {
				text: "Bitcoin Prices In US Dollar (USD)",
				align: "left",
			},
			stroke: {
				width: [2, 1],
			},
			tooltip: {
				shared: true,
				custom: [
					function ({ seriesIndex, dataPointIndex, w }) {
						return w.globals.series[seriesIndex][dataPointIndex];
					},
					function ({ seriesIndex, dataPointIndex, w }) {
						var o = w.globals.seriesCandleO[seriesIndex][dataPointIndex];
						var h = w.globals.seriesCandleH[seriesIndex][dataPointIndex];
						var l = w.globals.seriesCandleL[seriesIndex][dataPointIndex];
						var c = w.globals.seriesCandleC[seriesIndex][dataPointIndex];
						return (
							'<div class="apexcharts-tooltip-candlestick">' +
							'<div>Open: <span class="value">' +
							o +
							"</span></div>" +
							'<div>High: <span class="value">' +
							h +
							"</span></div>" +
							'<div>Low: <span class="value">' +
							l +
							"</span></div>" +
							'<div>Close: <span class="value">' +
							c +
							"</span></div>" +
							"</div>"
						);
					},
				],
			},
			xaxis: {
				type: "datetime",
			},
			plotOptions: {
				candlestick: {
					wick: {
						useFillColor: true,
					},
				},
			},
		};

		var chart = new ApexCharts(this.$refs.chart, options);
		chart.render();
	},

	formatData(data) {
		const formattedData = new Array(data.length);

		for (let i = 0; i < data.length; i++) {
			const row = data[i];
			const timestamp = row[0];
			const values = [row[1], row[2], row[3], row[4]];

			formattedData[i] = {
				x: new Date(timestamp),
				y: values,
			};
		}

		return formattedData;
	},

	computeMovingAverages(data, windowSize) {
		const movingAverages = [];

		for (let i = windowSize - 1; i < data.length; i++) {
			const timestamp = data[i][0];
			const closingPrices = data
				.slice(i - windowSize + 1, i + 1)
				.map((row) => row[4]);
			const average =
				closingPrices.reduce((acc, curr) => acc + curr, 0) / windowSize;

			movingAverages.push({
				x: new Date(timestamp),
				y: average.toFixed(2), // Round to 2 decimal places
			});
		}

		return movingAverages;
	},
});
