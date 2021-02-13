import React from "react";
import { connect } from "react-redux";

import InterpreterLeaveCard from "../interpreter-leave-card/interpreterLeaveCard.compo";
import { loadLeavesOfTheInterpreterFromDBToStore } from "../../firebase/dataBaseFunctions";


class AnnualLeaveContainer extends React.Component{
    constructor(){
        super()        
    }
    
    async componentDidMount(){
        const todayDate = new Date();
        await loadLeavesOfTheInterpreterFromDBToStore(this.props.theInterpreter,todayDate)        
    }

    focusOnItem =(textInputOfChildRef)=>{
        if(textInputOfChildRef){            
            textInputOfChildRef.current.focus()            
        };                
    }
    
          
    render(){    
        if (this.props.leavesArrayFromStore) {
            return (
                this.props.leavesArrayFromStore.map(leaveEntity => {
                    return (        
                        <div>
                            <InterpreterLeaveCard leave={leaveEntity} compoWasClicked={this.focusOnItem}></InterpreterLeaveCard>                    
                        </div>
                    )    
                })
            )
        }else{
            return <h1>NOTHING</h1>
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