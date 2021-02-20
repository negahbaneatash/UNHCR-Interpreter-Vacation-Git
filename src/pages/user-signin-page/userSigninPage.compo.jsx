import { React } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import UserSignin from "../../components/user-signin/userSignin.compo";


const UserSigninPage = (props)=>{
        console.log('from UserSigninPage func props:',props)               
        const {theInterpreter,theSupervisor,theUser}=props;
        if (theUser && theInterpreter) {
                return theInterpreter.email===theUser.email ? <Redirect to='/interpreter/submitleave'/> : <UserSignin/>            
        }else if (theUser && theSupervisor) {
                return theSupervisor.email===theUser.email ? <Redirect to='/supervisor/main-stage'/> : <UserSignin/>            
        }else{
                return <UserSignin/>
        }        
}

const mapStateToProps =(state)=>({
        theUser:state.User.theUser,
        theInterpreter:state.Interpreter.theInterpreter,
        theSupervisor:state.Supervisor.theSupervisor
})


export default connect(mapStateToProps)(UserSigninPage);