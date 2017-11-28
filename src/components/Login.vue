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
  @import '../scss/globals';

  .loginContainer {
    background: url('../assets/img/login-background.jpg') no-repeat;
    background-size: cover;
  }

  .logo {
    height: 30%;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    color: $mainGreen;
    .title {
      font-size: px2rem(50);
      padding: px2rem(10) 0;
    }
    h3 {
      font-size: px2rem(14);
      font-weight: 200;
      letter-spacing: 4px;
    }
  }

  .loginForm {
    height: 64%;
    justify-content: flex-start;
    box-sizing: border-box;
    padding-top: px2rem(60);

    div {
      border-bottom: 1px solid rgb(213, 213, 213);
      width: 80%;
      font-size: px2rem(16);
      padding: px2rem(20) 0 px2rem(12);
      position: relative;
      &:last-of-type {
        border-bottom: none;
        padding-top: px2rem(32);
      }
      input {
        border: none;
        width: 70%;
        background: transparent;
      }
      .iconfont {
        position: absolute;
        color: $lightGray;
        right: 0;
        font-size: px2rem(16);
      }

      .username~.icon-guanbi {
        right: 0 !important;
      }
      .password~.icon-guanbi {
        right: px2rem(40) !important;
      }
      .password~.icon-mima-yanjing-guanbi,
      .password~.icon-xianshimima1 {
        right: 0;
      }
      .submit {
        letter-spacing: 4px;
        width: 100%;
        padding: px2rem(10) 0;
        color: white;
        border: none;
        box-sizing: border-box;
        border-radius: 4px;
        font-size: 1rem;
        display: block;
        text-align: center;
        &.gray {
          background: #d3d4dc;
        }

        &.green {
          background: $mainGreen;
        }
      }
    }
  }

  footer {
    height: 6%;
    text-align: center;
    font-size: px2rem(12);
    color: $lightGray;
    letter-spacing: 4px;
    font-weight: 200;
  }

</style>
