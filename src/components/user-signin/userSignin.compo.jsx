import { React, Component } from "react";
import PhoneSignin from "../phone-signin/phoneSignin.compo";
import {Container,Jumbotron} from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import './userSignin.style.css'
import GoogleSignin from "../google-signin/googleSignin.compo";



class UserSignin extends Component {
    constructor(){
        super()
        this.state={
            message:'please login via your Gmail or your Phone',
            msgColor:'red',
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
        let censoredNumber = phoneNumber[0]+phoneNumber[1]+phoneNumber[2]+phoneNumber[3]+' *** '+phoneNumber[phoneNumber.length-2]+phoneNumber[phoneNumber.length-1]
        return censoredNumber
    }

    toggleShow=()=>{
        this.setState({...this.state, isShowing:!this.state.isShowing})  
        
    }
    
   
    
   

    render(){
        console.log('from UserSignin render')
        const {isShowing,loginType}=this.state
        return(
            
            <div>
                <Container>
                <h3 style={{color:this.state.msgColor}}>{this.state.message}</h3>
                    <Jumbotron>
                        <div className= 'signin-buttons-container'>               
                            {(!isShowing) && <Button className='btn-google-login'  onClick={()=>{this.setState({...this.state, loginType:'googleLogin'}, ()=>{this.toggleShow()});  }}>google login</Button>}                            
                            {(isShowing) && <Button className='btn-login-cancel' onClick={()=>{this.setState({...this.state, loginType:''}, ()=>{this.toggleShow()});  }}>Cancel</Button>}
                            {(!isShowing) && <Button className='btn-phone-login' onClick={()=>{this.setState({...this.state, loginType:'phoneLogin'}, ()=>{this.toggleShow()});  }}>phone login</Button>}                            
                            
                        </div>
                        
                        {(isShowing) && <h3>{loginType==='googleLogin'?`You will be redirected to login via your gmail: ${this.state.censoredEmail}`:`An OTP will be sent to your Phone Number: ${this.state.censoredPhoneNumber}`}</h3>}
                        {(isShowing) && <button onClick={()=>{this.setState({...this.state, loginType:''}, ()=>{this.toggleShow()});  }}>Back</button>}
                        

                    </Jumbotron>
                    {loginType==='googleLogin'?<GoogleSignin/>:null}                  
                    {loginType==='phoneLogin'?<PhoneSignin/>:null}                  
                </Container>
                
                
            </div>        
    )}
}



export default UserSignin;