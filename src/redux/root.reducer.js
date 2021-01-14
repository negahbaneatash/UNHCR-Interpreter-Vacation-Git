import  allInterpretersReducer  from "./allInterpreters.reducer";
import theInterpreterReducer from "./theInterpreter.reducer";
import  theUserReducer  from "./theUser.reducer";


const INITIAL_STATE ={
    allInterpreters:null,
    theUser:null
}

const rootReducer =(state=INITIAL_STATE,action)=>{
    return{
        Interpreters:allInterpretersReducer(state.Interpreters,action),
        Interpreter:theInterpreterReducer(state.Interpreter,action),
        User:theUserReducer(state.User,action)
    }
}


export default rootReducer;