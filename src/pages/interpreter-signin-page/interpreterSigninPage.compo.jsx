import { React } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";


import InterpreterSignin from "../../components/interpreter-signin/interpreterSignin.compo";


const InterpreterSigninPage = (props)=>{
        console.log('from interpreterSigninPage func props:',props)               
        const {theInterpreter,theUser}=props;
        if (theUser && theInterpreter) {
                return theInterpreter.email===theUser.email ? <Redirect to='/interpreter/submitleave'/> : <InterpreterSignin/>            
        }else{
                return <InterpreterSignin/>
        }        
}

const mapStateToProps =(state)=>({
        theUser:state.User.theUser,
        theInterpreter:state.Interpreter.theInterpreter
})

export default connect(mapStateToProps)(InterpreterSigninPage);