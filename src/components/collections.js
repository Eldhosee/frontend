import React, { useState ,useEffect} from 'react'
import Navigation from './nav'
import { useLocation, useNavigate } from 'react-router-dom'
import './styles/collections.css'
import { Plus, Heart, Upload } from 'react-bootstrap-icons';
import axios from 'axios';
const Collections = () => {
    const navigate=useNavigate();
    const location = useLocation()
    const email = location.state;
    const[events,setEvents]=useState([])
    const getcollections = async () => {
        if (email) {
          try {
            const response = await axios.get('http://127.0.0.1:8000/getcollections', {
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
       
        getcollections();
      }, []);

    


    return (
        <>
            <Navigation email={email} />
            <div className='collection'>
                <h6 className='collection-heading'>My Collections</h6>
                <button className='create' onClick={()=>{
                    navigate('/create',{state:email})
                }}><Plus size={25} /> Create </button>
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
                        <div className='upload'>
                            <Upload />
                        </div>
                        <Heart />
                    </div>
                </div>
            </div>
            ))}


            
        </>
    )
}

export default Collections