import { actions } from "./action.names";

const INITIAL_STATE={
    theUser:null
};

const theUserReducer = (state=INITIAL_STATE, action)=>{
    switch (action.type) {
        case actions.setTheUserToStore:            
            return {
                ...state,
                theUser:action.payload
            }
        default:
            return state;
    }
}

export default theUserReducer;