import React from "react";
import '../interpreter-leave-card/interpreterLeaveCard.style.css'


class InterpreterLeaveCard extends React.Component {
constructor(){
    super()        
    this.textInputRef = React.createRef()
}



handleClick = ()=>{  
    this.props.compoWasClicked(this.textInputRef)    
    this.setLeaveDate()    
}

render(){  
    console.log('AAAAAAALLLLLLLL from intpreterLeaveCard render leaveDate ', Date.parse(this.props.leave.leaveDate))  
    const {leaveDate,leaveStatus}=this.props.leave
    
    return(
        <div className='interpreter-leave-card' onClick={this.props.clickComponent}>
            <input ref={this.textInputRef} type="text" value={leaveDate?leaveDate:''}/>            
            <button name='delete-AL1' >Delete</button>
            <br/>
                <lable>{leaveStatus}</lable>            
        </div>
    )
}
}

export default InterpreterLeaveCard;