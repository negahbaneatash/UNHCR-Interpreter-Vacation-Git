import  React  from "react";
import { connect } from "react-redux";

import CustomCalendar from "../custom-calendar/customCalendar.compo";
import AnnualLeaveContainer from "../annual-leave-container/annual-leave-container.compo";
import AddLeaveCard from "../add-leave-card/addLeaveCard.compo";


class InterpreterLeaveSubmission extends React.Component {    
    
    state={
        clickedDayOnCalendar:null,              
    }

    componentDidMount(){               
        console.log('from InterpreterLeaveSubmission componentDidMount')
    }

    handleClickDay=(clickedDay)=>{        
            this.setState({...this.state, clickedDayOnCalendar:clickedDay})        
    }
    
    handleCalendarChange=(obj)=>{
        console.log('from cal handlechange:',obj)
        this.setState({...this.state, clickedDayOnCalendar:'',tempLeave2:'',alert:''})
    }
    
    render(){
        console.log('from InterpreterLeaveSubmission render')
        return(
            <div>
                <h1>{`Hellooo  ${this.props.theInterpreter.name}`}</h1>
                <CustomCalendar clickDay={this.handleClickDay} itChanged={this.handleCalendarChange}></CustomCalendar>
                <AddLeaveCard leaveDay={this.state.clickedDayOnCalendar} />
                <AnnualLeaveContainer/>                
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
