import  React  from "react";
import { connect } from "react-redux";
import {Container,Jumbotron} from 'react-bootstrap'
import CustomCalendar from "../custom-calendar/customCalendar.compo";
import AnnualLeaveContainer from "../annual-leave-container/annual-leave-container.compo";
import UnpaidLeaveContainer from "../unpaid-leave-container/unpaidLeaveContainer.compo";
import AddLeaveCard from "../add-leave-card/addLeaveCard.compo";
import './interpreterLeaveSubmission.style.css'

class InterpreterLeaveSubmission extends React.Component {    
    
    state={
        clickedDayOnCalendar:null,     
        viewingDateOnCalendar:new Date(),
        leaveMessage:'Please select your leave date from the calendar',
        msgClass:'notice'         
    }

    componentDidMount(){               
        console.log('from InterpreterLeaveSubmission componentDidMount')
    }

    handleClickDay=(clickedDay)=>{        
            this.setState({...this.state, clickedDayOnCalendar:clickedDay})        
    }
    
    handleCalendarChange=(changedMonth)=>{
        console.log('from cal handlechange:',changedMonth)
        this.setState({...this.state,viewingDateOnCalendar:changedMonth.activeStartDate})
    }
    
    addLeaveMessage=(theMessage,theClass)=>{
        this.setState({...this.state,leaveMessage:theMessage,msgClass:theClass})
    }
    
    render(){
        console.log('from InterpreterLeaveSubmission render')
        return(
            <div>
                <Container>                    
                
                    <CustomCalendar showIn='month' clickDay={this.handleClickDay} viewChanged={this.handleCalendarChange}></CustomCalendar>
                    
                    <Jumbotron className='jumbo-add-leave'>                        
                        <h6 className={`select-date-message ${this.state.msgClass}`}  >{this.state.leaveMessage}</h6>        
                        <AddLeaveCard theInterpreter={this.props.theInterpreter} leaveDay={this.state.clickedDayOnCalendar} leavesArray={this.props.interpreterLeaves} submitLeaveMessage={this.addLeaveMessage}/> 
                    </Jumbotron>
                    <h4 className='annual-leave-title leave-type'>Annual Leave(s):</h4>
                    <AnnualLeaveContainer viewingDate={this.state.viewingDateOnCalendar}/>                
                    <h4 className='unpaid-leave-title leave-type'>Extra Leave(s):</h4>
                    <UnpaidLeaveContainer viewingDate={this.state.viewingDateOnCalendar}/>                
                </Container>
            </div>
        )
    }    
}

function mapStateToProps(state){
    return {
        theInterpreter:state.Interpreter.theInterpreter,
        interpreterLeaves:state.Leaves.leaves
    }
}
export default connect(mapStateToProps)(InterpreterLeaveSubmission);
