import React from "react";
import { connect } from "react-redux";

import InterpreterLeaveCard from "../interpreter-leave-card/interpreterLeaveCard.compo";
import { loadLeavesOfTheInterpreterFromDBToStore } from "../../firebase/dataBaseFunctions";
import { leaveType } from "../../objects/leaveObj";


class UnpaidLeaveContainer extends React.Component{
        
    async componentDidMount(){        
        {console.log('from unpaidLeave DidMount *********')}     
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
        if ((leavesArrayFromStore!==null) && leavesArrayFromStore.length) {
            {console.log('from unpaidLeave render if true',leavesArrayFromStore)}
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
            {console.log('from unpaidLeave render if false')}
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