import React, { Component } from 'react';
import {
    Container, 
    Table,
    Button
} from 'reactstrap';
import Navbar from '../../components/Navbar';
import { Redirect, Link } from "react-router-dom";
import CategoryDataService from "../../services/CategoryService";

class ListCategory extends Component {
    constructor(props){
        super(props);
        this.onDataChange = this.onDataChange.bind(this);

        this.state = {
            user: localStorage.getItem('user'),
            categories: [],
        }
    }

    componentDidMount(){
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
            categories: categories,
        });
    }

    deleteCategory(id){
        CategoryDataService.delete(id)
        .then(() => {
            this.getCategories();
        })
        .catch((e) => {
            console.log(e);
        });
    }

    render() {
        const { categories } = this.state;
        if (this.state.user == null){
            return (
                <Redirect to="/login" />
            )
        } else {
            return (
                <div>
                    <Navbar />
                    <Container>
                        <h2>Category Lists</h2>
                        <Link to="/category/add">
                            <Button color="primary">Add Category</Button>{' '}
                        </Link>
                        <Table hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Category</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                            {categories &&
                                categories.map((cat, index) => (
                                    <tr key={index}>
                                        <th scope="row">{cat.order}</th>
                                        <td>{cat.categoryName}</td>
                                        <td>
                                            <Link to={{
                                                pathname: '/category/'+cat.id,
                                                state: {
                                                  category: cat
                                                }
                                            }}>
                                                <Button color="primary">Update</Button>{' '}
                                            </Link>
                                            <Button color="danger" onClick={this.deleteCategory.bind(this,cat.id )}>Delete</Button>{' '}
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

export default ListCategory;