import React, { Component } from 'react';
import './Login.css'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import openModal from '../../actions/openModal';
import Login from './Login'

class SignUp extends Component {

    render() {
        return (
            <div className="login-form">
                <form onSubmit={this.submitLogin}>
                    <button className="facebook-login">Connect With Facebook</button>
                    <button className="google-login">Connect With Google</button>
                    <div className="login-or center">
                        <span>or</span>
                        <div className="or-divider"></div>
                    </div>
                    <button className="sign-up-button">Sign up with email</button>
                    <div className="divider"></div>
                    <div>Already have an account? <span className="pointer" onClick={() => { this.props.openModal('open', <Login />) }}>Log in</span></div>
                </form>
            </div>

        )
    }

}

function mapDispatchToProps(dispatcher) {
    return bindActionCreators({
        openModal: openModal
    }, dispatcher)
}

export default connect(null, mapDispatchToProps)(SignUp);