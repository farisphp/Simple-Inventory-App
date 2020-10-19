import React, { Component } from 'react';
import Navbar from '../components/Navbar';
import '../assets/css/Dashboard.css';
import { Redirect, Link } from "react-router-dom";
import { Container, Row, Col, Button } from 'reactstrap';
import CategoryDataService from "../services/CategoryService";
import ProductDataService from "../services/ProductService";

class DashboardPage extends Component {
    constructor(props){
        super(props);
        this.CategoriesData = this.CategoriesData.bind(this);
        this.ProductsData = this.ProductsData.bind(this);
        this.state = {
            user: localStorage.getItem('user'),
            categories: [],
            products: []
        }
    }

    componentDidMount(){
        this.getCategories();
        this.getProducts();
    }

    getProducts(){
        ProductDataService.getAll().orderBy("productName", "asc").onSnapshot(this.ProductsData);
    }

    ProductsData(items) {
        let categories = this.state.categories;
        let products = [];
        let order = 1;
        items.forEach((item) => {
          let id = item.id;
          let data = item.data();
          let categoryName = "";
          categories.forEach((category) => {
            if(category.id === data.categoryId){
                categoryName = category.categoryName;
            }
          })
          products.push({
            order: order,
            id: id,
            categoryId: data.categoryId,
            categoryName: categoryName,
            productName: data.productName,
          });
          order++;
        });
        
        console.log("Data", products);
        this.setState({
            products: products,
        });
        localStorage.setItem('products', products);
    }

    getCategories(){
        CategoryDataService.getAll().orderBy("categoryName", "asc").onSnapshot(this.CategoriesData);
    }

    CategoriesData(items) {
        let categories = [];
        let order = 1;
        items.forEach((item) => {
          let id = item.id;
          let data = item.data();
          categories.push({
            order: order,
            id: id,
            categoryName: data.categoryName,
          });
          order++;
        });
        
        this.setState({
            categories: categories,
        });
        localStorage.setItem('categories', categories);
    }

    render() {
        if (this.state.user == null){
            return (
                <Redirect to="/login" />
            )
        } else {
            return (
                <div>
                    <Navbar />
                    <Container>
                        <Row style={{textAlign: "center"}}>
                            <Col xs="12" sm="6" style={{marginTop: "50px"}}>
                                <h2>Total Category</h2>
                                <h1>{this.state.categories.length}</h1>

                                <Link to="/category">
                                    <Button color="primary" onClick={this.handleSubmit}>View</Button>
                                </Link>
                            </Col>
                            <Col xs="12" sm="6" style={{marginTop: "50px"}}>
                                <h2>Total Product</h2>
                                <h1>{this.state.products.length}</h1>
                                <Link to="/product">
                                    <Button color="primary" onClick={this.handleSubmit}>View</Button>
                                </Link>
                            </Col>
                        </Row>
                    </Container>
                </div>
            );
        }
    }
}

export default DashboardPage;