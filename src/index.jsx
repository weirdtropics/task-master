import './styles.scss';

import React from 'react';
import { render } from 'react-dom';
import App from './App';

const root = document.createElement('div');
document.body.appendChild(root);
root.style.height = '100%';

function renderApp() {
  render (<App />, root);
}

renderApp();
