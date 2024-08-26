export default (config = {}) => ({

    // Data variables
    spotPriceData: [],
    currentDifficultyData: [],
    vwapData: [],
    cumulativeDifficultyData: [],
    movingAverageData: [],
    MwcStartTime: null,
    MwcEndTime: null,

    jsonP: [{"prev_total_difficulty":191818155605410,"current_difficulty":98519063,"timestamp":"2024-08-23T11:40:28"},{"prev_total_difficulty":191818055846536,"current_difficulty":99758874,"timestamp":"2024-08-23T11:40:25"},{"prev_total_difficulty":191817954083193,"current_difficulty":101763343,"timestamp":"2024-08-23T11:36:50"},{"prev_total_difficulty":191817852755321,"current_difficulty":101327872,"timestamp":"2024-08-23T11:32:57"},{"prev_total_difficulty":191817748323379,"current_difficulty":104431942,"timestamp":"2024-08-23T11:32:51"},{"prev_total_difficulty":191817645856362,"current_difficulty":102467017,"timestamp":"2024-08-23T11:27:10"},{"prev_total_difficulty":191817543383627,"current_difficulty":102472735,"timestamp":"2024-08-23T11:27:05"},{"prev_total_difficulty":191817440065030,"current_difficulty":103318597,"timestamp":"2024-08-23T11:26:51"},{"prev_total_difficulty":191817336696574,"current_difficulty":103368456,"timestamp":"2024-08-23T11:24:13"},{"prev_total_difficulty":191817233843914,"current_difficulty":102852660,"timestamp":"2024-08-23T11:23:59"},{"prev_total_difficulty":191817127648109,"current_difficulty":106195805,"timestamp":"2024-08-23T11:23:54"},{"prev_total_difficulty":191817021545459,"current_difficulty":106102650,"timestamp":"2024-08-23T11:14:43"},{"prev_total_difficulty":191816915365747,"current_difficulty":106179712,"timestamp":"2024-08-23T11:14:41"},{"prev_total_difficulty":191816809006060,"current_difficulty":106359687,"timestamp":"2024-08-23T11:13:58"},{"prev_total_difficulty":191816702064995,"current_difficulty":106941065,"timestamp":"2024-08-23T11:13:26"},{"prev_total_difficulty":191816594570786,"current_difficulty":107494209,"timestamp":"2024-08-23T11:11:53"},{"prev_total_difficulty":191816487297727,"current_difficulty":107273059,"timestamp":"2024-08-23T11:10:03"},{"prev_total_difficulty":191816380626991,"current_difficulty":106670736,"timestamp":"2024-08-23T11:10:02"},{"prev_total_difficulty":191816275932555,"current_difficulty":104694436,"timestamp":"2024-08-23T11:09:35"},{"prev_total_difficulty":191816171389594,"current_difficulty":104542961,"timestamp":"2024-08-23T11:08:43"},{"prev_total_difficulty":191816066008182,"current_difficulty":105381412,"timestamp":"2024-08-23T11:08:35"},{"prev_total_difficulty":191816066008182,"current_difficulty":0,"timestamp":"2024-08-23T11:06:46"},{"prev_total_difficulty":191815960589495,"current_difficulty":105418687,"timestamp":"2024-08-23T11:08:16"},{"prev_total_difficulty":191815855248751,"current_difficulty":105340744,"timestamp":"2024-08-23T11:06:00"},{"prev_total_difficulty":191815750047635,"current_difficulty":105201116,"timestamp":"2024-08-23T11:05:24"},{"prev_total_difficulty":191815642426684,"current_difficulty":107620951,"timestamp":"2024-08-23T11:05:19"},{"prev_total_difficulty":191815536533656,"current_difficulty":105893028,"timestamp":"2024-08-23T10:59:05"},{"prev_total_difficulty":191815430753857,"current_difficulty":105779799,"timestamp":"2024-08-23T10:56:04"},{"prev_total_difficulty":191815325119143,"current_difficulty":105634714,"timestamp":"2024-08-23T10:55:59"},{"prev_total_difficulty":191815218816373,"current_difficulty":106302770,"timestamp":"2024-08-23T10:55:34"},{"prev_total_difficulty":191815112643293,"current_difficulty":106173080,"timestamp":"2024-08-23T10:53:18"},{"prev_total_difficulty":191815006542740,"current_difficulty":106100553,"timestamp":"2024-08-23T10:52:31"},{"prev_total_difficulty":191814900546494,"current_difficulty":105996246,"timestamp":"2024-08-23T10:52:09"},{"prev_total_difficulty":191814797191829,"current_difficulty":103354665,"timestamp":"2024-08-23T10:52:07"},{"prev_total_difficulty":191814693834778,"current_difficulty":103357051,"timestamp":"2024-08-23T10:51:51"},{"prev_total_difficulty":191814590610551,"current_difficulty":103224227,"timestamp":"2024-08-23T10:51:47"},{"prev_total_difficulty":191814487485695,"current_difficulty":103124856,"timestamp":"2024-08-23T10:51:36"},{"prev_total_difficulty":191814383831741,"current_difficulty":103653954,"timestamp":"2024-08-23T10:50:21"},{"prev_total_difficulty":191814280312808,"current_difficulty":103518933,"timestamp":"2024-08-23T10:49:01"},{"prev_total_difficulty":191814177574719,"current_difficulty":102738089,"timestamp":"2024-08-23T10:48:36"},{"prev_total_difficulty":191814074910366,"current_difficulty":102664353,"timestamp":"2024-08-23T10:48:28"},{"prev_total_difficulty":191813972435846,"current_difficulty":102474520,"timestamp":"2024-08-23T10:48:24"},{"prev_total_difficulty":191813870081222,"current_difficulty":102354624,"timestamp":"2024-08-23T10:47:24"},{"prev_total_difficulty":191813767293574,"current_difficulty":102787648,"timestamp":"2024-08-23T10:46:48"},{"prev_total_difficulty":191813662807860,"current_difficulty":104485714,"timestamp":"2024-08-23T10:45:53"},{"prev_total_difficulty":191813559497708,"current_difficulty":103310152,"timestamp":"2024-08-23T10:42:51"},{"prev_total_difficulty":191813457685697,"current_difficulty":101812011,"timestamp":"2024-08-23T10:42:37"},{"prev_total_difficulty":191813356915512,"current_difficulty":100770185,"timestamp":"2024-08-23T10:42:35"},{"prev_total_difficulty":191813255744782,"current_difficulty":101170730,"timestamp":"2024-08-23T10:42:16"},{"prev_total_difficulty":191813155010247,"current_difficulty":100734535,"timestamp":"2024-08-23T10:41:25"},{"prev_total_difficulty":191813052389768,"current_difficulty":102620479,"timestamp":"2024-08-23T10:41:24"},{"prev_total_difficulty":191812950523726,"current_difficulty":101866042,"timestamp":"2024-08-23T10:37:57"},{"prev_total_difficulty":191812848783953,"current_difficulty":101739773,"timestamp":"2024-08-23T10:37:42"},{"prev_total_difficulty":191812747058349,"current_difficulty":101725604,"timestamp":"2024-08-23T10:37:33"},{"prev_total_difficulty":191812644580203,"current_difficulty":102478146,"timestamp":"2024-08-23T10:37:28"},{"prev_total_difficulty":191812542224712,"current_difficulty":102355491,"timestamp":"2024-08-23T10:34:29"},{"prev_total_difficulty":191812439658371,"current_difficulty":102566341,"timestamp":"2024-08-23T10:34:20"},{"prev_total_difficulty":191812337610148,"current_difficulty":102048223,"timestamp":"2024-08-23T10:33:52"},{"prev_total_difficulty":191812237127910,"current_difficulty":100482238,"timestamp":"2024-08-23T10:33:34"},{"prev_total_difficulty":191812136582404,"current_difficulty":100545506,"timestamp":"2024-08-23T10:33:15"},{"prev_total_difficulty":191812035155503,"current_difficulty":101426901,"timestamp":"2024-08-23T10:32:51"},{"prev_total_difficulty":191811934126561,"current_difficulty":101028942,"timestamp":"2024-08-23T10:31:07"},{"prev_total_difficulty":191811832555407,"current_difficulty":101571154,"timestamp":"2024-08-23T10:30:56"},{"prev_total_difficulty":191811732950792,"current_difficulty":99604615,"timestamp":"2024-08-23T10:29:40"},{"prev_total_difficulty":191811632912768,"current_difficulty":100038024,"timestamp":"2024-08-23T10:29:31"},{"prev_total_difficulty":191811532882279,"current_difficulty":100030489,"timestamp":"2024-08-23T10:28:41"},{"prev_total_difficulty":191811431231731,"current_difficulty":101650548,"timestamp":"2024-08-23T10:28:35"},{"prev_total_difficulty":191811330120068,"current_difficulty":101111663,"timestamp":"2024-08-23T10:25:08"},{"prev_total_difficulty":191811228895362,"current_difficulty":101224706,"timestamp":"2024-08-23T10:24:55"},{"prev_total_difficulty":191811127697939,"current_difficulty":101197423,"timestamp":"2024-08-23T10:23:52"},{"prev_total_difficulty":191811026685840,"current_difficulty":101012099,"timestamp":"2024-08-23T10:23:47"},{"prev_total_difficulty":191810924043144,"current_difficulty":102642696,"timestamp":"2024-08-23T10:22:51"},{"prev_total_difficulty":191810821613905,"current_difficulty":102429239,"timestamp":"2024-08-23T10:19:28"},{"prev_total_difficulty":191810719779503,"current_difficulty":101834402,"timestamp":"2024-08-23T10:19:23"},{"prev_total_difficulty":191810618872265,"current_difficulty":100907238,"timestamp":"2024-08-23T10:18:53"},{"prev_total_difficulty":191810519089072,"current_difficulty":99783193,"timestamp":"2024-08-23T10:18:48"},{"prev_total_difficulty":191810419028446,"current_difficulty":100060626,"timestamp":"2024-08-23T10:18:26"},{"prev_total_difficulty":191810319096784,"current_difficulty":99931662,"timestamp":"2024-08-23T10:17:40"},{"prev_total_difficulty":191810218614094,"current_difficulty":100482690,"timestamp":"2024-08-23T10:17:30"},{"prev_total_difficulty":191810116409899,"current_difficulty":102204195,"timestamp":"2024-08-23T10:16:16"},{"prev_total_difficulty":191810015551559,"current_difficulty":100858340,"timestamp":"2024-08-23T10:12:13"},{"prev_total_difficulty":191809915246418,"current_difficulty":100305141,"timestamp":"2024-08-23T10:11:56"},{"prev_total_difficulty":191809814680037,"current_difficulty":100566381,"timestamp":"2024-08-23T10:11:40"},{"prev_total_difficulty":191809713883346,"current_difficulty":100796691,"timestamp":"2024-08-23T10:11:04"},{"prev_total_difficulty":191809613315845,"current_difficulty":100567501,"timestamp":"2024-08-23T10:10:28"},{"prev_total_difficulty":191809511619796,"current_difficulty":101696049,"timestamp":"2024-08-23T10:10:17"},{"prev_total_difficulty":191809407092189,"current_difficulty":104527607,"timestamp":"2024-08-23T10:08:09"},{"prev_total_difficulty":191809302577484,"current_difficulty":104514705,"timestamp":"2024-08-23T10:02:25"},{"prev_total_difficulty":191809198305697,"current_difficulty":104271787,"timestamp":"2024-08-23T10:02:09"},{"prev_total_difficulty":191809094005104,"current_difficulty":104300593,"timestamp":"2024-08-23T10:01:34"},{"prev_total_difficulty":191808989995654,"current_difficulty":104009450,"timestamp":"2024-08-23T10:00:26"},{"prev_total_difficulty":191808886309124,"current_difficulty":103686530,"timestamp":"2024-08-23T09:59:31"},{"prev_total_difficulty":191808782796453,"current_difficulty":103512671,"timestamp":"2024-08-23T09:59:06"},{"prev_total_difficulty":191808676873072,"current_difficulty":105923381,"timestamp":"2024-08-23T09:58:57"},{"prev_total_difficulty":191808571652073,"current_difficulty":105220999,"timestamp":"2024-08-23T09:54:12"},{"prev_total_difficulty":191808467693486,"current_difficulty":103958587,"timestamp":"2024-08-23T09:54:05"},{"prev_total_difficulty":191808363587979,"current_difficulty":104105507,"timestamp":"2024-08-23T09:53:37"},{"prev_total_difficulty":191808259610573,"current_difficulty":103977406,"timestamp":"2024-08-23T09:52:10"},{"prev_total_difficulty":191808155442593,"current_difficulty":104167980,"timestamp":"2024-08-23T09:51:46"},{"prev_total_difficulty":191808050959989,"current_difficulty":104482604,"timestamp":"2024-08-23T09:51:06"}],
    // Initialization method
    init() {
        this.fetchData();
    },

    async fetchData() {
        try {
            // Fetch spot price data
            const spotPriceResponse = await axios.get("https://mwc2.pacificpool.ws/api/price-indexes/historical-spot-price?start_date=2024-06-07&end_date=2024-08-26");
            this.spotPriceData = this.formatDataForChart(spotPriceResponse.data, "Spot Price");

            // console.log(spotPriceData)

            // Fetch current difficulty data
            const response = await axios.get("https://mwc2.pacificpool.ws/api/price-indexes-background/fetch-difficulty-data/?start_time=2024-06-07&end_time=2024-08-26");
            this.currentDifficultyData = this.formatDataForChart(response.data);


            // this.currentDifficultyData = this.formatDataForChart(this.jsonP, "Current Difficulty");

            // Fetch VWAP and Cumulative Difficulty data
            const vwapResponse = await axios.get("https://mwc2.pacificpool.ws/api/price-indexes/tudda_vwap_mwc_price_optimized");
            const cumulativeDifficultyResponse = await axios.get("https://mwc2.pacificpool.ws/api/price-indexes/cumulative_difficulty_optimized");


            // this.vwapData = this.formatDataForChart(vwapResponse.data, "VWAP");
            // this.cumulativeDifficultyData = this.formatDataForChart(cumulativeDifficultyResponse.data, "Cumulative Difficulty");

            // Fetch 200-day Moving Average data
            const movingAverageResponse = await axios.get("https://mwc2.pacificpool.ws/api/price-indexes/calculate_200_day_moving_average");
            // this.movingAverageData = this.formatDataForChart(movingAverageResponse.data, "200-day Moving Average");

            // Draw charts
            this.drawSpotPriceChart();
            this.drawVwapCumulativeChart();
            this.drawYearlyVwapCumulativeChart();
            this.drawMovingAverageChart();
            this.drawDifficultyChart();

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    },

    // formatDataForChart(data, type) {
    //     if (type === "Spot Price") {
    //         // Spot price data is already in the correct format
    //         return Object.entries(data).map(([date, price]) => ({
    //             x: new Date(date),
    //             y: price
    //         }));
    //     } else if (Array.isArray(data)) {
    //         // Assume current difficulty or similar data
    //         return data.map(item => ({
    //             x: new Date(item.timestamp),
    //             y: item.current_difficulty
    //         }));
    //     } else {
    //         console.error("Data format is not recognized:", data);
    //         return [];
    //     }
    // },
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
                    format: 'dd MMM yyyy HH:mm:ss'
                },
            }
        };
    
        this.difficultyChart = new ApexCharts(this.$refs.difficultyChart, options);
        this.difficultyChart.render();
    }
    ,
    

    drawVwapCumulativeChart() {
        const options = {
            series: [{
                name: "2-hour VWAP",
                data: this.vwapData.filter(data => data.x.includes("2 hours"))
            }, {
                name: "24-hour VWAP",
                data: this.vwapData.filter(data => data.x.includes("24 hours"))
            }, {
                name: "2-hour Cumulative Difficulty",
                data: this.cumulativeDifficultyData.filter(data => data.x.includes("2 hours"))
            }, {
                name: "24-hour Cumulative Difficulty",
                data: this.cumulativeDifficultyData.filter(data => data.x.includes("24 hours"))
            }],
            chart: {
                type: 'line',
                height: 350
            },
            xaxis: {
                type: 'datetime'
            },
            yaxis: [{
                title: {
                    text: 'VWAP'
                }
            }, {
                opposite: true,
                title: {
                    text: 'Cumulative Difficulty'
                }
            }]
        };
        const chart = new ApexCharts(this.$refs.vwapCumulativeChart, options);
        chart.render();
    },

    drawYearlyVwapCumulativeChart() {
        const options = {
            series: [{
                name: "VWAP",
                data: this.vwapData.filter(data => !data.x.includes("2 hours") && !data.x.includes("24 hours"))
            }, {
                name: "Cumulative Difficulty",
                data: this.cumulativeDifficultyData.filter(data => !data.x.includes("2 hours") && !data.x.includes("24 hours"))
            }],
            chart: {
                type: 'line',
                height: 350
            },
            xaxis: {
                type: 'datetime'
            },
            yaxis: [{
                title: {
                    text: 'VWAP'
                }
            }, {
                opposite: true,
                title: {
                    text: 'Cumulative Difficulty'
                }
            }]
        };
        const chart = new ApexCharts(this.$refs.yearlyVwapCumulativeChart, options);
        chart.render();
    },

    drawMovingAverageChart() {
        const options = {
            series: [{
                name: "200-day Moving Average",
                data: this.movingAverageData
            }],
            chart: {
                type: 'line',
                height: 350
            },
            xaxis: {
                type: 'datetime'
            },
            yaxis: {
                title: {
                    text: '200-day Moving Average'
                }
            }
        };
        const chart = new ApexCharts(this.$refs.movingAverageChart, options);
        chart.render();
    }

})
  

