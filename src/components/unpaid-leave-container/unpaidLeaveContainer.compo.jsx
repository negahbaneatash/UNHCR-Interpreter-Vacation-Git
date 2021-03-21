import React from "react";
import { connect } from "react-redux";

import InterpreterLeaveCard from "../interpreter-leave-card/interpreterLeaveCard.compo";
import { loadLeavesOfTheInterpreterFromDBToStore } from "../../firebase/dataBaseFunctions";
import Leave, { leaveType } from "../../objects/leaveObj";


class UnpaidLeaveContainer extends React.Component{
        
    async componentDidMount(){        
        console.log('from unpaidLeave DidMount *********')
        const leaveRef= this.props.viewingDate.getFullYear().toString()+'-'+(this.props.viewingDate.getMonth()+1).toString();
        await loadLeavesOfTheInterpreterFromDBToStore(this.props.theInterpreter.email,leaveRef)        
    }

    async componentDidUpdate(prevProps){
        if (prevProps.viewingDate!==this.props.viewingDate) {
            const leaveRef= this.props.viewingDate.getFullYear().toString()+'-'+(this.props.viewingDate.getMonth()+1).toString();
            await loadLeavesOfTheInterpreterFromDBToStore(this.props.theInterpreter.email,leaveRef)        
        }
    }

    
              
    render(){    
        const {leavesArrayFromStore}=this.props;    
        if (leavesArrayFromStore.length) {
            console.log('from unpaidLeave render if true',leavesArrayFromStore)
            return (
                this.props.leavesArrayFromStore.filter((leave)=>(leave.leaveType!==Leave.leaveType.Annual_leave)).map(leaveEntity => {
                    return (        
                        <div>                            
                            <InterpreterLeaveCard isInterpreter leave={leaveEntity} ></InterpreterLeaveCard>                    
                        </div>
                    )    
                })
            )
        }else{
            console.log('from unpaidLeave render if false')
            return <h3 className='leave-type' style={{color:'purple'}}>THERE IS NO SUBMITTED EXTRA LEAVE TO SHOW</h3>
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



export default connect(mapStateToProps)(UnpaidLeaveContainer);