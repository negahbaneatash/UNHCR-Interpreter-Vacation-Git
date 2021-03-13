import  Dropdown  from "react-dropdown";
import React from "react";
import { connect } from "react-redux";
import { loadAllLeavesOfTheMonthFromDBToStore } from "../../firebase/dataBaseFunctions";

import { leaveStatus } from "../../objects/leaveObj";

import InterpreterLeaveCard from "../interpreter-leave-card/interpreterLeaveCard.compo";



class LeaveManangementStage extends React.Component {
    constructor(){
        super()        
        
        this.state={Leave_Status_Group:leaveStatus.submitted}
    }
    componentDidMount(){        
        const tempDate = new Date()
        this.check=loadAllLeavesOfTheMonthFromDBToStore(tempDate)                      
        console.log('from LeaveManagementStage componentDidMount ')
    }

    dropDownOptions = [{value:'ALL',label:'All Leaves'},{value:leaveStatus.submitted, label:'Submitted Leaves'},{value:leaveStatus.approved, label:'Approved Leaves'},{value:leaveStatus.rejected, label:'Rejected Leaves'}]
    
    dropDownSelect = (selectedItem)=>{
        this.setState({...this.state,Leave_Status_Group:selectedItem.value})
    }

    showRelatedLeaveCards = ()=>{
        const {leavesOfTheMonth}=this.props
        switch (this.state.Leave_Status_Group) {
            case leaveStatus.submitted:
                return leavesOfTheMonth.filter( leave => leave.leaveStatus===leaveStatus.submitted ).map(leave=> <InterpreterLeaveCard isSupervisor leave={leave}/> )                
            case leaveStatus.approved:
                return leavesOfTheMonth.filter( leave => leave.leaveStatus===leaveStatus.approved ).map(leave=> <InterpreterLeaveCard isSupervisor leave={leave}/> )
            case leaveStatus.rejected:
                return leavesOfTheMonth.filter( leave => leave.leaveStatus===leaveStatus.rejected).map(leave=> <InterpreterLeaveCard isSupervisor leave={leave}/>)                
            default:
                return leavesOfTheMonth.map( leave => <InterpreterLeaveCard isSupervisor leave={leave}/> )
        }
    }

    render(){
        console.log('RRRRRRRRRR from LeaveManagementStage render() ')
        return(
            <div>
                <Dropdown className='leave-status-dropdown' options={this.dropDownOptions} value={this.dropDownOptions[1]} onChange={this.dropDownSelect} placeholder='Show:'/>                
                {this.showRelatedLeaveCards()}
            </div>
    )}
}

const mapStateToProps =(state)=>{
    return{
        allInterpreters:state.Interpreters.allInterpreters,
        leavesOfTheMonth:state.Mleaves.mLeaves
    }
}

export default connect(mapStateToProps)(LeaveManangementStage)