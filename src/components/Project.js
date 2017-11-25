import css from '../scss/Project.scss';
import React, { PureComponent } from 'react';
import { baseUrl, formatTime } from '../utils/api';
import classNames from 'classnames';
import axios from 'axios';
import PropTypes from 'prop-types';

export default class Project extends PureComponent {
  state = {
    project: {},
    playing: false,
    playProgress: 0
  };

  componentDidMount() {
    axios.get(`${baseUrl}/projects/${this.props.match.params.id}`).then((res) => {
      this.setState({
        project: res.data.project
      });
    });
  }

  timer = null;

  togglePlay = () => {
    if (this.state.playing) {
      this.setState(
        {
          playing: false
        },
        () => {
          this.audio.pause();
          clearInterval(this.timer);
        }
      );
    } else {
      this.setState({
        playing: true
      });
      this.timer = setInterval(() => {
        this.setState({
          playProgress: this.audio.currentTime / this.audio.duration * 100 + '%'
        });
      }, 1000);
      this.audio.play();
    }
  };

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    return (
      <div className="container">
        <section className={classNames(css.wrapper)}>
          <div className={classNames(css.mediaTools)}>
            <audio controls ref={(ele) => (this.audio = ele)}>
              <source src={require('../assets/music.mp3')} type="audio/mpeg" />
            </audio>
            <div
              className={classNames({ [css.playerBtn]: true, [css.play]: !this.state.playing })}
              onTouchStart={this.togglePlay}
            />
            <span className={css.currentTime}>{this.audio ? formatTime(this.audio.currentTime) : `00:00`}</span>
            <span className={css.duration}>{this.audio ? formatTime(this.audio.duration) : `00:00`}</span>
            <div className={css.mediaProgress}>
              <div className={css.playProgress} style={{ width: this.state.playProgress }} />
            </div>
          </div>
          <div className={css.project}>
            <h3 className={css.projectImg}>自省</h3>
            <div>每天自省，虚心学习，广交善缘，问心无愧</div>
            <div>每天自省，虚心学习，广交善缘，问心无愧</div>
            <div>每天自省，虚心学习，广交善缘，问心无愧</div>
            <label>Project Name</label>
            <p>{this.state.project.name}</p>
            <img src={require('../assets/img/default-post.jpg')} />
          </div>
        </section>
        <section className={css.toReport}>
          <a
            className={css.toReportBtn}
            onTouchStart={() => this.props.history.push(`/reviews?projectId=${this.props.match.params.id}`)}
          >
            去评分
          </a>
        </section>
      </div>
    );
  }
}

Project.propTypes = {
  match: PropTypes.object,
  history: PropTypes.object
};
