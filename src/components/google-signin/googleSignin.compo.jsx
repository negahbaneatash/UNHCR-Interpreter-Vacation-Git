
import { React, Component } from "react";
import { connect } from "react-redux";
import firebase, { myFireauth } from '../../firebase/firebaseConfig'
import { setTheUserToStore_Action } from "../../redux/redux.actions";
import GoogleSigninButton from "../google-signin-button/googleSigninButton.compo"


class GoogleSignin extends Component {
    constructor(){
        super()
        this.state={
            confirmed:false,
            message:''
        }
    }
    
    componentDidMount(){
        console.log('from googleSignin componentDidMount')
        
    }

    handleClick=()=>{        
        this.setState({...this.state,message:'Redirecting to google signin ...',msgColor:'purple'})
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithRedirect(provider)
        firebase.auth().getRedirectResult().then((result)=>{
            this.setState({...this.state,confirmed:true, message:'login successful, Please wait, you are redirecting to your leave submission page',msgColor:'green'})
            // this.props.isConfirmed(true)
            console.log('from inside signin handleclick',result.user)     
            this.props.setIsWaiting(true)
            
        })
        

    }
    
    handleClickI=()=>{
        this.props.setIsWaiting(false)
    }
    
    render (){
        console.log('from googleSignin render',this.props)
        return(
            <div>
                <GoogleSigninButton googleButtonClicked={this.handleClick} >{`Sign in with:   ${this.props.googleAccount}`}</GoogleSigninButton>
                 <button onClick={this.handleClickI}>I am here</button>
            </div>
        )
    }
    

}


const mapDispatchToProps=(dispatch)=>{
    return {
      
      setIsWaiting:(bool)=>{dispatch({type:'PLEASE_WAIT',payload:bool})}
      
      // setAllInterpretersToStore: (interpreters)=>{dispatch(setAllInterpretersFromDBToStore_Action(interpreters))}
    }
  }
  
export default connect(null,mapDispatchToProps)(GoogleSignin);