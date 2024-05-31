export default (config = {}) => ({
    currentDifficulty: null,
    two_hour_cumulative_difficulty: null,
    twenty_four_hour_cumulative_difficulty: null,
    seventy_two_hour_cumulative_difficulty: null,
    one_week_cumulative_difficulty: null,
    one_month_cumulative_difficulty: null,
    one_quarter_cumulative_difficulty: null,
    blockHeight: null,
    market: null,
    vwap_1q: null,
    vwap_1m: null,
    vwap_1w: null,
    vwap_72h: null,
    vwap_24h: null,
    vwap_2h: null,
    spotPrice: null,
    bitcoinPrice: null,
    startTime:null,
    endTime:null,
    interval:null,
    Vwap:null,

    init() {
        this.fetchDifficulty();
        this.setupVwapWebSocket();
        this.fetchInterval();
        this.fetchVwapInterval();
        // SET UP WEBSOCKET FOR REAL TIME BITCOIN PRICE
		const pricesWs = new WebSocket("wss://mwc2.pacificpool.ws/api/ws-price-indexes/spot_price");
        pricesWs.onmessage = (msg) =>
			(this.spotPrice = JSON.parse(msg.data));
    },

    fetchDifficulty() {
        // Send GET request using Axios
        axios.get("https://mwc2.pacificpool.ws/api/price-indexes/cumulative_difficulty")
            .then((response) => {
                if (response.status !== 200) {
                    throw new Error("Failed to fetch data");
                }
                const data = response.data;
                console.log("Difficulty Data:", data);
                this.currentDifficulty = data.current_difficulty;
                this.two_hour_cumulative_difficulty = data["2 hours"];
                this.twenty_four_hour_cumulative_difficulty = data["24 hours"];
                this.seventy_two_hour_cumulative_difficulty = data["72 hours"];
                this.one_week_cumulative_difficulty = data["one week"];
                this.one_month_cumulative_difficulty = data["one month"];
                this.one_quarter_cumulative_difficulty = data["one quarter"];
            })
            .catch((error) => {
                console.error("Error:", error.message);
            });
    },

    fetchInterval() {
        // Send GET request using Axios
        axios.get("https://mwc2.pacificpool.ws/api/price-indexes/cumulative_difficulty_db_interval")
            .then((response) => {
                if (response.status !== 200) {
                    throw new Error("Failed to fetch data");
                }
                const data = response.data;
                console.log("Difficulty Interval Data:", data);
                this.startTime = data.starttime;
                this.endTime = data.endtime;
                this.interval = data.interval;
            })
            .catch((error) => {
                console.error("Error:", error.message);
            });
    },

    fetchVwapInterval() {
        // Send GET request using Axios
        axios.get("https://mwc2.pacificpool.ws/api/price-indexes/vwap_interval")
            .then((response) => {
                if (response.status !== 200) {
                    throw new Error("Failed to fetch data");
                }
                const data = response.data;
                console.log("VwapInterval Data:", data);
                this.currentDifficulty = data.current_difficulty;
            })
            .catch((error) => {
                console.error("Error:", error.message);
            });
    },

    setupVwapWebSocket() {
        const vwapWs = new WebSocket("wss://mwc2.pacificpool.ws/api/ws-price-indexes/vwap");
        vwapWs.onmessage = (msg) => {
            const data = JSON.parse(msg.data);
            console.log("VWAP Data:", data);
            console.log("Spot Price Data:", this.spotPrice);
            this.vwap_2h = data.vwap_2h;
            this.vwap_24h = data.vwap_24h;
            this.vwap_72h = data.vwap_72h;
            this.vwap_1w = data.vwap_1w;
            this.vwap_1m = data.vwap_1m;
            this.vwap_1q = data.vwap_1q;
        };
    }

});
