import React from 'react';
import {Container, Nav, Navbar } from 'react-bootstrap';
import Axios from 'axios';
import { NavLink } from 'react-router-dom';

Axios.defaults.withCredentials= true;

export default function MyNavbar(props) {
  
    const deconnection = () => {
        Axios.get(" http://localhost:3000/deconnection").then((reponse) => {
            props.onClick(false);
        });
    }

    return (
    <div>
    <Navbar bg="dark" variant='dark' expand="lg" >
      <Container fluid>
        <Navbar.Toggle aria-controls="basic-nav-bar"></Navbar.Toggle>
        <Navbar.Collapse id="basic-nav-bar">
          <Nav variant='pills' className='me-auto'>
            <Nav.Item>
              <Nav.Link as={NavLink} to="/Acceuil">Acceuil</Nav.Link>
            </Nav.Item>
            {props.isOn && 
            <Nav.Item>
              <Nav.Link as={NavLink} to="/Calendrier">Calendrier</Nav.Link>
            </Nav.Item>}
          </Nav>
          {!props.isOn ?
          <Nav variant='pills' className='ml-auto'>
            <Nav.Item>
              <Nav.Link as={NavLink} to="/Inscription">S'inscrire</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={NavLink} to="/Connection">Connection</Nav.Link>
            </Nav.Item>
        </Nav> :
        <Nav variant='pills' className='ml-auto'>
            <Nav.Item className='text-white-50' onClick={() => deconnection()}>
                <Nav.Link>Deconnection</Nav.Link>
            </Nav.Item>
        </Nav>}
      </Navbar.Collapse>
    </Container>
  </Navbar></div>
  )
}
