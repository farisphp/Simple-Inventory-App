import React, { Component } from 'react';
import {
  Container, Form,
  FormGroup, Label, Input,
  Button,
} from 'reactstrap';
import { Redirect } from "react-router-dom";
import { auth } from "../firebase";
import '../assets/css/Login.css';

class LoginPage extends Component {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            email: "",
            password: "",
            isLoggedIn: false
        }
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit(){
        auth.signInWithEmailAndPassword(this.state.email, this.state.password).then(res => {
            console.log("Sukses");
            localStorage.setItem('user', res.user);
            this.setState({
                isLoggedIn: true
            })
            
        }).catch(error => {
            console.error("Error signing in with password and email", error);
        });
        console.log("Submit email: ", this.state.email);
        console.log("Submit password: ", this.state.password);
    }

    render() {
        return (
            this.state.isLoggedIn ? 
                <Redirect to="/" />
            :
                <Container>
                    <div className="login-container">
                        <h2>Sign In</h2>
                        <Form className="form">
                        
                            <FormGroup>
                            <Label>Email</Label>
                            <Input
                                type="email"
                                name="email"
                                id="exampleEmail"
                                placeholder="myemail@email.com"
                                value={this.state.email}
                                onChange={this.handleChange}
                            />
                            </FormGroup>
                        
                            <FormGroup>
                            <Label for="examplePassword">Password</Label>
                            <Input
                                type="password"
                                name="password"
                                id="examplePassword"
                                placeholder="********"
                                value={this.state.password}
                                onChange={this.handleChange}
                            />
                            </FormGroup>
                        
                        <Button color="primary" onClick={this.handleSubmit}>Submit</Button>
                        </Form>
                    </div>
                </Container>
        );
    }
}

export default LoginPage;