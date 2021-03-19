
import './deleteLeaveButton.style.css'


const DeleteLeaveButton =(props)=>{
    return(
        <div onClick={props.deleteLeaveClicked} class="" style={{textAlign: 'center', marginTop: '8px'}}>
        <button class="icon-btn add-btn">  
            <div class="btn-txt">{props.children}</div>
        </button>
        </div>
    )
}

export default DeleteLeaveButton;