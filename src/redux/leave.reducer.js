import { actions } from "./action.names";

const INITIAL_STATE={
    leaves:[]
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
                let tempArray1=[]
                return {leaves:[...tempArray1]}
            }   
        case actions.deleteTheLeaveFromStore:
            let tempArray2 = []
            tempArray2 = state.leaves.filter((leave)=>{return (leave.id !== action.payload)})
            return ({
                ...state,
                leaves:[...tempArray2]
            })
        case actions.addToAllLeavesToStore:            
            if (action.payload) {
                return ({
                    ...state,
                    leaves:[...state.leaves,...action.payload.leaves]
                })    
            }else{                
                return {leaves:[...state.leaves]}
            }               
        case actions.removeAllLeavesFromStore:
            return INITIAL_STATE
        default:
            return state;
    }
}