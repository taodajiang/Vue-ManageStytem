// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import ElementUI from 'element-ui'
import router from './router'
import local from './assets/lang/zh-CN'
import './assets/icon/iconfont.css'
import '../theme/index.css'
import '@/styles/index.less' //global css

import App from './App'
import store from './store'
// import '@/permission'

Vue.use(Vuex);
Vue.use(ElementUI, {
    local
});
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: {
        App
    },
    template: '<App/>'
})