// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import { sync } from "vuex-router-sync";
import store from "./store/store";
import VueAnnouncer from "vue-announcer";
import msal from "vue-msal";

Vue.config.productionTip = false;

Vue.use(Vuetify);
Vue.use(
  VueAnnouncer,
  {
    complementRoute: "indlæst"
  },
  router
);

Vue.use(msal, {
  auth: {
    clientId: "310549cf-ae4e-4d34-a15b-865c38b7d30f",
	authority: "https://login.microsoftonline.com/7269da2b-d73e-4791-ba91-3675fa4b83f0"
  }
});

sync(store, router);
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>",
  vuetify: new Vuetify({
    icons: {
      iconfont: "mdiSvg"
    }
  }),
  store
});
