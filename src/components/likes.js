import React, { useState,useEffect } from 'react'
import Navigation from './nav'
import { useLocation } from 'react-router-dom'
import './styles/collections.css'
import {  HeartFill } from 'react-bootstrap-icons';
import axios from 'axios';

const Likes = () => {
    const location = useLocation()
    const email = location.state;
    const[events,setEvents]=useState([])
    const getlikes = async () => {
        if (email) {
          try {
            const response = await axios.get('http://127.0.0.1:8000/getlikedevents', {
              params: {
                user: email
              },
            });
            console.log(response.data)
            setEvents(response.data);
          } catch (error) {
            console.log(error);
    
          }
        }
      }

      useEffect(() => {
       
        getlikes();
      }, []);
    return (
        <>
            <Navigation email={email} />
            <div className='likes'>
                <h6 className='likes-heading'>Likes</h6>
                </div>
                {events.map(event => (
            <div className='items-div'>
                <div className='item'>
                    <div className='item-left'>
                        <img className='item-img' src={event.image} />
                    </div>
                    <div className='item-mid'>
                        <p className='item-heading'>{event.event_name}</p>
                        <p className='item-para1'>{event.date},{event.time}</p>
                        <p className='item-para2'>{event.location}</p>
                    </div>
                    <div className='item-right'>
                        
                        <HeartFill color='red' />
                    </div>
                </div>
            </div>
                 ))} 


            
        </>
    )
}

export default Likes