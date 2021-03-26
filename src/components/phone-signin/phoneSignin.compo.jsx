

import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import firebase, { myFireauth }  from "../../firebase/firebaseConfig";
import { store } from "../../redux/store";
import { Login_Status } from "../../redux/waiting.reducer";
import PhoneSigninButton from "../phone-signin-button/phoneSigninButton.compo";




class PhoneSignin extends React.Component {
    constructor(){
        super()
        this.state={
            // userConfirmed:false,
            userPhoneNumber:'',
            userOTP:'',
            otpSent:false
        }
    }
    otpWasSent=null;

    componentDidMount(){
        const {theSupervisor,theInterpreter} = this.props;
        if (theInterpreter) {
            this.setState({...this.state,userPhoneNumber:theInterpreter.phoneNumber})
        }else if (theSupervisor) {
            this.setState({...this.state,userPhoneNumber:theSupervisor.phoneNumber})
        }
    }
    
    handleClick = async()=>{
        const {userPhoneNumber} = this.state
        console.log('from PhoneSignin handle click')
        await store.dispatch({type:Login_Status.waitingForPhoneSignin})
        //info: making the recapcha 
        let myRecapchaVerifier =  new firebase.auth.RecaptchaVerifier('recapcha-container',{
            'size':'normal',
            'callback':(resolve)=>{
                console.log('recapcha solved, probably a msg will be sent to you')
                console.log('from recapcha callback resolve',resolve)   
                store.dispatch({type:'RECAPCHA_SOLVED'})             
            },
            'expired-callback':()=>{
                console.log('from recapcha expired callback')
                console.log('your time to enter OTP ended, please refresh and try again')
                store.dispatch({type:'RECAPCHA_EXPIRED'})
            }
        });
                
        //info: showing the recapcha challenge to user and send message if recapcha solved
        myFireauth.signInWithPhoneNumber(userPhoneNumber,myRecapchaVerifier)
        .then((confirmationResult)=>{
            //SMS sent
            this.otpWasSent=confirmationResult
            store.dispatch({type:'OTP_SENT'})
            this.setState({...this.state,otpSent:true})
        }).catch((error)=>{
            console.log('there was an error sms not sent, please refresh and try again')
            console.log('from signInWithPhoneNumber error: ',error)
            store.dispatch({type:'OTP_COULDNNOT_SENT'})
            // If signInWithPhoneNumber results in an error, reset the reCAPTCHA so the user can try again:
            // Or, if you haven't stored the widget ID:
            // window.recaptchaVerifier.render().then(function(widgetId) {
            // grecaptcha.reset(widgetId);
            // }
        });

        
        


    //    .then((confirmRes)=>{
    //         const otpCode=prompt('Enter OTP','')
    //         if (otpCode === null) return
    //         confirmRes.confirm(otpCode).then((finalResult)=>{
    //             console.log('user', finalResult.user)
    //             // if (this.props.theInterpreter.phone === finalResult.user.phoneNumber) {
    //             //     this.setState({...this.state,userConfirmed:true})
    //             // }
                
    //         })
    //    }).catch((error)=>{
    //         console.log('error is :',error)
    //    })
           
       
    }

    handleInputChange=(event)=>{
        this.setState({...this.state,userOTP:event.target.value})
    }

    componentDidUpdate(){
        if (this.props.otpEntered.length>=6) {
            //info: after msg sent, confirm the entered code:
            // const otpCode=prompt('Enter OTP','')
            const otpCode=this.props.otpEntered;
            this.otpWasSent.confirm(otpCode).then((result)=>{
            store.dispatch({type:'OTP_CORRECT'})
            const user=result.user;
            console.log('from otpConfirmClick user:',user)
            // onAuthStateChanged will be called and will set the user 
            // set the user 
        }).catch((error)=>{
            store.dispatch({type:'OTP_WRONG'})
            console.log('from otp cinfirmation error:',error)
            console.log('the OTP is wrong, please refresh and try again')
            })
        }
    }

    // otpConfirmClick=()=>{
    //     //info: after msg sent, confirm the entered code:
    //     // const otpCode=prompt('Enter OTP','')
    //     const otpCode=this.state.userOTP;
    //     this.otpWasSent.confirm(otpCode).then((result)=>{
    //         store.dispatch({type:'OTP_CORRECT'})
    //         const user=result.user;
    //         console.log('from otpConfirmClick user:',user)
    //         // onAuthStateChanged will be called and will set the user 
    //         // set the user 
    //     }).catch((error)=>{
    //         store.dispatch({type:'OTP_WRONG'})
    //         console.log('from otp cinfirmation error:',error)
    //         console.log('the OTP is wrong, please refresh and try again')
    //     })
    // }
 
    render(){
        return(
            <div >
                {/* { this.state.userConfirmed ? <Redirect to='/interpreter/submitleave'/> : null }                 */}
                <PhoneSigninButton phoneButtonClicked={this.handleClick}>{`Send OTP to:   ${this.props.phoneNumberHint}`}</PhoneSigninButton>
                {this.state.otpSent && <input name='userInput' value={this.state.userOTP} onChange={this.handleInputChange}/>}
                {this.state.otpSent && <button onClick={this.otpConfirmClick}>submit OTP</button>}
                <label>{this.props.otpEntered}</label>
            </div>

        )

    }
}

const mapStateToProps =(state)=>{
    return{
    theInterpreter:state.Interpreter.theInterpreter,
    theSupervisor:state.Supervisor.theSupervisor
    }
}

export default connect(mapStateToProps)(PhoneSignin);


