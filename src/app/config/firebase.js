import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { FacebookAuthProvider } from "firebase/auth"
import { getAuth, signInWithPopup } from "firebase/auth"
import { collection, addDoc, getFirestore, getDocs, updateDoc, doc, serverTimestamp,firebase } from "firebase/firestore"
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { query, where, onSnapshot } from "firebase/firestore"

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
    console.log('data', data)
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
  });
  return data

}



const user = [
  {
    fullname: 'Hiba',
    email: 'hiba@gmail.com',
    status: 'pending'


  },
  {
    fullname: 'Ali',
    email: 'ali@gmail.com',
    status: 'pending'


  },
  {
    fullname: 'Hamna',
    email: 'hamna@gmail.com',
    status: 'pending'


  },
  {
    fullname: 'Soha',
    email: 'soha@gmail.com',
    status: 'pending'


  }

]


async function users() {
  try {
    for (var i = 0; i < user.length; i++) {
      const add = addDoc(collection(db, "users"), user[i])
      console.log("add", add)

    }
  } catch (e) {
    alert(e.message)
  }
}
// users()






async function updateStatus(id, status) {
  await updateDoc(doc(db, "users", id), {
    status
  });

}

async function handleChat(NewMessages) {
  const mainCollectionRef = collection(db, 'chatrooms');
  const mainDocRef = await addDoc(mainCollectionRef, {
   
  });

  const mainDocId = mainDocRef.id;
  const subCollectionRef = collection(db, 'chatrooms', mainDocId, 'messages')
  await addDoc(subCollectionRef, {
    
    text: NewMessages ,
    createdAt:Date.now(),
    userId:auth.currentUser.uid
    
  });


}

async function checkAndCreateRoom(friendId,setMsg) {
  const users = { [friendId]: true, [auth.currentUser.uid]: true }

  const docRef = await addDoc(collection(db, "chatrooms"), {
    users,
    createdAt: Date.now(),
    lastMessage:{}
  });

  const q = query(collection(db, "chatrooms"), where( `users.${friendId}`, "==", true));
  console.log('q',q)

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    let room;
    const chat = [];
    querySnapshot.forEach((doc) => {
        chat.push({id:doc.id,...doc.data()});
        room = doc.data()
    });
    setMsg(chat)
    console.log('chats',chat)
  });


  // function getChat(){
  //   const q = query(collection(db, "chatrooms"));
  //   const unsubscribe = onSnapshot(q, (querySnapshot) => {
  //     const newChat = [];
  //     querySnapshot.forEach((doc) => {
  //         newChat.push({id:doc.id,...doc.data()});
  //     });
  //     setData(newChat)
  //     console.log('chats',newChat)
  //   });

  // }
 

}








export { loginWithFacebook, posting, getPosts, collection, query, where, onSnapshot, db, updateStatus, checkAndCreateRoom,handleChat}