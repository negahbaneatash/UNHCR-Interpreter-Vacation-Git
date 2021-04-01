import { React, Component } from "react";
import PhoneSignin from "../phone-signin/phoneSignin.compo";
import {Container,Jumbotron} from 'react-bootstrap'
import './userSignin.style.css'
import GoogleSignin from "../google-signin/googleSignin.compo";
import { ReactComponent as GoogleLogo } from "../../assets/google.svg";
import { ReactComponent as PhoneLogo } from "../../assets/phoneotp.svg";
import { connect } from "react-redux";
import { Login_Status } from "../../redux/waiting.reducer";
import CustomLoadingIcon from "../custom-loading-icon/customLoadingIcon.compo";
import { ReactComponent as LoginFailed } from "../../assets/failed.svg";
import CustomOtpInput from "../custom-otp-input/customOtpInput.compo";
import { store } from "../../redux/store";


class UserSignin extends Component {
    constructor(){
        super()
        this.state={
            message:'Please choose to login via your Gmail Account or your Phone Number',
            msgClass:'choose-login',
            isShowing:false,
            loginType:'',
            censoredEmail:'',
            censoredPhoneNumber:'',
            showTestButton:false,
            otpIn:'',
            otpDone:false
        }
    }
    
    componentDidMount(){
        console.log('from UserSignin componentDidMount this.props',this.props)
        const {theInterpreter,theSupervisor}=this.props
        let censoredEmail =''
        let censoredPhoneNumber =''
        if (theInterpreter) {
            censoredEmail=this.censorEmail(theInterpreter.email)
            censoredPhoneNumber=this.censorPhoneNumber(theInterpreter.phoneNumber)    
        }else if (theSupervisor) {
            censoredEmail=this.censorEmail(theSupervisor.email)
            censoredPhoneNumber=this.censorPhoneNumber(theSupervisor.phoneNumber)    
        }        
        this.setState({...this.state,censoredEmail,censoredPhoneNumber})
    }

    
    
    

    censorEmail=(gmail)=>{ //it is supposed to be only gmails
        let gmail_name = gmail.split('@gmail.com')[0]
        gmail_name = gmail_name[0]+gmail_name[1]+' ***** '+gmail_name[gmail_name.length-2]+gmail_name[gmail_name.length-1]
        return (gmail_name+'@gmail.com')
    }
    censorPhoneNumber=(phoneNumber)=>{
        let censoredNumber = phoneNumber[0]+phoneNumber[1]+phoneNumber[2]+phoneNumber[3]+phoneNumber[4]+' ****** '+phoneNumber[phoneNumber.length-2]+phoneNumber[phoneNumber.length-1]
        return censoredNumber
    }

    toggleShow=()=>{
        this.setState({...this.state, isShowing:!this.state.isShowing})  
        
    }
    
    handleClickGoogleLogo=()=>{
        this.setState({...this.state, loginType:'googleLogin',message:'You will be redirected to login via your following Gmail Account',msgClass:'google-login'}, ()=>{this.toggleShow()})
        store.dispatch({type:Login_Status.signinInitialState})
    }

    handleClickPhoneLogo=()=>{        
        this.setState({...this.state, loginType:'phoneLogin',message:'An OTP will be sent to your following Phone Number',msgClass:'phone-login'}, ()=>{this.toggleShow()})
        store.dispatch({type:Login_Status.signinInitialState})
    }
    
    handleClickBack=()=>{
        this.setState({...this.state, loginType:'',message:'Please choose to login via your Gmail Account or your Phone Number',msgClass:'choose-login',otpIn:''}, ()=>{this.toggleShow()})
        store.dispatch({type:Login_Status.signinInitialState})
    }
   
    showButton=(conf)=>{
        this.setState({...this.state,showTestButton:conf})
    }

    handleOtpInput=(input)=>{
        this.setState({...this.state,otpIn:input},()=>{if (this.state.otpIn.length===6) {
            this.setState({...this.state,otpDone:true})
        }})
    }

    showWaiting=()=>{
        console.log('from switch this.props.signinState:',this.props.signinState)
        switch (this.props.signinState) {
                
            case Login_Status.waitingForGoogleSignin:
                console.log('case 1 waitingForggleSignin')
                return (
                    <div className='waiting-items-container'>
                        <h6>Redirecting to google signin</h6>
                        <CustomLoadingIcon  cliClassName='waiting-loging-in' iconType={'cylon'} iconColor={'#7e567e'}  />
                    </div>                    
                )
            case Login_Status.waitingForConfirmation:
                console.log('case 2 waiting for confirmation')
                return (
                    <div className='waiting-items-container'>
                        <h6>Please wait while logging in to your account</h6>        
                        <CustomLoadingIcon  iconType='cylon' iconColor='#7e567e' />
                    </div>                    
                )
            case Login_Status.googleLoginFailed:
                console.log('case 3 googleLoginFailed')
                return (
                    <div className='waiting-items-container'>
                        <LoginFailed/>      
                        <h6>Google Login Failed</h6>          
                        <h6>Please make sure to sign in using your own gmail account mentioned above</h6>          
                    </div>                    
                )
            case Login_Status.googleLoginSuccessful:
                console.log('case 4 googleLoginSuccessful')
                return (
                    <div className='waiting-items-container'>
                        <h6>Login Successful</h6>          
                    </div>                    
                )
//phone signin                
            case Login_Status.waitingForPhoneSignin:
                console.log('case 5 waitingForPhoneSignin')
                return (
                    <div className='waiting-items-container'>
                        <div  id='recapcha-container'></div>       
                    </div>                    
                )
            case Login_Status.recapchaWasSolved:
                console.log('case 6 recapchaWasSolved')
                return(
                    <div className='waiting-items-container'>
                        <div  id='recapcha-container'></div>       
                        <h6>Thank you, a message is being sent to you</h6>   
                        {/* <CustomOtpInput handleOtpChange={this.handleOtpInput} otpFinished={this.state.otpDone}/> */}
                    </div>                    
                )
                case Login_Status.recapchaWasExpired:
                    console.log('case 7 recapchaWasExpireded')
                    return (
                        <div className='waiting-items-container'>
                            {/* <div aria-disabled id='recapcha-container'></div>        */}
                            <h6 style={{color:'red'}}>It took too long, please try again</h6>   
                        </div>                    
                    )
                case Login_Status.otpSendingDone:
                    return(
                        <div className='waiting-items-container'>
                            <h6>Please Enter your OTP</h6>   
                            <CustomOtpInput handleOtpChange={this.handleOtpInput} otpFinished={this.state.otpDone}/>
                        </div>                      
                    )
                case Login_Status.otpSendingFailed:
                    return(
                        <div className='waiting-items-container'>
                            <h6>There was an error while sending you the OTP code, Please try again</h6>   
                            
                        </div>                      
                    )
                    

            case Login_Status.otpIsWrong:
                console.log('case 5')
                return (
                    <div className='waiting-items-container'>
                        <LoginFailed/>      
                        <h6>Phone Login Failed</h6>          
                        <h6>Please make sure to enter the OTP correctly, and try again</h6>          
                    </div>                    
                  )
            case Login_Status.otpIsCorrect:
                return (
                    <div className='waiting-items-container'>
                        <h6>Login Successful</h6>          
                    </div>                    
                  )     
            
            case Login_Status.signinInitialState:
                console.log('case 7')
                return ''
            default:
                console.log('case default')
                return ''
        }
    }

    render(){
        console.log('from UserSignin render')
        const {isShowing,loginType}=this.state
        return(
            
            <div>
                <Container>
                
                    <Jumbotron>
                        <h6 className={`login-message ${this.state.msgClass}`}  >{this.state.message}</h6>
                        <div className= 'signin-buttons-container'>               
                            {(!isShowing) && <GoogleLogo className='google-logo'  onClick={this.handleClickGoogleLogo} />}                            
                            {(!isShowing) && <PhoneLogo className='phone-logo' onClick={this.handleClickPhoneLogo}/>}                                                        
                        </div>
                        
                        {/* {(isShowing) && <h3 className='loginType-message'>{loginType==='googleLogin'?`${this.state.censoredEmail}`:`${this.state.censoredPhoneNumber}`}</h3>}                                   */}
                        {loginType==='googleLogin'?<GoogleSignin googleAccountHint={this.state.censoredEmail} isConfirmed={this.showButton}/>:null}                  
                        {loginType==='phoneLogin'?<PhoneSignin phoneNumberHint={this.state.censoredPhoneNumber} otpEntered={this.state.otpIn} />:null}                  
                        {(isShowing) && <button className='btn-back' onClick={this.handleClickBack}>Back</button>}
                        

                    </Jumbotron>
                    <div className='login-status-container'>
                    {/* <div id='recapcha-container'></div>        */}
                        {this.showWaiting()}
                    </div>
                </Container>
                <div className='attribute-the-author'>
                    <div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
                </div>
                
            </div>        
    )}
}


const mapStateToProps=(state)=>({
    signinState:state.Waiting.signingInState
})
export default connect(mapStateToProps)(UserSignin) ;