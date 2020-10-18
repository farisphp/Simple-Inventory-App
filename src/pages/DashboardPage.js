import React, { Component } from 'react';
import Navbar from '../components/Navbar';
import '../assets/css/Dashboard.css';
import { Redirect } from "react-router-dom";

class DashboardPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            user: localStorage.getItem('user')
        }
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
                </div>
            );
        }
    }
}

export default DashboardPage;