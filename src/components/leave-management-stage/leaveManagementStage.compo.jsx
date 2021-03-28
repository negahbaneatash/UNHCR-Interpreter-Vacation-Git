import  Dropdown  from "react-dropdown";
import React from "react";
import { connect } from "react-redux";
import { loadAllLeavesOfTheMonthFromDBToStore } from "../../firebase/dataBaseFunctions";
import {Container,Jumbotron} from 'react-bootstrap'
// import { leaveStatus } from "../../objects/leaveObj";

import InterpreterLeaveCard from "../interpreter-leave-card/interpreterLeaveCard.compo";
import Leave from "../../objects/leaveObj";
import CustomCalendar from "../custom-calendar/customCalendar.compo";



class LeaveManangementStage extends React.Component {
    constructor(){
        super()        
        
        this.state={
            Leave_Status_Group:Leave.leaveStatus.submitted,
            viewingDateOnCalendar:new Date(),

        }
    }
    componentDidMount(){        
        
        this.check=loadAllLeavesOfTheMonthFromDBToStore(this.state.viewingDateOnCalendar)                      
        console.log('from LeaveManagementStage componentDidMount ')
    }

    dropDownOptions = [{value:'ALL',label:'All Leaves'},{value:Leave.leaveStatus.submitted, label:'Submitted Leaves'},{value:Leave.leaveStatus.approved, label:'Approved Leaves'},{value:Leave.leaveStatus.rejected, label:'Rejected Leaves'}]
    
    dropDownSelect = (selectedItem)=>{
        this.setState({...this.state,Leave_Status_Group:selectedItem.value})
    }

    showRelatedLeaveCards = ()=>{
        const {leavesOfTheMonth}=this.props
        switch (this.state.Leave_Status_Group) {
            case Leave.leaveStatus.submitted:
                return leavesOfTheMonth.filter( leave => leave.leaveStatus===Leave.leaveStatus.submitted ).map(leave=> <InterpreterLeaveCard isSupervisor leave={leave}/> )                
            case Leave.leaveStatus.approved:
                return leavesOfTheMonth.filter( leave => leave.leaveStatus===Leave.leaveStatus.approved ).map(leave=> <InterpreterLeaveCard isSupervisor leave={leave}/> )
            case Leave.leaveStatus.rejected:
                return leavesOfTheMonth.filter( leave => leave.leaveStatus===Leave.leaveStatus.rejected).map(leave=> <InterpreterLeaveCard isSupervisor leave={leave}/>)                
            default:
                return leavesOfTheMonth.map( leave => <InterpreterLeaveCard isSupervisor leave={leave}/> )
        }
    }

    handleCalendarChange=(changedYear)=>{
        console.log('OOOOOOOOOOOO from cal handlechange:',changedYear)
        this.setState({...this.state,viewingDateOnCalendar:changedYear.activeStartDate})
    }

    handleClickMonth=(newDate)=>{
        console.log('KKKKKKKKKKKOOOOOOOOOOO from handle clickMonth',newDate)
        this.setState({...this.state,viewingDateOnCalendar:newDate})
        loadAllLeavesOfTheMonthFromDBToStore(newDate)                      
    }

    render(){
        console.log('from LeaveManagementStage render() ')
        return(
            <div>
                <Container>
                    <CustomCalendar showIn='year' clickMonth={this.handleClickMonth} clickDay={this.handleClickDay} viewChanged={this.handleCalendarChange} calendarColorClass='supervisor-card'></CustomCalendar>
                    <Jumbotron>
                        <Dropdown className='leave-status-dropdown' options={this.dropDownOptions} value={this.dropDownOptions[1]} onChange={this.dropDownSelect} placeholder='Show:'/>                
                    </Jumbotron>
                    {this.showRelatedLeaveCards()}
                </Container>
                
                
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