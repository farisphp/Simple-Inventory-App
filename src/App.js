import React from 'react';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import { BrowserRouter as Router, Route } from "react-router-dom";

function App(props) {
  return (
    <Router>
      <Route path="/login" component={LoginPage} />
      <Route exact path="/" component={DashboardPage} />
    </Router>
  );
}

export default App;
