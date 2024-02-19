// import * as ccxt from "ccxt";
export default (config = {}) => ({
	currentDifficulty: null,

	miningReward: null,

	blockHeight: null,

	estimatedHalvingDate: null,

	activeMovingAverage: "50",

	activeTimeFrame: "ALL",

	chart: null,

	chartLine: null,

	priceObject: [],

	rawPriceData: null,

	bitcoinPrice: null,

	init() {
		this.fetchBitcoinPrices();
		this.fetchBlockChainInformation();
		this.getBitcoinBlockchainMetrics();
		this.fetchBitcoinPrice();

		// SET UP WEBSOCKET FOR REAL TIME BITCOIN PRICE
		const pricesWs = new WebSocket("wss://ws.coincap.io/prices?assets=bitcoin");
		pricesWs.onmessage = (msg) =>
			(this.bitcoinPrice = JSON.parse(msg.data)?.bitcoin);
	},

	// Function to fetch Bitcoin blockchain metrics from Blockchain.com API
	getBitcoinBlockchainMetrics() {
		axios
			.get("https://api.blockchair.com/bitcoin/stats")
			.then((response) => {
				// Handle success, 'response.data' will contain the fetched data
				console.log(response.data);

				const blockchainMetrics = response.data;

				if (blockchainMetrics !== null) {
					const currentDifficulty = blockchainMetrics.data.difficulty;
					// Calculate mining reward (assuming it's the inflation rate for 24h)
					const miningReward =
						blockchainMetrics.data.inflation_usd_24h /
						blockchainMetrics.data.blocks_24h;
					const blockHeight = blockchainMetrics.data.blocks;
					// Calculate estimated 2024 halving date (every 210,000 blocks)
					const currentBlockHeight = parseInt(blockHeight);
					const blocksRemaining = 840000 - (currentBlockHeight % 840000);
					const blocksPerDay = 144; // Blocks mined per day (on average)
					const daysRemaining = blocksRemaining / blocksPerDay;
					const estimatedHalvingDate = new Date(
						Date.now() + daysRemaining * 24 * 60 * 60 * 1000
					);
					// Fetch transaction fee rate & fee rate estimates
					// You may need to use a different API for this data
					console.log("Bitcoin Blockchain Metrics:");
					console.log("- Current Difficulty:", currentDifficulty);
					console.log("- Mining Reward:", miningReward);
					console.log("- Block Height:", blockHeight);
					console.log(
						"- Estimated 2024 Halving Date:",
						estimatedHalvingDate.toISOString().split("T")[0]
					);
					this.currentDifficulty = blockchainMetrics.data.difficulty;
					this.miningReward =
						blockchainMetrics.data.inflation_usd_24h /
						blockchainMetrics.data.blocks_24h;
					this.blockHeight = blockchainMetrics.data.blocks;
					this.estimatedHalvingDate = estimatedHalvingDate
						.toISOString()
						.split("T")[0];
				}
			})
			.catch((error) => {
				// Handle error
				console.error("Error fetching data:", error);
			});
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

				this.rawPriceData = response.data;
				this.priceObject = this.formatData(this.rawPriceData);
				this.drawChart();
			})
			.catch((error) => {
				console.error("Error:", error.message);
			});
	},

	getChartOption() {
		const movingAverageAndStdDevBands = this.computeMovingAverageAndStdDevBands(
			this.rawPriceData,
			+this.activeMovingAverage,
			2
		);

		return {
			series: [
				{
					name: "Price USD",
					type: "line",
					data: this.priceObject,
				},
				{
					name: `${this.activeMovingAverage}D MA`,
					type: "line",
					data: movingAverageAndStdDevBands.movingAverages,
				},
				{
					name: `${this.activeMovingAverage}D STDEV`,
					type: "rangeArea",
					data: movingAverageAndStdDevBands.stdDevBands,
				},
			],
			chart: {
				id: "chart",
				height: 400,
				type: "rangeArea",
				stacked: false,
				toolbar: {
					show: false,
					autoSelected: "pan",
				},
			},
			dataLabels: {
				enabled: false,
			},
			stroke: {
				width: [2, 1],
				curve: "smooth",
			},
			// tooltip: {
			// 	shared: true,
			// 	custom: [
			// 		function ({ seriesIndex, dataPointIndex, w }) {
			// 			return w.globals.series[seriesIndex][dataPointIndex];
			// 		},
			// 		function ({ seriesIndex, dataPointIndex, w }) {
			// 			return w.globals.series[seriesIndex][dataPointIndex];
			// 		},
			// 		function ({ seriesIndex, dataPointIndex, w }) {
			// 			var o = w.globals.seriesCandleO[seriesIndex][dataPointIndex];
			// 			var h = w.globals.seriesCandleH[seriesIndex][dataPointIndex];
			// 			var l = w.globals.seriesCandleL[seriesIndex][dataPointIndex];
			// 			var c = w.globals.seriesCandleC[seriesIndex][dataPointIndex];
			// 			return (
			// 				'<div class="apexcharts-tooltip-candlestick">' +
			// 				'<div>Open: <span class="value">' +
			// 				o +
			// 				"</span></div>" +
			// 				'<div>High: <span class="value">' +
			// 				h +
			// 				"</span></div>" +
			// 				'<div>Low: <span class="value">' +
			// 				l +
			// 				"</span></div>" +
			// 				'<div>Close: <span class="value">' +
			// 				c +
			// 				"</span></div>" +
			// 				"</div>"
			// 			);
			// 		},
			// 	],
			// },
			legend: {
				position: "top",
				horizontalAlign: "left",
			},
			xaxis: {
				type: "datetime",
			},
			yaxis: {
				opposite: true,
				labels: {
					formatter: function (value) {
						return value.toLocaleString("en-US", {
							style: "currency",
							currency: "USD", // Change 'USD' to your desired currency code
						});
					},
				},
			},
		};
	},

	drawChart() {
		this.chart = new ApexCharts(this.$refs.chart, this.getChartOption());
		this.chart.render();

		// Line
		var optionsLine = {
			series: [
				{
					data: this.priceObject,
				},
			],
			chart: {
				id: "chartLine",
				height: 130,
				type: "area",
				brush: {
					target: "chart",
					enabled: true,
				},
				selection: {
					enabled: true,
				},
			},
			colors: ["#008FFB"],
			fill: {
				type: "gradient",
				gradient: {
					opacityFrom: 0.91,
					opacityTo: 0.1,
				},
			},
			xaxis: {
				type: "datetime",
				tooltip: {
					enabled: false,
				},
			},
			yaxis: {
				opposite: true,
				tickAmount: 2,
				labels: {
					formatter: function (value) {
						return value.toLocaleString("en-US", {
							style: "currency",
							currency: "USD", // Change 'USD' to your desired currency code
						});
					},
				},
			},
		};
		this.chartLine = new ApexCharts(this.$refs.chartLine, optionsLine);
		this.chartLine.render();
	},

	formatData(data) {
		const formattedData = new Array(data.length);

		for (let i = 0; i < data.length; i++) {
			const row = data[i];
			const timestamp = row[0];
			// const values = [row[1], row[2], row[3], row[4]];

			formattedData[i] = {
				x: new Date(timestamp),
				y: row[4],
			};
		}

		return formattedData;
	},

	computeMovingAverageAndStdDevBands(data, windowSize, numDeviations) {
		const movingAverages = [];
		const stdDevBands = [];

		for (let i = windowSize - 1; i < data.length; i++) {
			const timestamp = data[i][0];
			const closingPrices = data
				.slice(i - windowSize + 1, i + 1)
				.map((row) => row[4]);
			const average =
				closingPrices.reduce((acc, curr) => acc + curr, 0) / windowSize;

			// Compute standard deviation
			const sumSquaredDiffs = closingPrices.reduce(
				(acc, curr) => acc + Math.pow(curr - average, 2),
				0
			);
			const stdDev = Math.sqrt(sumSquaredDiffs / windowSize);

			movingAverages.push({
				x: new Date(timestamp),
				y: average.toFixed(2), // Round to 2 decimal places
			});

			stdDevBands.push({
				x: new Date(timestamp),
				y: [
					(average + numDeviations * stdDev).toFixed(2),
					(average - numDeviations * stdDev).toFixed(2),
				],
			});
		}

		return { movingAverages, stdDevBands };
	},

	setActiveMovingAverage(newValue) {
		this.activeMovingAverage = newValue;
		this.chart.updateOptions(this.getChartOption(), false, true);
	},

	setActiveTimeFrame(newValue) {
		this.activeTimeFrame = newValue;

		switch (newValue) {
			case "1D":
				this.chart.zoomX(new Date().getTime(), new Date().getTime());
				this.chartLine.zoomX(new Date().getTime(), new Date().getTime());
				break;

			case "1W":
				let oneWeekAgo = new Date(new Date());
				oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
				this.chart.zoomX(oneWeekAgo.getTime(), new Date().getTime());
				this.chartLine.zoomX(oneWeekAgo.getTime(), new Date().getTime());
				break;

			case "1M":
				const oneMonthAgo = new Date(new Date());
				oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
				this.chart.zoomX(oneMonthAgo.getTime(), new Date().getTime());
				this.chartLine.zoomX(oneMonthAgo.getTime(), new Date().getTime());
				break;

			case "1Y":
				const oneYearAgo = new Date(new Date());
				oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
				this.chart.zoomX(oneYearAgo.getTime(), new Date().getTime());
				this.chartLine.zoomX(oneYearAgo.getTime(), new Date().getTime());
				break;

			case "YTD":
				const yearToDate = new Date(new Date().getFullYear(), 0, 1); // January is 0
				this.chart.zoomX(yearToDate.getTime(), new Date().getTime());
				this.chartLine.zoomX(yearToDate.getTime(), new Date().getTime());
				break;

			case "ALL":
				this.chart.zoomX(undefined, new Date().getTime());
				this.chartLine.zoomX(undefined, new Date().getTime());
				break;

			default:
				break;
		}
	},
});
