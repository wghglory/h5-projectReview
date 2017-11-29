<template>
  <div class="container loginContainer">
    <header class="logo">
      <h1 class="title">移动开发</h1>
      <h3>一切都会更美好</h3>
    </header>
    <form class="loginForm flexbox-vertical">
      <div>
        <input class="username" type="text" placeholder="用户名" v-model="username" />
        <i class="iconfont icon-guanbi" v-on:touchstart="clearUsername" />
      </div>
      <div>
        <input class="password" type="password" placeholder="密码" v-model="password" ref="passwordInput" />
        <i class="iconfont icon-guanbi" v-on:touchstart="clearPassword" />
        <i class="eye iconfont icon-xianshimima1 icon-mima-yanjing-guanbi" v-on:touchstart="togglePassword" />
      </div>
      <div>
        <a v-bind:class="['submit', this.loginButtonStatus]" v-on:touchstart="tryLogin">
          登录
        </a>
      </div>
    </form>
    <footer>光辉岁月挥斥方遒</footer>
  </div>
</template>

<script>
  import {
    baseUrl
  } from '../utils/api';

  export default {
    data () {
      return {
        username: '',
        password: ''
      };
    },
    computed: {
      loginButtonStatus () {
        if (this.username !== '' && this.password !== '') {
          return 'green';
        } else {
          return 'gray';
        }
      }
    },
    methods: {
      clearUsername () {
        this.username = '';
      },
      clearPassword () {
        this.password = '';
      },
      togglePassword () {
        if (this.$refs.passwordInput.type === 'text') {
          this.$refs.passwordInput.type = 'password';
        } else {
          this.$refs.passwordInput.type = 'text';
        }
      },
      tryLogin () {
        if (this.loginButtonStatus === 'green') {
          this.$http.post(`${baseUrl}/login`, {
            username: this.username,
            password: this.password
          })
            .then((res) => {
              // 代码执行路由跳转
              this.$router.push('/');
            })
            .catch((err) => {
              console.log(err);
              alert('账号密码错误');
            });
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import '../scss/Login.scss';
</style>
