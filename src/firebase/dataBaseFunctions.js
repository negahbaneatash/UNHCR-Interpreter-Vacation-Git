import { setLeavesFromDBToStore_Action } from "../redux/redux.actions";
import { store } from "../redux/store";
import { myFirestore } from "./firebaseConfig"


export const  getAllInterpretersFromDB = async ()=>{
    const myQuryReftoInterpretersCollection = myFirestore.collection('Interpreters')
    let mySnapshFromInterpretersCollection = null
    const interpreters=[];    
    try {
        mySnapshFromInterpretersCollection = await myQuryReftoInterpretersCollection.get();    
    } catch (error) {
        console.log(error)   
    }    
    mySnapshFromInterpretersCollection.docs.map((doc,index)=>{
      interpreters[index] = doc.data()
    })
    return interpreters;
}

export const addLeaveForTheInterpreterToDB = async (theInterpreter,leaveTime)=>{
    const leaveRef = leaveTime.getFullYear().toString()+'-'+(leaveTime.getMonth()+1).toString();
    const myQueryRefToTheInterpreterLeave = myFirestore.collection('Interpreters').doc(theInterpreter.email.toString().toLowerCase()).collection('Vacations').doc(leaveRef)
    const mySnapshotFromTheInterpreterLeave = await myQueryRefToTheInterpreterLeave.get()    
    if (mySnapshotFromTheInterpreterLeave.exists) {
        console.log("There is a leave here")
        await myQueryRefToTheInterpreterLeave.update(store.getState().Leaves)
    } else {
        await myQueryRefToTheInterpreterLeave.set(store.getState().Leaves)
    }
    myQueryRefToTheInterpreterLeave.onSnapshot((leaveSnapshot)=>{
        console.log('from leaveSnapshot',leaveSnapshot.data())
    },(err)=>{
        console.log('The adding leave was not successful, Error:',err)
    })
}

export const loadLeavesOfTheInterpreterFromDBToStore = async (theInterpreter,inTime)=>{
    const leaveRef= inTime.getFullYear().toString()+'-'+(inTime.getMonth()+1).toString();
    const myQueryRefToleavesOfTheMonth = myFirestore.collection('Interpreters').doc(theInterpreter.email.toString().toLowerCase()).collection('Vacations').doc(leaveRef)
    const mySnapshotFromLeavesOfTheMonth = await myQueryRefToleavesOfTheMonth.get()
    const leavesOfThisMonth = mySnapshotFromLeavesOfTheMonth.data();    
    store.dispatch(setLeavesFromDBToStore_Action(leavesOfThisMonth))
    return mySnapshotFromLeavesOfTheMonth.data()
}

export const addAnInterpreterToDB =async (name,nickname,group,email,phone,uid=null)=>{

    const interpreterObj={
        name,
        nickname,
        email,
        phone,
        group,
        uid,
        al1:false,
        al2:false,
    }
    const myQueryRefToAnInterpreterDoc= myFirestore.collection("Interpreters").doc(`${interpreterObj.email.toLowerCase()}`)
    const mySnapshotFromAnInterpreterDoc= await myQueryRefToAnInterpreterDoc.get();
    if (mySnapshotFromAnInterpreterDoc.exist) {
        console.log('this Interpreter with this email address already exist in the database')        
    } else {
        await myQueryRefToAnInterpreterDoc.set(interpreterObj)
    } 
    myQueryRefToAnInterpreterDoc.onSnapshot((docSnapshot)=>{
        console.log('the Interpreter was succussfully added with the following parameters')
        console.log(docSnapshot.data())

    }, (theError)=>{
        console.log('there was an error while saving the interpreter into the database')
        console.log('the error is', theError)
    })
}