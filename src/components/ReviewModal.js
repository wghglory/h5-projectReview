import css from '../scss/Review.scss';
import React, { PureComponent } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

export default class ReviewModal extends PureComponent {
  render() {
    const { onCloseModal, onConfirmSubmit, isModalOpen } = this.props;

    return (
      <section className={classNames(`modal`, { hide: !isModalOpen })}>
        <div className="modalCenter">
          <span className="iconfont icon-guanbidanchuang close" onTouchStart={onCloseModal} />
          <h4>提交后无法修改</h4>
          <p>确定提交吗？</p>
          <div className={css.buttons}>
            <a className={css.close} onTouchStart={onCloseModal}>
              再想想
            </a>
            <a className={css.confirm} onTouchStart={onConfirmSubmit}>
              确定
            </a>
          </div>
        </div>
      </section>
    );
  }
}

ReviewModal.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  onConfirmSubmit: PropTypes.func.isRequired
};
