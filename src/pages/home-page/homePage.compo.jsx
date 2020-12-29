import { React } from "react";
import LoginTools from "../../components/login-tools/loginTools.compo";


const HomePage = (props)=>{
    console.log('from home page:',props)
    return <LoginTools interpreters={props.interpreters}/>
}

export default HomePage;