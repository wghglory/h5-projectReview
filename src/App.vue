<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import Login from './components/Login.vue'
import Home from './components/Home.vue'
import Project from './components/Project.vue'
import Review from './components/Review.vue'

export default {
  name: 'app',
  data () {
    return {
    }
  },
  components: {
    'app-login': Login,
    'app-home': Home,
    'app-project': Project,
    'app-review': Review,
  }
}
</script>

<style lang="scss">
@import './scss/App.scss';
</style>
