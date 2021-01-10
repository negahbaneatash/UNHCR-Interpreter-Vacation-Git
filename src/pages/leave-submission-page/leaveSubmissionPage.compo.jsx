import React, {Component} from 'react'
import InterpreterLeaveSubmission from '../../components/interpreter-leave-submission/interpreterLeaveSubmission.compo';







class LeaveSubmissionPage extends Component{

    componentDidMount(){
        console.log('from LeaveSubmissionPage componentDidMount')
    }


    render(){
        console.log('from LeaveSubmissionPage render')
        return(
            
            <React.Fragment>
                <InterpreterLeaveSubmission interpreterId={this.props.match.params.interpreterId}/>                
            </React.Fragment>
        )
    }
}

export default LeaveSubmissionPage;