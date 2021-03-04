
import React from "react";
import firebase, { myFireauth }  from "../../firebase/firebaseConfig";




class PhoneSignin extends React.Component {


    
    handleClick = ()=>{
        let myRecapcha =  new firebase.auth.RecaptchaVerifier('recapcha-container');
    
        const phoneNumber = '+601123109592'
        myFireauth.signInWithPhoneNumber(phoneNumber,myRecapcha)
       .then((confirmRes)=>{
            const otpCode=prompt('Enter OTP','')
            if (otpCode === null) return
            confirmRes.confirm(otpCode).then((finalResult)=>{
                console.log('user', finalResult.user)
                
            })
       }).catch((error)=>{
            console.log('error is :',error)
       })
           
       
    }


    render(){
        return(
            <div >
                <div id='recapcha-container'></div>
                <button onClick={this.handleClick}>Click on me</button>
            </div>

        )

    }
}

export default PhoneSignin;




// new firebase.auth.RecaptchaVerifier('sign-in-button', {
    //     'size': 'invisible',
    //     'callback': (response) => {
    //       // reCAPTCHA solved, allow signInWithPhoneNumber.
    //       console.log('from recapcha response:',response)
    //     }
    //   });

    // .then((confirmationResult) => {
    //     // SMS sent. Prompt user to type the code from the message, then sign the
    //     // user in with confirmationResult.confirm(code).
    //     window.confirmationResult = confirmationResult;
    //     // ...
    //   }).catch((error) => {
    //     // Error; SMS not sent
    //     // ...
    //   });
