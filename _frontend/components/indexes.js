export default (config = {}) => ({
    currentDifficulty: null,
    grincurrentDifficulty: null,
    two_hour_cumulative_difficulty: null,
    twenty_four_hour_cumulative_difficulty: null,
    seventy_two_hour_cumulative_difficulty: null,
    one_week_cumulative_difficulty: null,
    one_month_cumulative_difficulty: null,
    one_quarter_cumulative_difficulty: null,
    two_weeks_cumulative_difficulty: null,
    two_hour_grin_cumulative_difficulty: null,
    twenty_four_hour_grin_cumulative_difficulty: null,
    seventy_two_hour_grin_cumulative_difficulty: null,
    one_week_cumulative_grin_difficulty: null,
    one_month_cumulative_grin_difficulty: null,
    one_quarter_cumulative_grin_difficulty: null,
    two_weeks_cumulative_grin_difficulty: null,
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
    MwcStartTime: null,
    MwcEndTime: null,
    UsdtStartTime: null,
    UsdtEndTime: null,
    moving_average_usdt_200: null,
    moving_average_mwc_200: null,


    init() {
        console.log('Component initialized');
        this.$nextTick(() => {
            this.fetchAllData();
        });
    },

    // async fetchAllData() {
    //     try {
    //         const [
    //             difficulty,
    //             vwap,
    //             movingAverage,
    //             mwcVolumeVWAP,
    //             usdtPriceVWAP,
    //             mwcSpotPrice,
    //             usdtSpotPrice,
    //             usdtVolumeVWAP
    //         ] = await Promise.allSettled([
    //             this.fetchDifficulty(),
    //             this.fetchMWCPriceVWAP(),
    //             this.fetchMovingAverage(),
    //             this.fetchMWCVolumeVWAP(),
    //             this.fetchUSDTPriceVWAP(),
    //             this.fetchMWCSpotPrice(),
    //             this.fetchUSDTSpotPrice(),
    //             this.fetchUSDTVolumeVWAP()
    //         ]);

    //         // Process the results here if needed
    //     } catch (error) {
    //         console.error("Error fetching data:", error.message);
    //     }
    // },

    fetchAllData() {
        const promises = [
            this.fetchMWCSpotPrice(),
            this.fetchUSDTSpotPrice(),
            this.fetchDifficulty(),
            this.fetchgrinDifficulty(),
            this.fetchCurrentDifficulty(),
            this.fetchGrinCurrentDifficulty(),
            this.fetchMovingAverage(),
            this.fetchMWCPriceVWAP(),
            this.fetchMWCVolumeVWAP(),
            this.fetchUSDTPriceVWAP(),
            this.fetchUSDTVolumeVWAP(),
            this.fetchCurrentUSDTInterval(),
            this.fetchCurrentMWCInterval(),
            this.fetchMovingAverageUSDT(),
            this.fetchMovingAverageMWC()
        ];
        
        promises.forEach(promise => {
            promise.then().catch(error => console.error(error));
        });
    
        // await Promise.allSettled(promises);
        console.log("All async functions have either completed or failed");
    },

    async fetchDifficulty() {
        try {
          const response = await axios.get("https://mwc2.pacificpool.ws/api/price-indexes/cumulative_difficulty_optimized");
          if (response.status !== 200) {
            throw new Error("Failed to fetch data");
          }
          const data = response.data;
          console.log("Difficulty Data:", data);
      
          // Helper function to format and remove trailing zeroes
          const formatAndRemoveZeros = (value) => {
            return this.formatWithCommasDifficulty(this.formatToEightDecimalPlaces(value, 8));
          };
      
          // Check if "2 hours" value is not valid and use "24 hours" value instead
          if (data["2 hours"] === null || data["2 hours"] === "No data found for the given interval") {
            this.two_hour_cumulative_difficulty = formatAndRemoveZeros(data["24 hours"]);
          } else {
            this.two_hour_cumulative_difficulty = formatAndRemoveZeros(data["2 hours"]);
          }
      
          console.log("Assigned 2 Hour Cumulative Difficulty:", this.two_hour_cumulative_difficulty);
      
          this.twenty_four_hour_cumulative_difficulty = formatAndRemoveZeros(data["24 hours"]);
          this.seventy_two_hour_cumulative_difficulty = formatAndRemoveZeros(data["72 hours"]);
          this.one_week_cumulative_difficulty = formatAndRemoveZeros(data["one week"]);
          this.two_weeks_cumulative_difficulty = formatAndRemoveZeros(data["two weeks"]);
          this.one_month_cumulative_difficulty = formatAndRemoveZeros(data["one month"]);
          this.one_quarter_cumulative_difficulty = formatAndRemoveZeros(data["one quarter"]);
        } catch (error) {
          console.error("Error:", error.message);
        }
      },

      async fetchgrinDifficulty() {
        try {
          const response = await axios.get("https://mwc2.pacificpool.ws/api/price-indexes/grin_cumulative_difficulty_optimized");
          if (response.status !== 200) {
            throw new Error("Failed to fetch data");
          }
          const data = response.data;
          console.log("Grin Difficulty Data:", data);
      
          // Helper function to format and remove trailing zeroes
          const formatAndRemoveZeros = (value) => {
            return this.formatWithCommasDifficulty(this.formatToEightDecimalPlaces(value, 8));
          };
      
          // Check if "2 hours" value is not valid and use "24 hours" value instead
          if (data["2 hours"] === null || data["2 hours"] === "No data found for the given interval") {
            this.two_hour_grin_cumulative_difficulty = formatAndRemoveZeros(data["24 hours"]);
          } else {
            this.two_hour_grin_cumulative_difficulty = formatAndRemoveZeros(data["2 hours"]);
          }
      
          console.log("Assigned 2 Hour Cumulative Difficulty:", this.two_hour_cumulative_difficulty);
      
          this.twenty_four_hour_grin_cumulative_difficulty = formatAndRemoveZeros(data["24 hours"]);
          this.seventy_two_hour_grin_cumulative_difficulty = formatAndRemoveZeros(data["72 hours"]);
          this.one_week_cumulative_grin_difficulty = formatAndRemoveZeros(data["one week"]);
          this.two_weeks_cumulative_grin_difficulty = formatAndRemoveZeros(data["two weeks"]);
          this.one_month_cumulative_grin_difficulty = formatAndRemoveZeros(data["one month"]);
          this.one_quarter_cumulative_grin_difficulty = formatAndRemoveZeros(data["one quarter"]);
        } catch (error) {
          console.error("Error:", error.message);
        }
      },
      
async fetchCurrentDifficulty() {
        try {
            const response = await axios.get("https://mwc2.pacificpool.ws/api/price-indexes/cumulative_difficulty");
            if (response.status !== 200) {
                throw new Error("Failed to fetch data");
            }
            const data = response.data;
            console.log("Difficulty Data:", data);

            const formatAndRemoveZeros = (value) => {
                return this.formatWithCommasDifficulty(this.formatToEightDecimalPlaces(value, 8));
              };
            
            this.currentDifficulty = formatAndRemoveZeros(data["current_difficulty"], 8);
        } catch (error) {
            console.error("Error:", error.message);
        }
    },

    async fetchGrinCurrentDifficulty() {
        try {
            const response = await axios.get("https://mwc2.pacificpool.ws/api/price-indexes/grin_current_difficulty");
            if (response.status !== 200) {
                throw new Error("Failed to fetch data");
            }
            const data = response.data;
            console.log("Grin Difficulty Data:", data);

            const formatAndRemoveZeros = (value) => {
                return this.formatWithCommasDifficulty(this.formatToEightDecimalPlaces(value, 8));
              };
            
            this.grincurrentDifficulty = formatAndRemoveZeros(data["current_difficulty"], 8);
        } catch (error) {
            console.error("Error:", error.message);
        }
    },

    async fetchCurrentMWCInterval() {
        try {
            const response = await axios.get("https://mwc2.pacificpool.ws/api/price-indexes/trade_data_mwc_time_interval");
            if (response.status !== 200) {
                throw new Error("Failed to fetch data");
            }
            const data = response.data;
            console.log("MWCInterval Data:", data);
            this.MwcStartTime = data.min_timestamp;
            this.MwcEndTime = data.max_timestamp;
        } catch (error) {
            console.error("Error:", error.message);
        }
    },

    async fetchCurrentUSDTInterval() {
        try {
            const response = await axios.get("https://mwc2.pacificpool.ws/api/price-indexes/trade_data_usdt_time_interval");
            if (response.status !== 200) {
                throw new Error("Failed to fetch data");
            }
            const data = response.data;
            console.log("USDTInterval Data:", data.max_timestamp);
            this.UsdtStartTime = data.min_timestamp;
            this.UsdtEndTime = data.max_timestamp;
        } catch (error) {
            console.error("Error:", error.message);
        }
    },

    async fetchMWCPriceVWAP() {
        try {
            const response = await axios.get("https://mwc2.pacificpool.ws/api/price-indexes/tudda_vwap_mwc_price_optimized");
            if (response.status !== 200) {
                throw new Error("Failed to fetch data");
            }
            const data = response.data;
            console.log("VWAP Data:", data);

            this.vwap_72h = this.formatWithCommas(this.formatToEightDecimalPlaces(data["72 hours"], 8));
            this.vwap_1w = this.formatWithCommas(this.formatToEightDecimalPlaces(data["one week"], 8));
            this.vwap_2w = this.formatWithCommas(this.formatToEightDecimalPlaces(data["two weeks"], 8));
            this.vwap_1m = this.formatWithCommas(this.formatToEightDecimalPlaces(data["one month"], 8));
            this.vwap_1q = this.formatWithCommas(this.formatToEightDecimalPlaces(data["one quarter"], 8));

            if (data["24 hours"] === null || data["24 hours"] === "No data found for the given interval") {
                this.vwap_24h = this.formatWithCommas(this.formatToEightDecimalPlaces(data["72 hours"], 8));
            } else {
                this.vwap_24h = this.formatWithCommas(this.formatToEightDecimalPlaces(data["24 hours"], 8));
            }

            // Check if "2 hours" value is not valid and use "24 hours" value instead
            if (data["2 hours"] === null || data["2 hours"] === "No data found for the given interval") {
                this.vwap_2h = this.formatWithCommas(this.formatToEightDecimalPlaces(data["24 hours"], 8));
            } else {
                this.vwap_2h = this.formatWithCommas(this.formatToEightDecimalPlaces(data["2 hours"], 8));
            }

            console.log("Assigned 2 Hour Cumulative Difficulty:", this.vwap_2h);
        } catch (error) {
            console.error("Error:", error.message);
        }
    },

    async fetchMWCVolumeVWAP() {
        try {
            const response = await axios.get("https://mwc2.pacificpool.ws/api/price-indexes/tudda_vwap_mwc_volume_optimized");
            if (response.status !== 200) {
                throw new Error("Failed to fetch data");
            }
            const data = response.data;
            console.log("Volume Data:", data);

            // Check if "2 hours" value is not valid and use "24 hours" value instead
            if (data["24 hours"] === null || data["24 hours"] === "No data found for the given interval") {
                this.volume_24h = this.formatWithCommas(this.formatToEightDecimalPlaces(data["72 hours"], 8));
            } else {
                this.volume_24h = this.formatWithCommas(this.formatToEightDecimalPlaces(data["24 hours"], 8));
            }

            // Check if "2 hours" value is not valid and use "24 hours" value instead
            if (data["2 hours"] === null || data["2 hours"] === "No data found for the given interval") {
                this.volume_2h = this.formatWithCommas(this.formatToEightDecimalPlaces(data["24 hours"], 8));
            } else {
                this.volume_2h = this.formatWithCommas(this.formatToEightDecimalPlaces(data["2 hours"], 8));
            }


            this.volume_72h = this.formatWithCommas(this.formatToEightDecimalPlaces(data["72 hours"], 8));
            this.volume_1w = this.formatWithCommas(this.formatToEightDecimalPlaces(data["one week"], 8));
            this.volume_2w = this.formatWithCommas(this.formatToEightDecimalPlaces(data["two weeks"], 8));
            this.volume_1m = this.formatWithCommas(this.formatToEightDecimalPlaces(data["one month"], 8));
            this.volume_1q = this.formatWithCommas(this.formatToEightDecimalPlaces(data["one quarter"], 8));
        } catch (error) {
            console.error("Error:", error.message);
        }
    },

    async fetchUSDTPriceVWAP() {
        try {
            const response = await axios.get("https://mwc2.pacificpool.ws/api/price-indexes/current_usdt_price_vwap");
            if (response.status !== 200) {
                throw new Error("Failed to fetch data");
            }
            const data = response.data;
            console.log("VWAPUSDT Data:", data);

            // Check if "2 hours" value is not valid and use "24 hours" value instead
            if (data["24 hours"] === null || data["24 hours"] === "No data found for the given interval") {
                this.vwap_usdt_24h = this.formatWithCommas(this.formatToEightDecimalPlaces(data["72 hours"], 8));
            } else {
                this.vwap_usdt_24h = this.formatWithCommas(this.formatToEightDecimalPlaces(data["24 hours"], 8));
            }

            if (data["2 hours"] === null || data["24 hours"] === null) {
                this.vwap_usdt_24h = this.formatWithCommas(this.formatToEightDecimalPlaces(data["72 hours"], 8));
                this.vwap_usdt_2h = this.formatWithCommas(this.formatToEightDecimalPlaces(data["24 hours"], 8));
            } else {
                this.vwap_usdt_24h = this.formatWithCommas(this.formatToEightDecimalPlaces(data["24 hours"], 8));
                this.vwap_usdt_2h = this.formatWithCommas(this.formatToEightDecimalPlaces(data["2 hours"], 8));
            }


            // Check if "2 hours" value is not valid and use "24 hours" value instead
            if (data["2 hours"] === null || data["2 hours"] === "No data found for the given interval") {
                this.vwap_usdt_2h = this.formatWithCommas(this.formatToEightDecimalPlaces(data["24 hours"], 8));
            } else {
                this.vwap_usdt_2h = this.formatWithCommas(this.formatToEightDecimalPlaces(data["2 hours"], 8));
            }

            this.vwap_usdt_72h = this.formatWithCommas(this.formatToEightDecimalPlaces(data["72 hours"], 8));
            this.vwap_usdt_1w = this.formatWithCommas(this.formatToEightDecimalPlaces(data["one week"], 8));
            this.vwap_usdt_2w = this.formatWithCommas(this.formatToEightDecimalPlaces(data["two weeks"], 8));
            this.vwap_usdt_1m = this.formatWithCommas(this.formatToEightDecimalPlaces(data["one month"], 8));
            this.vwap_usdt_1q = this.formatWithCommas(this.formatToEightDecimalPlaces(data["one quarter"], 8));
        } catch (error) {
            console.error("Error:", error.message);
        }
    },

    async fetchUSDTVolumeVWAP() {
        try {
            const response = await axios.get("https://mwc2.pacificpool.ws/api/price-indexes/current_usdt_volume_vwap");
            if (response.status !== 200) {
                throw new Error("Failed to fetch data");
            }
            const data = response.data; // Corrected here: Use response.data directly
            console.log("VWAPUSDT Data:", data);

            // Check if "2 hours" value is not valid and use "24 hours" value instead
            if (data["24 hours"] === null || data["24 hours"] === "No data found for the given interval") {
                this.volume_usdt_24h = this.formatWithCommas(this.formatToEightDecimalPlaces(data["72 hours"], 8));
            } else {
                this.volume_usdt_24h = this.formatWithCommas(this.formatToEightDecimalPlaces(data["24 hours"], 8));
            }

            // Check if "2 hours" value is not valid and use "24 hours" value instead
            if (data["2 hours"] === null || data["2 hours"] === "No data found for the given interval") {
                this.volume_usdt_2h = this.formatWithCommas(this.formatToEightDecimalPlaces(data["24 hours"], 8));
            } else {
                this.volume_usdt_2h = this.formatWithCommas(this.formatToEightDecimalPlaces(data["2 hours"], 8));
            }


            this.volume_usdt_72h = this.formatWithCommas(this.formatToEightDecimalPlaces(data["72 hours"], 8));
            this.volume_usdt_1w = this.formatWithCommas(this.formatToEightDecimalPlaces(data["one week"], 8));
            this.volume_usdt_2w = this.formatWithCommas(this.formatToEightDecimalPlaces(data["two weeks"], 8));
            this.volume_usdt_1m = this.formatWithCommas(this.formatToEightDecimalPlaces(data["one month"], 8));
            this.volume_usdt_1q = this.formatWithCommas(this.formatToEightDecimalPlaces(data["one quarter"], 8));
        } catch (error) {
            console.error("Error:", error.message);
        }
    },

    async fetchMovingAverage() {
        try {
            const response = await axios.get("https://mwc2.pacificpool.ws/api/price-indexes/calculate_200_day_moving_average");
            if (response.status !== 200) {
                throw new Error("Failed to fetch data");
            }
            const data = response.data;
            console.log("moving_average_200 Data:", data);
            this.moving_average_200 = this.formatWithCommas(this.formatString(data["200_day_moving_average"]));
        } catch (error) {
            console.error("Error:", error.message);
        }
    },
    async fetchMovingAverageUSDT() {
        try {
            const response = await axios.get("https://mwc2.pacificpool.ws/api/price-indexes/calculate_moving_average_usdt");
            if (response.status !== 200) {
                throw new Error("Failed to fetch data");
            }
            const data = response.data;
            console.log("usdt moving_average_200 Data:", data);
            this.moving_average_usdt_200 = this.formatWithCommas(this.formatString(data["moving_averages"]));
        } catch (error) {
            console.error("Error:", error.message);
        }
    },
    async fetchMovingAverageMWC() {
        try {
            const response = await axios.get("https://mwc2.pacificpool.ws/api/price-indexes/calculate_moving_average_mwc");
            if (response.status !== 200) {
                throw new Error("Failed to fetch data");
            }
            const data = response.data;
            console.log("mwc moving_average_200 Data:", data);
            this.moving_average_mwc_200 = this.formatWithCommas(this.formatString(data["moving_averages"]));
        } catch (error) {
            console.error("Error:", error.message);
        }
    },

	async fetchMWCSpotPrice() {
		try {
			const response = await axios.get("https://mwc2.pacificpool.ws/api/price-indexes/spot_price_mwc");
			if (response.status !== 200) {
				throw new Error("Failed to fetch data");
			}
			const data = response.data;
			console.log("MWC spot price Data:", data);
			this.spotPrice = data;
		} catch (error) {
			console.error("Error:", error.message);
		}
	},
	
	async fetchUSDTSpotPrice() {
		try {
			const response = await axios.get("https://mwc2.pacificpool.ws/api/price-indexes/spot_price_usdt");
			if (response.status !== 200) {
				throw new Error("Failed to fetch data");
			}
			const data = response.data;
			console.log("USDT spot price Data:", data);
			this.mwcusdtSpotPrice = data;
		} catch (error) {
			console.error("Error:", error.message);
		}
	},

    formatWithCommas(value) {
        if (isNaN(value)) {
            return value;
        }
        return parseFloat(value).toLocaleString('en-US', { minimumFractionDigits: 8, maximumFractionDigits: 8 });
    },

    formatWithCommasDifficulty(value) {
        if (isNaN(value)) {
            return value;
        }
        // Format the number with commas and up to 8 decimal places
        let formattedValue = parseFloat(value).toLocaleString('en-US', { minimumFractionDigits: 8, maximumFractionDigits: 8 });
        
        // Remove trailing zeros and the trailing decimal point if necessary
        formattedValue = formattedValue.replace(/(\.0+|(?<=\.\d*)0+)$/, '');
        
        return formattedValue;
    },
    

    removeTrailingZeros(numberStr) {
        if (typeof numberStr !== 'string') {
          numberStr = numberStr.toString();
        }
        
        if (!numberStr.includes('.')) {
          return numberStr;
        }
        
        // Remove trailing zeros
        numberStr = numberStr.replace(/0+$/, '');
        
        // Remove trailing decimal point if there are no digits following it
        if (numberStr.endsWith('.')) {
          numberStr = numberStr.slice(0, -1);
        }
        
        return numberStr;
      },
	

    formatString(input) {
        let trimmedInput = String(input).trim();
        if (!isNaN(trimmedInput) && trimmedInput == "") {
            let number = parseFloat(trimmedInput);
            return new Intl.NumberFormat().format(number);
        } else {
            return trimmedInput;
        }
    },

    formatToEightDecimalPlaces(input, precision) {
        if (input === null) return null;

        let trimmedInput = String(input).trim();

        if (!isNaN(trimmedInput) && trimmedInput == "") {
            let number = parseFloat(trimmedInput);
            return number.toFixed(precision);
        } else {
            return trimmedInput;
        }
    }
    
});
