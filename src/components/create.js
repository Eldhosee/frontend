import React, { useState } from 'react'
import Navigation from './nav'
import { useLocation } from 'react-router-dom'
import './styles/create.css'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage'; 
import { initializeApp } from "firebase/app";
import Loading from './loading';
import axios from 'axios';
const Create = () => {
  const location = useLocation();
  const email = location.state;
  const [name,setName]=useState('');
  const [region,setRegion]=useState('');
  const [time,setTime]=useState('');
  const [date,setDate]=useState('');
  const [image,setImage]=useState();
const [loading,setLoading]=useState(false);
  



  const create=async(e)=>{
    e.preventDefault();
   

const firebaseConfig = {
  apiKey: "AIzaSyDZJ2NNt3rpMxZEiEli94qeLg9UdoHiVjs",
  authDomain: "ignis-3da5a.firebaseapp.com",
  projectId: "ignis-3da5a",
  storageBucket: "ignis-3da5a.appspot.com",
  messagingSenderId: "561269297837",
  appId: "1:561269297837:web:a3815ebe233993232f6c24"
};


const app = firebase.initializeApp(firebaseConfig);
    const storage = firebase.storage();
    try {
      setLoading(true);
      const storageRef = firebase.storage().ref();
      const imageRef = storageRef.child(`event_images/${image.name}`);
      await imageRef.put(image);

      const imageUrl = await imageRef.getDownloadURL();
      if (imageUrl.length){
        const response = await axios.post('http://127.0.0.1:8000/events', {
          event_name:name,
          location:region,
          time:time,
          date:date,
          image:imageUrl,
          user:email,
        });
      }
      setLoading(false);

    } catch (error) {
      setLoading(false);
      console.error('Error uploading image:', error);
    }


  }
  return (
    <>
      <Navigation email={email} />
      <div className='Form'>
        <div className='Form-body'>
          <div ><h3 className='form-heading'>eventbrite</h3>
            <h4 className='sub-heading'>Create new Event</h4>
            <br/>
            </div>
            <div className='form-input-body'>
            <form onSubmit={create}>
            <label for='event-name'>Event name : </label>
            <input type='text' className='form-input'  name='event-name' value={name} placeholder='Party' onChange={(e)=>{
              setName(e.target.value);
            }}
                    required />
                    <br/>
                    <label for='date'>Date : </label>
                    <input type='date' className='form-input'  name='date' value={date} onChange={(e)=>{
              setDate(e.target.value);}}
                    required />
                    <br/>
                    <label for='time'>Time : </label>
                    <input type='time' className='form-input'  name='time' value={time} onChange={(e)=>{
              setTime(e.target.value);}}
                    required />
                    <br/>
                    <label for='location'>Event Location : </label>
                    <input type='text' className='form-input'  name='location' value={region} onChange={(e)=>{
              setRegion(e.target.value);}} placeholder='Location'
                    required />
                    <br/>
                    <label for='image'>Event Poster/image : </label>
                    <input type='file' className='form-input' accept='image/*' name='image'  onChange={(e)=>{
                      
                      setImage(e.target.files[0]); 
                      
                    }}
                    required />
                    <br/>
                    <br/>
                    <input type='hidden' className='form-input'  name='email' value={email}
                    />
                    {loading?<Loading/>:
                    <button className='login-btn' type='submit' onSubmit={create}>Create</button>
                  }</form></div>
                    </div>
        
      </div>
    </>
  )
}

export default Create