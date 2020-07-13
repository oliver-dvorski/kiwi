import Vue from 'vue'
import App from './App.vue'
import VueSlugify from 'vue-slugify';

Vue.config.productionTip = false

Vue.use(VueSlugify);

new Vue({
  render: h => h(App),
}).$mount('#app')
