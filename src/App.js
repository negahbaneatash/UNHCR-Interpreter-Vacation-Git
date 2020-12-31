import React from 'react'
import { Switch,Route } from "react-router-dom";

import './App.css';

import HomePage from './pages/home-page/homePage.compo';
import LeaveSubmissionPage from './pages/leave-submission-page/leaveSubmissionPage.compo';
import { AddInterpreterPage } from './pages/add-interpreter-page/addInterpreterPage.compo'

import { myFireauth } from './firebase/firebaseConfig';
import { getAllInterpreters } from "./firebase/dataBaseFunctions";
import InterpreterSigninPage from './pages/interpreter-signin-page/interpreterSigninPage.compo';


class UNLeave extends React.Component {  
    
  constructor(){
    super()
    this.state={
      interpreters:[],
      theUser:null,
    }
  }

  // onAuthStateChanged returns a function that will unsubscribe from the user when is called
  unsubscribeTheUser=null;

  async componentDidMount(){
    this.unsubscribeTheUser=myFireauth.onAuthStateChanged((user)=>{
      this.setState({theUser:user})
    })
    const dbInterpreters =await getAllInterpreters()        
        this.setState({...this.state,interpreters:[...this.state.interpreters,...dbInterpreters]})
  }

  componentWillUnmount(){
    this.unsubscribeTheUser()
  }
  
  render(){
    return (
      <div >
        <Switch>
          <Route path='/interpreter/signin' component={InterpreterSigninPage}   /> 
          <Route path='/interpreter/:interpreterId' component={LeaveSubmissionPage} />   
          <Route path='/supervisor/addinterpreter' component={AddInterpreterPage}/>
          <Route path='/supervisor' />
          <Route path='/' render={(props)=>{return <HomePage {...props} theState={this.state}/>}} />
        </Switch>
      </div>
    );
  }
}

export default UNLeave;
