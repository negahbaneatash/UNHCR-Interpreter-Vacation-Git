import { actions } from "./action.names"




export const setTheUserToStore_Action =(theUser)=>{
    return{
        type: actions.setTheUserToStore,
        payload: theUser
    }
}

