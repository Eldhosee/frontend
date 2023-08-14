import React, { useState, useEffect } from 'react'
import Navigation from './nav'
import img from './assets/img4.webp'
import './styles/home.css'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import { SuitHeart, Ticket, HeartFill } from 'react-bootstrap-icons';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';


const Home = (props) => {
  const [liked, setLiked] = useState(false);
  const location = useLocation();
  const loginEmail = location.state;
  const navigate = useNavigate()
  const [events, setEvents] = useState([]);
  const [likes, setLikes] = useState([]);
  const like = async (event) => {
    try {
      console.log("entered")
      const add = await axios.post('http://127.0.0.1:8000/liked', {
        user: loginEmail,
        likes: event
      });
      setLiked(true)
      window.location.reload();
    } catch (error) {
      console.log(error)
    }
  }
  const deleteLike = async (eventId) => {
    try {
      const response = await axios.delete(`http://127.0.0.1:8000/delete_like/${eventId}/?user=${loginEmail}`);
      console.log(response.data);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  const getlikes = async () => {
    if (loginEmail) {
      try {
        const response = await axios.get('http://127.0.0.1:8000/getliked', {
          params: {
            user: loginEmail
          },
        });
        console.log(response.data)
        setLikes(response.data);
      } catch (error) {
        console.log(error);

      }
    }
  }



  const find = (event) => {
    console.log(loginEmail)
    if (loginEmail === null) {
      console.log("found")
      navigate('/login')
    }
    else {
      if (liked &&likes.some(like => like.likes === event)) {
        deleteLike(event)
        setLiked(false);
      } else {
        like(event)
        setLiked(true);
      }
    }
  }
  const fetch = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/getevents');
      console.log(response.data)
      setEvents(response.data);
    } catch (error) {
      console.log(error);

    }
  }
  useEffect(() => {
    fetch();
    getlikes();
  }, []);

  return (
    <>
      <Navigation email={loginEmail} />
      <div className='home-image'>
        <img src={img} alt='image' className='img1' />
        <button className='home-btn1' >Find your next event</button>
      </div>
      <br />
      <div className='heading'>
        <h6 className='heading-text'><Ticket /> Online events </h6>
      </div>
      <div className='card'>
        {events.map(event => (
          <Card style={{ width: '286px' }}>
            <div className='card-img-div'>
              <Card.Img variant="top" src={event.image} className='card-img' />
            </div>
            <div className='card-icon-div'>
              <Button variant="white" className='card-btn' onClick={() => find(event.id)}>{likes.some(like => like.likes === event.id) ? (
            <HeartFill color='red' />
          ) : (
            <SuitHeart />
          )}</Button></div>
            <div className='card-text'>
              <Card.Body>
                <Card.Title className='card-title'>{event.event_name}</Card.Title>
                <Card.Text>
                  <p className='card-time'> {event.date},{event.time}</p>
                  <p className='card-name'> {event.location}</p>
                </Card.Text>

              </Card.Body>
            </div>
          </Card>
        ))}



      </div>
    </>
  )
}

export default Home