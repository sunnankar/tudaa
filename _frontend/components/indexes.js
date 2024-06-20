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
    volume_1q: null,
    volume_1m: null,
    volume_1w: null,
    volume_72h: null,
    volume_24h: null,
    volume_2h: null,
    moving_average_200: null,
    spotPrice: null,
    mwcusdtSpotPrice:null,
    bitcoinPrice: null,
    startTime:null,
    endTime:null,
    interval:null,
    VwapstartTime:null,
    VwapEndTime:null,
    VwapInterval:null,

    init() {
        this.fetchDifficulty();
        this.setupVwapWebSocket();
        this.fetchInterval();
        this.fetchVwapInterval();
        this.setupVolumeWebSocket();
        this.fetchMovingAverage();
        this.fetchOneQuarterDifficulty();
        // SET UP WEBSOCKET FOR REAL TIME BITCOIN PRICE
		const pricesWs = new WebSocket("wss://mwc2.pacificpool.ws/api/ws-price-indexes/spot_price");
        pricesWs.onmessage = (msg) =>
			(this.spotPrice = JSON.parse(msg.data));

        const mwcusdt = new WebSocket("wss://mwc2.pacificpool.ws/api/ws-price-indexes/mwcusdt_spotprice");
        mwcusdt.onmessage = (msg) =>
			(this.mwcusdtSpotPrice = JSON.parse(msg.data));
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
                this.currentDifficulty = this.formatString(data["current_difficulty"]);
                this.two_hour_cumulative_difficulty = this.formatString(data["2 hours"]);
                this.twenty_four_hour_cumulative_difficulty = this.formatString(data["24 hours"]);
                this.seventy_two_hour_cumulative_difficulty = this.formatString(data["72 hours"]);
                this.one_week_cumulative_difficulty = this.formatString(data["one week"]);
                this.one_month_cumulative_difficulty = this.formatString(data["one month"]);
                this.one_quarter_cumulative_difficulty = this.formatString(data["one quarter"]);
            })
            .catch((error) => {
                console.error("Error:", error.message);
            });
    },

    fetchMovingAverage() {
        // Send GET request using Axios
        axios.get("https://mwc2.pacificpool.ws/api/price-indexes/calculate_200_day_moving_average")
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

                this.VwapstartTime = data["Start Time"];
                this.VwapEndTime = data["End Time"];
                this.VwapInterval = data["Interval"];
            })
            .catch((error) => {
                console.error("Error:", error.message);
            });
    },

    fetchOneQuarterDifficulty() {
        // Send GET request using Axios
        axios.get("https://mwc2.pacificpool.ws/api/price-indexes/block_data_last_quarter")
            .then((response) => {
                if (response.status !== 200) {
                    throw new Error("Failed to fetch data");
                }
                const data = response.data;
                console.log("One Quarter Difficulty Data:", data);

                // this.VwapstartTime = data["Start Time"];
                // this.VwapEndTime = data["End Time"];
                // this.VwapInterval = data["Interval"];
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
            console.log("MWC-USDT Spot Price Data:", this.mwcusdtSpotPrice);
            this.vwap_2h = this.formatToEightDecimalPlaces(data.vwap_2h, 8);
            this.vwap_24h = this.formatToEightDecimalPlaces(data.vwap_24h, 8);
            this.vwap_72h = this.formatToEightDecimalPlaces(data.vwap_72h, 8);
            this.vwap_1w = this.formatToEightDecimalPlaces(data.vwap_1w, 8);
            this.vwap_1m = this.formatToEightDecimalPlaces(data.vwap_1m, 8);
            this.vwap_1q = this.formatToEightDecimalPlaces(data.vwap_1q, 8);
        };
    },

    setupVolumeWebSocket() {
        const vwapWs = new WebSocket("wss://mwc2.pacificpool.ws/api/ws-price-indexes/vwap_volume");
        vwapWs.onmessage = (msg) => {
            const data = JSON.parse(msg.data);
            console.log("Volume Data:", data);
            this.volume_2h = this.formatToEightDecimalPlaces(data.vwap_2h, 8);
            this.volume_24h = this.formatToEightDecimalPlaces(data.vwap_24h, 8);
            this.volume_72h = this.formatToEightDecimalPlaces(data.vwap_72h, 8);
            this.volume_1w = this.formatToEightDecimalPlaces(data.vwap_1w, 8);
            this.volume_1m = this.formatToEightDecimalPlaces(data.vwap_1m, 8);
            this.volume_1q = this.formatToEightDecimalPlaces(data.vwap_1q, 8);
        };
    },

    formatString(input) {
        // Convert input to a string and trim whitespace
        let trimmedInput = String(input).trim();
    
        // Check if the trimmed input can be converted to a number
        if (!isNaN(trimmedInput) && trimmedInput !== '') {
            // Convert the trimmed input to a number
            let number = parseFloat(trimmedInput);
            // Format the number based on the locale
            return new Intl.NumberFormat().format(number);
        } else {
            // Return the input as is if it's not a number
            return trimmedInput;
        }
    },

    formatToEightDecimalPlaces(input, precision) {
        // If null retrun null
        if (input === null) return null;

        // Convert input to a string and trim whitespace
        let trimmedInput = String(input).trim();
    
        // Check if the trimmed input can be converted to a number
        if (!isNaN(trimmedInput) && trimmedInput !== '') {
            // Convert the trimmed input to a number
            let number = parseFloat(trimmedInput);
            // Format the number to nth (precision) decimal places
            return number.toFixed(precision);
        } else {
            // Return the input as is if it's not a number
            return trimmedInput;
        }
    }
});
