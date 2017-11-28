import Login from './components/Login.vue';
import Home from './components/Home.vue';
import Project from './components/Project.vue';
import Review from './components/Review.vue';

export default [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/project/:id', component: Project },
  { path: '/review', component: Review }
];
