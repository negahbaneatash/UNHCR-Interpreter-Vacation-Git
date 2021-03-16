import React from "react";
import './submitLeaveButton.style.scss'
import { ReactComponent as LeaveButtonLogo } from "../../assets/leave-button3.svg";


const SubmitLeaveButton = (props)=>{
    return (
      <div className='leave-button-container'>
        <button onClick={props.leaveButtonClicked} type="button" class="leave-button">
          <span class="leave-button-icon">            
            <LeaveButtonLogo className='leave-button-logo'/>
          </span>
          <span class="leave-button-text">{props.children}</span>
        </button>
      </div>
)}

export default SubmitLeaveButton;

