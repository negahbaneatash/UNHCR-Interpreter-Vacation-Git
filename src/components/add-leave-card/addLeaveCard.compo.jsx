import React from "react";
import  Dropdown  from "react-dropdown";
import 'react-dropdown/style.css';
import { connect } from "react-redux";
import { addLeaveForTheInterpreterToDB } from "../../firebase/dataBaseFunctions";

import Leave, { leaveType } from "../../objects/leaveObj";
import { addTheLeaveToStore_Action } from "../../redux/redux.actions";
import '../add-leave-card/addLeaveCard.style.css'





class AddLeaveCard extends React.Component {
    constructor(props){
        super(props)
        this.state={
            Leave_Date:this.props.leaveDay,
            Leave_Type:leaveType.Annual_leave,
            alarm:''
        }
    }
    
    
dropDownOptions = [{value: leaveType.Annual_leave, label: 'Annual Leave'}, {value:leaveType.Unpaid_Leave, label:'Unpaid Leave'}]

dropDownSelect=(selectedItem)=>{
    console.log('selected item:',selectedItem)
    this.setState({...this.state,Leave_Type:selectedItem.value},()=>{console.log('the state is:', this.state)})
    
    
}

checkValidity=()=>{
    if (!this.props.leaveDay) {
        return 'You need to select your leave date first'
    }else if (this.props.leaveDay.getDay() === 0 || this.props.leaveDay.getDay() === 6) {
        return 'The leave day cannot be Saturday or Sunday'
    }
    this.setState({...this.state,alarm:''})
    return false
}

submitLeave = async()=>{
    if (!this.checkValidity()) {
        const newLeave = new Leave(this.props.leaveDay,this.state.Leave_Type);
        this.props.addNewLeave(addTheLeaveToStore_Action(newLeave))
        await addLeaveForTheInterpreterToDB(this.props.theInterpreter,this.props.leaveDay)
    }else{
        this.setState({...this.state,alarm:this.checkValidity()})
        console.log('we do nothing')
    }
    
}

componentDidUpdate(prevProps){
    if (prevProps.leaveDay !== this.props.leaveDay) {
        this.checkValidity()        
    }
}
    render(){        
        console.log('from AddLeaveCard render, this.props',this.props)
        return (
            <div className='add-leave-card'>
                <input type="text" value={this.props.leaveDay?this.props.leaveDay.toDateString():''}/>
                <Dropdown className='leave-type-dropdown' options={this.dropDownOptions} value={this.dropDownOptions[0]} onChange={this.dropDownSelect} placeholder='Select your leave type'/>
                <button onClick={this.submitLeave}>Submit</button>
                <h6 style={{color:'red'}}>{this.state.alarm}</h6>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch)=>{
    return{
    addNewLeave: (action)=>{dispatch(action)}
}}

export default connect(null,mapDispatchToProps)(AddLeaveCard);