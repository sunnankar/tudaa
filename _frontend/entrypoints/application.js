// To see this message, follow the instructions for your Ruby framework.
//
// When using a plain API, perhaps it's better to generate an HTML entrypoint
// and link to the scripts and stylesheets, and let Vite transform it.
console.log("Vite ⚡️ Ruby");

// Example: Import a stylesheet in <sourceCodeDir>/index.css
// import '~/index.css'

import axios from "axios";
window.axios = axios;
// window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

import Alpine from "alpinejs";
import dashboard from "../components/dashboard";
import btcVolatility from "../components/btc-volatility";

window.Alpine = Alpine;
Alpine.data("dashboard", dashboard);
Alpine.data('btcVolatility', btcVolatility)
Alpine.start();
