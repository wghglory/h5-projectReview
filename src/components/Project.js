import css from '../scss/Project.scss';
import React from 'react';

function Project() {
  return (
    <div className="container gray">
      <section className={`${css.reviewStatus} flexbox`}>
        <a className={`${css.toReviewLink} ${css.active}`}>未批阅</a>
        <a className={`${css.reviewedLink}`}>已批阅</a>
      </section>
      <section className={`${css.projectList}`}>
        <ul className={`${css.toReviewUl}`}>
          <li>
            <span
              style={{
                background: `url(${require('../assets/img/1@2x.png')}) no-repeat center`,
                backgroundSize: `contain`
              }}
            />
            <span>Body-bag Fit</span>
            <span className="icon-zhankai iconfont" />
          </li>
        </ul>
        <ul className={`${css.reviewedUl}`}>
          <li>
            <span />
            <span>Hello world</span>
            <span className="icon-zhankai iconfont" />
          </li>
        </ul>
      </section>
    </div>
  );
}

export default Project;
