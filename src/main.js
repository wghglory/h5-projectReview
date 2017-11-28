// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import VueResource from 'vue-resource';
// import { store } from './store/store';

import './scss/reset.scss';
import '@/scss/common.scss';

Vue.use(VueResource);
Vue.config.productionTip = false;

new Vue({
  el: '#app',
  router,
  // store,
  template: '<App/>',
  components: { App }
});

// resize orientation 更新页面字体大小
(function(doc, win) {
  var docEl = doc.documentElement,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    recalc = function() {
      var clientWidth = docEl.clientWidth;
      if (!clientWidth) return;
      docEl.style.fontSize = 16 * (clientWidth / 375) + 'px';
    };
  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);
