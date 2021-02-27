import React from "react";
import { Tab,TabList, TabPanel, Tabs } from "react-tabs";
import 'react-tabs/style/react-tabs.css';
import AddInterpreterToDB from "../add-interpreter-todb/addInterpreterToDB.compo";
import LeaveManangementStage from "../leaveManagementStage.compo";



const LeaveManagementPage =()=>{
    return (
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
        
    )
}


export default LeaveManagementPage;