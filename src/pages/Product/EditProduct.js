import React, { Component } from 'react';
import {
    Container, Form,
    FormGroup, Label, Input,
    Button, CustomInput
} from 'reactstrap';
import Navbar from '../../components/Navbar';
import { Redirect } from "react-router-dom";
import ProductDataService from "../../services/ProductService";
import CategoryDataService from "../../services/CategoryService";

class EditProduct extends Component {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onDataChange = this.onDataChange.bind(this);
        this.getCategoryOption = this.getCategoryOption.bind(this);
        
        this.state = {
            user: localStorage.getItem('user'),
            categories: [],
            productName: "",
            categoryId: "",
            productId: this.props.match.params.id,
        }
    }

    componentDidMount(){
        const { product } = this.props.location.state;
        this.setState({
            productName: product.productName,
            categoryId: product.categoryId
        })

        console.log("Product", product)

        this.getCategories();
    }

    getCategories(){
        CategoryDataService.getAll().orderBy("categoryName", "asc").onSnapshot(this.onDataChange);
    }

    onDataChange(items) {
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
        
        console.log("Data", categories);
        this.setState({
            categories: categories
        });
    }

    getCategoryOption(){
        let items = [];
        let categories = this.state.categories;
        for(let i=0; i < categories.length; i++){
            items.push(<option key={categories[i].id} value={categories[i].id}>{categories[i].categoryName}</option>);
        }
        return items;
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit(){
        let data = {
            categoryId: this.state.categoryId,
            productName: this.state.productName,
        };

        ProductDataService.update(this.state.productId, data)
        .then(() => {
            console.log("product updated successfully!");
            this.props.history.push("/product/");
        })
        .catch((e) => {
            console.log(e);
        });
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
                        <h2>Edit Product</h2>
                        <Form className="form">
                            <FormGroup>
                                <Label>Category</Label>
                                <CustomInput type="select" id="categoryId" name="categoryId" onChange={this.handleChange} value={this.state.categoryId}>
                                    {this.getCategoryOption()}
                                </CustomInput>
                            </FormGroup>
                            <FormGroup>
                                <Label>Product Name</Label>
                                <Input
                                    type="text"
                                    name="productName"
                                    id="productName"
                                    placeholder="ex: Xiamoi TV"
                                    value={this.state.productName}
                                    onChange={this.handleChange}
                                />
                            </FormGroup>                        
                            <Button color="primary" onClick={this.handleSubmit}>Submit</Button>
                        </Form>
                    </Container>
                </div>
            );
        }
    }
}

export default EditProduct;