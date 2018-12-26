import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import Login from './components/Login'
import Register from './components/Register'
import Search from './components/Search'
import PreviewInfo from './components/PreviewInfo'
import User from './components/User'

class App extends Component {
  render () {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Search} />
          <div className="container">
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/previewinfo" component={PreviewInfo} />
            <Route exact path="/user" component={User} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
