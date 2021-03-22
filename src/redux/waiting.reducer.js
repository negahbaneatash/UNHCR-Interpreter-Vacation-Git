


const INITIAL_STATE = {
    waiting:false
};

const isWaitingReducer = (state=INITIAL_STATE,action)=>{
    switch (action.type) {
        case 'PLEASE_WAIT':
            return {
                ...state,
                waiting:action.payload
            }
        default:
            return state;
    }
}

export default isWaitingReducer;