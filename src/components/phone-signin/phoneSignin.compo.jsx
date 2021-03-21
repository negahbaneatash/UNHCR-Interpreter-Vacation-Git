
import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import firebase, { myFireauth }  from "../../firebase/firebaseConfig";
import PhoneSigninButton from "../phone-signin-button/phoneSigninButton.compo";




class PhoneSignin extends React.Component {
    constructor(){
        super()
        this.state={
            userConfirmed:false,
            userPhoneNumber:''
        }
    }
    
    componentDidMount(){
        const {theSupervisor,theInterpreter} = this.props;
        if (theInterpreter) {
            this.setState({...this.state,userPhoneNumber:theInterpreter.phoneNumber})
        }else if (theSupervisor) {
            this.setState({...this.state,userPhoneNumber:theSupervisor.phoneNumber})
        }
    }
    
    handleClick = ()=>{
        console.log('from PhoneSignin handle click')
        let myRecapcha =  new firebase.auth.RecaptchaVerifier('recapcha-container');
    
        
        myFireauth.signInWithPhoneNumber(this.state.userPhoneNumber,myRecapcha)
       .then((confirmRes)=>{
            const otpCode=prompt('Enter OTP','')
            if (otpCode === null) return
            confirmRes.confirm(otpCode).then((finalResult)=>{
                console.log('user', finalResult.user)
                // if (this.props.theInterpreter.phone === finalResult.user.phoneNumber) {
                //     this.setState({...this.state,userConfirmed:true})
                // }
                
            })
       }).catch((error)=>{
            console.log('error is :',error)
       })
           
       
    }


    render(){
        return(
            <div >
                { this.state.userConfirmed ? <Redirect to='/interpreter/submitleave'/> : null }                
                <PhoneSigninButton phoneButtonClicked={this.handleClick}>{`Send OTP to:   ${this.props.phoneNumber}`}</PhoneSigninButton>
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


