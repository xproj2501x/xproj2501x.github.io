////////////////////////////////////////////////////////////////////////////////
// Imports
////////////////////////////////////////////////////////////////////////////////
import '../css/_site.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import Template from './template';
import result from '../../games/stardew-valley/';

console.log(result);
ReactDOM.render(
  <BrowserRouter>
    <Template />
  </BrowserRouter>
  , document.getElementById('root'));