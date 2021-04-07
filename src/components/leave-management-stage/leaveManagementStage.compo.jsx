import  Dropdown  from "react-dropdown";
import React from "react";
import { connect } from "react-redux";
import { loadAllLeavesOfTheMonthFromDBToStore } from "../../firebase/dataBaseFunctions";
import {Container,Jumbotron} from 'react-bootstrap'
// import { leaveStatus } from "../../objects/leaveObj";
import './leaveManagementStage.style.css'
import InterpreterLeaveCard from "../interpreter-leave-card/interpreterLeaveCard.compo";
import Leave from "../../objects/leaveObj";
import CustomCalendar from "../custom-calendar/customCalendar.compo";
import CustomLoadingIcon from "../custom-loading-icon/customLoadingIcon.compo";
import { Login_Status } from "../../redux/waiting.reducer";
import { store } from "../../redux/store";



class LeaveManangementStage extends React.Component {
    constructor(){
        super()        
        
        this.state={
            Leave_Status_Group:Leave.leaveStatus.submitted,
            viewingDateOnCalendar:new Date(),
            

        }
    }
    componentDidMount(){        
        
        loadAllLeavesOfTheMonthFromDBToStore(this.state.viewingDateOnCalendar)                      
        
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
                console.log('from swich----------',leavesOfTheMonth.length)
                return (leavesOfTheMonth.filter( leave => leave.leaveStatus===Leave.leaveStatus.submitted).length===0)?<h6 class='no-leave-msg'>There is no submitted leave to show</h6> :leavesOfTheMonth.filter( leave => leave.leaveStatus===Leave.leaveStatus.submitted).map(leave=> <InterpreterLeaveCard isSupervisor leave={leave}/> )                
            case Leave.leaveStatus.approved:
                return (leavesOfTheMonth.filter( leave => leave.leaveStatus===Leave.leaveStatus.approved ).length===0)?<h6 class='no-leave-msg'>There is no approved leave to show</h6> :leavesOfTheMonth.filter( leave => leave.leaveStatus===Leave.leaveStatus.approved ).map(leave=> <InterpreterLeaveCard isSupervisor leave={leave}/> )
            case Leave.leaveStatus.rejected:
                return (leavesOfTheMonth.filter( leave => leave.leaveStatus===Leave.leaveStatus.rejected).length===0)?<h6 class='no-leave-msg'>There is no rejected leave to show</h6> :leavesOfTheMonth.filter( leave => leave.leaveStatus===Leave.leaveStatus.rejected).map(leave=> <InterpreterLeaveCard isSupervisor leave={leave}/>)                
            default:
                return (leavesOfTheMonth.length===0)?<h6 class='no-leave-msg'>There is no leave to show</h6>:leavesOfTheMonth.map( leave => <InterpreterLeaveCard isSupervisor leave={leave}/> )
        }
    }

    handleCalendarChange=(changedYear)=>{
        console.log('OOOOOOOOOOOO from cal handlechange:',changedYear)
        this.setState({...this.state,viewingDateOnCalendar:changedYear.activeStartDate})
    }

    handleClickMonth=(newDate)=>{
        console.log('KKKKKKKKKKKOOOOOOOOOOO from handle clickMonth ')
        this.setState({...this.state,viewingDateOnCalendar:newDate})
        loadAllLeavesOfTheMonthFromDBToStore(newDate)
        
    }

    render(){
        console.log('from LeaveManagementStage render() this.props: ', this.props)
        return(
            <div>
                <Container>
                    <CustomCalendar showIn='year' clickMonth={this.handleClickMonth} clickDay={this.handleClickDay} viewChanged={this.handleCalendarChange} calendarColorClass='supervisor-card'></CustomCalendar>
                    <Jumbotron>
                        <h6 className='select-date-message select-month-message'>Please select the month from the calendar</h6>        
                        <div className='status-dropdown-container'>
                            <label>Show leaves:</label>
                            <Dropdown className='leave-status-dropdown' options={this.dropDownOptions} value={this.dropDownOptions[1]} onChange={this.dropDownSelect} placeholder='Show:'/>                
                        </div>
                    </Jumbotron>
                    {this.props.signinState===Login_Status.loadingFromDB && <CustomLoadingIcon cliClassName='waiting-loading-leaves' iconType={'spokes'} iconColor={'#7e567e'} />}
                    {this.showRelatedLeaveCards()}
                </Container>
                
                
            </div>
    )}
}

const mapStateToProps =(state)=>{
    return{
        allInterpreters:state.Interpreters.allInterpreters,
        leavesOfTheMonth:state.Mleaves.mLeaves,
        signinState:state.Waiting.signingInState
    }
}



export default connect(mapStateToProps)(LeaveManangementStage)