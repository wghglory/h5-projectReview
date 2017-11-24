import React, { Component } from 'react';
import css from '../scss/Login.scss';
import { baseUrl } from '../utils/api';

export default class Login extends Component {
  // babel-plugin-transform-class-properties
  state = {
    username: '',
    password: '',
    showPassword: false
  };

  setUsername = (e) => {
    this.setState({
      username: e.target.value
    });
  };

  setPassword = (e) => {
    this.setState({
      password: e.target.value
    });
  };

  clearUsername = () => {
    this.setState({
      username: ''
    });
  };

  clearPassword = () => {
    this.setState({
      password: ''
    });
  };

  togglePassword = () => {
    this.setState({
      showPassword: !this.state.showPassword
    });
  };

  tryLogin = () => {
    // 如果 登录 激活状态才可以提交
    if (this.state.username !== '' && this.state.password !== '') {
      fetch(`${baseUrl}/login`, {
        credentials: 'include', //pass cookies, for authentication
        method: 'post',
        headers: {
          Accept: 'application/json, application/xml, text/plain, text/html, *.*',
          'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
        },
        body: `username=${this.state.username}&password=${this.state.password}`,
        mode: 'cors'
      })
        .then((res) => {
          // 代码执行路由跳转
          this.props.history.push('/');
        })
        .catch((err) => {
          alert('账号密码错误');
        });
    }
  };

  render() {
    return (
      <div className={`container ${css.loginContainer}`}>
        <header className={css.logo}>
          <h1 className={css.title}>移动开发</h1>
          <h3>一切都会更美好</h3>
        </header>
        <form className={`${css.loginForm} flexbox-vertical`} ref={(ele) => (this.loginForm = ele)}>
          <div>
            <input
              className="username"
              type="text"
              value={this.state.username}
              placeholder="用户名"
              onChange={this.setUsername}
            />
            <i className="iconfont icon-guanbi" onTouchStart={this.clearUsername} />
          </div>
          <div>
            <input
              className="password"
              type={this.state.showPassword ? `text` : `password`}
              value={this.state.password}
              placeholder="密码"
              onChange={this.setPassword}
            />
            <i className="iconfont icon-guanbi" onTouchStart={this.clearPassword} />
            <i
              className={`eye iconfont ${this.state.showPassword ? 'icon-xianshimima1' : 'icon-mima-yanjing-guanbi'}`}
              onTouchStart={this.togglePassword}
            />
          </div>
          <div>
            <a
              className={`submit ${css.submit} ${this.state.username !== '' && this.state.password !== ''
                ? `green`
                : `gray`} `}
              onTouchStart={this.tryLogin}
            >
              登录
            </a>
          </div>
        </form>
        <footer>光辉岁月挥斥方遒</footer>
      </div>
    );
  }
}
