import { myFirestore } from "./firebaseConfig"




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
    const myQueryRefToAnInterpreterDoc= myFirestore.collection("Interpreters").doc(`${interpreterObj.email}`)
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

export const  getAllInterpreters = async ()=>{
    const myQuryReftoInterpretersCollection = myFirestore.collection('Interpreters')
    const mySnapshFromInterpretersCollection = await myQuryReftoInterpretersCollection.get();
    const interpreters=[];
    mySnapshFromInterpretersCollection.docs.map(doc=>{
      interpreters += doc.data()
    })
    console.log('from get all', interpreters)
}