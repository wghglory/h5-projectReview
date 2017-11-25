import React from 'react';
import ReactDOM from 'react-dom';

import '!style-loader!css-loader!sass-loader!./scss/reset.scss';
import '!style-loader!css-loader!sass-loader!./scss/common.scss';

import App from './components/App';

ReactDOM.render(<App />, document.getElementById('root'));

// resize orientation 更新页面字体大小
(function(doc, win) {
  var docEl = doc.documentElement,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    recalc = function() {
      var clientWidth = docEl.clientWidth;
      if (!clientWidth) return;
      docEl.style.fontSize = 16 * (clientWidth / 375) + 'px';
    };
  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);
