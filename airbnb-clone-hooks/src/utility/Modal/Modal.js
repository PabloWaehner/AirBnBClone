import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './Modal.css';
import openModal from '../../actions/openModal';

class Modal extends Component {

    state = {

    }

    closeModal = () => {
        this.props.openModal('closed', '');
    }

    render() {
        let modalInlineStyle
        if (this.props.siteModal.openClose === "open") {
            modalInlineStyle = { display: 'block' };
        } else {
            modalInlineStyle = { display: 'none' };
        }

        return (
            <div className="site-modal" style={modalInlineStyle}>
                <div className="modal-content">
                    <div className="col right">
                        <span onClick={this.closeModal} className="close">&times;</span>
                    </div>
                    <div className="">
                        {this.props.siteModal.content}
                    </div>
                </div>
            </div>
        )
    }
}

//mapStateToProps takes 1 arg, "state", and that is the rootReducer/Store
function mapStateToProps(state) { //THANKS TO THIS THE COMPONENT CAN ACCESS THE STATE
    // mapStateToProps returns an object, with:
    // property: is the local prop name to this component
    // value: will be the property in the root reducer, i.e., a piece of the store
    return {
        siteModal: state.siteModal //state.siteModal -> like it is in rootReducer.js
    }
}

function mapDispatchToProps(dispatcher) { //THANKS TO THIS THE COMPONENT CAN CHANGE THE STATE (action->reducer->store)
    return bindActionCreators({
        openModal: openModal
    }, dispatcher)
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal)