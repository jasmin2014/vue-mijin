// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import "element-ui/lib/theme-chalk/index.css";
import "./assets/style.scss";
import "./assets/users.scss";
import "./lib/polyfill";
import Vue from "vue";
import Vuex from "vuex";
import store from "./vuex/store";
import App from "./App.vue";
import router from "./router";
import ElementUI from "element-ui";
import Global from "./lib/global";

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(Vuex);
(function() {
  // var domainUrl = process.env.DCP_DOMAIN
  //   ? process.env.DCP_DOMAIN
  //   : "testcollect.fengdai.org";

  var collect = document.createElement("script");
  collect.type = "text/javascript";
  collect.async = true;
  collect.src = "//" + DCP_URL + "/index.js";
  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(collect, s);
})();

window._XT = window._XT || []; //定义信息配置对象

window._XT.push(["Target", "div"]); //无埋点行为采集
window._XT.push(["auth", "cd4af3697fe9dc90813d1e8b499c7da7"]); //处于安全性考虑的传参

// 用户自定义收集字段,现在传的是接入方的渠道码
window._XT.userConfig = {
  dcpChannelCode: "PPqCa8j8"
};

Vue.use(Global);
/* eslint-disable no-new */
new Vue({
  el: "#app",
  store,
  router,
  components: { App },
  template: "<App/>"
});
