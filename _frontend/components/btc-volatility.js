import axios from "axios";
import ApexCharts from "apexcharts";

export default (config = {}) => ({

    btcVolatilityData: [],
    days: 21, //default
    bitcoinDataSetDuration: 100,
    activeTimeFrame: "21",
    chart: null,

    init() {
        this.getHistoricalBitcoinPrices(this.bitcoinDataSetDuration).then(data => {
            if (data != null) {
                let result = {};
                const btcDataObject = Object.entries(data.data.bpi).map((value, key) => {

                    result = {
                        date: value[0],
                        price: value[1]
                    };
                    return result;

                });

                // Calculate and log historical daily realized volatility for a window of 21 days default
                let historicalVolatility = this.calculateHistoricalRealizedVolatility(btcDataObject, this.days);
                console.log("Historical Daily Realized Volatility for a window of", this.days, "days:");
                historicalVolatility.forEach((volatility, index) => {

                    this.btcVolatilityData.push({
                        date: volatility.date, price: volatility.volatility.toFixed(2),
                        days: index + this.days
                    })

                });

                if (this.btcVolatilityData.length > 0) this.drawBitCoinsVolatilityGraph();

            }

        }).catch(e => {
            console.log(e);
        });


    },

    // Function to calculate daily returns
    calculateDailyReturns(prices) {
        const returns = [];
        for (let i = 1; i < prices.length; i++) {
            returns.push(Math.log(prices[i] / prices[i - 1]));
        }
        return returns;
    },

    calculateRealizedVolatility(returns) {
        const sumSquaredReturns = returns.reduce((sum, ret) => sum + ret ** 2, 0);
        const volatility = Math.sqrt((1 / (returns.length - 1)) * sumSquaredReturns) * Math.sqrt(252); // Assuming 252 trading days in a year
        return volatility * 100; // Convert to percentage
    },

    //Calculate daily realized volatility for a 21 or (n)day range
    calculateHistoricalRealizedVolatility(btcObject, windowSize) {
        let prices = btcObject.map((res) => res.price);
        const historicalVolatility = [];
        for (let i = windowSize; i <= prices.length; i++) {
            const returns = this.calculateDailyReturns(prices.slice(i - windowSize, i));
            const volatility = this.calculateRealizedVolatility(returns);

            let date = btcObject[i - windowSize]?.date !== null ? btcObject[i - windowSize]?.date : null;

            historicalVolatility.push({ volatility, date });
        }
        return historicalVolatility;
    },


    async getHistoricalBitcoinPrices(days) {
        const endDate = new Date().toISOString().split('T')[0];
        const startDate = new Date(new Date().getTime() - days * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

        return axios.get(`https://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}`)
    },

    drawBitCoinsVolatilityGraph() {

        let data = [];
        this.btcVolatilityData.map((res, i) => {
            data.push({
                x: res.date,
                y: Number(res.price),
            })
        })

        var options = {
            chart: {
                type: 'line'
            },
            series: [{
                data: data
            }],
        }

        this.chart = new ApexCharts(this.$refs.btcGraph, options);
        this.chart.render();
    },

    setActiveTimeFrame(timeValue) {
        switch (timeValue) {
            case '21D':
                this.btcVolatilityData = []
                this.chart.destroy();
                this.days = 21;
                this.init();
                break;

            case '45D':
                this.btcVolatilityData = []
                this.chart.destroy();
                this.days = 45;
                this.init();
                break;

            default:
                break;
        }
    }
});
