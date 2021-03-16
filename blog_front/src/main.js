import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import store from './store'
import './util/permission'
import './util/axios'
Vue.prototype.$axios = axios
import vueBus from './util/vueBus'
Vue.prototype.$vueBus = vueBus

import Element from 'element-ui'
import "element-ui/lib/theme-chalk/index.css"
Vue.use(Element)

import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
Vue.use(mavonEditor)

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
