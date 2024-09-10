export default (config = {}) => ({

    // Data variables
    spotPriceData: [],
    spotPriceDataUsdt: [],
    spotPriceData365: [],
    spotPriceDataUsdt365: [],
    currentDifficultyData: [],
    vwapData: [],
    // cumulativeDifficultyData: [],
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


    // Initialization method
    init() {
        this.fetchData();
        this.fetchAndDrawCombinedChart(this.selectedTimeframe); // Default view
    },

    selectTimeframe(timeframe) {
        this.selectedTimeframe = timeframe;
        this.fetchAndDrawCombinedChart(timeframe);
    },

    async fetchData() {
        try {
            // Fetch spot price data
            const spotPriceResponse = await axios.get("https://mwc2.pacificpool.ws/api/price-indexes/get-mwc-btc" ,{
                params: {period:"30d" }
            });
            this.spotPriceData = this.formatDataForChart(spotPriceResponse.data, "Spot Price");

            const spotPriceResponseUsdt = await axios.get("https://mwc2.pacificpool.ws/api/price-indexes/get-mwc-usd",{
                params: {period:"30d" }
            });
            this.spotPriceDataUsdt = this.formatDataForChart(spotPriceResponseUsdt.data, "Spot Price MWC-USDT");


            const spotPriceResponse365 = await axios.get("https://mwc2.pacificpool.ws/api/price-indexes/get-mwc-btc/",{
                params: {period:"1y" }
            });
            this.spotPriceData365 = this.formatDataForChart(spotPriceResponse365.data, "Spot Price one year");

            const spotPriceResponseUsdt365 = await axios.get("https://mwc2.pacificpool.ws/api/price-indexes/get-mwc-usd/",{
                params: {period:"1y" }
            });
            this.spotPriceDataUsdt365 = this.formatDataForChart(spotPriceResponseUsdt365.data, "Spot Price MWC-USDT one year");

            // console.log(spotPriceData)

            // Fetch current difficulty data
            // const response = await axios.get("https://mwc2.pacificpool.ws/api/price-indexes-background/fetch-difficulty-data/");
            const response = await axios.get("https://mwc2.pacificpool.ws/api/price-indexes-background/fetch-difficulty-data/");
            this.currentDifficultyData = this.formatDataForChart(response.data,"Current Difficulty");
            

            // this.currentDifficultyData = this.formatDataForChart(this.jsonP, "Current Difficulty");


            // const vwapMwcData = this.formatDataForChart("https://mwc2.pacificpool.ws/api/price-indexes/tudda_vwap_mwc_price_optimized");
            // this.vwapData = this.formatDataForChart(vwapMwcData.data, "VWAP");

            // Fetch 200-day Moving Average data
            const movingAverageResponse = await axios.get("https://mwc2.pacificpool.ws/api/price-indexes/get-mwc-usd-ma/");
            this.movingAverageData = this.formatDataForChart(movingAverageResponse.data, "200-day Moving Average");

            // Fetch 200-day Moving Average data
            const movingAverageResponseMwc = await axios.get("https://mwc2.pacificpool.ws/api/price-indexes/get-mwc-btc-ma/");
            this.movingAverageDataMwc = this.formatDataForChart(movingAverageResponseMwc.data, "200-day Moving Average MWC-BTC");

            // const movingAverageDifficulty = await axios.get("https://mwc2.pacificpool.ws/api/price-indexes-background/calculate_200_day_moving_average_graph/");
            // this.movingAverageDifficulty = this.formatDataForChart(movingAverageDifficulty.data, "200-day Moving Average MWC-BTC");

            // Draw charts
            this.drawSpotPriceChart();
            this.drawUSDTSpotPriceChart30();
            this.drawMovingAverageChart();
            this.drawDifficultyChart();
            this.drawMovingAverageChartMwc();
            this.drawUSDTSpotPriceChart365();
            this.drawSpotPriceChart365();
            // this.fetchMovingAverageData();

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    },
    formatWithCommas(value) {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    formatDataForChart(data, type) {
        if (type === "200-day Moving Average MWC-BTC") {
            console.log("mwc moving_average_200 Data:", data);
            return Object.entries(data).map(([date, price]) => {
                const value = parseFloat(price);
                console.log("mwc moving_average_200 value Data:", value);
                return {
                    x: new Date(date),
                    y: !isNaN(value) ? parseFloat(value.toFixed(8)) : null
                };
            });
        }

        if (type === "Current Difficulty") {
            console.log("Current Difficulty Data:", data);
            return Object.entries(data).map(([date, price]) => {
                let formattedPrice = parseFloat(price);  
                console.log("Current Difficulty value Data:", formattedPrice);
                const formattedPricevalue = this.formatWithCommas(formattedPrice); 
                return {
                    x: new Date(date),
                    y: formattedPricevalue
                };
            });
        }
    
        return Object.entries(data).map(([date, price]) => ({
            x: new Date(date),
            y: price
        }));
    },

    drawSpotPriceChart() {
        const options = {
            chart: {
                type: 'line',
                height: 250,
                width: '100%',
                foreColor: '#9606E4'
            },
            series: [
                {
                    name: 'Spot Price',
                    data: this.spotPriceData,
                    color: '#9606E4'  // Data formatted with x (timestamp) and y (difficulty)
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
                height: 250,
                width: '100%',
                foreColor: '#9606E4'
            },
            series: [
                {
                    name: 'Spot Price MWC-USDT',
                    data: this.spotPriceDataUsdt,
                    color: '#9606E4' // Data formatted with x (timestamp) and y (difficulty)
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
                height: 250,
                width: '100%',
                foreColor: '#9606E4'
            },
            series: [
                {
                    name: 'Current Difficulty',
                    data: this.currentDifficultyData,  // Data formatted with x (timestamp) and y (difficulty)
                    color: '#9606E4'
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
    // fetchMovingAverageData() {
    //     const options = {
    //         chart: {
    //             type: 'line',
    //             height: 250,
    //             width: '100%',
    //             foreColor: '#9606E4'
    //         },
    //         series: [
    //             {
    //                 name: "200-day Moving Average Difficulty",
    //                 data: this.movingAverageDifficulty,
    //                 color: '#9606E4'// Data formatted with x (timestamp) and y (difficulty)
    //             },
    //         ],
    //         xaxis: {
    //             type: 'datetime',
    //         },
    //         yaxis: {
    //             title: {
    //                 text: '200-day Moving Average Difficulty',
    //             },
    //         },
    //         stroke: {
    //             curve: 'smooth'
    //         },
    //         tooltip: {
    //             x: {
    //                 format: 'dd MMM yyyy'
    //             },
    //         }
    //     };
    
    //     this.movingAverageDifficulty = new ApexCharts(this.$refs.movingAverageDifficulty, options);
    //     this.movingAverageDifficulty.render();
    // }
    
    async fetchAndDrawCharts(timeframe) {
        try {
            // Fetch data for both VWAP and Cumulative Difficulty
            const [vwapResponse, cumulativeDifficultyResponse] = await Promise.all([
                axios.get(`https://mwc2.pacificpool.ws/api/price-indexes/test_vwap_mwc_interval`, { params: { interval: timeframe } }),
                axios.get(`https://mwc2.pacificpool.ws/api/price-indexes-background/cumulative_difficulty_data_interval`, { params: { interval: timeframe } })
            ]);

            // Format and draw VWAP chart
            const vwapData = this.formatDataForChart(vwapResponse.data, "MWC-BTC Vwap");
            this.drawVwapCumulativeChart(vwapData, timeframe);

            // Format and draw Cumulative Difficulty chart
            const cumulativeDifficultyData = this.formatDataForChart(cumulativeDifficultyResponse.data, "Cumulative Difficulty");
            this.drawCumulativeDifficultyChart(cumulativeDifficultyData, timeframe);

        } catch (error) {
            console.error("Error fetching chart data:", error);
        }
    },

    async fetchAndDrawCombinedChart(timeframe) {
        try {
            const [vwapResponse, cumulativeDifficultyResponse] = await Promise.all([
                axios.get(`https://mwc2.pacificpool.ws/api/price-indexes/test_vwap_mwc_interval`, { params: { interval: timeframe } }),
                axios.get(`https://mwc2.pacificpool.ws/api/price-indexes-background/cumulative_difficulty_data_interval`, { params: { interval: timeframe } })
            ]);
    
            const vwapData = this.formatDataForChart(vwapResponse.data, "MWC-BTC Vwap");
            const cumulativeDifficultyData = this.formatDataForChart(cumulativeDifficultyResponse.data, "Cumulative Difficulty");
    
            this.drawCombinedChart(vwapData, cumulativeDifficultyData, timeframe);
        } catch (error) {
            console.error("Error fetching chart data:", error);
        }
    },

    drawCombinedChart(vwapData, cumulativeDifficultyData, timeframe) {
        const options = {
            chart: {
                type: 'line',
                height: 350,
                width: '100%',
                foreColor: '#9606E4',
            },
            series: [
                {
                    name: `MWC-BTC VWAP (${timeframe})`,
                    data: vwapData,
                    color: '#9606E4',
                },
                {
                    name: `Cumulative Difficulty (${timeframe})`,
                    data: cumulativeDifficultyData,
                    color: '#8804E4',
                }
            ],
            xaxis: { type: 'datetime' },
            yaxis: { title: { text: 'Value' } },
            stroke: { curve: 'smooth' },
            tooltip: { x: { format: 'dd MMM yyyy' } },
            legend: { show: true }
        };
    
        this.combinedChart = new ApexCharts(this.$refs.combinedChart, options);
        this.combinedChart.render();
    },
    toggleChartSeries(seriesName) {
        if (this.combinedChart) {
            this.combinedChart.toggleSeries(seriesName);
        }
    }
})
  

