

const INITIAL_STATE={
    theInterpreter:null
}

const theInterpreterReducer=(state=INITIAL_STATE,action)=>{
    switch (action.type) {
        case "SET_THE_INTERPRETER":
            return {
                ...state,
                theInterpreter:action.payload
            }    
        default:
            return state;
    }
}


export default theInterpreterReducer;