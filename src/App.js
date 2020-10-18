import React from 'react';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import AddCategoryPage from './pages/Category/AddCategory';
import EditCategory from './pages/Category/EditCategory';
import ListCategory from './pages/Category/ListCategory';
import { BrowserRouter as Router,Switch, Route } from "react-router-dom";

function App(props) {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Route path="/category/add" component={AddCategoryPage} />
        <Route path='/category/:id' component={EditCategory}/>
        <Route path="/category/" component={ListCategory} />
        <Route exact path="/" component={DashboardPage} />
      </Switch>
    </Router>
  );
}

export default App;
