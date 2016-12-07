import React from 'react';
import ReactDOM from 'react-dom';

// material-ui
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

// relative imports
import App from './App';
import './index.css';

const muiTheme = getMuiTheme({
  userAgent: 'all',
});

ReactDOM.render(
  <MuiThemeProvider muiTheme={muiTheme}>
    <App />
  </MuiThemeProvider>,
  document.getElementById('root')
);
