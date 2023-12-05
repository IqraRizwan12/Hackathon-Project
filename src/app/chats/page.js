'use client'
import { useEffect, useState } from 'react';
import { getMsg } from '../config/firebase';
import {collection, db,doc,getDocs} from '../config/firebase'


const Chats = () => {
  const [msg, setMsg] = useState([]);

  useEffect(()=>{
   messagess()


  },[])


 

  const messagess = async() =>{
     const messages = await getMsg()
     console.log('messages',messages)
      setMsg(messages)

  }

  console.log('mmm',msg)



  if(!msg){
    <div>Loading..</div>
  }

 

  return (
    <div style={{backgroundColor:'beige',height:'500px'}} >
      <h1 style={{fontSize:'x-large',fontWeight:'bolder',margin:'10px',textAlign:'center'}}>Chats</h1>
      {msg.map(item =>{
        return <h1 style={{fontSize:'large',fontWeight:'bolder',margin:'10px',textAlign:'center'}}>{item.text}</h1>
      })}
      
     
    </div>
  );
};

export default Chats;

