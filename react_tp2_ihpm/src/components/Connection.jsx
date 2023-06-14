import React, { useState } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button'
import ReCAPTCHA from "react-google-recaptcha"

Axios.defaults.withCredentials= true;

export default function Connection(props) {

  const [courriel, setCourriel] = useState(0); 
  const [motDePasse, setMotDePasse] = useState(0); 
  const [captcha, setCaptcha] = useState("");
  const [erreurCapctha, setCaptchaErreur] = useState(""); 
  
  const navigate = useNavigate();

  const backToTheFuture = () => {
    navigate("/Acceuil")
  }

  function verifyIfCaptchaIsDone(){
    if(captcha.length > 0){
      login(captcha);
    }else {
      setCaptchaErreur("**SVP completer le captcha pour vous connecter.")
    }
  }


  function logins(){
    Axios.get("http://127.0.0.1:3069/login").then((reponse) => {
      console.log(reponse.data.message);
      if(reponse.data.loggedIn === true) {
        props.onClick(reponse.data.utilisateur[0]);
        backToTheFuture();
      }
    });
  };


  function login(captchaReussi){
    Axios.post("http://127.0.0.1:3069/login",{
      motDePasse : motDePasse,
      courriel: courriel,
      captcha: captchaReussi
    }).then((response)=> {
      if(response.data.message) {
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
     
     <div>
      <ReCAPTCHA sitekey={"6LdUN5EmAAAAAApe89bxMRqtp9PhwpS_8pWc26t_"} onChange={setCaptcha} />
      <h4 class="text-danger" >{erreurCapctha}</h4>
      </div>
      
      <Button onClick={() => verifyIfCaptchaIsDone()}>Connecter</Button>
    </div>
  )
}

Connection.propTypes = { courriel: PropTypes.string, motDePasse: PropTypes.string }; 