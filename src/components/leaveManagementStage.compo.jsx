import  Dropdown  from "react-dropdown";
import React from "react";
import { connect } from "react-redux";
import { loadAllLeavesOfTheMonthFromDBToStore } from "../firebase/dataBaseFunctions";

import { leaveStatus } from "../objects/leaveObj";

import InterpreterLeaveCard from "./interpreter-leave-card/interpreterLeaveCard.compo";



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
        switch (this.state.Leave_Status_Group) {

            case leaveStatus.submitted:
                
                const tempArr= this.props.leavesOfTheMonth.filter((leave)=>{return leave.leaveStatus===leaveStatus.submitted})
                console.log('this.showRelatedLeaveCards case submitted tempArr',tempArr)
                return(                    
                    tempArr.map((lves)=>{
                        console.log('tempArr.map leave:',lves)
                        return(                        
                        <InterpreterLeaveCard isSupervisor leave={lves}/>
                    )})
                )
                
            case leaveStatus.approved:
                console.log('this.showRelatedLeaveCards case approved')
                return(
                    this.props.leavesOfTheMonth.filter((leave)=>{return leave.leaveStatus===leaveStatus.approved}).map((leave)=>{return(
                        <InterpreterLeaveCard isSupervisor leave={leave}/>
                    )})
                )
                
            case leaveStatus.rejected:
                const tempArrRej= this.props.leavesOfTheMonth.filter((leave)=>{return leave.leaveStatus===leaveStatus.rejected})
                console.log('this.showRelatedLeaveCards case rejected tempArrRej:',tempArrRej)
                return(
                    tempArrRej.map((lve)=>{return(
                        <InterpreterLeaveCard isSupervisor leave={lve}/>
                    )})
                )      
                
            default:
                console.log('this.showRelatedLeaveCards case map all')
                return(
                    this.props.leavesOfTheMonth.map((lve)=>{return(                    
                        <InterpreterLeaveCard isSupervisor leave={lve}/>                    
                    )})
                )
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