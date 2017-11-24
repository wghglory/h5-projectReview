import React from 'react';
import ReactDOM from 'react-dom';

import '!style-loader!css-loader!sass-loader!./scss/reset.scss';
import '!style-loader!css-loader!sass-loader!./scss/common.scss';

import App from './components/App';

ReactDOM.render(<App />, document.getElementById('root'));
