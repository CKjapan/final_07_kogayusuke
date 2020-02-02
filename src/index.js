import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';//追加
import * as serviceWorker from './serviceWorker';

import "./styles.css";

ReactDOM.render(<App />, document.getElementById('root'));//ok

serviceWorker.unregister();