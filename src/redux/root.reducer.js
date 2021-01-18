import { persistReducer } from "redux-persist";
import  locStorage  from "redux-persist/lib/storage";

import  allInterpretersReducer  from "./allInterpreters.reducer";
import theInterpreterReducer from "./theInterpreter.reducer";
import  theUserReducer  from "./theUser.reducer";


const myPersistConfig = {
    key:"root",
    storage:locStorage,
    whiteList:['Interpreters','Interpreter']
}

const rootReducer =(state={},action)=>{
    return{
        Interpreters:allInterpretersReducer(state.Interpreters,action),
        Interpreter:theInterpreterReducer(state.Interpreter,action),
        User:theUserReducer(state.User,action)
    }
}

const persistedRootReducer = persistReducer(myPersistConfig,rootReducer)

export default persistedRootReducer;