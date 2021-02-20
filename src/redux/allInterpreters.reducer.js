import { actions } from "./action.names";


const INITIAL_STATE={
    allInterpreters:[]
};

const allInterpretersReducer = (state=INITIAL_STATE,action)=>{
    switch (action.type) {
        case actions.setAllInterpretersFromDBToStore:
            return(
                {
                    ...state,                
                    allInterpreters:[...action.payload]
                }
            )           
        default:
            return state;
    }
}


export default allInterpretersReducer;