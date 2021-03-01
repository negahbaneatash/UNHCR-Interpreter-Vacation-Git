import { actions } from "./action.names"


export const setAllInterpretersFromDBToStore_Action = (allInterpreters)=>{
    return{
        type: actions.setAllInterpretersFromDBToStore,
        payload: allInterpreters
    }
}

export const setAllSupervisorsFromDBToStore_Action = (allSupervisors)=>{
    return{
        type: actions.setAllSupervisorsFromDBToStore,
        payload: allSupervisors
    }
}

export const setTheUserToStore_Action =(theUser)=>{
    return{
        type: actions.setTheUserToStore,
        payload: theUser
    }
}

export const setTheInterpreterToStore_Action = (theInterpreter)=>{
    return{
        type: actions.setTheInterpreterToStore,
        payload: theInterpreter
    }
}

export const setTheSupervisorToStore_Action = (theSupervisor)=>{
    return{
        type: actions.setTheSupervisorToStore,
        payload: theSupervisor
    }
}

export const setLeavesFromDBToStore_Action=(leavesOfTheMonth)=>{
    return{
        type: actions.setLeavesFromDBToStore,
        payload: leavesOfTheMonth
    }
}

export const addTheLeaveToStore_Action=(newLeave)=>{
    return {
        type: actions.addTheLeaveToStore,
        payload: newLeave
    }
}

export const addToAllLeavesToStore_Action=(leavesOfTheMonth)=>{
    return {
        type: actions.addToAllLeavesToStore,
        payload: leavesOfTheMonth
    }
}

export const deleteTheLeaveFromStore_Action=(leaveId)=>{
    return{
        type:actions.deleteTheLeaveFromStore,
        payload: leaveId
    }
}

export const removeAllLeavesFromStore_Action =()=>{
    return{
        type: actions.removeAllLeavesFromStore,
        payload:null
    }
}

export const approveTheLeaveToStore_Action =(leaveId)=>{
    return{
        type: actions.approveTheLeaveToStore,
        payload: leaveId
    }
}

export const rejectTheLeaveToStore_Action =(leaveId)=>{
    return{
        type: actions.rejectTheLeaveToStore,
        payload: leaveId
    }
}
// the other actions to be written and centralized here