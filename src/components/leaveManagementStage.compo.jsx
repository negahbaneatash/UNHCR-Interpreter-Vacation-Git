import React from "react";
import { connect } from "react-redux";
import { loadAllLeavesOfTheMonthFromDBToStore } from "../firebase/dataBaseFunctions";

import { leaveStatus } from "../objects/leaveObj";

import InterpreterLeaveCard from "./interpreter-leave-card/interpreterLeaveCard.compo";



class LeaveManangementStage extends React.Component {
    constructor(){
        super()
        this.submittedLeavesArray=[];
        this.check=false;
    }
    componentDidMount(){        
        const tempDate = new Date()
        this.check=loadAllLeavesOfTheMonthFromDBToStore(tempDate)                      
    console.log('CCCCCCCCCCC from LeaveManagementStage componentDidMount this.check:',this.check)
    }


    render(){
        console.log('RRRRRRRRRR from LeaveManagementStage render() this.check',this.check)
        return(
            <div>
                {this.props.leavesOfTheMonth.map((leave)=>{return(
                    <InterpreterLeaveCard leave={leave}/>
                )})}
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