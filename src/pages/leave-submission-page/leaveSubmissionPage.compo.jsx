import React, {Component} from 'react'
import InterpreterLeaveSubmission from '../../components/interpreter-leave-submission/interpreterLeaveSubmission.compo';







class LeaveSubmissionPage extends Component{




    render(){
        console.log(this.props)
        return(
            
            <React.Fragment>
                <InterpreterLeaveSubmission interpreterId={this.props.match.params.interpreterId}/>                
            </React.Fragment>
        )
    }
}

export default LeaveSubmissionPage;