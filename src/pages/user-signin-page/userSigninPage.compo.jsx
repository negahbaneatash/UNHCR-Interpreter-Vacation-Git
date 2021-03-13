import { React } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import UserSignin from "../../components/user-signin/userSignin.compo";


const UserSigninPage = (props)=>{
        console.log('from UserSigninPage func props:',props)               
        const {theInterpreter,theSupervisor,theUser}=props;
        if (theUser && theInterpreter) {
                return (theInterpreter.email===theUser.email || theInterpreter.phoneNumber === theUser.phoneNumber) ? <Redirect to='/interpreter/submitleave'/> : <UserSignin theInterpreter={theInterpreter} theSupervisor={theSupervisor}/>            
        }else if (theUser && theSupervisor) {
                return (theSupervisor.email===theUser.email || theSupervisor.phoneNumber === theUser.phoneNumber) ? <Redirect to='/supervisor/main-stage'/> : <UserSignin theInterpreter={theInterpreter} theSupervisor={theSupervisor}/>            
        }else{
                return <UserSignin theInterpreter={theInterpreter} theSupervisor={theSupervisor}/>
        }        
}

const mapStateToProps =(state)=>({
        theUser:state.User.theUser,
        theInterpreter:state.Interpreter.theInterpreter,
        theSupervisor:state.Supervisor.theSupervisor
})


export default connect(mapStateToProps)(UserSigninPage);