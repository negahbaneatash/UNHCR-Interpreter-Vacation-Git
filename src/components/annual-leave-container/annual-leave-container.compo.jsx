import React from "react";
import { connect } from "react-redux";

import InterpreterLeaveCard from "../interpreter-leave-card/interpreterLeaveCard.compo";
import { loadLeavesOfTheInterpreterFromDBToStore } from "../../firebase/dataBaseFunctions";
import { leaveType } from "../../objects/leaveObj";


class AnnualLeaveContainer extends React.Component{
        
    async componentDidMount(){   
        {console.log('from annualLeave DidMount *********')}     
        await loadLeavesOfTheInterpreterFromDBToStore(this.props.theInterpreter,this.props.viewingDate)        
    }

    async componentDidUpdate(prevProps){
        if (prevProps.viewingDate!==this.props.viewingDate) {
            await loadLeavesOfTheInterpreterFromDBToStore(this.props.theInterpreter,this.props.viewingDate)        
        }
    }

    focusOnItem =(textInputOfChildRef)=>{
        if(textInputOfChildRef){
            textInputOfChildRef.current.value.bold()
        }     
    }
    
              
    render(){
        const {leavesArrayFromStore}=this.props;    
        if (leavesArrayFromStore.length) {
            {console.log('from annualLeave render if true',leavesArrayFromStore)}
            return (                
                this.props.leavesArrayFromStore.filter((leave)=>(leave.leaveType===leaveType.Annual_leave)).map(leaveEntity => {
                    return (        
                        <div>
                            <InterpreterLeaveCard leave={leaveEntity} compoWasClicked={this.focusOnItem} ></InterpreterLeaveCard>                    
                        </div>
                    )    
                })
            )
        }else{
            {console.log('from annualLeave render if false',leavesArrayFromStore)}
            return <h1>NO SUBMITTED ANNUAL LEAVE TO SHOW</h1>
        }
    }
}


const mapStateToProps=(state)=>{
    const {Leaves} = state;
    return {
        leavesArrayFromStore:  Leaves.leaves, 
        theInterpreter:state.Interpreter.theInterpreter,
    }
}



export default connect(mapStateToProps)(AnnualLeaveContainer);