import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import SignInComponent from './components/SignIn.component';
import SignUpComponent from './components/SignUp.component';
import MainComponent from './components/Main.component';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <Router basename={process.env.PUBLIC_URL}>
      <Route exact path="/" component={MainComponent} />
      <Route exact path="/signin" component={SignInComponent} />
      <Route exact path="/signup" component={SignUpComponent} />
  </Router>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
