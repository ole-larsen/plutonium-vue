// Add Buffer
import { Buffer } from "buffer";
window.Buffer = Buffer;

// Add fontawesome
import { library, dom } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
library.add(fas, far, fab);
dom.watch();
// end fontawesome

// add bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
// end add bootstrap

// add axios
import axios from "axios";
import VueAxios from "vue-axios";
// end add axios

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import "./assets/css/style.css";
import "./assets/css/shortcodes.css";
import "./assets/css/responsive.css";
import "./assets/css/custom.scss";
import {ethers} from "ethers";

const app = createApp(App);

// add metamask library
// A Web3Provider wraps a standard Web3 provider, which is what MetaMask injects as window.ethereum into each page
if (typeof window.ethereum !== 'undefined') {
  const { ethereum } = window;
  app.config.globalProperties.$ethereum = new ethers.providers.Web3Provider(ethereum as ethers.providers.ExternalProvider);
}

if (import.meta.env.VITE_WEB3_PROVIDER) {
  app.config.globalProperties.$web3 = new ethers.providers.JsonRpcProvider(import.meta.env.VITE_WEB3_PROVIDER);
}

app.component("font-awesome-icon", FontAwesomeIcon);
app.use(VueAxios, axios);
app.provide('axios', app.config.globalProperties.axios);
app.use(createPinia());
app.use(router);

app.mount("#app");
