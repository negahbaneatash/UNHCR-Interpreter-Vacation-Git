import { actions } from "./action.names";

const INITIAL_STATE={
    leaves:[null]
}

export const leaveReducer =(state=INITIAL_STATE,action)=>{
    switch (action.type) {
        case actions.addTheLeaveToStore:
            return ({
                ...state,
                leaves:[...state.leaves,{...action.payload}]
            })
        case actions.setLeavesFromDBToStore:
            if (action.payload) {
                return ({
                    ...state,
                    leaves: [...action.payload.leaves]
                })    
            }else{
                return {...state}
            }            
        default:
            return state;
    }
}