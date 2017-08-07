import React, { Component } from 'react';

import { Route, Switch } from 'react-router-dom'
import Game from './Game'
import Home from './Home'
import '../assets/App.css';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route path="/:id" component={Game} />
          <Route path="/" component={Home} />
        </Switch>
      </div>
    );
  }
}

export default App;
