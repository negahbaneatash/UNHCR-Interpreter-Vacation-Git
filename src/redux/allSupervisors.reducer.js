import { actions } from "./action.names";


const INITIAL_STATE={
    allSupervisors:[]
}

const allSupervisors =(state=INITIAL_STATE,action)=>{
    switch (action.type) {
        case actions.setAllSupervisorsFromDBToStore:            
            return(
                {
                    ...state,
                    allSupervisors:[...action.payload]
                }
            )    
        default:
            return state
    }
}


export default allSupervisors;