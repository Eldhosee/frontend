import React, { useState } from 'react'; 
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './styles/login.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import img1 from './assets/img3.jpg'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const navigate=useNavigate();
  const submit = async (e) => {
    e.preventDefault();
    if (email.length !== 0 && password.length !== 0) {
      try {
        const response = await axios.post('http://127.0.0.1:8000/signup', {
          email: email,
          password: password
        });
        if(response.data.email){
          navigate('/login')
        }
      } catch (error) {
        alert("something went wroung ,Try again");
      }
    }
  }
  
  return (
    <>
    <Container fluid className='login-container'>
      <Row className='row'>
        <Col lg={6} className='left'>
          <div className='left-col' >
            <br />
            <br />
            <div>
              <h3 className='logo'>eventbrite</h3>
              <br />
              <div className='login-first-col'>
                <div className='login-div'>
                <h1 className='login'>Create an account</h1>
                </div>
                <a href='/login' className='link'>Log in</a>

              </div>
              <div>
              
                <Form onSubmit={submit}>
                  <div class="input-container">
                    <div class="label-wrapper">
                      <label class="label " id="email-label" for="email" data-spec="label-label">
                        <span class="label__content">Email address</span>
                      </label>
                    </div>
                    <input type='email' className='input' id='email' name='email' value={email}
                    onChange={(e)=>{
                      setEmail(e.target.value);
                    }}/>
                  </div>

                  <div class="input-container">
                    <div class="label-wrapper">
                      <label class="label " id="password-label" for="password" data-spec="label-label">
                        <span class="label__content">Password</span>
                      </label>
                    </div>
                    <input type="password" data-spec="input-field-input-element" aria-invalid="false" class="input" data-automation="authentication-email-field" id="password" name="password" value={password} role="textbox"
                    onChange={(e)=>{
                      setPassword(e.target.value);
                    }} required/>
                  </div>
                  <br />
                  <button className='login-btn' type='submit'>Sign up</button>
                </Form>
              </div>
              <div className='divider'>
                <hr className='hr' />
                <div className='oval'><span>or</span></div>
                <hr className='hr' />
              </div>
              <br />
            
              <button className='btn-3'>
                <div className='btn-content'>
                  <img className='googlelogo' alt="Google sign-in"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png" />Sign in with Google</div></button>
            </div>
          </div>

        </Col>
        <Col xs={6} className='right'><div className='img-container'><img src={img1} alt='image' className='right-img' /></div></Col>
      </Row>
      <br />
    </Container>
</>
  );
}

export default Signup;
