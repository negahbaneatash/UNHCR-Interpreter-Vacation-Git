import React from "react";
import { connect } from "react-redux";
import { Tab,TabList, TabPanel, Tabs } from "react-tabs";
import 'react-tabs/style/react-tabs.css';
import AddInterpreterToDB from "../add-interpreter-todb/addInterpreterToDB.compo";
import LeaveManangementStage from "../leave-management-stage/leaveManagementStage.compo";



const SupervisorAdministrationPage =(props)=>{
    return (
        <React.Fragment>
                <div className='welcome-user-container'>
                    <h3 className='welcome-user'>{`Welcome, ${props.theSupervisor.name}`}</h3>
                </div>
        <Tabs>
            <TabList>
                <Tab>Leave Management</Tab>
                <Tab >Interpreter Management</Tab>
            </TabList>
            <TabPanel>
                <LeaveManangementStage/>
            </TabPanel>
            <TabPanel>
                <Tabs>
                    <TabList>
                        <Tab>Add Interpreter</Tab>
                        <Tab disabled>Edit Interpreter</Tab>
                        <Tab>Remove Interpreter</Tab>
                    </TabList>
                    <TabPanel>
                        <AddInterpreterToDB/>
                    </TabPanel>
                    <TabPanel>
                        <h1>Here we Edit an Existing Interpreter</h1>
                    </TabPanel>
                    <TabPanel>
                        <h2>Here we remove an Interpreter</h2>
                    </TabPanel>
                </Tabs>
            </TabPanel>
        </Tabs>
        </React.Fragment>
    )
}

const mapStateToProps =(state)=>({
    theSupervisor:state.Supervisor.theSupervisor
})


export default connect(mapStateToProps)(SupervisorAdministrationPage);