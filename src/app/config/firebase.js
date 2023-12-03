import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { FacebookAuthProvider } from "firebase/auth"
import { getAuth, signInWithPopup } from "firebase/auth"
import { collection, addDoc, getFirestore, getDocs,updateDoc,doc,serverTimestamp } from "firebase/firestore"
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"
import {  query, where, onSnapshot } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBpSQIbxUT4kWlhqd6il1iU4eauKRgqaPM",
  authDomain: "hackathon-project-b1243.firebaseapp.com",
  projectId: "hackathon-project-b1243",
  storageBucket: "hackathon-project-b1243.appspot.com",
  messagingSenderId: "834519653487",
  appId: "1:834519653487:web:fa3ffb268842e57a82819a",
  measurementId: "G-JSMTVTCYXX"
};


const app = initializeApp(firebaseConfig);
const provider = new FacebookAuthProvider();
const auth = getAuth();
const db = getFirestore(app)
const storage = getStorage(app)



function loginWithFacebook() {
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      const credential = FacebookAuthProvider.credentialFromResult(result);
      const accessToken = credential.accessToken;
      console.log('user', user)

    })

    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = FacebookAuthProvider.credentialFromError(error);

    });
}

async function posting(description, file) {
  const url = await uploadImage(file)
  const docRef = await addDoc(collection(db, "data"), {
    description,
    Url: url
  });
}

async function uploadImage(file) {
  try {
    const storageRef = ref(storage, 'data/' + file.name);
    await uploadBytes(storageRef, file)
    const url = await getDownloadURL(storageRef)
    return url
  } catch (e) {
    alert(e.message)

  }
}

async function getPosts() {
  const querySnapshot = await getDocs(collection(db, "data"));
  const data = []
  querySnapshot.forEach((doc) => {
    const postData = doc.data()
    data.push(postData)
    console.log('data',data)
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
  });
  return data
  
}



const user = [
  {
   fullname:'Hiba',
   email:'hiba@gmail.com',
   status:'pending'

   
  },
  {
    fullname:'Ali',
    email:'ali@gmail.com',
    status:'pending'
 
    
   },
   {
    fullname:'Hamna',
    email:'hamna@gmail.com',
    status:'pending'
 

   },
   {
    fullname:'Soha',
    email:'soha@gmail.com',
    status:'pending'
 
    
   }

]


async function users(){
  try {
    for (var i = 0; i < user.length; i++) {
      const add = addDoc(collection(db, "users"), user[i])
      console.log("add",add)

    }
  } catch (e) {
    alert(e.message)
  }
}
// users()



//  async function getUsers(){
//   const querySnapshot = await getDocs(collection(db, "users"));
//   const users = []
//   querySnapshot.forEach((doc) => {
//     const data = doc.data()
//     data.id = doc.id
//     users.push(data)
//     console.log('users',users)
//     // doc.data() is never undefined for query doc snapshots
//     console.log(doc.id, " => ", doc.data());
//   });
//   return users
// }


async function updateStatus(id,status){
  await updateDoc(doc(db, "users", id), {
    status
  });
  
}

async function handleChat (newMessages){
  try{
    const docRef = await addDoc(collection(db, "messages"), {
      messages:newMessages,
      createdAt:serverTimestamp(),
      user:auth.currentUser.displayName
     
    });
  }catch(e){
    alert (e.message)

  }
  
}







export { loginWithFacebook, posting,getPosts ,collection, query, where, onSnapshot,db,updateStatus,handleChat}