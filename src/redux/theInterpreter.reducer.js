import { actions } from "./action.names";

const INITIAL_STATE={
    theInterpreter:null
}

const theInterpreterReducer=(state=INITIAL_STATE,action)=>{
    switch (action.type) {
        case actions.setTheInterpreterToStore:
            return {
                ...state,
                theInterpreter:action.payload
            }    
        default:
            return state;
    }
}


export default theInterpreterReducer;