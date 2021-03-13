import React from "react";
import './userTypeButton.style.css'




const UserTypeButton = (props)=>{
    return (
        <div id="btn" onClick={props.onButtonClick}>
            <span class="noselect">{props.children}</span>
            <div id="circle"></div>
        </div>
    )
}


export default UserTypeButton;