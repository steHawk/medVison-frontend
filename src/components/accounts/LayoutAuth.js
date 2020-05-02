import React, { Component, Fragment } from 'react'
import Auth from './Auth';
import Login from './Login';



class LoginAuth extends Component {
    render() {
        return (
            <Fragment>
            <Auth />
            <Login />
           </Fragment>
        )
    }
}

export default LoginAuth;