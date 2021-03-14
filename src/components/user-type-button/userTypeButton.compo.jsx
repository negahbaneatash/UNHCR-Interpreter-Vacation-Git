import React from "react";
import './userTypeButton.style.css'




const UserTypeButton = (props)=>{
    return (
        <div className={`${props.userType} btn-userType` } onClick={props.onButtonClick}>
            <span class="noselect">{props.children}</span>
            <div id="circle"></div>
        </div>
    )
}


export default UserTypeButton;