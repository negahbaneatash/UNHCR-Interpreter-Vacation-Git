import  React  from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { setTheUserToStore_Action } from '../../redux/redux.actions';
import UserSignin from "../../components/user-signin/userSignin.compo";
import { store } from '../../redux/store';
import { Login_Status } from "../../redux/waiting.reducer";
import { myFireauth } from "../../firebase/firebaseConfig";



class UserSigninPage extends React.Component {
        constructor(){
                super()
        }


componentDidMount(){
        const {theInterpreter,theSupervisor,history}=this.props
        if (history.action==='POP') {
                store.dispatch({type:Login_Status.waitingForConfirmation})
        }
        //make sure below if the user is phone user it still works
        this.unsubscribeTheUser=myFireauth.onAuthStateChanged((user)=>{                    
                this.props.setTheUserToStore(user)
                if (user.email!==theInterpreter.email && history.action==='POP') {
                        store.dispatch({type:Login_Status.googleLoginFailed})
                }
        })
}

//   componentWillUnmount(){
//     this.unsubscribeTheUser()
//   }

render(){
        
        console.log('from UserSigninPage render, this.props:',this.props)     
                        
        const {theInterpreter,theSupervisor,theUser}=this.props;
        if (theUser && theInterpreter) {
                console.log('first if')
                if (theUser.email===theInterpreter.email || theUser.phoneNumber === theInterpreter.phoneNumber) {                        
                        console.log('second if')
                        // store.dispatch({type:Login_Status.googleLoginSuccessful})
                        return ( 
                                <Redirect to='/interpreter/submitleave'/>
                        )
                } else if (theUser.providerData[0].providerId==='google.com' && theUser.email!==theInterpreter.email) {
                        console.log('third if')
                        // store.dispatch({type:Login_Status.googleLoginFailed})
                        return(
                                <UserSignin theInterpreter={theInterpreter} theSupervisor={theSupervisor}/>
                        )                        
                }else if (theUser.providerData[0].providerId==='phone' && theUser.phoneNumber === theInterpreter.phoneNumber) {
                        console.log('forth if')
                        // store.dispatch({type:Login_Status.phoneLoginFailed})
                        return(
                                <UserSignin theInterpreter={theInterpreter} theSupervisor={theSupervisor}/>
                        )
                }else {
                        console.log('last else')
                        return(
                                <UserSignin theInterpreter={theInterpreter} theSupervisor={theSupervisor}/>
                        )
                }                        
                // return (theInterpreter.email===theUser.email || theInterpreter.phoneNumber === theUser.phoneNumber) ? <Redirect to='/interpreter/submitleave'/> : <UserSignin theInterpreter={theInterpreter} theSupervisor={theSupervisor}/>            
        }
        else if (theUser && theSupervisor) {
                return (theSupervisor.email===theUser.email || theSupervisor.phoneNumber === theUser.phoneNumber) ? <Redirect to='/supervisor/main-stage'/> : <UserSignin theInterpreter={theInterpreter} theSupervisor={theSupervisor}/>            
        }else{
                return <UserSignin theInterpreter={theInterpreter} theSupervisor={theSupervisor}/>
        }        

}        


}



const mapStateToProps =(state)=>({
        theUser:state.User.theUser,
        theInterpreter:state.Interpreter.theInterpreter,
        theSupervisor:state.Supervisor.theSupervisor
})

const mapDispatchToProps=(dispatch)=>{
        return {
          setTheUserToStore: (theUser)=>{dispatch(setTheUserToStore_Action(theUser))},         
        }
}

export default connect(mapStateToProps,mapDispatchToProps)(UserSigninPage);