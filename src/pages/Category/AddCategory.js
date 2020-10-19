import React, { Component } from 'react';
import {
    Container, Form,
    FormGroup, Label, Input,
    Button,
} from 'reactstrap';
import Navbar from '../../components/Navbar';
import { Redirect } from "react-router-dom";
import CategoryDataService from "../../services/CategoryService";

class AddCategory extends Component {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            user: localStorage.getItem('user'),
            categoryName: "",
        }
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit(){
        let data = {
            categoryName: this.state.categoryName,
        };

        CategoryDataService.create(data)
        .then(() => {
            console.log("Created new item successfully!");
            this.props.history.push("/category/");
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
                        <h2>Edit Category</h2>
                        <Form className="form">
                            <FormGroup>
                                <Label>Category Name</Label>
                                <Input
                                    type="text"
                                    name="categoryName"
                                    id="categoryName"
                                    placeholder="ex: Electrical"
                                    value={this.state.categoryName}
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

export default AddCategory;