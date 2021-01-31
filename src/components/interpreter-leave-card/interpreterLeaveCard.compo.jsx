
import '../interpreter-leave-card/interpreterLeaveCard.style.css'


const InterpreterLeaveCard =(props)=>{

    return(
        <div className='interpreter-leave-card'>
            <input type="text" lable='AL1' value={props.leaveDate?props.leaveDate.toDateString():''}/>
            <button name='delete-AL1' onClick={props.deleteLeave}>Delete</button>
            <button name='submit-AL1' onClick={props.submitLeave}>Submit</button>
            <lable>status</lable>
        </div>
    )
}

export default InterpreterLeaveCard;