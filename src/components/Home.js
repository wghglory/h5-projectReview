import css from '../scss/Home.scss';
import React from 'react';
import HomePic from '../assets/img/banner1.svg';

function Home() {
  return (
    <div className="container gray">
      <section className="index-review-status flexbox">
        <a className="to-review-link active">未批阅</a>
        <a className="reviewed-link">已批阅</a>
      </section>
      <section className="index-project-list">
        <ul className="to-review-ul">
          <li>
            <span />
            <span>Body-bag Fit</span>
            <span className="icon-zhankai iconfont" />
          </li>
        </ul>
        <ul className="reviewed-ul" />
      </section>
    </div>
  );
}

export default Home;
