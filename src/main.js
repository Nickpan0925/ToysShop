import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'reset-css'
import './css/font.css'
import './bus.js'
import currencyFilter from './filter/filter'
import Loading from './components/Loading.vue'
import { library } from "@fortawesome/fontawesome-svg-core"
import { fas } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import { dom } from '@fortawesome/fontawesome-svg-core'
import Message from 'vue-m-message'
import 'vue-m-message/dist/index.css'
import { ValidationObserver, ValidationProvider, extend, localize, configure } from 'vee-validate'
import TW from 'vee-validate/dist/locale/zh_TW.json'
import * as rules from 'vee-validate/dist/rules'
Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule]);
});


localize('zh_TW', TW);

Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationProvider', ValidationProvider)
dom.watch();
library.add(fas);
Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.component('Loading', Loading)
Vue.use(VueAxios, axios)
Vue.use(Message, { name: 'msg' })
Vue.filter('currency',currencyFilter)
Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  if(to.meta.requiresAuth){
    const api = `${process.env.VUE_APP_API}/api/user/check`
   axios.post(api).then(response=>{
      if(response.data.success){
        next()
      }else{
        next({
          path:'/login'
        })
      }
    })
  }else{
   next()
  }
})
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
