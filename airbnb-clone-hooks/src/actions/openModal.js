// this file is an ACTION CREATOR
// action creators return actions
// action is an object that has AT LEAST a property of type
// this action creator is going to be handed to the dispatch

export default (openClose, content) => {
    return {
        type: 'OPEN_MODAL',
        payload: {
            openClose,
            content
        }
    }
}

// this will be sent to the dispatcher, and then all reducers (siteModal.js will "catch it" because of the conditional) (from an action to a reducer)