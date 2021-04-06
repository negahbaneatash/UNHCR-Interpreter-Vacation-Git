import React from "react";
import { connect } from "react-redux";
import ReactTooltip from 'react-tooltip';

import '../interpreter-leave-card/interpreterLeaveCard.style.css'
import { approveTheLeaveToStore_Action, deleteTheLeaveFromStore_Action, rejectTheLeaveToStore_Action, resetTheLeaveToStore_Action } from "../../redux/redux.actions"
import { loadLeavesOfTheInterpreterFromDBToStore, updateLeavesArrayOfTheMonthFromStoreToDB } from "../../firebase/dataBaseFunctions";
import Leave from "../../objects/leaveObj";
import RemoveLeaveButton from "../delete-leave-button/deleteLeaveButton.compo";
import { ReactComponent as ApprovedIcon  } from "../../assets/approved.svg";
import { ReactComponent as RejectedIcon } from "../../assets/rejected.svg";
import { ReactComponent as ApproveButton } from "../../assets/approve.svg";
import { ReactComponent as RejectButton } from "../../assets/reject.svg";
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
        return <lable className='submitted-message' data-tip data-for='status-tooltip'>{'Submitted & Pending'}</lable>                    
    } else if (leaveStatus===Leave.leaveStatus.approved) {
        return <ApprovedIcon/>
    } else if (leaveStatus===Leave.leaveStatus.rejected) {
        return <RejectedIcon/>
    } 
}

handleClickReset=async()=>{
    const {leaveOwnerEmail,leaveYearMonth,leaveId}=this.state.leave
    this.setState({...this.state,leave:{...this.state.leave,leaveStatus:Leave.leaveStatus.submitted}})
    await loadLeavesOfTheInterpreterFromDBToStore(leaveOwnerEmail,leaveYearMonth)
    this.props.resetTheLeave(resetTheLeaveToStore_Action(leaveId))    
    updateLeavesArrayOfTheMonthFromStoreToDB(leaveOwnerEmail,leaveYearMonth)  
}

render(){  
    console.log('from intpreterLeaveCard render leaveDate this.props:', this.props)  
    console.log('from intpreterLeaveCard render leaveDate this.state:', this.state)  
    const {leave}=this.state
    const {isInterpreter,isSupervisor}=this.props
    return(
        <div className={`interpreter-leave-card ${this.state.leave.leaveType}`}>
            <div className='leave-info-container'>
                {isSupervisor?<h4 className='leave-owner-name interpreter-name'>{leave.leaveOwnerName}</h4>:null} 
                {isSupervisor?<lable className='leave-owner-name interpreter-group'>{leave.leaveOwnerGroup}</lable>:null} 
                {isInterpreter?<React.Fragment>{leave.leaveType===Leave.leaveType.Annual_leave?<label className='leave-type'>Annual Leave</label>:<label className='leave-type'>Extra Leave</label>}</React.Fragment>:null} 
            </div>
            <div className='show-date'> 
                <div className='show-year'>{leave.leaveYearString}</div>
                <div className='wmd-container'>
                    <div className='show-weekday'>{leave.leaveDayOfWeekString}</div>
                    <span className='show-month-day'>{leave.leaveMonthString}, {leave.leaveDayOfMonthString}</span>
                    
                </div>
            </div>
            <div className='buttons-and-status'>
                <div className='button-container'>
                    
                    {(leave.leaveStatus===Leave.leaveStatus.submitted) && isInterpreter?<RemoveLeaveButton name='delete-leave' deleteLeaveClicked={this.handleClickDelete}>Delete Leave</RemoveLeaveButton>:null}
                    {leave.leaveStatus!==Leave.leaveStatus.submitted && isSupervisor?<RemoveLeaveButton name='reset-leave' deleteLeaveClicked={this.handleClickReset}>Reset Status</RemoveLeaveButton>:null}
                    {leave.leaveStatus===Leave.leaveStatus.submitted && isSupervisor?<ApproveButton  className='approve-button' name='approve-leave' data-tip data-for='approve-tooltip' onClick={this.handleClickApprove}></ApproveButton>:null} 
                    {leave.leaveStatus===Leave.leaveStatus.submitted && isSupervisor?<RejectButton  className='reject-button' name='reject-leave' data-tip data-for='reject-tooltip' onClick={this.handleClickReject}></RejectButton>:null} 
                    
                </div>
                <div className='status-container' >
                    {isSupervisor?<React.Fragment>{leave.leaveType===Leave.leaveType.Annual_leave?<label className='leave-type'>Annual Leave</label>:<label className='leave-type'>Extra Leave</label>}</React.Fragment>:null} 
                    {this.showLeaveStatus()}
                    
                    
                </div>
            </div>
            <ReactTooltip id='reject-tooltip' type='error' place='bottom' effect='solid'>
                        <span>Reject The Leave</span>
            </ReactTooltip>
            <ReactTooltip id='approve-tooltip' type='info' place='bottom' effect='solid'>
                        <span>Accept The Leave</span>
            </ReactTooltip>
            <ReactTooltip id='status-tooltip' type='light' place='bottom' effect='float'>
                        <span>{`Submitted on: ${leave.leaveSubmittedOn}`}</span>
            </ReactTooltip>
        </div>
    )
}
}

const mapDispatchToProps=(dispatch)=>{
    return{
        deleteTheLeave: (action)=>{dispatch(action)},
        approveTheLeave: (action)=>{dispatch(action)},
        rejectTheLeave: (action)=>{dispatch(action)},
        resetTheLeave: (action)=>{dispatch(action)}
    }
}

export default connect(null,mapDispatchToProps)(InterpreterLeaveCard);