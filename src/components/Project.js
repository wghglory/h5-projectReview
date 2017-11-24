import css from '../scss/Project.scss';
import React, { Component } from 'react';
import { baseUrl } from '../utils/api';

export default class Project extends Component {
  state = {
    reviewedProjects: [],
    unReviewedProjects: [],
    showReviewed: false
  };

  async componentDidMount() {
    const projects = await this.fetchData();
    this.fillProjects(projects);
  }

  async fetchData() {
    const res = await fetch(`${baseUrl}/projects`, {
      method: 'get',
      mode: 'cors'
    });

    return res.json();
  }

  fillProjects(projects) {
    let reviewedProjects = [];
    let unReviewedProjects = [];

    projects.forEach((p) => {
      if (p.reviewed) {
        reviewedProjects.push(p);
      } else {
        unReviewedProjects.push(p);
      }
    });
    this.setState({ reviewedProjects, unReviewedProjects });
  }

  /*
  componentDidMount() {
    this.fetchData().then((res) => {
      this.fillProjects(res);
    });
  }

  fetchData() {
    return fetch(`${baseUrl}/projects`, {
      method: 'get',
      mode: 'cors'
    }).then((res) => {
      return res.json();
    });
  }

  fillProjects(projects) {
    this.setState({ projects });
  } */

  showUnReviewed = () => {
    this.setState({
      showReviewed: false
    });
  };

  showReviewed = () => {
    this.setState({
      showReviewed: true
    });
  };

  render() {
    return (
      <div className="container gray">
        <nav className={`${css.reviewNav} flexbox`}>
          <a className={this.state.showReviewed ? '' : css.active} onTouchStart={this.showUnReviewed}>
            未批阅
          </a>
          <a className={this.state.showReviewed ? css.active : ''} onTouchStart={this.showReviewed}>
            已批阅
          </a>
        </nav>
        <section className={`${css.projectList}`}>
          {/* 两个 ul 可以封装到一个组件中，这里不作处理了 */}
          <ul className={`${this.state.showReviewed ? 'hide' : ''}`}>
            {this.state.unReviewedProjects.map((p, index) => (
              <li key={index}>
                <span
                  style={{
                    background: `url(${require('../assets/img/' + (index % 5 + 1) + '@2x.png')}) no-repeat center`,
                    backgroundSize: `contain`
                  }}
                />
                <span>{p.name}</span>
                <span className="icon-zhankai iconfont" />
              </li>
            ))}
          </ul>
          <ul className={`${this.state.showReviewed ? '' : 'hide'}`}>
            {this.state.reviewedProjects.map((p, index) => (
              <li key={index}>
                <span
                  style={{
                    background: `url(${require('../assets/img/' + (index % 5 + 1) + '@2x.png')}) no-repeat center`,
                    backgroundSize: `contain`
                  }}
                />
                <span>{p.name}</span>
                <span className="icon-zhankai iconfont" />
              </li>
            ))}
          </ul>
        </section>
      </div>
    );
  }
}
