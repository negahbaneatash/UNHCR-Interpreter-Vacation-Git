import React from "react";
import  Dropdown  from "react-dropdown";
import 'react-dropdown/style.css';
import { connect } from "react-redux";
import { updateLeavesArrayOfTheMonthFromStoreToDB } from "../../firebase/dataBaseFunctions";

import Leave from "../../objects/leaveObj";
import { addTheLeaveToStore_Action } from "../../redux/redux.actions";
import '../add-leave-card/addLeaveCard.style.css'
import SubmitLeaveButton from "../submit-leave-button/submitLeaveButton.compo";





class AddLeaveCard extends React.Component {
    constructor(props){
        super(props)
        this.initialMessage='Please choose your leave date from above calendar'
        this.state={
            Leave_Date:this.props.leaveDay,
            Leave_Type:Leave.leaveType.Annual_leave,
            submitLeaveMessage:this.initialMessage
        }
    }
    
    
dropDownOptions = [{value: Leave.leaveType.Annual_leave, label: 'Annual Leave'}, {value:Leave.leaveType.Unpaid_Leave, label:'Extra Leave'}]

dropDownSelect=(selectedItem)=>{
    console.log('selected item:',selectedItem)
    this.setState({...this.state,Leave_Type:selectedItem.value},()=>{console.log('the state is:', this.state)})
    
    
}

checkValidity=()=>{
    if (!this.props.leaveDay) {
        return 'You need to select your leave date first'
    }else if (this.props.leaveDay.getDay() === 0 || this.props.leaveDay.getDay() === 6) {
        return 'The leave day cannot be Saturday or Sunday'
    }else if (this.isLeaveRepetitive()){
        return 'You have already submitted a leave on this day'
    }else if (this.state.Leave_Type===Leave.leaveType.Annual_leave && this.moreThanTwoAnnual()){
        return 'You can only apply for two annual leaves each month'
    }else
    this.setState({...this.state,submitLeaveMessage:this.initialMessage})
    return false
}

isLeaveRepetitive=()=>{
    let countArr=this.props.leavesArray.filter((leave)=>{return(leave.leaveDayOfMonthString===this.props.leaveDay.getDate().toString())})
    if(countArr.length>=1){
        return true
    }    
        return false    
}

moreThanTwoAnnual=()=>{
    let countArr=this.props.leavesArray.filter((leave)=>{return(leave.leaveType===Leave.leaveType.Annual_leave)})
    if(countArr.length>=2){
        return true
    }    
        return false    
}

submitLeave = async()=>{
    if (!this.checkValidity()) {
        const newLeave = new Leave(this.props.leaveDay,this.state.Leave_Type,this.props.theInterpreter);
        this.props.addNewLeave(addTheLeaveToStore_Action(newLeave))
        await updateLeavesArrayOfTheMonthFromStoreToDB(newLeave.leaveOwnerEmail,newLeave.leaveYearMonth)
    }else{
        this.setState({...this.state,submitLeaveMessage:this.checkValidity()})
        console.log('we do nothing')
    }
    
}

componentDidUpdate(prevProps){
    if (prevProps.leaveDay !== this.props.leaveDay) {
        this.setState({...this.state,submitLeaveMessage:this.initialMessage})
    }
}
    render(){        
        console.log('from AddLeaveCard render, this.props',this.props)
        return (
            <div className={`add-leave-card ${this.state.Leave_Type===Leave.leaveType.Annual_leave?Leave.leaveType.Annual_leave:Leave.leaveType.Unpaid_Leave}`}>
                <div className='text-date-container'>
                    <input className='input-text-date' type="text" value={this.props.leaveDay?this.props.leaveDay.toDateString():''}/>
                    
                </div>
                <div className='dropdown-container '>
                    <Dropdown className='leave-type-dropdown leave-type' options={this.dropDownOptions} value={this.dropDownOptions[0]} onChange={this.dropDownSelect} placeholder='Select your leave type'/>
                    <h6 style={{color:'red'}}>{this.state.submitLeaveMessage}</h6>
                    
                </div>
                <SubmitLeaveButton leaveButtonClicked={this.submitLeave}>Submit Leave</SubmitLeaveButton>
                
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch)=>{
    return{
    addNewLeave: (action)=>{dispatch(action)}
}}

export default connect(null,mapDispatchToProps)(AddLeaveCard);