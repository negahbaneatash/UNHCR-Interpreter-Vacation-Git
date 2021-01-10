import  React  from "react";

import CustomCalendar from "../custom-calendar/customCalendar.compo";




class InterpreterLeaveSubmission extends React.Component {


    
    
    state={
        tempLeave1:'',
        tempLeave2:'',
        Alert:''
    }
    componentDidMount(){
        console.log('from InterpreterLeaveSubmission componentDidMount')
    }
    handleClickDay=(value)=>{
        if (this.state.tempLeave1 === '') {
            this.setState({...this.state, tempLeave1:value})
        }
        else if(this.state.tempLeave2 === ''){    
            this.setState({...this.state, tempLeave2:value})    
        }else{
            this.setState({...this.state, Alert:'You can only apply for two leaves on each month, if you want to edit your Leave please first delete it and choose another date'})
        }
}
    handleDelete=(event)=>{
        if (event.target.name === 'delete-AL1') {
            this.setState({...this.state,tempLeave1:'', Alert:''})
        }else{
            this.setState({...this.state,tempLeave2:'', Alert:''})
        }        
    }
    

    render(){
        console.log('from InterpreterLeaveSubmission render')
        const {tempLeave1,tempLeave2} = this.state;
        return(
            <div>
                <h1>{`InterpreterLeaveSubmission for interpreter number${this.props.interpreterId}`}</h1>
                <CustomCalendar clickDay={this.handleClickDay}></CustomCalendar>
                <lable>AL1</lable>
                <input type="text" lable='AL1' value={this.state.tempLeave1.toString()}/>
                <button name='delete-AL1' onClick={this.handleDelete}>Del</button>
                <br/>
                <lable>AL2</lable>
                <input type="text" lable='AL2' value={this.state.tempLeave2.toString()}/>
                <button name='delete-AL2' onClick={this.handleDelete}>Del</button>
                <br/>
                {/* <button name='submit-AL' onClick={this.handleSubmitLeave(tempLeave1,tempLeave2)}>Submit My Leave(s)</button> */}
                {this.state.Alert ? <h1 style={{'color':'red'}}>{this.state.Alert}</h1> : ''}
            </div>
            

        )
    }    
}

export default InterpreterLeaveSubmission;


