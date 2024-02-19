// import * as ccxt from "ccxt";
export default (config = {}) => ({
  currentDifficulty: null,
  miningReward: null,
  blockHeight: null,


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
        }
      })
      .catch((error) => {
        // Handle error
        console.error("Error fetching data:", error);
      });
  },

});
