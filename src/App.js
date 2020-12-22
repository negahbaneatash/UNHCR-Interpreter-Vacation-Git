import React from 'react'

import './App.css';
import LoginPage from './pages/login-page/login-page.compo';
import CustomCalendar  from "./components/custom-calendar/customCalendar.compo";

import { Switch,Route } from "react-router-dom";
import LeaveSubmissionPage from './pages/leave-submission-page/leaveSubmissionPage.compo';

class UNLeave extends React.Component {
  
  state = {
    count: 0
  }

constructor(){
  super()
  this.myFunctionWithThis = this.myFunction.bind(this)
}

  myFunction (){
    console.log(this)
  }
  
  render(){
    return (
      <div >
        <Switch>
          <Route path='/interpreter/:interpreterId' component={LeaveSubmissionPage} />
          <Route path='/supervisor' />
          <Route path='/' component={LoginPage}/>
        </Switch>
      </div>
    );
}
}

export default UNLeave;
