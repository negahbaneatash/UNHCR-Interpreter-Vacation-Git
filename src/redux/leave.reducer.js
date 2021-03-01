import { leaveStatus } from "../objects/leaveObj";
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
                let helpArrEmpty=[]
                return {leaves:[...helpArrEmpty]}
            }   
        case actions.deleteTheLeaveFromStore:
            let helpArrDelete = []
            helpArrDelete = state.leaves.filter((leave)=>{return (leave.leaveId !== action.payload)})
            return ({
                ...state,
                leaves:[...helpArrDelete]
            })
        case actions.approveTheLeaveToStore:
            const helpArrApprove = state.leaves.map((leave)=>{
                if (action.payload===leave.leaveId) {
                    return {...leave,leaveStatus:leaveStatus.approved}
                } else {
                    return leave
                }
            })
            return {
                ...state,
                leaves:[...helpArrApprove]
            }
        case actions.rejectTheLeaveToStore:
            const helpArrReject = state.leaves.map((leave)=>{
                if (action.payload===leave.leaveId) {
                    return {...leave,leaveStatus:leaveStatus.rejected}
                } else {
                    return leave
                }
            })
            return {
                ...state,
                leaves:[...helpArrReject]
            }
        case actions.removeAllLeavesFromStore:
            return INITIAL_STATE
        default:
            return state;
    }
}