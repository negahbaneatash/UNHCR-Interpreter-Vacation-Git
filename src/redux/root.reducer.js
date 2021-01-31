import { persistReducer } from "redux-persist";
import  locStorage  from "redux-persist/lib/storage";

import  allInterpretersReducer  from "./allInterpreters.reducer";
import theInterpreterReducer from "./theInterpreter.reducer";
import  theUserReducer  from "./theUser.reducer";
import { leavesReducer } from "./leaves.reducer";


const myPersistConfig = {
    key:"root",
    storage:locStorage,
    whiteList:['Interpreter']
}

const rootReducer =(state={},action)=>{
    return{
        Interpreters:allInterpretersReducer(state.Interpreters,action),
        Interpreter:theInterpreterReducer(state.Interpreter,action),
        User:theUserReducer(state.User,action),
        Leaves: leavesReducer(state.Leaves,action)
    }
}

const persistedRootReducer = persistReducer(myPersistConfig,rootReducer)

export default persistedRootReducer;