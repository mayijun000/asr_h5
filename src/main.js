import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import rem from './api/rem'
Vue.config.productionTip = false;

Vue.use(MintUI);

rem.fontInit({
	designWidth: 540,
	designHeight: 960,
	designFontSize: 100,
});

new Vue({
	el: '#app',
	router,
	store,
	template: '<App/>',
	components: {
		App
	}
})