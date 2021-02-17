import  React  from "react";
import { connect } from "react-redux";

import CustomCalendar from "../custom-calendar/customCalendar.compo";
import AnnualLeaveContainer from "../annual-leave-container/annual-leave-container.compo";
import UnpaidLeaveContainer from "../unpaid-leave-container/unpaidLeaveContainer.compo";
import AddLeaveCard from "../add-leave-card/addLeaveCard.compo";


class InterpreterLeaveSubmission extends React.Component {    
    
    state={
        clickedDayOnCalendar:null,     
        viewingDateOnCalendar:new Date()         
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
    
    render(){
        console.log('from InterpreterLeaveSubmission render')
        return(
            <div>
                <h1>{`Hellooo  ${this.props.theInterpreter.name}`}</h1>
                <CustomCalendar clickDay={this.handleClickDay} itChanged={this.handleCalendarChange}></CustomCalendar>
                <AddLeaveCard theInterpreter={this.props.theInterpreter} leaveDay={this.state.clickedDayOnCalendar}  />
                <AnnualLeaveContainer viewingDate={this.state.viewingDateOnCalendar}/>                
                <UnpaidLeaveContainer viewingDate={this.state.viewingDateOnCalendar}/>                
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
