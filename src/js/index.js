////////////////////////////////////////////////////////////////////////////////
// Imports
////////////////////////////////////////////////////////////////////////////////
import '../css/_site.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Template from './template';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={Template} />
      <Route path='/:id' component={Template} />
    </Switch>
  </BrowserRouter>
  , document.getElementById('root'));

console.log('happy happy joy joy!!!');