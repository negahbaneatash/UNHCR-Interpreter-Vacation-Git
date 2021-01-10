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

componentDidMount(){
    console.log('from addInterpreterToDB componentDidMount')
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
    console.log('from addInterpreterToDB render')
    const {name,nickname,group,email,phone}=this.state;
    
    return(
    <form onSubmit={this.handleSubmit}>
        <input type="text" name='name' placeholder='name' value={name} onChange={this.handleChange}/>
        <input type="text" name='nickname' placeholder='nickname' value={nickname} onChange={this.handleChange}/>
        <input type="text" name='group' placeholder='group' value={group} onChange={this.handleChange}/>
        <input type="text" name='email' placeholder='email' value={email} onChange={this.handleChange}/>
        <input type="text" name='phone' placeholder='phone' value={phone} onChange={this.handleChange}/>
        <button type='submit' name='submit' >Add This Interpreter</button>
    </form>
    )    
}

}