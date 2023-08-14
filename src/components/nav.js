import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './styles/nav.css'
import { People } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
function Navigation(props) {
  const navigate=useNavigate();
  const clicked=()=>{
    
    navigate('/collections',{state:props.email})
  }
  return (
    <>
      <Navbar bg="primay" className='navbar'>
        <Container>
          <Navbar.Brand href="/" className='logo'>eventbrite</Navbar.Brand>
          <Nav className="d-flex">

            {props.email?<><Nav.Link onClick={clicked}>Collections  </Nav.Link><Nav.Link onClick={()=>{
              navigate('/likes',{state:props.email})
            }}>Likes  </Nav.Link><Nav.Link onClick={()=>{
              navigate('/login')
            }}>logout  </Nav.Link></>: <Nav.Link href="/signup">SignUp</Nav.Link>}
            
            {props.email?<Nav.Link href="#"><People/> {props.email}</Nav.Link>:<Nav.Link href="/login">Login</Nav.Link>}
            
            
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Navigation;