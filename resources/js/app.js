require('./bootstrap');

import React from 'react';
import ReactDOM from 'react-dom';
import Master from './components/Master';

if (document.getElementById('root')) {
    ReactDOM.render(<Master />, document.getElementById('root'));
}