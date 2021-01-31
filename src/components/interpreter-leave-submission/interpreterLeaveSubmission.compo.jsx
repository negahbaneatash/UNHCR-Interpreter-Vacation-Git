import  React  from "react";
import { connect } from "react-redux";

import { addLeaveForTheInterpreterToDB, getLeavesOfTheInterpreterFromDB } from "../../firebase/dataBaseFunctions";
import { store } from "../../redux/store";
import CustomCalendar from "../custom-calendar/customCalendar.compo";
import InterpreterLeaveCard from "../interpreter-leave-card/interpreterLeaveCard.compo";




class InterpreterLeaveSubmission extends React.Component {    
    
    state={
        tempLeave1:null,
        tempLeave2:null,
        alert:''
    }
    componentDidMount(){
        console.log('from InterpreterLeaveSubmission componentDidMount', this.props.theInterpreter)
    }
    handleClickDay=(value)=>{
        if (!this.state.tempLeave1) {
            this.setState({...this.state, tempLeave1:value})
        }
        else if(!this.state.tempLeave2){    
            this.setState({...this.state, tempLeave2:value})    
        }else{
            this.setState({...this.state, alert:'You can only apply for two leaves on each month, if you want to edit your Leave please first delete it and choose another date'})
        }
    }
    handleChange=(obj)=>{
        console.log('from cal handlechange:',obj)
        this.setState({...this.state, tempLeave1:'',tempLeave2:'',alert:''})
    }

    handleDelete=(event)=>{
        if (event.target.name === 'delete-AL1') {
            this.setState({...this.state,tempLeave1:'', alert:''})
        }else{
            this.setState({...this.state,tempLeave2:'', alert:''})
        }        
    }
    
    handleSubmitLeave =()=>{
        const AL1={
            leaveDate:this.state.tempLeave1,
            id:'AL-'+ Math.floor((Math.random()*100000)).toString(),
            type:'AL1',
            submittedOn:new Date(),
            note: 'You feel the best'
        }
        // const arr1 = this.props.interpreterLeaves;
        
        store.dispatch({type:'SET_THE_LEAVE',payload:AL1})
        console.log('from handleSubmit leaves of store',store.getState().Leaves)
        addLeaveForTheInterpreterToDB(this.props.theInterpreter,this.state.tempLeave1)
        getLeavesOfTheInterpreterFromDB(this.props.theInterpreter,this.state.tempLeave1)
    }

    render(){
        
        let {tempLeave1,tempLeave2} = this.state;
        console.log('from InterpreterLeaveSubmission render')
        return(
            <div>
                <h1>{`Hellooo  ${this.props.theInterpreter.name}`}</h1>
                <CustomCalendar clickDay={this.handleClickDay} itChanged={this.handleChange}></CustomCalendar>
                <InterpreterLeaveCard submitLeave={this.handleSubmitLeave} deleteLeave={this.handleDelete} leaveDate={this.state.tempLeave1}></InterpreterLeaveCard>
                <br/>
                <lable>AL2</lable>
                <input type="text" lable='AL2' value={tempLeave2?tempLeave2.toDateString():''}/>
                <button name='delete-AL2' onClick={this.handleDelete}>Delete</button>
                <button name='submit-AL1' onClick={this.handleSubmitLeave} disabled={true}>Submit</button>
                <lable>status</lable>
                <br/>

                
                {this.state.alert ? <h1 style={{'color':'red'}}>{this.state.alert}</h1> : ''}
            </div>
            

        )
    }    
}

function mapStateToProps(state){
    return {
        theInterpreter:state.Interpreter.theInterpreter,
        interpreterLeaves:state.Leaves.leaves
    }
}
export default connect(mapStateToProps)(InterpreterLeaveSubmission);


