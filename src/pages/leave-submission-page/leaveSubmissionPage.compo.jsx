import React, {Component} from 'react'
import InterpreterLeaveSubmission from '../../components/interpreter-leave-submission/interpreterLeaveSubmission.compo';
import { Tab,TabList, TabPanel, Tabs } from "react-tabs";






class LeaveSubmissionPage extends Component{

    componentDidMount(){
        console.log('from LeaveSubmissionPage componentDidMount')
    }


    render(){
        console.log('from LeaveSubmissionPage render')
        return(
            
            <React.Fragment>
                <Tabs>
                    <TabList>
                        <Tab>Leave Submission</Tab>
                        <Tab>My Profile</Tab>
                    </TabList>
                    <TabPanel>
                        <InterpreterLeaveSubmission interpreterId={this.props.match.params.interpreterId}/>                
                    </TabPanel>
                    <TabPanel>
                        <h3 style={{color:'red'}}>Section to be added</h3>
                    </TabPanel>
                </Tabs>
                
            </React.Fragment>
        )
    }
}

export default LeaveSubmissionPage;