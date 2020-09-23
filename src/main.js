import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "@/filter";

// 按需引入Ant Design 组件
import "@/shared/registAntd";

// 注册微应用
import subRegister from "./shared/subRegister";

Vue.config.productionTip = false;

let vm = new Vue({
  router,
  store,
  data: {
    isLoading: false
  },
  render: h => h(App)
});

console.log("~~~~~~~~~~~~~~~");
console.log(vm.$store.state.isLoading);

// 将全局通信方法暴露给子组件调用
export const {
  onGlobalStateChange,
  setGlobalState,
  offGlobalStateChange
} = subRegister(vm);

vm.$mount("#main_app");
