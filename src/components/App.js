import '../scss/App.scss';
import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './Login';
import Home from './Home';
import Project from './Project';
import Review from './Review';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        {/* <Nav /> */}
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/projects/:id" component={Project} />
          <Route path="/reviews/:id" component={Review} />
          <Route path="/login" component={Login} />
          <Route render={() => <p>Not found</p>} />
        </Switch>
      </BrowserRouter>
    );
  }
}
