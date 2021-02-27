import { addToAllLeavesToStore_Action, removeAllLeavesFromStore_Action, setAllInterpretersFromDBToStore_Action, setAllSupervisorsFromDBToStore_Action, setLeavesFromDBToStore_Action } from "../redux/redux.actions";
import { store } from "../redux/store";
import { myFirestore } from "./firebaseConfig"


export const  getAllInterpretersFromDB = async ()=>{
    const myQuryReftoInterpretersCollection = myFirestore.collection('Interpreters')
    console.log("from getAllInterpretersFromDB",myQuryReftoInterpretersCollection)
    let mySnapshFromInterpretersCollection = null
    
    try {
        mySnapshFromInterpretersCollection = await myQuryReftoInterpretersCollection.get();    
    } catch (error) {
        console.log('error from getAllInterpretersFromDB',error)   
    }
    console.log("from getAllInterpretersFromDB snapshot",mySnapshFromInterpretersCollection)
    const interpreters=[];        
    mySnapshFromInterpretersCollection.docs.map((doc,index)=>{
      interpreters[index] = doc.data()
    })
    store.dispatch(setAllInterpretersFromDBToStore_Action(interpreters))
    return interpreters;
}

export const  getAllSupervisorsFromDB = async ()=>{
    const myQuryReftoSupervisorsCollection = myFirestore.collection('Supervisors')
    console.log("from getAllSupervisorsFromDB",myQuryReftoSupervisorsCollection)
    let mySnapshFromSupervisorsCollection = null
    
    try {
        mySnapshFromSupervisorsCollection = await myQuryReftoSupervisorsCollection.get();    
    } catch (error) {
        console.log('error from getAllSupervisorsFromDB',error)   
    }
    console.log("from getAllSupervisorsFromDB snapshot",mySnapshFromSupervisorsCollection)
    const supervisors=[];        
    mySnapshFromSupervisorsCollection.docs.map((doc,index)=>{
      supervisors[index] = doc.data()
    })
    store.dispatch(setAllSupervisorsFromDBToStore_Action(supervisors))    
    return supervisors;
}

export const addLeaveForTheInterpreterToDB = async (theLeave)=>{
    
    const myQueryRefToTheInterpreterLeave = myFirestore.collection('Interpreters').doc(theLeave.leaveOwnerEmail.toString().toLowerCase()).collection('Vacations').doc(theLeave.leavesArrayRef)
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
    console.log('from loadLeavesOfTheInterpreterFromDBToStore', leavesOfThisMonth)
    store.dispatch(setLeavesFromDBToStore_Action(leavesOfThisMonth))
    return mySnapshotFromLeavesOfTheMonth.data()
}

export const loadAllLeavesOfTheMonthFromDBToStore = (inTime)=>{
    store.dispatch(removeAllLeavesFromStore_Action())
    const leaveRef= inTime.getFullYear().toString()+'-'+(inTime.getMonth()+1).toString();
    const All_Interpreters = store.getState().Interpreters.allInterpreters
    All_Interpreters.map(
        async (theInterpreter)=>{
            const myQueryRefToleavesOfTheMonth = myFirestore.collection('Interpreters').doc(theInterpreter.email.toString().toLowerCase()).collection('Vacations').doc(leaveRef)
            const mySnapshotFromLeavesOfTheMonth = await myQueryRefToleavesOfTheMonth.get()        
            const leavesOfThisMonth = mySnapshotFromLeavesOfTheMonth.data();   
            store.dispatch(addToAllLeavesToStore_Action(leavesOfThisMonth))
        }    
    )
    return true
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
    const myQueryRefToAnInterpreterDoc= myFirestore.collection("Supervisors").doc(`${interpreterObj.email.toLowerCase()}`)
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