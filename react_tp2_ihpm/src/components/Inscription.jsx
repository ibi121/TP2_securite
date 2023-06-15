import React, { useState } from 'react';
import Axios from 'axios';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import PasswordStrengthBar from 'react-password-strength-bar';


Axios.defaults.withCredentials = true;

export default function Inscription(props) {

  /**
   * utilisation de courriel au lieu de username, plus facile avec la BD 
   */
  const [motDePasse, setMotDePasse] = useState(0);
  const [prenom, setPrenom] = useState(0);
  const [courriel, setCourriel] = useState(0);
  const [numeroDeTelephone, setNumeroTelephone] = useState(0);
  const [age, setAge] = useState(0);
  const [nom, setNom] = useState(0);
  const [dateNaissance, setDateNaissance] = useState(0);
  
  const [errorEmail, setErrorEmail] = useState("");
  
  const navigate = useNavigate();

  const goToConnection = () => {
    navigate("/Connection")
  }

  function validateEmail(email){
    const emailValidator = /^[\w.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i;
    if(emailValidator.test(email)){
      setCourriel(email);
      setErrorEmail("");
    }else {
      setErrorEmail("svp mettre un courriel valide");
    }
  }

  function IsnotRegex(mot, hookThatSetsIt){
    const antiRegex = /^(?!(?:.*\b(?:SELECT|INSERT|UPDATE|DELETE|DROP|ALTER|CREATE)\b)).*$/
    if(antiRegex.test(mot)){
      hookThatSetsIt(mot);
    }else {
      console.log("not working m8")

    }
  }

  function register() {   
     Axios.post("http://127.0.0.1:3069/inscription", {
        courriel: courriel,
        motDePasse: motDePasse,
        prenom: prenom,
        numeroDeTelephone: numeroDeTelephone,
        age: age,
        nom: nom,
        dateNaissance: dateNaissance,
      }).then((response) => {
        if (response.data.message) {
          console.log(response);
          goToConnection();
        }else{
          console.log("Je suis erreur de duplicate key " + response.data.error);
        }
      });
  }
  return (
    <form className='d-flex justify-content-center'>
      <div className='w-50 '>
        <h3>Inscription</h3>
        <p><b>Les élements avec une * sont obligatoire</b></p>
        <div className='form-group row'>
          <label className='col-sm-5 col-form-label'>
            Entrez votre courriel *: </label>
          <div className='col-sm-6'>
            <input type="email" className='form-control-sm' onChange={(e) => validateEmail(e.target.value)} />
            {<p className="text-danger">{errorEmail}</p>}
          </div>

        </div>
        <div className='form-group row'>
          <label className='col-sm-5 col-form-label'>
            Mot de passe *: </label>
          <div className='col-sm-6'>
            <input type="password" className='form-control-sm' placeholder="8 character avec au moins un numero" onChange={(e) => {setMotDePasse(e.target.value)}}/>
            <PasswordStrengthBar
              password={motDePasse}
              minLength={8}
            >
            </PasswordStrengthBar>
          </div>

        </div>
        <div className='form-group row'>
          <label className='col-sm-5 col-form-label'>Prenom * :</label>
          <div className='col-sm-6'>
            <input type="text" className='form-control-sm' onChange={(e) => IsnotRegex(e.target.value, setPrenom)}></input>
          </div>
        </div>
        <div className='form-group row'>
          <label className='col-sm-5 col-form-label'>
            Nom * : </label>
          <div className='col-sm-6'>
            <input type="text" className='form-control-sm' onChange={(e) => IsnotRegex(e.target.value, setNom)} />
          </div>
        </div>
        <div className='form-group row'>
          <label className='col-sm-5 col-form-label'>
            Numero de telephone : </label>
          <div className='col-sm-6'>
            <input type="number" className='form-control-sm' onChange={(e) => setNumeroTelephone(e.target.value)} />
          </div>
        </div>
        <div className='form-group row'>
          <label className='col-sm-5 col-form-label'>Age : </label>
          <div className='col-sm-6'>
            <input type="number" className='form-control-sm' onChange={(e) => setAge(e.target.value)}></input>
          </div>
        </div>
        <div className='form-group row'>
          <label className='col-sm-5 col-form-label'>Date de naissance :</label>
          <div className='col-sm-6'>
            <input type="date" className='form-control-sm' onChange={(e) => setDateNaissance(e.target.value)}></input>
          </div>
        </div>
        <Button onClick={() => register()}>Inscription</Button>
      </div>
    </form>
  )
}

Inscription.propTypes = {
  motDePasse: PropTypes.string,
  prenom: PropTypes.string,
  courriel: PropTypes.string,
  numeroDeTelephone: PropTypes.string,
  age: PropTypes.number,
  nom: PropTypes.string,
  dateNaissance: PropTypes.any
}; 