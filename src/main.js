import * as Vue from "vue";
import App from "./App.vue";
import * as VueRouter from 'vue-router';
import VueFileUploadExample from "./views/VueFileUploadExample.vue";
import CompositionAPIExample from "./views/CompositionAPIExample.vue";
import ImageKitExample from "./views/ImageKitExample.vue";

const routes = [
  { path: "/", component: VueFileUploadExample },
  { path: "/vue-file-upload", component: VueFileUploadExample },
  { path: "/composition-api", component: CompositionAPIExample },
  { path: "/imagekit", component: ImageKitExample },
];

const router = VueRouter.createRouter({
  routes,
  history: VueRouter.createWebHashHistory(),
});

const app = Vue.createApp(App)

app.use(router)
app.mount('#app')