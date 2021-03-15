import { React, Component } from "react";
import PhoneSignin from "../phone-signin/phoneSignin.compo";
import {Container,Jumbotron} from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import './userSignin.style.css'
import GoogleSignin from "../google-signin/googleSignin.compo";
import { ReactComponent as GoogleLogo } from "../../assets/google.svg";
import { ReactComponent as PhoneLogo } from "../../assets/phoneotp.svg";


class UserSignin extends Component {
    constructor(){
        super()
        this.state={
            message:'Please choose to login via your Gmail Account or your Phone Number',
            msgClass:'choose-login',
            isShowing:false,
            loginType:'',
            censoredEmail:'',
            censoredPhoneNumber:''

        }
    }
    
    componentDidMount(){
        console.log('from UserSignin componentDidMount')
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
        gmail_name = gmail_name[0]+gmail_name[1]+' *** '+gmail_name[gmail_name.length-2]+gmail_name[gmail_name.length-1]
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
   

    render(){
        console.log('from UserSignin render')
        const {isShowing,loginType}=this.state
        return(
            
            <div>
                <Container>
                
                    <Jumbotron>
                        <h6 className={`login-message ${this.state.msgClass}`}  >{this.state.message}</h6>
                        <div className= 'signin-buttons-container'>               
                            {(!isShowing) && <GoogleLogo className='google-logo'  onClick={this.handleClickGoogleLogo}/>}                            
                            {(!isShowing) && <PhoneLogo className='phone-logo' onClick={this.handleClickPhoneLogo}/>}                                                        
                        </div>
                        
                        {/* {(isShowing) && <h3 className='loginType-message'>{loginType==='googleLogin'?`${this.state.censoredEmail}`:`${this.state.censoredPhoneNumber}`}</h3>}                                   */}
                        {loginType==='googleLogin'?<GoogleSignin googleAccount={this.state.censoredEmail}/>:null}                  
                        {loginType==='phoneLogin'?<PhoneSignin phoneNumber={this.state.censoredPhoneNumber}/>:null}                  
                        {(isShowing) && <button className='btn-back' onClick={this.handleClickBack}>Back</button>}
                        

                    </Jumbotron>
                    {/* {loginType==='googleLogin'?<GoogleSignin googleAccount={this.state.censoredEmail}/>:null}                   */}
                    {/* {loginType==='phoneLogin'?<PhoneSignin/>:null}                   */}
                    <div className='recapcha-container'>
                        <div id='recapcha-container'></div>
                    </div>
                </Container>
                <div className='attribute-the-author'>
                    <div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
                </div>
                
            </div>        
    )}
}



export default UserSignin;