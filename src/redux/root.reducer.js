import { persistReducer } from "redux-persist";
import  locStorage  from "redux-persist/lib/storage";

import  allInterpretersReducer  from "./allInterpreters.reducer";
import  allSupervisorsReducer  from "./allSupervisors.reducer";
import  theInterpreterReducer  from "./theInterpreter.reducer";
import  theSupervisorReducer  from "./theSupervisor.reducer";
import  theUserReducer  from "./theUser.reducer";
import  { leaveReducer } from "./leave.reducer";
import { mLeaveReducer } from "./mLeave.reducer";
import isWaitingReducer from "./waiting.reducer";



const myPersistConfig = {
    key:"root",
    storage:locStorage,
    whiteList:['Interpreter']
}

const rootReducer =(state={},action)=>{
    return{        
        Interpreters:allInterpretersReducer(state.Interpreters,action),
        Supervisors:allSupervisorsReducer(state.Supervisors,action),        
        Interpreter:theInterpreterReducer(state.Interpreter,action),
        Supervisor:theSupervisorReducer(state.Supervisor,action),        
        User:theUserReducer(state.User,action),
        Leaves: leaveReducer(state.Leaves,action),
        Mleaves:mLeaveReducer(state.Mleaves,action),
        Waiting:isWaitingReducer(state.Waiting,action)
    }
}

const persistedRootReducer = persistReducer(myPersistConfig,rootReducer)


export default persistedRootReducer;