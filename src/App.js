import React, { Component } from 'react';
import { AppBar } from 'material-ui';

// relative imports
import List from './List';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppBar
          title="Challenge 👾"
          showMenuIconButton={false}
        />
        <List />
      </div>
    );
  }
}

export default App;
