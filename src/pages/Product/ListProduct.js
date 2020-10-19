import React, { Component } from 'react';
import {
    Container, 
    Table,
    Button
} from 'reactstrap';
import Navbar from '../../components/Navbar';
import { Redirect, Link } from "react-router-dom";
import ProductDataService from "../../services/ProductService";
import CategoryDataService from "../../services/CategoryService";

class ListProduct extends Component {
    constructor(props){
        super(props);
        this.ProductsData = this.ProductsData.bind(this);
        this.CategoriesData = this.CategoriesData.bind(this);

        this.state = {
            user: JSON.parse(localStorage.getItem('user')),
            products: JSON.parse(localStorage.getItem('products')),
            categories: JSON.parse(localStorage.getItem('categories'))
        }
    }

    componentDidMount(){
        if (navigator.onLine){
            this.getCategories();
            this.getProducts();
        }
        
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
        
        console.log("Data categories", categories);
        this.setState({
            categories: categories,
        });
        localStorage.setItem('categories', JSON.stringify(categories));
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
        this.localStorage.setItem('products', JSON.stringify(products));
    }

    deleteProducts(id){
        ProductDataService.delete(id)
        .then(() => {
            this.getProducts();
        })
        .catch((e) => {
            console.log(e);
        });
    }

    render() {
        const { products } = this.state;
        if (this.state.user == null){
            return (
                <Redirect to="/login" />
            )
        } else {
            return (
                <div>
                    <Navbar />
                    <Container>
                        <h2>Product Lists</h2>
                        <Link to="/product/add">
                            <Button color="primary">Add Product</Button>{' '}
                        </Link>
                        <Table hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Category</th>
                                    <th>Product</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                            {products &&
                                products.map((product, index) => (
                                    <tr key={index}>
                                        <th scope="row">{product.order}</th>
                                        <td>{product.categoryName}</td>
                                        <td>{product.productName}</td>
                                        <td>
                                            <Link to={{
                                                pathname: '/product/'+product.id,
                                                state: {
                                                  product: product
                                                }
                                            }}>
                                                <Button color="primary">Update</Button>{' '}
                                            </Link>
                                            <Button color="danger" onClick={this.deleteProducts.bind(this,product.id )}>Delete</Button>{' '}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Container>
                </div>
            );
        }
    }
}

export default ListProduct;