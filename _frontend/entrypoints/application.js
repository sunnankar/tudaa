// To see this message, follow the instructions for your Ruby framework.
//
// When using a plain API, perhaps it's better to generate an HTML entrypoint
// and link to the scripts and stylesheets, and let Vite transform it.
console.log("Vite ⚡️ Ruby");

// Example: Import a stylesheet in <sourceCodeDir>/index.css
// import '~/index.css'

import axios from "axios";
import Alpine from "alpinejs";
import money from "alpinejs-money";

import ApexCharts from "apexcharts";
import dashboard from "../components/dashboard";
import btcVolatility from "../components/btc-volatility";

window.axios = axios;
// window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

window.Alpine = Alpine;
window.ApexCharts = ApexCharts;

Alpine.plugin(money);
Alpine.data("dashboard", dashboard);
Alpine.data('volatility', btcVolatility);
Alpine.start();
