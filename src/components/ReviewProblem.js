import css from '../scss/Review.scss';
import React, { PureComponent } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

export default class ReviewProblem extends PureComponent {
  state = {
    selected: false
  };

  toggleActive = (problem) => {
    this.setState({
      selected: !this.state.selected
    });
    // 二者顺序无关，不用在 setState 回调中执行
    this.props.onChildSelected(problem);
  };

  render() {
    const { problem } = this.props;
    return (
      <li
        onTouchStart={this.toggleActive.bind(this, problem)}
        className={classNames({ [css.active]: this.state.selected })}
      >
        <span className="iconfont icon-gouxuan" />
        <a href="javascript:">{problem}</a>
      </li>
    );
  }
}

ReviewProblem.propTypes = {
  match: PropTypes.object,
  history: PropTypes.object,
  problem: PropTypes.string.isRequired,
  onChildSelected: PropTypes.func.isRequired
};
