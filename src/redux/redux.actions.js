import { actions } from "./action.names"


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

export const setLeavesFromDBToStore_Action=(leavesOfTheMonth)=>{
    return{
        type: actions.setLeavesFromDBToStore,
        payload: leavesOfTheMonth
    }
}

// the other actions to be written and centralized here