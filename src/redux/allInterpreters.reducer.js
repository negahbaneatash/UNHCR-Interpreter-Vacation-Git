

const INITIAL_STATE={
    allInterpreters:[{interpreter1:'abouzar'}]
};

const allInterpretersReducer = (state=INITIAL_STATE,action)=>{
    switch (action.type) {
        case "SET_ALL_INTERPRETERS":
            return{
                ...state,                
                allInterpreters:[...action.payload]
            }       
    
        default:
            return state;
    }
}

export default allInterpretersReducer;