import css from '../scss/Home.scss';
import React, { PureComponent } from 'react';
import { getProjects } from '../utils/api';
import PropTypes from 'prop-types';

export default class Home extends PureComponent {
  state = {
    reviewedProjects: [],
    unReviewedProjects: [],
    showReviewed: false
  };

  async componentDidMount() {
    const projects = await this.fetchProjects();
    this.fillProjects(projects);
  }

  async fetchProjects() {
    const res = await getProjects();
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

  /* // promise
  componentDidMount() {
    this.fetchProjects().then((res) => {
      this.fillProjects(res);
    });
  }

  fetchProjects() {
    return getProjects().then((res) => {
      return res.json();
    });
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
              <li key={index} onTouchStart={() => this.props.history.push(`/projects/${p.id}`)}>
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
              <li key={index} onTouchStart={() => this.props.history.push(`/projects/${p.id}`)}>
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

Home.propTypes = {
  history: PropTypes.object
};
