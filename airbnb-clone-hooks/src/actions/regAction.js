export default (regObj) => {
    return {
        type: "REGISTER_ACTION",
        payload: regObj,
    }
}

// this will be sent to a dispatcher, which is going to be sent to all reducers (authReducer.js will "catch it")