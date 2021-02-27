import  Dropdown  from "react-dropdown";
import React from "react";
import { connect } from "react-redux";
import { loadAllLeavesOfTheMonthFromDBToStore } from "../firebase/dataBaseFunctions";

import { leaveStatus } from "../objects/leaveObj";

import InterpreterLeaveCard from "./interpreter-leave-card/interpreterLeaveCard.compo";



class LeaveManangementStage extends React.Component {
    constructor(){
        super()        
        this.check=false;
        this.state={Leave_Status_Group:'ALL'}
    }
    componentDidMount(){        
        const tempDate = new Date()
        this.check=loadAllLeavesOfTheMonthFromDBToStore(tempDate)                      
        console.log('CCCCCCCCCCC from LeaveManagementStage componentDidMount this.check:',this.check)
    }

    dropDownOptions = [{value:'ALL',label:'All Leaves'},{value:leaveStatus.submitted, label:'Submitted Leaves'},{value:leaveStatus.approved, label:'Approved Leaves'},{value:leaveStatus.rejected, label:'Rejected Leaves'}]
    
    dropDownSelect = (selectedItem)=>{
        this.setState({...this.state,Leave_Status_Group:selectedItem.value})
    }

    showRelatedLeaveCards = ()=>{
        switch (this.state.Leave_Status_Group) {

            case leaveStatus.submitted:
                return(
                    this.props.leavesOfTheMonth.filter((leave)=>{return leave.leaveStatus===leaveStatus.submitted}).map((leave)=>{return(
                        <InterpreterLeaveCard isSupervisor leave={leave}/>
                    )})
                )
            case leaveStatus.approved:
                return(
                    this.props.leavesOfTheMonth.filter((leave)=>{return leave.leaveStatus===leaveStatus.approved}).map((leave)=>{return(
                        <InterpreterLeaveCard isSupervisor leave={leave}/>
                    )})
                )
            case leaveStatus.rejected:
                return(
                    this.props.leavesOfTheMonth.filter((leave)=>{return leave.leaveStatus===leaveStatus.rejected}).map((leave)=>{return(
                        <InterpreterLeaveCard isSupervisor leave={leave}/>
                    )})
                )        
            default:
                return(
                    this.props.leavesOfTheMonth.map((leave)=>{return(                    
                        <InterpreterLeaveCard isSupervisor leave={leave}/>                    
                    )})
                )
        }
    }

    render(){
        console.log('RRRRRRRRRR from LeaveManagementStage render() this.check',this.check)
        return(
            <div>
                <Dropdown className='leave-status-dropdown' options={this.dropDownOptions} value={this.dropDownOptions[0]} onChange={this.dropDownSelect} placeholder='Show:'/>                
                {this.showRelatedLeaveCards()}
            </div>
    )}
}

const mapStateToProps =(state)=>{
    return{
        allInterpreters:state.Interpreters.allInterpreters,
        leavesOfTheMonth:state.Leaves.leaves
    }
}

export default connect(mapStateToProps)(LeaveManangementStage)