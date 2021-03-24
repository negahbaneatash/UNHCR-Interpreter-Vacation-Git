import { React, Component } from "react";
import PhoneSignin from "../phone-signin/phoneSignin.compo";
import {Container,Jumbotron} from 'react-bootstrap'
import './userSignin.style.css'
import GoogleSignin from "../google-signin/googleSignin.compo";
import { ReactComponent as GoogleLogo } from "../../assets/google.svg";
import { ReactComponent as PhoneLogo } from "../../assets/phoneotp.svg";
import { connect } from "react-redux";
import { Login_Status } from "../../redux/waiting.reducer";


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
    }

    handleClickPhoneLogo=()=>{        
        this.setState({...this.state, loginType:'phoneLogin',message:'An OTP will be sent to your following Phone Number',msgClass:'phone-login'}, ()=>{this.toggleShow()})
    }
    
    handleClickBack=()=>{
        this.setState({...this.state, loginType:'',message:'Please choose to login via your Gmail Account or your Phone Number',msgClass:'choose-login'}, ()=>{this.toggleShow()})
    }
   
    showButton=(conf)=>{
        this.setState({...this.state,showTestButton:conf})
    }

    showWaiting=()=>{
        console.log('from switch this.props.signinState:',this.props.signinState)
        switch (this.props.signinState) {
            case Login_Status.googleLoginSuccessful:
                console.log('case 1')
                return <h3>SUCCESSFUL</h3>              
            case Login_Status.waitingForGoogleSignin:
                console.log('case 2')
                return <h3>Going to google signin</h3>          
            case Login_Status.waitingForPhoneSignin:
                console.log('case 3')
                return <h3>Enter your OTP</h3>          
            case Login_Status.googleLoginFailed:
                console.log('case 4')
                return <h3>Google Login Failed, signIn Using your own Gmail account</h3>          
            case Login_Status.phoneLoginFailed:
                console.log('case 5')
                return <h3>Phone Login Failed, signin Using your own phone number</h3>          
            case Login_Status.waitingForConfirmation:
                console.log('case 6')
                return <h3>Waiting for confirmation</h3>                                          
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
                        {loginType==='googleLogin'?<GoogleSignin googleAccount={this.state.censoredEmail} isConfirmed={this.showButton}/>:null}                  
                        {loginType==='phoneLogin'?<PhoneSignin phoneNumber={this.state.censoredPhoneNumber} />:null}                  
                        {(isShowing) && <button className='btn-back' onClick={this.handleClickBack}>Back</button>}
                        

                    </Jumbotron>
                    {/* {loginType==='googleLogin'?<GoogleSignin googleAccount={this.state.censoredEmail}/>:null}                   */}
                    {/* {loginType==='phoneLogin'?<PhoneSignin/>:null}                   */}
                    <div className='recapcha-container'>
                        <div id='recapcha-container'></div>
                        {/* {this.props.showTestButton?<button>Please Wait ...</button>:null} */}
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