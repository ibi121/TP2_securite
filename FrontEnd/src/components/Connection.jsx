import React, { useState } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button'

Axios.defaults.withCredentials= true;

export default function Connection(props) {

  const [courriel, setCourriel] = useState(0); 
  const [motDePasse, setMotDePasse] = useState(0); 
  
  const navigate = useNavigate();

  const backToTheFuture = () => {
    navigate("/Acceuil")
  }

  function logins(){
    Axios.get(" http://localhost:3000/login").then((reponse) => {
      if(reponse.data.loggedIn === true) {
        props.onClick(reponse.data.utilisateur[0]);
        backToTheFuture();
      }
    });
  };


  function login(){
    Axios.post(" http://localhost:3000/login",{
      motDePasse : motDePasse,
      courriel: courriel
    }).then((response)=> {
      if(response.data.message) {
        console.log('yes :o)')
        console.log(response.data.message)
      }else {
        logins();
      }
    })
  }

  return (
    <div>
      <h3>Bienvenue, veuillez vous connecter</h3>

      <label>
        Courriel : 
        <input type="text" onChange={(e) => setCourriel(e.target.value)} />
      </label>
      <label>
        Mot de passe : 
        <input type="password" onChange={(e) => setMotDePasse(e.target.value)} />
      </label>
      <Button onClick={() => login()}>Connecter</Button>
    </div>
  )
}

Connection.propTypes = { courriel: PropTypes.string, motDePasse: PropTypes.string }; 