import css from '../scss/Review.scss';
import React, { PureComponent } from 'react';
import { ModalHelper } from '../utils/tools';
import { getReview } from '../utils/api';
import PropTypes from 'prop-types';
import ReviewProblemCategory from './ReviewProblemCategory';
import ReviewModal from './ReviewModal';

export default class Review extends PureComponent {
  state = {
    reviews: [],
    selectedReviewId: -1,
    currentScore: 50,
    selectedProblems: {}, // { problemCategory/reviewId : [problem1, problem2] }
    comment: '',
    isModalOpen: false
  };

  componentDidMount() {
    getReview(this.props.match.params.id).then((res) => res.json()).then((res) =>
      this.setState({
        reviews: res
      })
    );
  }

  /* ----------------------------- 问题列表 开始 --------------------------------- */

  // 子级向 siblings 通信，更新 problemCateogry
  // 子级 li click 更新 parent state，此状态通过 props 传到 siblings，selectedReviewId 和 siblings id 对比判断状态
  onProblemCategoryToggle = (id) => {
    // 如果还是选中刚才选中的li，则 toggle 它，此时没有选中任何 li
    if (id === this.state.selectedReviewId) {
      this.setState({
        selectedReviewId: -1
      });
    } else {
      this.setState({
        selectedReviewId: id
      });
    }
  };

  // 操作 具体 problems
  onProblemToggle = ({ reviewId, problems }) => {
    this.setState(
      {
        selectedProblems: { ...this.state.selectedProblems, ...{ [reviewId]: problems } }
      },
      () => {
        console.log(this.state.selectedProblems);
      }
    );
  };
  /* ----------------------------- 问题列表 结束 --------------------------------- */

  /* ----------------------------- 滚动条分数区域 开始 --------------------------------- */

  updateScore = (operator) => {
    let newScore = this.state.currentScore;
    if (operator === '+') {
      newScore += 1;
    } else {
      newScore -= 1;
    }

    if (newScore > 100) {
      newScore = 100;
    } else if (newScore < 0) {
      newScore = 0;
    }
    this.setState({
      currentScore: newScore
    });
  };

  touchStart = (e) => {
    // 按下：改变绿条宽度、得分
    if (e.touches.length !== 1) {
      e.preventDefault();
    }
    const prevClientX = e.targetTouches[0].clientX; // 初始按下位置

    // 按下瞬间绿条宽度变化，其右侧和鼠标按下位置一齐
    // e.target.style.width = prevClientX - this.scorebar.offsetLeft + 'px';

    // 按下瞬间计算当前位置的分数
    this.setState({
      // currentScore: Math.floor(e.target.offsetWidth / pWidth * 100)
      currentScore: Math.floor(
        (prevClientX - this.scorebar.offsetLeft) / this.scorebar.clientWidth * 100
      )
    });
  };

  touchMove = (e) => {
    const pWidth = this.scorebar.clientWidth;
    const touch = e.targetTouches[0];

    // 如果鼠标滑动到 parentNode 之外，阻止之后代码
    if (
      touch.clientX < this.scorebar.offsetLeft ||
      touch.clientX > this.scorebar.offsetLeft + pWidth
    ) {
      return false;
    }

    const greenWidth = touch.clientX - this.scorebar.offsetLeft;
    // e.target.style.width = touch.clientX - this.scorebar.offsetLeft + 'px'; // 绿色宽度 = 鼠标位置 - 滚动条左侧到屏幕左侧距离

    // 左侧边界
    if (e.target.offsetWidth <= 0) {
      this.setState({
        currentScore: 0
      });
      // e.target.style.width = 0;
    }
    // 右侧边界
    if (e.target.offsetWidth >= pWidth) {
      this.setState({
        currentScore: 100
      });
      // e.target.style.width = pWidth + 'px';
    }

    // 更新分数
    this.setState({
      // currentScore: Math.floor(e.target.offsetWidth / pWidth * 100)
      currentScore: Math.floor(greenWidth / this.scorebar.clientWidth * 100)
    });
  };

  touchEnd = (e) => {
    e.target.removeEventListener('touchmove', this.touchMove);
    e.target.removeEventListener('touchend', this.touchMove);
  };
  /* ----------------------------- 滚动条分数区域 结束 --------------------------------- */

  updateComment = (e) => {
    this.setState({
      comment: e.target.value
    });
  };

  /* -----------------------------  modal 开始 --------------------------------- */
  onOpenModal = () => {
    this.setState({ isModalOpen: true });
    ModalHelper.afterOpen();
  };

  onCloseModal = () => {
    this.setState({ isModalOpen: false });
    ModalHelper.beforeClose();
  };

  onConfirmSubmit = () => {
    const score = this.state.currentScore;
    const problems = Object.values(this.state.selectedProblems);
    const comment = this.state.comment;
    const searchParam = this.props.location.search.slice(1);

    alert(`score:${score}, problems:${problems.join('|')}, comment:${comment}, ${searchParam}`);
    this.onCloseModal();
  };
  /* -----------------------------  modal 结束 --------------------------------- */

  render() {
    return (
      <div className="container gray">
        <section className={css.wrapper}>
          <div className={css.reviewScore}>
            <span className={css.score}>{this.state.currentScore}</span>分
          </div>
          <div className={css.reviewScroll}>
            <div>
              <span onTouchStart={this.updateScore.bind(this, '-')}>
                <i className="icon-jianhao iconfont" />
              </span>
            </div>
            <div className={css.reviewScorebar} ref={(ele) => (this.scorebar = ele)}>
              <div
                className={css.reviewScorebarCurrent}
                style={{ width: this.state.currentScore + '%' }}
                onTouchStart={this.touchStart}
                onTouchMove={this.touchMove}
                onTouchEnd={this.touchEnd}
              />
            </div>
            <div>
              <span onTouchStart={this.updateScore.bind(this, '+')}>
                <i className="icon-jiahao iconfont" />
              </span>
            </div>
          </div>
          <div className={css.reviewList}>
            <h3>该项目存在的问题</h3>
            {/* 某个 li 点击改变 siblings 状态！向子级传入选中 id，回调函数修改选中 id */}
            {this.state.reviews.map((review, index) => (
              <ReviewProblemCategory
                review={review}
                key={index}
                onProblemToggle={this.onProblemToggle}
                selectedReviewId={this.state.selectedReviewId}
                onProblemCategoryToggle={this.onProblemCategoryToggle}
              />
            ))}
          </div>
          <div className={css.comment}>
            <h3>主观评价</h3>
            <textarea
              onChange={this.updateComment}
              value={this.state.comment}
              className={css.reviewArea}
              placeholder="请输入你对这个项目的评价"
            />
          </div>
        </section>
        <section className={css.reviewFooter}>
          <a className={css.reviewSubmit} onTouchStart={this.onOpenModal}>
            提交
          </a>
        </section>
        <ReviewModal
          isModalOpen={this.state.isModalOpen}
          onOpenModal={this.onOpenModal}
          onCloseModal={this.onCloseModal}
          onConfirmSubmit={this.onConfirmSubmit}
        />
      </div>
    );
  }
}

Review.propTypes = {
  match: PropTypes.object,
  location: PropTypes.object
};
