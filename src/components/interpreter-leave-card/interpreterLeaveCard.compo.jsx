import React from "react";
import { connect } from "react-redux";

import '../interpreter-leave-card/interpreterLeaveCard.style.css'
import { approveTheLeaveToStore_Action, deleteTheLeaveFromStore_Action, rejectTheLeaveToStore_Action } from "../../redux/redux.actions"
import { loadLeavesOfTheInterpreterFromDBToStore, updateLeavesArrayOfTheMonthFromStoreToDB } from "../../firebase/dataBaseFunctions";
import Leave from "../../objects/leaveObj";
import DeleteLeaveButton from "../delete-leave-button/deleteLeaveButton.compo";
import { ReactComponent as ApprovedIcon  } from "../../assets/approved.svg";
import { ReactComponent as RejectedIcon } from "../../assets/rejected.svg";
// import { leaveStatus } from "../../objects/leaveObj";



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
    this.props.deleteTheLeave(deleteTheLeaveFromStore_Action(this.state.leave.leaveId))
    updateLeavesArrayOfTheMonthFromStoreToDB(this.state.leave.leaveOwnerEmail,this.state.leave.leaveYearMonth)
}

handleClickApprove=async ()=>{
    const {leaveOwnerEmail,leaveYearMonth,leaveId}=this.state.leave
    this.setState({...this.state,leave:{...this.state.leave,leaveStatus:Leave.leaveStatus.approved}})
    await loadLeavesOfTheInterpreterFromDBToStore(leaveOwnerEmail,leaveYearMonth)
    this.props.approveTheLeave(approveTheLeaveToStore_Action(leaveId))
    updateLeavesArrayOfTheMonthFromStoreToDB(leaveOwnerEmail,leaveYearMonth)    
}

handleClickReject=async()=>{
    const {leaveOwnerEmail,leaveYearMonth,leaveId}=this.state.leave
    this.setState({...this.state,leave:{...this.state.leave,leaveStatus:Leave.leaveStatus.rejected}})
    await loadLeavesOfTheInterpreterFromDBToStore(leaveOwnerEmail,leaveYearMonth)
    this.props.rejectTheLeave(rejectTheLeaveToStore_Action(leaveId))
    updateLeavesArrayOfTheMonthFromStoreToDB(leaveOwnerEmail,leaveYearMonth)    
}

showLeaveStatus=()=>{
    const {leaveStatus}=this.state.leave;
    if (leaveStatus===Leave.leaveStatus.submitted) {
        return <lable>{'Submitted & Pending'}</lable>                    
    } else if (leaveStatus===Leave.leaveStatus.approved) {
        return <ApprovedIcon/>
    } else if (leaveStatus===Leave.leaveStatus.rejected) {
        return <RejectedIcon/>
    } 
}

render(){  
    console.log('from intpreterLeaveCard render leaveDate this.props:', this.props)  
    console.log('from intpreterLeaveCard render leaveDate this.state:', this.state)  
    const {leave}=this.state
    const {isInterpreter,isSupervisor}=this.props
    return(
        <div className={`interpreter-leave-card ${this.state.leave.leaveType}`} onClick={this.handleClick}>
            {this.props.isSupervisor?<lable>{this.state.leave.leaveOwner}</lable>:null}             
            {/* <input ref={this.textInputRef} type="text" value={this.state.leave.leaveDateString?this.state.leave.leaveDateString:''} style={this.state.focus?{fontWeight:'normal'}:{fontWeight:'bold'}}/>             */}
            {/* 2021  january  Monday  23 */}
            <div className='show-date'> 
                <div className='show-year'>{leave.leaveYearString}</div>
                <div className='wmd-container'>
                    <div className='show-weekday'>{leave.leaveDayOfWeekString}</div>
                    <span className='show-month-day'>{leave.leaveMonthString}, {leave.leaveDayOfMonthString}</span>
                    
                </div>
            </div>
            <div className='buttons-and-status'>
                <div className='button-container'>
                    
                    {true?<DeleteLeaveButton name='delete-leave' deleteLeaveClicked={this.handleClickDelete}>Delete Leave</DeleteLeaveButton>:null}
                    {isSupervisor?<button name='approve-leave' onClick={this.handleClickApprove}>Approve</button>:null} 
                    {isSupervisor?<button name='reject-leave' onClick={this.handleClickReject}>Reject</button>:null} 
                </div>
                <div className='status-container'>
                    {this.showLeaveStatus()}
                </div>
            </div>
            
            
            
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