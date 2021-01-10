import React from 'react'
import { Switch,Route,Redirect } from "react-router-dom";

import './App.css';

import HomePage from './pages/home-page/homePage.compo';
import LeaveSubmissionPage from './pages/leave-submission-page/leaveSubmissionPage.compo';
import { AddInterpreterPage } from './pages/add-interpreter-page/addInterpreterPage.compo'

import { myFireauth } from './firebase/firebaseConfig';
import { getAllInterpreters } from "./firebase/dataBaseFunctions";
import InterpreterSigninPage from './pages/interpreter-signin-page/interpreterSigninPage.compo';



class UNLeave extends React.Component {  
  
  
  state={
    interpreters:[],
    theUser: JSON.parse(localStorage.getItem('THE_USER')),
    theInterpreter:JSON.parse(localStorage.getItem('THE_INTERPRETER')),      
  }

  // onAuthStateChanged returns a function that will unsubscribe from the user when is called
  unsubscribeTheUser=null;

  async componentDidMount(){
    console.log('---------from App.js componentDidMount state:',this.state)
    this.unsubscribeTheUser=myFireauth.onAuthStateChanged((user)=>{
      const jsonTheUser=JSON.stringify(user)
      localStorage.setItem('THE_USER',jsonTheUser)            
      this.setState({...this.state,theUser:user})      
    })
    const dbInterpreters =await getAllInterpreters()        
    this.setState({...this.state,interpreters:[...this.state.interpreters,...dbInterpreters]})

    // setTheLocalInterpreter({you:'its you'})
  }

  setTheInterpreter=(theInterpreter)=>{
    const jsonTheInterpreter =JSON.stringify(theInterpreter)
    localStorage.setItem('THE_INTERPRETER',jsonTheInterpreter)
    this.setState({...this.state,theInterpreter})
  }

  componentWillUnmount(){
    this.unsubscribeTheUser()
  }
  
  render(){
    console.log('++++++from App.js render thestate:', this.state)
    return (
      <div >
        <Switch>
          <Route path='/interpreter/signin' render={()=>{return <InterpreterSigninPage theInterpreter={this.state.theInterpreter} theUser={this.state.theUser}/>}}   /> 
          <Route path='/interpreter/submitleave' component={LeaveSubmissionPage} />   
          <Route path='/supervisor/addinterpreter' component={AddInterpreterPage}/>
          <Route path='/supervisor' />
          <Route path='/' render={(props)=>{return <HomePage {...props} theState={this.state} setTheInterpreter={this.setTheInterpreter}/>}} />
        </Switch>
      </div>
    );
  }
}

export default UNLeave;
