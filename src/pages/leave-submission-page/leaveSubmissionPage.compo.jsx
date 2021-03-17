import React, {Component} from 'react'
import InterpreterLeaveSubmission from '../../components/interpreter-leave-submission/interpreterLeaveSubmission.compo';
import { Tab,TabList, TabPanel, Tabs } from "react-tabs";
import { connect } from 'react-redux';
import './leaveSubmissionPage.style.css'






class LeaveSubmissionPage extends Component{

    componentDidMount(){
        console.log('from LeaveSubmissionPage componentDidMount', this.props.TheInterpreter)
    }


    render(){
        console.log('from LeaveSubmissionPage render')
        return(
            
            <React.Fragment>
                <div className='welcome-interpreter-container'>
                <h3 className='welcome-interpreter'>{`Welcome, ${this.props.theInterpreter.name}`}</h3>
                </div>
                
                <Tabs>
                    <TabList>
                        <Tab>Leave Submission</Tab>                        
                        <Tab disabled>Data Allowance Submission</Tab>
                        <Tab disabled >My Profile</Tab>
                    </TabList>
                    <TabPanel>
                        <InterpreterLeaveSubmission interpreterId={this.props.match.params.interpreterId}/>                
                    </TabPanel>
                    <TabPanel>
                        <h3 style={{color:'red'}}>My Profile Section to be added</h3>
                    </TabPanel>
                    <TabPanel>
                        <h3 style={{color:'red'}}>Data Allowance Submission Section to be added</h3>
                    </TabPanel>
                </Tabs>
                
            </React.Fragment>
        )
    }
}

const mapStateToProps=(state)=>({
    theInterpreter:state.Interpreter.theInterpreter
})
export default connect(mapStateToProps)(LeaveSubmissionPage);