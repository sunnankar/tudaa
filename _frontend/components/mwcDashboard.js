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
    MwcStartTime: null,
    MwcEndTime: new Date().toISOString(),

    // Chart instances
    spotPriceChart: null,
    difficultyChart: null,
    vwapCumulativeChart: null,
    yearlyVwapCumulativeChart: null,
    movingAverageChart: null,


    // Initialization method
    init() {
        this.fetchData();
        this.fetchAndDrawChart('24h'); // Default view
    },

    async fetchData() {
        try {
            // Fetch spot price data
            const spotPriceResponse = await axios.get("https://mwc2.pacificpool.ws/api/price-indexes/get-spot-price-monthly");
            this.spotPriceData = this.formatDataForChart(spotPriceResponse.data, "Spot Price");

            const spotPriceResponseUsdt = await axios.get("https://mwc2.pacificpool.ws/api/price-indexes/get-spot-price-monthly_usdt");
            this.spotPriceDataUsdt = this.formatDataForChart(spotPriceResponseUsdt.data, "Spot Price MWC-USDT");



            const spotPriceResponse365 = await axios.get("https://mwc2.pacificpool.ws/api/price-indexes/get-mwc-btc/");
            this.spotPriceData365 = this.formatDataForChart(spotPriceResponse365.data, "Spot Price one year");

            const spotPriceResponseUsdt365 = await axios.get("https://mwc2.pacificpool.ws/api/price-indexes/get-mwc-usd/");
            this.spotPriceDataUsdt365 = this.formatDataForChart(spotPriceResponseUsdt365.data, "Spot Price MWC-USDT one year");

            // console.log(spotPriceData)

            // Fetch current difficulty data
            // const response = await axios.get("https://mwc2.pacificpool.ws/api/price-indexes-background/fetch-difficulty-data/");
            // this.currentDifficultyData = this.formatDataForChart(response.data);


            // this.currentDifficultyData = this.formatDataForChart(this.jsonP, "Current Difficulty");

            // Fetch VWAP and Cumulative Difficulty data
            // const vwapResponse = await axios.get("https://mwc2.pacificpool.ws/api/price-indexes/tudda_vwap_mwc_price_optimized");
            // const cumulativeDifficultyResponse = await axios.get("https://mwc2.pacificpool.ws/api/price-indexes/cumulative_difficulty_optimized");


            // this.vwapData = this.formatDataForChart(vwapResponse.data, "VWAP");
            // this.cumulativeDifficultyData = this.formatDataForChart(cumulativeDifficultyResponse.data, "Cumulative Difficulty");

            // Fetch 200-day Moving Average data
            const movingAverageResponse = await axios.get("https://mwc2.pacificpool.ws/api/price-indexes/get-mwc-usd-ma/");
            this.movingAverageData = this.formatDataForChart(movingAverageResponse.data, "200-day Moving Average");

            // Fetch 200-day Moving Average data
            const movingAverageResponseMwc = await axios.get("https://mwc2.pacificpool.ws/api/price-indexes/get-mwc-btc-ma/");
            this.movingAverageDataMwc = this.formatDataForChart(movingAverageResponseMwc.data, "200-day Moving Average MWC-BTC");

            // Draw charts
            this.drawSpotPriceChart();
            this.drawUSDTSpotPriceChart30();
            this.drawMovingAverageChart();
            this.drawDifficultyChart();
            this.drawMovingAverageChartMwc();
            this.drawUSDTSpotPriceChart365();
            this.drawSpotPriceChart365();

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    },

    formatDataForChart(data, type) {
        return Object.entries(data).map(([date, price]) => ({
            x: new Date(date),
            y: price
        }));
    }
    ,

    drawSpotPriceChart() {
        const options = {
            chart: {
                type: 'line',
                height: 350,
            },
            series: [
                {
                    name: 'Spot Price',
                    data: this.spotPriceData,  // Data formatted with x (timestamp) and y (difficulty)
                },
            ],
            xaxis: {
                type: 'datetime',
            },
            yaxis: {
                title: {
                    text: 'Spot Price',
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
    
        this.spotPriceChart = new ApexCharts(this.$refs.spotPriceChart, options);
        this.spotPriceChart.render();
    },

    drawUSDTSpotPriceChart30() {
        const options = {
            chart: {
                type: 'line',
                height: 350,
            },
            series: [
                {
                    name: 'Spot Price MWC-USDT',
                    data: this.spotPriceDataUsdt,  // Data formatted with x (timestamp) and y (difficulty)
                },
            ],
            xaxis: {
                type: 'datetime',
            },
            yaxis: {
                title: {
                    text: 'Spot Price MWC-USDT',
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
    
        this.spotPriceChartUSDT = new ApexCharts(this.$refs.spotPriceChartUSDT, options);
        this.spotPriceChartUSDT.render();
    },
    drawSpotPriceChart365() {
        const options = {
            chart: {
                type: 'line',
                height: 350,
            },
            series: [
                {
                    name: 'Spot Price one year',
                    data: this.spotPriceData365,  // Data formatted with x (timestamp) and y (difficulty)
                },
            ],
            xaxis: {
                type: 'datetime',
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
                height: 350,
            },
            series: [
                {
                    name: 'Spot Price MWC-USDT one year',
                    data: this.spotPriceDataUsdt365,  // Data formatted with x (timestamp) and y (difficulty)
                },
            ],
            xaxis: {
                type: 'datetime',
            },
            yaxis: {
                title: {
                    text: 'Spot Price MWC-USDT one year',
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
    
        this.spotPriceChartUSDT365 = new ApexCharts(this.$refs.spotPriceChartUSDT365, options);
        this.spotPriceChartUSDT365.render();
    },

    drawDifficultyChart() {
        const options = {
            chart: {
                type: 'line',
                height: 350,
            },
            series: [
                {
                    name: 'Current Difficulty',
                    data: this.currentDifficultyData,  // Data formatted with x (timestamp) and y (difficulty)
                },
            ],
            xaxis: {
                type: 'datetime',
            },
            yaxis: {
                title: {
                    text: 'Difficulty',
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
    
        this.difficultyChart = new ApexCharts(this.$refs.difficultyChart, options);
        this.difficultyChart.render();
    }
    ,
    drawMovingAverageChart() {
        const options = {
            chart: {
                type: 'line',
                height: 350,
            },
            series: [
                {
                    name: "200-day Moving Average",
                    data: this.movingAverageData // Data formatted with x (timestamp) and y (difficulty)
                },
            ],
            xaxis: {
                type: 'datetime',
            },
            yaxis: {
                title: {
                    text: '200-day Moving Average',
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
    
        this.movingAverageChart = new ApexCharts(this.$refs.movingAverageChart, options);
        this.movingAverageChart.render();
    }
    ,
    drawMovingAverageChartMwc() {
        const options = {
            chart: {
                type: 'line',
                height: 350,
            },
            series: [
                {
                    name: "200-day Moving Average MWC-BTC",
                    data: this.movingAverageDataMwc // Data formatted with x (timestamp) and y (difficulty)
                },
            ],
            xaxis: {
                type: 'datetime',
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
    
    async fetchAndDrawChart(timeframe) {
        this.calculateStartTime(timeframe);

        try {
            const response = await axios.get(`https://mwc2.pacificpool.ws/api/price-indexes/vwap/mwc`, {
                params: { start_date: this.MwcStartTime, end_date: this.MwcEndTime, interval:timeframe }
            });

            const chartData = this.formatDataForChart(response.data);
            this.drawVwapCumulativeChart(chartData, timeframe);

        } catch (error) {
            console.error("Error fetching chart data:", error);
        }
    },

    calculateStartTime(timeframe) {
        const now = new Date();
        switch (timeframe) {
            case '2h':
                this.MwcStartTime = new Date(now.getTime() - 2 * 60 * 60 * 1000).toISOString();
                break;
            case '24h':
                this.MwcStartTime = new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString();
                break;
            case '72h':
                this.MwcStartTime = new Date(now.getTime() - 72 * 60 * 60 * 1000).toISOString();
                break;
            case '1w':
                this.MwcStartTime = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();
                break;
            default:
                this.MwcStartTime = new Date(now.getTime() - 2 * 60 * 60 * 1000).toISOString();
        }
    },
    drawVwapCumulativeChart(data, timeframe) {
        const options = {
            chart: {
                type: 'line',
                height: 350,
            },
            series: [
                { name: `VWAP & Cumulative Difficulty (${timeframe})`, data: data },
            ],
            xaxis: { type: 'datetime' },
            yaxis: { title: { text: 'Value' } },
        };
        if (this.vwapCumulativeChart) {
            this.vwapCumulativeChart.updateOptions(options);
        } else {
            this.vwapCumulativeChart = new ApexCharts(this.$refs.vwapCumulativeChart, options);
            this.vwapCumulativeChart.render();
        }
    },
})
  

