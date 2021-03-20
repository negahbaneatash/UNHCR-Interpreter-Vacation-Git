import React from 'react'
import { Switch,Route } from "react-router-dom";
import { connect } from "react-redux";

import './App.css';

import { myFireauth } from './firebase/firebaseConfig';
import { setTheUserToStore_Action } from "./redux/redux.actions";

import HomePage from './pages/home-page/homePage.compo';
import LeaveSubmissionPage from './pages/leave-submission-page/leaveSubmissionPage.compo';
import AddInterpreterPage  from './pages/add-interpreter-page/addInterpreterPage.compo'
import SupervisorSigninPage from './pages/supervisor-signin-page/supervisorSigninPage.compo';
import UserSigninPage from './pages/user-signin-page/userSigninPage.compo';
import SupervisorAdministrationPage from './components/supervisor-administration-page/supervisorAdministrationPage.compo';
import Header from './components/header/header.compo';


class App extends React.Component {  
  unsubscribeTheUser=null;// onAuthStateChanged returns a function that will unsubscribe from the user when is called

  async componentDidMount(){
    console.log('from App.js componentDidMount state:',this.state)
    this.unsubscribeTheUser=myFireauth.onAuthStateChanged((user)=>{    
      this.props.setTheUserToStore(user)
    })
    // const dbInterpreters =await getAllInterpretersFromDB()        
    // this.props.setAllInterpretersToStore(dbInterpreters)
  }

  componentWillUnmount(){
    this.unsubscribeTheUser()
  }
  
  render(){
    console.log('from App.js render thestate:', this.state)    
    return (
      <React.Fragment>
        <Header/>  
        <Switch>
          <Route path='/user/signin' component={UserSigninPage}/> 
          <Route path='/interpreter/submitleave' component={LeaveSubmissionPage}/>   
          <Route path='/supervisor/main-stage' component={SupervisorAdministrationPage}/>
          <Route path='/supervisor/addinterpreter' component={AddInterpreterPage}/>
          <Route path='/supervisor' component={SupervisorSigninPage}/>
          <Route path='/' component={HomePage} />
        </Switch>
      </React.Fragment>
    );
  }
}

const myMapDispatchToProps=(dispatch)=>{
  return {
    setTheUserToStore: (theUser)=>{dispatch(setTheUserToStore_Action(theUser))},
    // setAllInterpretersToStore: (interpreters)=>{dispatch(setAllInterpretersFromDBToStore_Action(interpreters))}
  }
}


export default connect(null,myMapDispatchToProps)(App);
