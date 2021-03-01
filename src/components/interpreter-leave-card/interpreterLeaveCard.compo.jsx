import React from "react";
import { connect } from "react-redux";

import '../interpreter-leave-card/interpreterLeaveCard.style.css'
import { approveTheLeaveToStore_Action, deleteTheLeaveFromStore_Action, rejectTheLeaveToStore_Action } from "../../redux/redux.actions"
import { loadLeavesOfTheInterpreterFromDBToStore, updateLeavesArrayOfTheMonthFromStoreToDB } from "../../firebase/dataBaseFunctions";
import { leaveStatus } from "../../objects/leaveObj";



class InterpreterLeaveCard extends React.Component {
constructor(props){
    super(props)        
    this.textInputRef = React.createRef()
    this.state={
        leave:{...this.props.leave},
        focus:true,        
    }
}

componentDidMount(){
    console.log('from LeaveCard compoDidMount &&&&&&&&&&&&&')    
}

componentDidUpdate(prevProps){
    console.log('from leaveCard compoDidUpdate')
    if (prevProps!==this.props) {
        this.setState({...this.state,leave:{...this.props.leave}})    
    }
    
}

// handleClick = ()=>{  
//     this.props.compoWasClicked(this.textInputRef)    
//     this.setState({...this.state,focus:!this.state.focus})        
// }

handleClickDelete=()=>{    
    this.props.deleteTheLeave(deleteTheLeaveFromStore_Action(this.state.leave.id))
    updateLeavesArrayOfTheMonthFromStoreToDB(this.state.leave.leaveOwnerEmail,this.state.leave.leavesArrayRef)
}

handleClickApprove=()=>{
    this.setState({...this.state,leave:{...this.state.leave,leaveStatus:leaveStatus.approved}})
    this.props.approveTheLeave(approveTheLeaveToStore_Action(this.state.leave.id))
    // loadLeavesOfTheInterpreterFromDBToStore(this.state.leave.leaveOwnerEmail,this.state.leave.leaveRef)
    /////////HERE I AM
}

handleClickReject=()=>{
    this.setState({...this.state,leave:{...this.state.leave,leaveStatus:leaveStatus.rejected}})
    this.props.rejectTheLeave(rejectTheLeaveToStore_Action(this.state.leave.id))
}

render(){  
    console.log('from intpreterLeaveCard render leaveDate this.props:', this.props)  
    console.log('from intpreterLeaveCard render leaveDate this.state:', this.state)  
    
    return(
        <div className='interpreter-leave-card' onClick={this.handleClick} style={{backgroundColor:this.props.backgroundColor}}>
            <input ref={this.textInputRef} type="text" value={this.state.leave.leaveDate?this.state.leave.leaveDate:''} style={this.state.focus?{fontWeight:'normal'}:{fontWeight:'bold'}}/>            
            {this.props.isInterpreter?<button name='delete-leave' onClick={this.handleClickDelete}>Delete</button>:null} 
            {this.props.isSupervisor?<button name='approve-leave' onClick={this.handleClickApprove}>Approve</button>:null} 
            {this.props.isSupervisor?<button name='reject-leave' onClick={this.handleClickReject}>Reject</button>:null} 
            <br/>
                <lable>{this.state.leave.leaveStatus}</lable>            
        </div>
    )
}
}

const mapDispatchToProps=(dispatch)=>{
    return{
        deleteTheLeave: (action)=>{dispatch(action)},
        approveTheLeave: (action)=>{dispatch(action)},
        rejectTheLeave: (action)=>{dispatch(action)}
    }
}

export default connect(null,mapDispatchToProps)(InterpreterLeaveCard);