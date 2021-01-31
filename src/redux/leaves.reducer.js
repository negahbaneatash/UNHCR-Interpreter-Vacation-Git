import { actions } from "./action.names";

const INITIAL_STATE={
    leaves:[null]
}

export const leavesReducer =(state=INITIAL_STATE,action)=>{
    switch (action.type) {
        case actions.setTheLeaveToStore:
            return ({
                ...state,
                leaves:[...state.leaves,{...action.payload}]
            })
        default:
            return state;
    }
}