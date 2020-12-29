import React from 'react'
import { Switch,Route } from "react-router-dom";

import './App.css';

import HomePage from './pages/home-page/homePage.compo';
import LeaveSubmissionPage from './pages/leave-submission-page/leaveSubmissionPage.compo';
import InterpreterSignin from './components/interpreter-signin/interpreterSignin.compo';
import { AddInterpreterPage } from './pages/add-interpreter-page/addInterpreterPage.compo'

import { myFireauth } from './firebase/firebaseConfig';
import { getAllInterpreters } from "./firebase/dataBaseFunctions";


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
      this.setState({theUser:user},()=>console.log('from appjs state',this.state.theUser))
    })
    const dbInterpreters =await getAllInterpreters()
        console.log('interpreters array',dbInterpreters)
        this.setState({...this.state,interpreters:[...this.state.interpreters,...dbInterpreters]})
  }

  componentWillUnmount(){
    this.unsubscribeTheUser()
  }
  
  render(){
    return (
      <div >
        <Switch>
          <Route path='/interpreter/signin' component={InterpreterSignin}/> 
          <Route path='/interpreter/:interpreterId' component={LeaveSubmissionPage} />   
          <Route path='/supervisor/addinterpreter' component={AddInterpreterPage}/>
          <Route path='/supervisor' />
          <Route path='/' render={(props)=>{return <HomePage {...props} interpreters={this.state.interpreters}/>}} />
        </Switch>
      </div>
    );
  }
}

export default UNLeave;
