import { React } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";


import InterpreterSignin from "../../components/interpreter-signin/interpreterSignin.compo";


const InterpreterSigninPage = (props)=>{
        console.log('from interpreterSigninPage func props:',props)               
        const {theInterpreter1,theUser}=props;
        if (theUser && theInterpreter1) {
                return theInterpreter1.email===theUser.email ? <Redirect to='/interpreter/submitleave'/> : <InterpreterSignin/>            
        }else{
                return <InterpreterSignin/>
        }        
}

const mapStateToProps =(state)=>({
        theUser:state.User.theUser,
        theInterpreter1:state.Interpreter.theInterpreter
})

export default connect(mapStateToProps)(InterpreterSigninPage);