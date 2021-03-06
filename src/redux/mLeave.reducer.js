import Leave from "../objects/leaveObj";
import { actions } from "./action.names";
// import { leaveStatus } from "../objects/leaveObj";


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
            const helpArrApprove = state.mLeaves.map((leave)=>{
                if (action.payload===leave.leaveId) {
                    return {...leave,leaveStatus:Leave.leaveStatus.approved}
                } else {
                    return leave
                }
            })
            return {
                ...state,
                mLeaves:[...helpArrApprove]
            }       
        case actions.rejectTheLeaveToStore:
            const helpArrReject = state.mLeaves.map((leave)=>{
                if (action.payload===leave.leaveId) {
                    return {...leave,leaveStatus:Leave.leaveStatus.rejected}
                } else {
                    return leave
                }
            })
            return {
                ...state,
                mLeaves:[...helpArrReject]
            }
        case actions.resetTheLeaveToStore:
            const helpArrReset = state.mLeaves.map((leave)=>{
                if (action.payload===leave.leaveId) {
                    return {...leave,leaveStatus:Leave.leaveStatus.submitted}
                } else {
                    return leave
                }
            })
            return {
                ...state,
                mLeaves:[...helpArrReset]
            }    
        case actions.removeAllLeavesFromStore:
            return INITIAL_STATE
        default:
            return state;
    }
}