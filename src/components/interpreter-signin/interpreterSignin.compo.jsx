import firebase from "firebase/app";

import { React, Component } from "react";



class InterpreterSignin extends Component {


    handleClick=()=>{
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithRedirect(provider)
        firebase.auth().getRedirectResult().then((user)=>{
            console.log(user)
        })
    }

    render(){
        console.log('from intpsignin',this.props)
        console.log('again from intpsignin')
        return(
        <button onClick={this.handleClick}>Sign In With Google</button>
    )}
}



export default InterpreterSignin;