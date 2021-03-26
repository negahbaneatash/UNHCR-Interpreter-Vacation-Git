import React from "react";
import './customOtpInput.style.scss'


class CustomOtpInput extends React.Component{
    state={
        enteredOtp:'',
        disableInput:false
    }


    handleInputChange=(event)=>{
        this.setState({...this.state,enteredOtp:event.target.value}
            ,()=>{if (this.state.enteredOtp.length>=6) {
                this.setState({...this.state,disableInput:true})            
            }}
        )
        this.props.handleOtpChange(event.target.value)
        
    }

    render(){
        return(
            <input disabled={this.state.disableInput}  className='otpInput' onChange={this.handleInputChange}  maxlength='6' value={this.state.enteredOtp}/>
        )
    }
}

export default CustomOtpInput;