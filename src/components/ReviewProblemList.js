import css from '../scss/Review.scss';
import React, { PureComponent } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import ReviewProblem from './ReviewProblem';

export default class ReviewProblemList extends PureComponent {
  state = {
    selectedProblems: []
  };

  onChildSelected = (problem) => {
    let task = null;
    // 不存在则加入到 array
    if (this.state.selectedProblems.indexOf(problem) === -1) {
      task = new Promise((resolve) => {
        this.setState(
          {
            selectedProblems: [...this.state.selectedProblems, problem]
          },
          resolve
        );
      });
    } else {
      task = new Promise((resolve) => {
        this.setState(
          {
            selectedProblems: this.state.selectedProblems.filter((s) => s !== problem)
          },
          resolve
        );
      });
    }

    // 通知父级都选了哪些问题，必须等待上面更新完成后再通知
    task.then(() => {
      this.props.onProblemToggle(this.state.selectedProblems);
    });
  };

  render() {
    const { review, selectedReviewId, onChildToggle } = this.props;
    return (
      <article className={css.reviewItem}>
        <div
          className={classNames({
            [css.reviewItemHeader]: true,
            [css.active]: review.id === selectedReviewId,
            [css.valueMoreThanOne]: this.state.selectedProblems.length > 0 // 选中至少一个问题，出现对号
          })}
          onTouchStart={() => onChildToggle(review.id, true)}
        >
          <span className="iconfont icon-gouxuan" />
          {review.problemCategory}
        </div>
        <ul className={classNames({ hide: review.id !== selectedReviewId })}>
          {review.problems.map((problem, index) => (
            <ReviewProblem onChildSelected={this.onChildSelected} problem={problem} key={index} />
          ))}
        </ul>
      </article>
    );
  }
}

ReviewProblemList.propTypes = {
  match: PropTypes.object,
  history: PropTypes.object,
  review: PropTypes.object.isRequired,
  onProblemToggle: PropTypes.func.isRequired,
  selectedReviewId: PropTypes.number.isRequired,
  onChildToggle: PropTypes.func.isRequired
};
