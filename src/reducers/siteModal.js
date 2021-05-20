// All reducers have 2 params:
// 1. Current State. Usually provide a default State
// 2. Info that came from any action

const initState = { openClose: "closed", content: "" };

export default (state = initState, action) => {
    if (action.type === "OPEN_MODAL") {
        return action.payload;
    }
    return state;
}

// from here to the rootReducer