import React from "react";
import { connect } from "react-redux";

import InterpreterLeaveCard from "../interpreter-leave-card/interpreterLeaveCard.compo";
import { loadLeavesOfTheInterpreterFromDBToStore } from "../../firebase/dataBaseFunctions";
import { leaveType } from "../../objects/leaveObj";


class UnpaidLeaveContainer extends React.Component{
        
    async componentDidMount(){        
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
        if (Array.isArray(leavesArrayFromStore) && (leavesArrayFromStore!==[null]) && leavesArrayFromStore.length) {
            return (
                this.props.leavesArrayFromStore.filter((leave)=>(leave.type!==leaveType.Annual_leave)).map(leaveEntity => {
                    return (        
                        <div>
                            <InterpreterLeaveCard leave={leaveEntity} compoWasClicked={this.focusOnItem} backgroundColor={'red'}></InterpreterLeaveCard>                    
                        </div>
                    )    
                })
            )
        }else{
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