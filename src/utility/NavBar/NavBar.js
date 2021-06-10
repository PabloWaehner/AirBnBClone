import React, { Component } from 'react';
import './NavBar.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'; //we want this component to know about redux, for that we need react-redux (we need the connect function)
import { bindActionCreators } from 'redux';
import openModal from '../../actions/openModal';
import logoutAction from '../../actions/logoutAction';
import Login from '../../pages/Login/Login';
import SignUp from '../../pages/Login/SignUp';

class NavBar extends Component {

    componentDidUpdate(oldProps) {
        if (oldProps.auth.token !== this.props.auth.token) {
            this.props.openModal('closed', ''); //when I sign up, the modal closes because the token changes (this.props.regAction(resp.data) changes it)
        }
    }

    render() {

        let navColor = 'transparent';
        if (this.props.location.pathname !== '/') {
            // the user is not on the home page
            navColor = 'black'
        }

        return (
            <div className="container-fluid nav"> {/*container-fluid makes it take the whole width (materializecss)*/}
                <div className="row">
                    <nav className={navColor}>
                        <div className="nav-wrapper">
                            <Link to="/" className="left">airbnb</Link>
                            <ul id="nav-mobile" className="right"> {/*to float right*/}
                                <li><Link to="/">English (US)</Link></li>
                                <li><Link to="/">$ USD</Link></li>
                                <li><Link to="/">Become a host</Link></li>
                                <li><Link to="/">Help</Link></li>
                                {this.props.auth.email
                                    ? <>
                                        <li><Link to="/account">Hello, {this.props.auth.email}</Link></li>
                                        <li onClick={() => this.props.logoutAction()}>Logout</li>
                                    </>
                                    : <>
                                        <li className="login-signup" onClick={() => { this.props.openModal('open', <SignUp />) }}>Sign Up</li>
                                        <li className="login-signup" onClick={() => { this.props.openModal('open', <Login />) }}>Log in</li> {/*to the action openModal -> then the reducer siteModal -> change in the state */}
                                    </>
                                }
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
        )
    }
}
function mapStateToProps(state) { //THANKS TO THIS THE COMPONENT CAN ACCESS THE STATE
    return {
        auth: state.auth, //from authReducer.js
    }
}

// mapDispatchToProps is how we tie our component to the dispatch
// it takes 1 arg: dispatch
function mapDispatchToProps(dispatcher) {
    // this function returns bindActionCreators (redux), and we hand bindActionCreators an object:
    // each property will be a local prop, each value will be a function that is dispatched when run
    // Second argument for the bindActionCreators is the dispatch
    return bindActionCreators({
        openModal: openModal,
        logoutAction: logoutAction,
    }, dispatcher)
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);