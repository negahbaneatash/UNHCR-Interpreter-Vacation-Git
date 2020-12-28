import React from "react";
import { addAnInterpreterToDB } from "../../firebase/dataBaseFunctions";





export default class AddInterpreterToDB extends React.Component{
    constructor(){
        super()
        this.state={
            name:'',
            nickname:'',
            group:'',
            email:'',
            phone:'',
        }
    }


handleChange=(event)=>{
    const {name,value}=event.target;
    this.setState({
        ...this.state,
        [name]:value,
    })
}

handleSubmit=(event)=>{
    const {name,nickname,group,email,phone}=this.state;
    event.preventDefault();
    addAnInterpreterToDB(name,nickname,group,email,phone)
}
render(){
    const {name,nickname,group,email,phone}=this.state;
    return(
    <form onSubmit={this.handleSubmit}>
        <input type="text" name='name' value={name} onChange={this.handleChange}/>
        <input type="text" name='nickname' value={nickname} onChange={this.handleChange}/>
        <input type="text" name='group' value={group} onChange={this.handleChange}/>
        <input type="text" name='email' value={email} onChange={this.handleChange}/>
        <input type="text" name='phone' value={phone} onChange={this.handleChange}/>
        <button type='submit' name='submit' >Add This Interpreter</button>
    </form>
    )    
}

}