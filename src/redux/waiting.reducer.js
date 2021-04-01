
export const Login_Status ={
    waitingForGoogleSignin:'WAIT_FOR_GOOGLE_SIGNIN',
    waitingForPhoneSignin:'WAIT_FOR_PHONE_SIGNIN',
    waitingForConfirmation:'WAIT_FOR_CONFIRMATION',
    googleLoginSuccessful:'GOOGLE_LOGIN_SUCCESSFUL',
    
    googleLoginFailed:'GOOGLE_LOGIN_FAILED',
    
    signinInitialState:'SIGNIN_INITIAL_STATE',
    loadingFromDB:'LOADING_FROM_DATABASE',
    loadedFromDB:'LOADED_FROM_DATABASE',
    uploadingToDB:'UPLOADING_TO_DATABASE',
    uploadedToDB:'UPLOADED_TO_DATABASE',
    recapchaWasSolved: 'RECAPCHA_WAS_SOLVED',
    recapchaWasExpired: 'RECAPCHA_WAS_EXPIRED',
    otpSendingDone:'OTP_SENDING_DONE',
    otpSendingFailed:'OTP_SENDING_FAILED',
    otpIsCorrect:'OTP_IS_CORRECT',
    otpIsWrong:'OTP_IS_WRONG'



}

const INITIAL_STATE = {
    signingInState:'',
};

const isWaitingReducer = (state=INITIAL_STATE,action)=>{
    switch (action.type) {
//GOOGLE SIGNIN        
        case Login_Status.waitingForGoogleSignin:
            return {
                ...state,
                signingInState:Login_Status.waitingForGoogleSignin,
            }
        case Login_Status.waitingForConfirmation:
            return {
                ...state,
                signingInState:Login_Status.waitingForConfirmation,
            }
        case Login_Status.googleLoginFailed:
            return {
                ...state,
                signingInState:Login_Status.googleLoginFailed,
            }
        case Login_Status.googleLoginSuccessful:
            return {
                ...state,
                signingInState:Login_Status.googleLoginSuccessful,
            }
//PHONE SIGNIN            
        case Login_Status.waitingForPhoneSignin:
            return {
                ...state,
                signingInState:Login_Status.waitingForPhoneSignin,
            }
        case Login_Status.recapchaWasSolved:
                return {
                    ...state,
                    signingInState:Login_Status.recapchaWasSolved,
                }    
        case Login_Status.recapchaWasExpired:
                return {
                    ...state,
                    signingInState:Login_Status.recapchaWasExpired,
                }    
        case Login_Status.otpSendingDone:
                return {
                    ...state,
                    signingInState:Login_Status.otpSendingDone,
                }
        case Login_Status.otpSendingFailed:
                return {
                    ...state,
                    signingInState:Login_Status.otpSendingFailed,
                }                
                case Login_Status.otpIsCorrect:
                return {
                    ...state,
                    signingInState:Login_Status.otpIsCorrect,
                }                
                case Login_Status.otpIsWrong:
                return {
                    ...state,
                    signingInState:Login_Status.otpIsWrong,
                }                
        
//DB WAITING            
            case Login_Status.loadingFromDB:
            return {
                ...state,
                signingInState:Login_Status.loadingFromDB,
            }
            case Login_Status.loadedFromDB:
            return {
                ...state,
                signingInState:Login_Status.loadedFromDB,
            }
            case Login_Status.signinInitialState:
            return INITIAL_STATE
        default:
            return state;
    }
}

export default isWaitingReducer;