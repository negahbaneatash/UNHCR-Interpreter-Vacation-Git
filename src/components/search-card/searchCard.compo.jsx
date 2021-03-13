import React from "react";
import './searchCard.style.scss'



export const SearchCard =(props)=>{
    return(
        // <div class="box">
	        <div>
		        {/* <span class="text-center">{props.children}</span> */}
	            <div class="form__group field">
                    <input onChange={props.onWriteInput} type="input" class="form__field" placeholder="Name" name="name" id='name' required />
                    <label for="name" class="form__label">{props.children} name</label>
                </div>
		        <button onClick={props.onExit} type="button" class="btn">Back</button>
            </div>	
        // </div>
    )
}


