import React from "react";
import { connect } from "react-redux";

import InterpreterLeaveCard from "../interpreter-leave-card/interpreterLeaveCard.compo";
import { loadLeavesOfTheInterpreterFromDBToStore } from "../../firebase/dataBaseFunctions";
import { leaveType } from "../../objects/leaveObj";


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

    focusOnItem =(textInputOfChildRef)=>{
        if(textInputOfChildRef){
            textInputOfChildRef.current.value.bold()
        }
    }
    
              
    render(){    
        const {leavesArrayFromStore}=this.props;    
        if (leavesArrayFromStore.length) {
            console.log('from unpaidLeave render if true',leavesArrayFromStore)
            return (
                this.props.leavesArrayFromStore.filter((leave)=>(leave.leaveType!==leaveType.Annual_leave)).map(leaveEntity => {
                    return (        
                        <div>
                            <InterpreterLeaveCard isInterpreter leave={leaveEntity} compoWasClicked={this.focusOnItem} backgroundColor={'red'}></InterpreterLeaveCard>                    
                        </div>
                    )    
                })
            )
        }else{
            console.log('from unpaidLeave render if false')
            return <h1>NO SUBMITTED UNPAID LEAVE TO SHOW</h1>
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