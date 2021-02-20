import { React, Component } from "react";
import firebase from "firebase/app";





class UserSignin extends Component {
   
    componentDidMount(){
        console.log('from UserSignin componentDidMount')
    }
    
    handleClick=()=>{
        
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithRedirect(provider)
        firebase.auth().getRedirectResult().then((result)=>{
           console.log('from inside signin handleclick',result.user)
        })
    }
    
   

    render(){
        console.log('from UserSignin render')
        return(
            <div>
                <button onClick={this.handleClick}>Sign In With Google</button>
            </div>        
    )}
}



export default UserSignin;