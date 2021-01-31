import React from 'react'
import { Switch,Route } from "react-router-dom";
import { connect } from "react-redux";

import './App.css';

import HomePage from './pages/home-page/homePage.compo';
import LeaveSubmissionPage from './pages/leave-submission-page/leaveSubmissionPage.compo';
import  AddInterpreterPage  from './pages/add-interpreter-page/addInterpreterPage.compo'
import InterpreterSigninPage from './pages/interpreter-signin-page/interpreterSigninPage.compo';

import { myFireauth } from './firebase/firebaseConfig';
import { getAllInterpretersFromDB } from "./firebase/dataBaseFunctions";

import { setTheUserToStore_Action } from "./redux/redux.actions";





class App extends React.Component {  
  
  
  unsubscribeTheUser=null;// onAuthStateChanged returns a function that will unsubscribe from the user when is called

  async componentDidMount(){
    console.log('from App.js componentDidMount state:',this.state)
    this.unsubscribeTheUser=myFireauth.onAuthStateChanged((user)=>{    
      this.props.setTheUserToStore(user)
    })

    const dbInterpreters =await getAllInterpretersFromDB()        
    this.props.setAllInterpretersToStore(dbInterpreters)
  }

  componentWillUnmount(){
    this.unsubscribeTheUser()
  }
  
  render(){
    console.log('from App.js render thestate:', this.state)    
    return (
      <div >
        <Switch>
          <Route path='/interpreter/signin' component={InterpreterSigninPage}/> 
          <Route path='/interpreter/submitleave' component={LeaveSubmissionPage}/>   
          <Route path='/supervisor/addinterpreter' component={AddInterpreterPage}/>
          <Route path='/supervisor' />
          <Route path='/' component={HomePage} />
        </Switch>
      </div>
    );
  }
}


const myMapDispatchToProps=(dispatch)=>{
  return {
    setTheUserToStore: (theUser)=>{dispatch(setTheUserToStore_Action(theUser))},
    setAllInterpretersToStore: (interpreters)=>{dispatch({type:'SET_ALL_INTERPRETERS',payload:interpreters})}
  }
}


export default connect(null,myMapDispatchToProps)(App);
