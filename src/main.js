import Vue from 'vue'
import App from './App.vue'
import './assets/tailwind.css'
import './generator.js';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { state, storeActions } from './store';
import VueHead from 'vue-head';

Vue.use(VueHead);
Vue.config.productionTip = false

Vue.component('font-awesome-icon', FontAwesomeIcon);

const components = require.context('./components', true, /\w+\.vue$/);
components.keys().forEach(filename => {
  const componentConfig = components(filename);
  const componentName = filename.split('/').pop().replace(/\.\w+$/, '')
  Vue.component(componentName, componentConfig.default || componentConfig)
})

const registryComponents = require.context('./registry', true, /\w+\.vue$/);
registryComponents.keys().forEach(filename => {
  const componentConfig = registryComponents(filename);
  const componentName = filename.split('/').pop().replace(/\.\w+$/, '')
  Vue.component(state.prefix + componentName, componentConfig.default || componentConfig)
})

Vue.mixin({
  computed: {
    $state() {
      return state;
    },
    $storeActions() {
      return storeActions;
    },
  }
});

new Vue({
  data() {
    return {
      json: {}
    }
  },
  render: h => h(App),
}).$mount('#app');
