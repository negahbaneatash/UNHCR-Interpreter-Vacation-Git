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
                <AddInterpreterToDB/>
            </TabPanel>
        </Tabs>
        
    )
}


export default LeaveManagementPage;