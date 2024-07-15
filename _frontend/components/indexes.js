export default (config = {}) => ({
	currentDifficulty: null,
	two_hour_cumulative_difficulty: null,
	twenty_four_hour_cumulative_difficulty: null,
	seventy_two_hour_cumulative_difficulty: null,
	one_week_cumulative_difficulty: null,
	one_month_cumulative_difficulty: null,
	one_quarter_cumulative_difficulty: null,
	two_weeks_cumulative_difficulty: null,
	blockHeight: null,
	market: null,
	vwap_1q: null,
	vwap_1m: null,
	vwap_2w: null,
	vwap_1w: null,
	vwap_72h: null,
	vwap_24h: null,
	vwap_2h: null,
	vwap_usdt_1q: null,
	vwap_usdt_1m: null,
	vwap_usdt_1w: null,
	vwap_usdt_2w: null,
	vwap_usdt_72h: null,
	vwap_usdt_24h: null,
	vwap_usdt_2h: null,
	volume_1q: null,
	volume_1m: null,
	volume_2w: null,
	volume_1w: null,
	volume_72h: null,
	volume_24h: null,
	volume_2h: null,
	volume_usdt_1q: null,
	volume_usdt_1m: null,
	volume_usdt_1w: null,
	volume_usdt_2w: null,
	volume_usdt_72h: null,
	volume_usdt_24h: null,
	volume_usdt_2h: null,
	moving_average_200: null,
	spotPrice: null,
	mwcusdtSpotPrice: null,
	bitcoinPrice: null,
	startTime: null,
	endTime: null,
	interval: null,
	VwapstartTime: null,
	VwapEndTime: null,
	VwapInterval: null,

	init() {
		console.log('Component initialized');
		this.$nextTick(() => {
			this.fetchDifficulty();
			this.fetchUSDTVolumeVWAP();
			// this.fetchInterval();
			// this.fetchVwapInterval();
			// this.fetchMWCPriceVWAP();
			// this.fetchMovingAverage();
			// this.fetchMWCVolumeVWAP();
			// this.fetchUSDTPriceVWAP();
			// this.fetchMWCSpotPrice();
			// this.fetchUSDTSpotPrice();
			// this.setupPriceWebSocket();
		});
	},


	fetchDifficulty() {
		axios
			.get("https://mwc2.pacificpool.ws/api/price-indexes/cumulative_difficulty_optimized")
			.then((response) => {
				if (response.status !== 200) {
					throw new Error("Failed to fetch data");
				}
				const data = response.data;
				console.log("Difficulty Data:", data);
				this.currentDifficulty = this.formatString(data["current_difficulty"]);
				this.two_hour_cumulative_difficulty = this.formatString(data["2 hours"]);
				this.twenty_four_hour_cumulative_difficulty = this.formatString(data["24 hours"]);
				this.seventy_two_hour_cumulative_difficulty = this.formatString(data["72 hours"]);
				this.one_week_cumulative_difficulty = this.formatString(data["one week"]);
				this.two_weeks_cumulative_difficulty = this.formatString(data["two weeks"]);
				this.one_month_cumulative_difficulty = this.formatString(data["one month"]);
				this.one_quarter_cumulative_difficulty = this.formatString(data["one quarter"]);
			})
			.catch((error) => {
				console.error("Error:", error.message);
			});
	},

    fetchMWCPriceVWAP() {
		axios
			.get("https://mwc2.pacificpool.ws/api/price-indexes/tudda_vwap_mwc_price")
			.then((response) => {
				if (response.status !== 200) {
					throw new Error("Failed to fetch data");
				}
				const data = response.data;
				console.log("VWAP Data:", data);
				if (data["2 hours"] !== "None" && data["2 hours"] !== "No data found for the given interval" && data["2 hours"] !== null) {
                    this.vwap_2h = this.formatToEightDecimalPlaces(data["2 hours"], 8);
                }
				
				this.vwap_24h = this.formatToEightDecimalPlaces(data["24 hours"], 8);
				this.vwap_72h = this.formatToEightDecimalPlaces(data["72 hours"], 8);
				this.vwap_1w = this.formatToEightDecimalPlaces(data["one week"], 8);
				this.vwap_2w = this.formatToEightDecimalPlaces(data["two weeks"], 8);
				this.vwap_1m = this.formatToEightDecimalPlaces(data["one month"], 8);
				this.vwap_1q = this.formatToEightDecimalPlaces(data["one quarter"], 8);
	
			})
			.catch((error) => {
				console.error("Error:", error.message);
			});
	},

	fetchMWCVolumeVWAP() {
		axios
			.get("https://mwc2.pacificpool.ws/api/price-indexes/tudda_vwap_mwc_volume")
			.then((response) => {
				if (response.status !== 200) {
					throw new Error("Failed to fetch data");
				}
				const data = response.data;
				console.log("Volume Data:", data);
				if (data["2 hours"] !== "None" && data["2 hours"] !== "No data found for the given interval" && data["2 hours"] !== null) {
                    this.volume_2h = this.formatToEightDecimalPlaces(data["2 hours"], 8);
				}
				this.volume_24h = this.formatToEightDecimalPlaces(data["24 hours"], 8);
				this.volume_72h = this.formatToEightDecimalPlaces(data["72 hours"], 8);
				this.volume_1w = this.formatToEightDecimalPlaces(data["one week"], 8);
				this.volume_2w = this.formatToEightDecimalPlaces(data["two weeks"], 8);
				this.volume_1m = this.formatToEightDecimalPlaces(data["one month"], 8);
				this.volume_1q = this.formatToEightDecimalPlaces(data["one quarter"], 8);
				
			})
			.catch((error) => {
				console.error("Error:", error.message);
			});
	},

	fetchUSDTPriceVWAP() {
		axios
			.get("https://mwc2.pacificpool.ws/api/price-indexes/tudda_vwap_usdt_price")
			.then((response) => {
				if (response.status !== 200) {
					throw new Error("Failed to fetch data");
				}
				const data = response.data;
				console.log("VWAPUSDT Data:", data);
				if (data["2 hours"] !== "None" && data["2 hours"] !== "No data found for the given interval" && data["2 hours"] !== null) {
                    this.vwap_usdt_2h = this.formatToEightDecimalPlaces(data["2 hours"], 8);
				}
				this.vwap_usdt_24h = this.formatToEightDecimalPlaces(data["24 hours"], 8);
				this.vwap_usdt_72h = this.formatToEightDecimalPlaces(data["72 hours"], 8);
				this.vwap_usdt_1w = this.formatToEightDecimalPlaces(data["one week"], 8);
				this.vwap_usdt_2w = this.formatToEightDecimalPlaces(data["two weeks"], 8);
				this.vwap_usdt_1m = this.formatToEightDecimalPlaces(data["one month"], 8);
				this.vwap_usdt_1q = this.formatToEightDecimalPlaces(data["one quarter"], 8);
				
			})
			.catch((error) => {
				console.error("Error:", error.message);
			});
	},

	fetchUSDTVolumeVWAP() {
		axios
			.get("https://mwc2.pacificpool.ws/api/price-indexes/tudda_vwap_usdt_volume")
			.then((response) => {
				if (response.status !== 200) {
					throw new Error("Failed to fetch data");
				}
				const data = response.data; // Corrected here: Use response.data directly
				console.log("VWAPUSDT Data:", data);
				if (data["2 hours"] !== "None" && data["2 hours"] !== "No data found for the given interval" && data["2 hours"] !== null) {
                    this.volume_usdt_2h = this.formatToEightDecimalPlaces(data["2 hours"], 8);
				}
				this.volume_usdt_24h = this.formatToEightDecimalPlaces(data["24 hours"], 8);
				this.volume_usdt_72h = this.formatToEightDecimalPlaces(data["72 hours"], 8);
				this.volume_usdt_1w = this.formatToEightDecimalPlaces(data["one week"], 8);
				this.volume_usdt_2w = this.formatToEightDecimalPlaces(data["two weeks"], 8);
				this.volume_usdt_1m = this.formatToEightDecimalPlaces(data["one month"], 8);
				this.volume_usdt_1q = this.formatToEightDecimalPlaces(data["one quarter"], 8);
				
			})
			.catch((error) => {
				console.error("Error:", error.message);
			});
	},
	

	fetchMovingAverage() {
		axios
			.get("https://mwc2.pacificpool.ws/api/price-indexes/calculate_200_day_moving_average")
			.then((response) => {
				if (response.status !== 200) {
					throw new Error("Failed to fetch data");
				}
				const data = response.data;
				console.log("moving_average_200 Data:", data);
				this.moving_average_200 = this.formatString(data["200_day_moving_average"]);
				
			})
			.catch((error) => {
				console.error("Error:", error.message);
			});
	},

	// fetchInterval() {
	// 	axios
	// 		.get("https://mwc2.pacificpool.ws/api/price-indexes/cumulative_difficulty_db_interval")
	// 		.then((response) => {
	// 			if (response.status !== 200) {
	// 				throw new Error("Failed to fetch data");
	// 			}
	// 			const data = response.data;
	// 			console.log("Difficulty Interval Data:", data);
	// 			this.startTime = data.starttime;
	// 			this.endTime = data.endtime;
	// 			this.interval = data.interval;
	// 			
	// 		})
	// 		.catch((error) => {
	// 			console.error("Error:", error.message);
	// 		});
	// },

	// fetchVwapInterval() {
	// 	axios
	// 		.get("https://mwc2.pacificpool.ws/api/price-indexes/vwap_interval")
	// 		.then((response) => {
	// 			if (response.status !== 200) {
	// 				throw new Error("Failed to fetch data");
	// 			}
	// 			const data = response.data;
	// 			console.log("VwapInterval Data:", data);

	// 			this.VwapstartTime = data["Start Time"];
	// 			this.VwapEndTime = data["End Time"];
	// 			this.VwapInterval = data["Interval"];
				
	// 		})
	// 		.catch((error) => {
	// 			console.error("Error:", error.message);
	// 		});
	// },

	fetchMWCSpotPrice() {
		axios
			.get("https://mwc2.pacificpool.ws/api/price-indexes/spot_price_mwc")
			.then((response) => {
				if (response.status !== 200) {
					throw new Error("Failed to fetch data");
				}
				const data = response.data;
				console.log("MWC spot price Data:", data);
				this.spotPrice = data;
				
			})
			.catch((error) => {
				console.error("Error:", error.message);
			});
	},

	fetchUSDTSpotPrice() {
		axios
			.get("https://mwc2.pacificpool.ws/api/price-indexes/spot_price_usdt")
			.then((response) => {
				if (response.status !== 200) {
					throw new Error("Failed to fetch data");
				}
				const data = response.data;
				console.log("USDT spot price Data:", data);
				this.mwcusdtSpotPrice = data;
				
			})
			.catch((error) => {
				console.error("Error:", error.message);
			});
	},

	setupPriceWebSocket() {
		const pricesWs = new WebSocket("wss://mwc2.pacificpool.ws/api/ws-price-indexes/spot_price_mwc");

		pricesWs.onopen = () => {
			console.log("Connected to wss://mwc2.pacificpool.ws/api/ws-price-indexes/spot_price_mwc");
		};

		pricesWs.onmessage = (msg) => {
			const data = JSON.parse(msg.data);
			const spotPrice = data.spot_price;
			console.log("spotPrice",spotPrice)
			this.spotPrice = spotPrice;
		};

		pricesWs.onclose = () => {
			console.log("Disconnected from wss://mwc2.pacificpool.ws/api/ws-price-indexes/spot_price_mwc. Reconnecting...");
			setTimeout(this.setupPriceWebSocket.bind(this), 1000); // Reconnect after 1 second
		};

		pricesWs.onerror = (error) => {
			console.error("WebSocket error:", error);
		};

		const mwcusdt = new WebSocket("wss://mwc2.pacificpool.ws/api/ws-price-indexes/spot_price_usdt");

		mwcusdt.onopen = () => {
			console.log("Connected to wss://mwc2.pacificpool.ws/api/ws-price-indexes/spot_price_usdt");
		};

		mwcusdt.onmessage = (msg) => {
			const data = JSON.parse(msg.data);
			const spotPrice = data.spot_price;
			console.log("spotPrice",spotPrice)
			this.mwcusdtSpotPrice = spotPrice;
		};

		mwcusdt.onclose = () => {
			console.log("Disconnected from wss://mwc2.pacificpool.ws/api/ws-price-indexes/usdt_spotprice. Reconnecting...");
			setTimeout(this.setupPriceWebSocket.bind(this), 1000); // Reconnect after 1 second
		};

		mwcusdt.onerror = (error) => {
			console.error("WebSocket error:", error);
		};
	},
	formatString(input) {
		let trimmedInput = String(input).trim();
		if (!isNaN(trimmedInput) && trimmedInput !== "") {
			let number = parseFloat(trimmedInput);
			return new Intl.NumberFormat().format(number);
		} else {
			return trimmedInput;
		}
	},

	formatToEightDecimalPlaces(input, precision) {
		if (input === null) return null;

		let trimmedInput = String(input).trim();

		if (!isNaN(trimmedInput) && trimmedInput !== "") {
			let number = parseFloat(trimmedInput);

			return number.toFixed(precision);
		} else {
			return trimmedInput;
		}
	},
});
