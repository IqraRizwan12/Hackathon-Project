'use client'
import { useEffect, useState } from "react"
import { Header } from '../component/Header'
import { checkAndCreateRoom, posting } from '../config/firebase'
import { getPosts } from "../config/firebase"
import { getUsers } from "../config/firebase"
import Image from 'next/image'
import Link from 'next/link'
import Popup from "../component/Popup"
import { updateStatus } from "../config/firebase"
import { handleChat } from "../config/firebase"
import {collection, query, where, onSnapshot,db} from '../config/firebase'
import { FaHome, FaCompass, FaShoppingBag, FaHeart, FaEnvelope, FaCog, FaVideo, FaCamera, FaSmile } from 'react-icons/fa';

export default function Dashboard() {
  const [description, setDescription] = useState()
  const [file, setFile] = useState()
  const [loading, setLoading] = useState(false)
  const [post,setPost] = useState([])
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popUpOpen, setPopUpOpen] = useState(false);
  const [friendRequest,setFriendRequest] = useState([])
  const [friends,setFriends] = useState()
  const [NewMessages,setNewMessages] = useState()
  const [msg,setMsg] = useState()
  

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const openPopupWindow = () => {
    setPopUpOpen(true);
  };

  const closePopupWindow = () => {
   setPopUpOpen(false);
  };

  
  useEffect(()=>{
    
    getData()
    request()
    MyContacts()

  },[])

  

  const getData = async () => {
      const data = await getPosts()
      setPost(data)
  }

  const request = async () =>{
    const q = query(collection(db, "users"), where("status", "==", "pending"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
          data.push({id:doc.id,...doc.data()});
      });
      setFriendRequest(data)
    });
  }



  async function MyContacts(){
    const q = query(collection(db, "users"), where("status", "==", "accepted"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
          data.push({id:doc.id,...doc.data()});
      });
      setFriends(data)
    });
  
    
  }


  const postMessages = ()=>{
    handleChat(NewMessages)

  }


  


 

  if(!post){
    return<div>Loading..</div>
  }


  if(!friends){
    return <div>Loading...</div>
  }

  




  const addData = async () => {
    setLoading(true)
    await posting(description,file[0])
    setLoading(false)

  }


   console.log('msg',msg)
  

  return <div >
    <Header />
    <div style={{display:'flex'}}>
    <div style={{width:'20%'}}>
      <div style={{display:'flex',padding:'10px',margin:'10px',fontSize:'large'}}>
      <FaHome/><Link href='/dashboard'>Feeds</Link>
      </div>
      <div style={{display:'flex',padding:'10px',margin:'10px',fontSize:'large'}} >
      <FaCompass/><Link href='/explore'>Explore</Link>
      </div>
      <div style={{display:'flex',padding:'10px',margin:'10px',fontSize:'large'}}>
      <FaShoppingBag/><Link href='/marketplace'>Marketplace</Link>
      </div>
      <div style={{display:'flex',padding:'10px',margin:'10px',fontSize:'large'}}>
      <FaHeart/><Link href='/myfavourites'>My favourites</Link>
      </div>
      <div style={{display:'flex',padding:'10px',margin:'10px',fontSize:'large'}}>
      <FaEnvelope/><Link href='/messages'>Messages</Link>
      </div>
      <div style={{display:'flex',padding:'10px',margin:'10px',fontSize:'large'}}>
     <FaCog/><Link href='/setting'>Setting</Link>
      </div>

      <div>
       <h1 style={{fontSize:'large',margin:'10px',pdding:'10px',height:'40px',fontWeight:'bolder'}} >My Contacts</h1>
        {friends.map(item =>{
          return <div style={{border:'1px solid black', borderRadius:'10px',margin:'10px',padding:'10px'}} >
           <h1> {item.fullname}</h1>
          </div>
        })}
      </div>


    </div>
   

    <div style={{width:'45%',display:'inline-block'}}>
    <div style={{backgroundColor:'beige',margin:'10px'}}>
    <input style={{ width: '95%', height: '30px', fontSize: 'large', margin: '10px',padding:'10px' }} type="text" placeholder="What's happening?" />
    <div >
      <button onClick={openPopup} style={{padding:'10px',margin:'20px',fontSize:'large',backgroundColor:'white',borderRadius:'10px'}}>Live Video</button>
      <button onClick={openPopup} style={{padding:'10px',margin:'20px',fontSize:'large',backgroundColor:'white',borderRadius:'10px'}}>Photos</button>
      <button onClick={openPopup} style={{padding:'10px',margin:'20px',fontSize:'large',backgroundColor:'white',borderRadius:'10px'}}>Feeling</button>
      <button onClick={openPopup} style={{padding:'10px',margin:'20px',fontSize:'large',backgroundColor:'green',borderRadius:'10px'}}>Post</button>
    </div>
    </div>
      {post.map(item =>{
        return (<div style={{border:'1px solid black', borderRadius:'10px',margin:'10px',padding:'10px'}}>
          <h1 style={{fontSize:'large',margin:'10px',pdding:'10px',height:'50px'}} >{item.description}</h1>
          <img src={item.Url} height={100}  />
          <button style={{padding:'10px',margin:'20px',fontSize:'large',backgroundColor:'white',borderRadius:'10px',width:'25%',border:'1px solid black'}}>Like</button>
          <button style={{padding:'10px',margin:'20px',fontSize:'large',backgroundColor:'white',borderRadius:'10px',width:'25%',border:'1px solid black'}}>Comment</button>
          <button style={{padding:'10px',margin:'20px',fontSize:'large',backgroundColor:'white',borderRadius:'10px',width:'25%',border:'1px solid black'}}>Share</button>
          </div>)
      })}

    </div>
    <div >
    <h1  style={{fontSize:'large',fontWeight:'bolder',margin:'10px'}}>Friend Request</h1>
    {friendRequest.map(item=>{
      return( <div  style={{border:'1px solid black', borderRadius:'10px',margin:'10px',padding:'10px'}} >
        <h1>{item.fullname}</h1>
        <button onClick={()=>{updateStatus(item.id,'accepted')}} style={{padding:'10px',margin:'10px',fontSize:'small',backgroundColor:'green',borderRadius:'5px'}}>Confirm</button>
        <button onClick={()=>{updateStatus(item.id,'accepted')}}style={{padding:'10px',margin:'10px',fontSize:'small',backgroundColor:'red',borderRadius:'5px'}}>Reject</button>
      </div>
     )
    })}
   
    </div>
    <div>
       <h1 style={{fontSize:'large',margin:'10px',padding:'10px',height:'40px',fontWeight:'bolder'}} >CHATS</h1>
        {friends.map(item =>{
          return <div onClick={()=>{checkAndCreateRoom(item.id,setMsg) 
          openPopupWindow } }  style={{border:'1px solid black', borderRadius:'10px',margin:'10px',padding:'10px',width:'200px',display:'flex',justifyContent:'space-between'}} >
           <h1> {item.fullname}</h1>
            <FaEnvelope/>
          </div>
        })}
        <div>
        <form >
          <input style={{backgroundColor:'beige'}} type="text" placeholder="Type your message here..." onChange={(e)=>setNewMessages(e.target.value)} />
          <button style={{padding:'10px',marginLeft:'60px',fontSize:'small',backgroundColor:'red',borderRadius:'5px',width:'50px', marginTop:'10px'}}  onClick={postMessages}>Send</button>
        </form>
      </div>

      {/* <div>
        {msg.map(item =>{
          return <div>{item.text}</div>
        })}
      </div> */}
      </div>
    </div>
    

    <Popup isOpen={isPopupOpen} onClose={closePopup}>
    <div style={{display: "flex", flexDirection: 'column', border: '1px solid black', width: '38%', margin: 'auto', textAlign: 'center', borderRadius: '10px', height: '300px', backgroundColor: 'beige' }} >
    <h1 style={{fontSize:'x-large',fontWeight:'bolder',margin:'20px'}}>Create Post</h1>
    <input style={{ width: '95%', height: '30px', fontSize: 'large', margin:'10px',padding:'10px' }} type="text" onChange={(e) => setDescription(e.target.value)} placeholder="What's happening?" />
      <input style={{ width: '95%', height: '50px', fontSize: 'large', margin:'10px'}} type="file" onChange={(e) => setFile(e.target.files)} />
      {loading ? <center><Image
      src="https://i.gifer.com/ZKZg.gif"
      alt="Loading"
      width={50}
      height={50}
    /></center>:<button style={{padding:'10px',margin:'10px',fontSize:'large',backgroundColor:'green',borderRadius:'5px'}} onClick={addData}>Post</button>}
    </div>
    </Popup>

    {/* <Popup isOpen={popUpOpen} onClose={closePopupWindow}> */}
      {/* <div>
        <form >
          <input style={{backgroundColor:'beige'}} type="text" placeholder="Type your message here..." onChange={(e)=>setNewMessages(e.target.value)} />
          <button  onClick={postMessages}>Send</button>
        </form>
      </div> */}
    {/* </Popup> */}

  

  </div>
}