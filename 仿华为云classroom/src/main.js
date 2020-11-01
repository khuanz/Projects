// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { Container, Header, Main, TabPane, Tabs } from 'element-ui'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/swiper-bundle.css'
Vue.config.productionTip = false
Vue.use(Container)
Vue.use(Header)
Vue.use(Main)
Vue.use(VueAwesomeSwiper)
Vue.use(Tabs)
Vue.use(TabPane)
/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount("#app")
window.addEventListener('popstate',function(e){
  router.isBack =true
})
