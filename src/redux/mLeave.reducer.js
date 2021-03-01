import { act } from "react-dom/test-utils";
import { leaveStatus } from "../objects/leaveObj";
import { actions } from "./action.names";


const INITIAL_STATE = {
    mLeaves:[]
}

export const mLeaveReducer = (state=INITIAL_STATE,action)=>{
    switch (action.type) {
        case actions.addToAllLeavesToStore:            
            if (action.payload) {
                return ({
                    ...state,
                    mLeaves:[...state.mLeaves,...action.payload.leaves]
                })    
            }else{                
                return {mLeaves:[...state.mLeaves]}
            }               
        case actions.approveTheLeaveToStore:
            const tempArray1 = state.mLeaves.map((leave)=>{
                if (action.payload===leave.id) {
                    return {...leave,leaveStatus:leaveStatus.approved}
                } else {
                    return leave
                }
            })
            return {
                ...state,
                mLeaves:[...tempArray1]
            }
        case actions.rejectTheLeaveToStore:
            const tempArray2 = state.mLeaves.map((leave)=>{
                if (action.payload===leave.id) {
                    return {...leave,leaveStatus:leaveStatus.rejected}
                } else {
                    return leave
                }
            })
            return {
                ...state,
                mLeaves:[...tempArray2]
            }
        case actions.removeAllLeavesFromStore:
            return INITIAL_STATE
        default:
            return state;
    }
}