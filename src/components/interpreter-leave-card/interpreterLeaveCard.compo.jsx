import React from "react";
import { connect } from "react-redux";

import '../interpreter-leave-card/interpreterLeaveCard.style.css'
import { deleteTheLeaveFromStore_Action } from "../../redux/redux.actions"


class InterpreterLeaveCard extends React.Component {
constructor(props){
    super(props)        
    this.textInputRef = React.createRef()
    this.state={focus:true}
}



handleClick = ()=>{  
    this.props.compoWasClicked(this.textInputRef)    
    this.setState({...this.state,focus:!this.state.focus})    
}

handleClickDelete=()=>{
    this.props.deleteLeave(deleteTheLeaveFromStore_Action(this.props.leave.id))
}

render(){  
    console.log('from intpreterLeaveCard render leaveDate this.props:', this.props)  
    const {leaveDate,leaveStatus}=this.props.leave
    
    return(
        <div className='interpreter-leave-card' onClick={this.handleClick}>
            <input ref={this.textInputRef} type="text" value={leaveDate?leaveDate:''} style={this.state.focus?{fontWeight:'normal'}:{fontWeight:'bold'}}/>            
            <button name='delete-leave' onClick={this.handleClickDelete}>Delete</button>
            <br/>
                <lable>{leaveStatus}</lable>            
        </div>
    )
}
}

const mapDispatchToProps=(dispatch)=>{
    return{
        deleteLeave: (action)=>{dispatch(action)}
    }
}

export default connect(null,mapDispatchToProps)(InterpreterLeaveCard);