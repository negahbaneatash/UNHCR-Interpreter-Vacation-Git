import { actions } from "./action.names";


const INITIAL_STATE={
    theSupervisor:null
}

const theSupervisorReducer=(state=INITIAL_STATE,action)=>{
    switch (action.type) {
        case actions.setTheSupervisorToStore:
            return {
                ...state,
                theSupervisor:action.payload
            }    
        default:
            return state;
    }
}


export default theSupervisorReducer;