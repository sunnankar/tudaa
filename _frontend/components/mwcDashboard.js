export default (config = {}) => ({

    // Data variables
    spotPriceData: [],
    spotPriceDataUsdt: [],
    spotPriceData365: [],
    spotPriceDataUsdt365: [],
    currentDifficultyData: [],
    vwapData: [],
    cumulativeDifficultyData: [],
    movingAverageData: [],
    movingAverageDataMwc:[],
    movingAverageDifficulty:[],
    MwcStartTime: null,
    MwcEndTime: new Date().toISOString(),

    // Chart instances
    spotPriceChart: null,
    difficultyChart: null,
    vwapCumulativeChart: null,
    yearlyVwapCumulativeChart: null,
    movingAverageChart: null,
    selectedTimeframe: '2h',
    difficultyselectedTimeframe: '2h',



    // Initialization method
    init() {
        this.fetchData();
        this.selectTimeframe(this.selectedTimeframe);            // Default view for VWAP
        this.selectDifficultyTimeframe(this.difficultyselectedTimeframe);  // Default view for Difficulty
    },

    // VWAP Tab Selection and Chart
    selectTimeframe(timeframe) {
        this.selectedTimeframe = timeframe;
        this.fetchVWAPChart(timeframe);
    },

    // Difficulty Tab Selection and Chart
    selectDifficultyTimeframe(timeframe) {
        this.difficultyselectedTimeframe = timeframe;
        this.fetchDifficultyChart(timeframe);
    },

    async fetchData() {
        try {
            // Fetch spot price data
            const spotPriceResponse365 = await axios.get("https://mwc2.pacificpool.ws/api/price-indexes/get-mwc-btc/",{
                params: {period:"1y" }
            });

            const ResponseData365=spotPriceResponse365.data;
            this.spotPriceData365 = this.filterDataForOneYear(ResponseData365);

            this.spotPriceData365 = this.formatDataForChart(this.spotPriceData365, "Spot Price one year");



            const spotPriceResponseUsdt365 = await axios.get("https://mwc2.pacificpool.ws/api/price-indexes/get-mwc-usd/",{
                params: {period:"1y" }
            });
            const ResponseDataUsdt365=spotPriceResponseUsdt365.data;
            this.spotPriceDataUsdt365 = this.filterDataForOneYear(ResponseDataUsdt365);

            this.spotPriceDataUsdt365 = this.formatDataForChart(this.spotPriceDataUsdt365, "Current Difficulty");

            try {
                const response = await axios.get("https://mwc2.pacificpool.ws/api/price-indexes/fetch-difficulty-data/");
                const rawDataResponse = response.data;
                console.log("Full response:", response);
                console.log("Response data:", rawDataResponse);
                // Check if the rawDataResponse and rawDataResponse.data exist
                if (rawDataResponse && rawDataResponse) {
                    this.currentDifficultyData = this.filterDataForOneYear(rawDataResponse);
                    this.currentDifficultyData = this.formatDataForChart(this.currentDifficultyData, "Current Difficulty");
                } else {
                    console.error("Error: Data not available or response structure is invalid.");
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
            





            // Fetch 200-day Moving Average data
            const movingAverageResponse = await axios.get("https://mwc2.pacificpool.ws/api/price-indexes/get-mwc-usd-ma/");
            // this.movingAverageData = this.formatDataForChart(movingAverageResponse.data, "Current Difficulty");
            const rawData = movingAverageResponse.data;
             // Log raw data to verify
            console.log("Raw Data:", rawData);
            // Filter data to only include entries from the past year
            this.movingAverageData = this.filterDataForOneYear(rawData);
            // Format the data for the chart
           this.movingAverageData = this.formatDataForChart(this.movingAverageData, "Moving Average");


            // Fetch 200-day Moving Average data
            const movingAverageResponseMwc = await axios.get("https://mwc2.pacificpool.ws/api/price-indexes/get-mwc-btc-ma/");
            const rawDataMWC = movingAverageResponseMwc.data;
            this.movingAverageDataMwc = this.filterDataForOneYear(rawDataMWC);
            this.movingAverageDataMwc = this.formatDataForChart(this.movingAverageDataMwc, "Moving Average");



            const movingAverageDifficulty = await axios.get("https://mwc2.pacificpool.ws/api/price-indexes/moving-averages/");
            const mAverageDifficulty = movingAverageDifficulty.data;
            this.movingAverageDifficulty = this.filterDataForOneYear(mAverageDifficulty);
            this.movingAverageDifficulty = this.formatDataForChart(this.movingAverageDifficulty, "Current Difficulty");


            // Draw charts
            this.drawMovingAverageChart();
            this.drawCurrentDifficultyChart();
            this.drawMovingAverageChartMwc();
            this.drawUSDTSpotPriceChart365();
            this.drawSpotPriceChart365();
            this.fetchMovingAverageData();
            this.drawDifficultyChart();
            this.fetchDifficultyChart(this.difficultyselectedTimeframe);
            this.fetchVWAPChart(this.selectedTimeframe);

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    },
    formatWithCommas(value) {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    formatDataForChart(data, type) {
        // Handle 200-day Moving Average formatting
        if (type === "200-day Moving Average MWC-BTC") {
            return Object.entries(data).map(([date, price]) => {
                const value = parseFloat(price);
                console.log("MWC 200-day Moving Average value:", value);
                return {
                    x: new Date(date).getTime(),  // Convert date to timestamp for ApexCharts
                    y: !isNaN(value) ? parseFloat(value.toFixed(8)) : null  // Round to 8 decimal places
                };
            });
        }
        
        // Default formatting for other types
        return Object.entries(data).map(([date, price]) => ({
            x: new Date(date).getTime(),  // Convert date to timestamp for uniformity in ApexCharts
            y: price
        }));
    },

    filterDataForThreeMonths(data) {
        if (!data || Object.keys(data).length === 0) {
            console.error("No data available to filter for the last three months.");
            return {};  // Return an empty object if no data is available
        }
    
        // Convert object to array of { x: date, y: value }
        const dataArray = Object.entries(data).map(([date, value]) => ({
            x: new Date(date),  // Convert date string to Date object for comparison
            y: parseFloat(value)  // Ensure the value is a number
        }));
    
        const threeMonthsAgo = new Date();
        threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 4);  // Subtract 3 months from the current date
    
        // Filter the data to only include entries from the last 3 months
        const filteredArray = dataArray.filter(item => item.x >= threeMonthsAgo);
    
        // Convert filtered array back to an object
        const filteredObject = filteredArray.reduce((acc, item) => {
            const dateKey = item.x.toISOString().split('T')[0];  // Convert Date object back to date string (YYYY-MM-DD)
            acc[dateKey] = item.y.toString();  // Convert the value back to string (if needed)
            return acc;
        }, {});
    
        return filteredObject;
    },
    
    

    filterDataForOneYear(data) {
        // Convert object to array of { x: date, y: value }
        const dataArray = Object.entries(data).map(([date, value]) => ({
            x: new Date(date),  // Convert date string to Date object for comparison
            y: parseFloat(value)  // Ensure the value is a number
        }));
    
        const oneYearAgo = new Date();
        oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    
        // Filter the data to only include entries from the last year
        const filteredArray = dataArray.filter(item => item.x >= oneYearAgo);
    
        // Convert filtered array back to an object
        const filteredObject = filteredArray.reduce((acc, item) => {
            const dateKey = item.x.toISOString().split('T')[0];  // Convert Date object back to date string (YYYY-MM-DD)
            acc[dateKey] = item.y.toString();  // Convert the value back to string (if needed)
            return acc;
        }, {});
    
        return filteredObject;
    }
    ,
    drawSpotPriceChart365() {
        console.log({spotPriceData365:this.spotPriceData365});
        const options = {
            chart: {
                type: 'line',
                height: 250,
                width: '100%',
                foreColor: '#9606E4'
            },
            series: [
                {
                    name: 'Spot Price one year',
                    data: this.spotPriceData365,
                    color: '#9606E4'  // Data formatted with x (timestamp) and y (difficulty)
                },
            ],
            xaxis: {
                type: 'datetime',
                tickAmount: 12,  // 12 ticks for 12 months
                tickPlacement: 'between',
                labels: {
                    format: 'MMM yy'  // Month and year format
                }
            },
            yaxis: {
                title: {
                    text: 'Spot Price one year',
                },
            },
            stroke: {
                curve: 'smooth'
            },
            tooltip: {
                x: {
                    format: 'dd MMM yyyy'
                },
            }
        };
    
        this.spotPriceChart365 = new ApexCharts(this.$refs.spotPriceChart365, options);
        this.spotPriceChart365.render();
    },

    drawUSDTSpotPriceChart365() {
        const options = {
            chart: {
                type: 'line',
                height: 250,
                width: '100%',
                foreColor: '#9606E4'
            },
            series: [
                {
                    name: 'Spot Price MWC-USDT one year',
                    data: this.spotPriceDataUsdt365,
                    color: '#9606E4'  // Data formatted with x (timestamp) and y (difficulty)
                },
            ],
            xaxis: {
                type: 'datetime',
                tickAmount: 12,  // 12 ticks for 12 months
                tickPlacement: 'between',
                labels: {
                    format: 'MMM yy'  // Month and year format
                }
            },
            yaxis: {
                title: {
                    text: 'Spot Price MWC-USDT one year',
                },
                labels: {
                    formatter: function (value) {
                        return parseInt(value); // Remove decimals by converting to an integer
                    }
                }
            },
            stroke: {
                curve: 'smooth'
            },
            tooltip: {
                x: {
                    format: 'dd MMM yyyy'
                },
            }
        };
    
        this.spotPriceChartUSDT365 = new ApexCharts(this.$refs.spotPriceChartUSDT365, options);
        this.spotPriceChartUSDT365.render();
    },

    drawCurrentDifficultyChart() {
        const options = {
            chart: {
                type: 'line',
                height: 250,
                width: '100%',
                foreColor: '#9606E4'
            },
            series: [
                {
                    name: 'Current Difficulty',
                    data: this.currentDifficultyData,  // Ensure this is properly formatted with x (timestamp) and y (value)
                    color: '#9606E4'
                },
            ],
            xaxis: {
                type: 'datetime',
                tickAmount: 12,  // 12 ticks for 12 months
                tickPlacement: 'between',
                labels: {
                    format: 'MMM yy'  // Month and year format
                }
            },
            yaxis: {
                title: {
                    text: 'Difficulty',
                },
                labels: {
                    formatter: function (value) {
                        return value.toLocaleString(); // Format large numbers with commas
                    }
                }
            },
            stroke: {
                curve: 'smooth'
            },
            tooltip: {
                x: {
                    format: 'dd MMM yyyy'
                },
            }
        };
        
        this.CurrentdifficultyChart = new ApexCharts(this.$refs.CurrentdifficultyChart, options);
        this.CurrentdifficultyChart.render();
    }
    
    ,
    drawMovingAverageChart() {
        console.log({Movingavaerage:this.movingAverageData});
        const length = Object.keys(this.movingAverageData).length;
        console.log("leght of two datd",length); // Output: 3
        const options = {
            chart: {
                type: 'line',
                        height: 250,
                        width: '100%',
                        foreColor: '#9606E4'
            },
            series: [
                {
                    name: "200-day Moving Average",
                            data: this.movingAverageData,
                            color: '#9606E4' // Data formatted with x (timestamp) and y (difficulty)
                },
            ],
            xaxis: {
                type: 'datetime',
                tickAmount: 12,  // 12 ticks for 12 months
                tickPlacement: 'between',
                labels: {
                    format: 'MMM yy'  // Month and year format
                }
            },
            yaxis: {
                title: {
                    text: '200-day Moving Average',
                },
                labels: {
                    formatter: function (value) {
                        return parseInt(value); // Remove decimals by converting to an integer
                    }
                }
            },
            stroke: {
                curve: 'smooth'
            },
            tooltip: {
                x: {
                    format: 'dd MMM yyyy'
                },
            }
        };
    
        this.movingAverageChart = new ApexCharts(this.$refs.movingAverageChart, options);
        this.movingAverageChart.render();
    }
    ,
    drawMovingAverageChartMwc() {
        console.log({MovingavaerageMWC:this.movingAverageDataMwc});
        const options = {
            chart: {
                type: 'line',
                height: 250,
                width: '100%',
                foreColor: '#9606E4'
            },
            series: [
                {
                    name: "200-day Moving Average MWC-BTC",
                    data: this.movingAverageDataMwc,
                    color: '#9606E4'// Data formatted with x (timestamp) and y (difficulty)
                },
            ],
            xaxis: {
                type: 'datetime',
                tickAmount: 12,  // 12 ticks for 12 months
                tickPlacement: 'between',
                labels: {
                    format: 'MMM yy'  // Month and year format
                }
            },
            yaxis: {
                title: {
                    text: '200-day Moving Average MWC-BTC',
                },
            },
            stroke: {
                curve: 'smooth'
            },
            tooltip: {
                x: {
                    format: 'dd MMM yyyy'
                },
            }
        };
    
        this.movingAverageChartMwc = new ApexCharts(this.$refs.movingAverageChartMwc, options);
        this.movingAverageChartMwc.render();
    }
    ,
    fetchMovingAverageData() {
        const options = {
            chart: {
                type: 'line',
                height: 250,
                width: '100%',
                foreColor: '#9606E4'
            },
            series: [
                {
                    name: "200-day Moving Average Difficulty",
                    data: this.movingAverageDifficulty,
                    color: '#9606E4'// Data formatted with x (timestamp) and y (difficulty)
                },
            ],
            xaxis: {
                type: 'datetime',
                tickAmount: 12,  // 12 ticks for 12 months
                tickPlacement: 'between',
                labels: {
                    format: 'MMM yy'  // Month and year format
                }
            },
            yaxis: {
                title: {
                    text: '200-day Moving Average Difficulty',
                },
                labels: {
                    formatter: function (value) {
                        return value.toLocaleString(); // Format large numbers with commas
                    }
                }
            },
            stroke: {
                curve: 'smooth'
            },
            tooltip: {
                x: {
                    format: 'dd MMM yyyy'
                },
            }
        };
    
        this.movingAverageDifficulty = new ApexCharts(this.$refs.movingAverageDifficulty, options);
        this.movingAverageDifficulty.render();
    },
    
    async fetchVWAPChart(timeframe) {
        try {
            const vwapData = await axios.get("https://mwc2.pacificpool.ws/api/price-indexes/test_vwap_mwc_interval/", {
                params: { interval: timeframe }
            });
            this.vwapData = this.formatDataForChart(vwapData.data, "VWAP MWC-BTC");
            this.drawVWAPChart();
        } catch (error) {
            console.error("Error fetching VWAP data:", error);
        }
    },

    // Fetch Difficulty data and draw the Difficulty chart
    async fetchDifficultyChart(timeframe) {
        try {
            const cumulativeDifficulty = await axios.get("https://mwc2.pacificpool.ws/api/price-indexes/cumulative_difficulty_data_interval/", {
                params: { interval: timeframe }
            });
            this.cumulativeDifficultyData = this.formatDataForChart(cumulativeDifficulty.data, "Current Difficulty");
            this.drawDifficultyChart();
        } catch (error) {
            console.error("Error fetching Difficulty data:", error);
        }
    },

    // Draw the VWAP chart
    drawVWAPChart() {
        const options = {
            chart: {
                type: 'line',
                height: 350,
                foreColor: '#9606E4',
            },
            series: [{
                name: "VWAP MWC-BTC",
                data: this.vwapData,
                color: '#9606E4'
            }],
            xaxis: { type: 'datetime' },
            yaxis: { title: { text: 'VWAP MWC-BTC' } },
            stroke: { curve: 'smooth' },
            tooltip: { x: { format: 'dd MMM yyyy' } }
        };

        if (this.vwapChart) {
            this.vwapChart.updateOptions(options);
        } else {
            this.vwapChart = new ApexCharts(this.$refs.vwapChart, options);
            this.vwapChart.render();
        }
    },

    // Draw the Difficulty chart
    drawDifficultyChart() {
        const options = {
            chart: {
                type: 'line',
                height: 350,
                foreColor: '#9606E4',
            },
            series: [{
                name: "Current Difficulty",
                data: this.cumulativeDifficultyData,
                color: '#E44B06'
            }],
            xaxis: { type: 'datetime' },
            yaxis: {
                title: { text: 'Current Difficulty' },
                labels: {
                    formatter: function (value) {
                        return value.toLocaleString(); // Format large numbers with commas
                    }
                }
            },
            stroke: { curve: 'smooth' },
            tooltip: { x: { format: 'dd MMM yyyy' } }
        };

        if (this.difficultyChart) {
            this.difficultyChart.updateOptions(options);
        } else {
            this.difficultyChart = new ApexCharts(this.$refs.difficultyChart, options);
            this.difficultyChart.render();
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
})