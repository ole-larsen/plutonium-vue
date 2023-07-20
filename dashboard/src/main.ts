// @ts-ignore
import {createApp, getCurrentInstance} from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import CoreuiVue from "@coreui/vue";
import axios from "axios";
import VueAxios from "vue-axios";

import "@vueup/vue-quill/dist/vue-quill.snow.css";

// @ts-ignore
import { iconsSet as icons } from "./assets/icons";
import CIcon from "@coreui/icons-vue";
import DocsCallout from "./components/DocsCallout.vue";
import DocsExample from "./components/DocsExample.vue";
import {ethers} from "ethers";

// @ts-ignore
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";

const app = createApp(App);

app.use(VueAxios, axios);
app.use(createPinia());
app.use(router);

app.use(CoreuiVue);
app.provide("icons", icons);
app.component("QuillEditor", QuillEditor)
app.component("CIcon", CIcon);
app.component("DocsCallout", DocsCallout);
app.component("DocsExample", DocsExample);

app.mount("#app");