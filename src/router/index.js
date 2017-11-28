import Vue from 'vue';
import Router from 'vue-router';

import Login from '@/components/Login.vue';
import Home from '@/components/Home.vue';
import Project from '@/components/Project.vue';
import Review from '@/components/Review.vue';

Vue.use(Router);

export default new Router({
  routes: [
    { path: '/', component: Home },
    { path: '/login', component: Login },
    { path: '/projects/:id', component: Project },
    { path: '/review', component: Review }
  ],
  mode: 'history'
});
