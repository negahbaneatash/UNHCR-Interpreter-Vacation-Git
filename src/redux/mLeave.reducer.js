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
        // case actions.deleteTheLeaveFromStore:
        //     let helpArrDelete = []
        //     helpArrDelete = state.mLeaves.filter((leave)=>{if (leave.leaveId === action.payload) {
        //         return false
        //     } else {
        //         return true
        //     }})
        //     return ({
        //         ...state,
        //         mLeaves:[...helpArrDelete]
        //     })
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
        case actions.removeAllLeavesFromStore:
            return INITIAL_STATE
        default:
            return state;
    }
}