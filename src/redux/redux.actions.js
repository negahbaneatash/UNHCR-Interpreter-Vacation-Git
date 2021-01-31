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

