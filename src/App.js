import React from 'react';
import {BrowserRouter as Router,Route} from 'react-router-dom';

import Navigation from './components/Navbar'
import ToDo from './components/ToDo/ToDo'

import './App.css';

function App() {
  return (
  <Router>
    <div>
        <Navigation></Navigation>
        <div className="ui segment">
          <ToDo></ToDo>
        </div>
    </div>
    <Route></Route>
    <Route></Route>
  </Router>

  );
}

export default App;
