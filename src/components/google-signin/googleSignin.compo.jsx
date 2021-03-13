
import { React, Component } from "react";
import firebase from '../../firebase/firebaseConfig'
import GoogleButton from "../google-signin-button/googleSigninButton.compo"


class GoogleSignin extends Component {


    handleClick=()=>{        
        this.setState({...this.state,message:'Redirecting to google signin ...',msgColor:'purple'})
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithRedirect(provider)
        firebase.auth().getRedirectResult().then((result)=>{
            this.setState({...this.state,message:'login successful, Please wait, you are redirecting to your leave submission page',msgColor:'green'})
            console.log('from inside signin handleclick',result.user)
        })
    }
    
    
    render (){
        return(
            <div>
                <GoogleButton buttonClicked={this.handleClick}></GoogleButton>
            </div>
        )
    }
    

}


export default GoogleSignin;