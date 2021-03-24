
export const Login_Status ={
    waitingForGoogleSignin:'WAIT_FOR_GOOGLE_SIGNIN',
    waitingForPhoneSignin:'WAIT_FOR_PHONE_SIGNIN',
    waitingForConfirmation:'WAIT_FOR_CONFIRMATION',
    googleLoginSuccessful:'GOOGLE_LOGIN_SUCCESSFUL',
    phoneLoginSuccessful:'PHONE_LOGIN_SUCCESSFUL',
    googleLoginFailed:'GOOGLE_LOGIN_FAILED',
    phoneLoginFailed:'PHONE_LOGIN_fAILED',
    signinInitialState:'SIGNIN_INITIAL_STATE'
}

const INITIAL_STATE = {
    signingInState:'',
};

const isWaitingReducer = (state=INITIAL_STATE,action)=>{
    switch (action.type) {
        case Login_Status.waitingForGoogleSignin:
            return {
                ...state,
                signingInState:Login_Status.waitingForGoogleSignin,
            }
        case Login_Status.waitingForPhoneSignin:
            return {
                ...state,
                signingInState:Login_Status.waitingForPhoneSignin,
            }
            case Login_Status.waitingForConfirmation:
            return {
                ...state,
                signingInState:Login_Status.waitingForConfirmation,
            }
            case Login_Status.googleLoginSuccessful:
            return {
                ...state,
                signingInState:Login_Status.googleLoginSuccessful,
            }
            case Login_Status.phoneLoginSuccessful:
            return {
                ...state,
                signingInState:Login_Status.phoneLoginSuccessful,
            }
            case Login_Status.googleLoginFailed:
            return {
                ...state,
                signingInState:Login_Status.googleLoginFailed,
            }
            case Login_Status.phoneLoginFailed:
            return {
                ...state,
                signingInState:Login_Status.phoneLoginFailed,
            }
            case Login_Status.signinInitialState:
            return INITIAL_STATE
        default:
            return state;
    }
}

export default isWaitingReducer;