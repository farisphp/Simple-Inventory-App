import React from 'react';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import AddCategory from './pages/Category/AddCategory';
import EditCategory from './pages/Category/EditCategory';
import ListCategory from './pages/Category/ListCategory';
import AddProduct from './pages/Product/AddProduct';
import EditProduct from './pages/Product/EditProduct';
import ListProduct from './pages/Product/ListProduct';
import { BrowserRouter as Router,Switch, Route } from "react-router-dom";

function App(props) {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Route path="/category/add" component={AddCategory} />
        <Route path='/category/:id' component={EditCategory}/>
        <Route path="/category/" component={ListCategory} />
        <Route path="/product/add" component={AddProduct} />
        <Route path='/product/:id' component={EditProduct}/>
        <Route path="/product/" component={ListProduct} />
        <Route exact path="/" component={DashboardPage} />
      </Switch>
    </Router>
  );
}

export default App;
