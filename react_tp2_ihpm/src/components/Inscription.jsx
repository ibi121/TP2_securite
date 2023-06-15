import React, { useState } from 'react';
import Axios from 'axios';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import PasswordStrengthBar from 'react-password-strength-bar'

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

  const navigate = useNavigate();

  const goToConnection = () => {
    navigate("/Connection")
  }

  function register() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; 
   const nameRegex = /^[A-Za-z]+$/; 
    const phoneRegex = /^\d{10}$/; 
   if (!emailRegex.test(courriel)) 
   { console.log("Adresse email invalide"); return; } 
   if (!passwordRegex.test(motDePasse))
    { console.log("Mot de passe invalide. Le mot de passe doit contenir au moins 8 caractères, une lettre et un chiffre."); return; } 
   if (!nameRegex.test(prenom) || !nameRegex.test(nom))
    { console.log("Prénom et nom doivent contenir uniquement des lettres"); return; }
    if (!phoneRegex.test(numeroDeTelephone)) 
   { console.log("Numéro de téléphone invalide. Le numéro de téléphone doit contenir 10 chiffres."); return; }


   
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
      
    // } else {
    //   // Afficher des messages d'erreur ou effectuer d'autres actions en cas de champs invalides
    //   console.log("Veuillez remplir tous les champs correctement.");
    // }
  }
  return (
    <form className='d-flex justify-content-center'>
      <div className='w-50 '>
        <h3>Inscription</h3>
        <p><b>Les élements avec une * sont obligatoire</b></p>
        <div className='form-group row'>
          <label className='col-sm-5 col-form-label'>
            Entrez votre courriel *: </label>
          <div className='col-sm-1'>
            <input type="email" className='form-control-sm' onChange={(e) => setCourriel(e.target.value)} />
          </div>

        </div>
        <div className='form-group row'>
          <label className='col-sm-5 col-form-label'>
            Mot de passe *: </label>
          <div className='col-sm-1'>
            <input type="password" className='form-control-sm' onChange={(e) => setMotDePasse(e.target.value)} />
            <PasswordStrengthBar password={motDePasse} minLength={6} barColors={['#ddd', '#ef4836', '#f6b44d', '#2b90ef', '#25c281']}/>
          </div>

        </div>
        <div className='form-group row'>
          <label className='col-sm-5 col-form-label'>Prenom * :</label>
          <div className='col-sm-1'>
            <input type="text" className='form-control-sm' onChange={(e) => setPrenom(e.target.value)}></input>
          </div>
        </div>
        <div className='form-group row'>
          <label className='col-sm-5 col-form-label'>
            Nom * : </label>
          <div className='col-sm-1'>
            <input type="text" className='form-control-sm' onChange={(e) => setNom(e.target.value)} />
          </div>
        </div>
        <div className='form-group row'>
          <label className='col-sm-5 col-form-label'>
            Numero de telephone : </label>
          <div className='col-sm-1'>
            <input type="number" className='form-control-sm' onChange={(e) => setNumeroTelephone(e.target.value)} />
          </div>
        </div>
        <div className='form-group row'>
          <label className='col-sm-5 col-form-label'>Age : </label>
          <div className='col-sm-1'>
            <input type="number" className='form-control-sm' onChange={(e) => setAge(e.target.value)}></input>
          </div>
        </div>
        <div className='form-group row'>
          <label className='col-sm-5 col-form-label'>Date de naissance :</label>
          <div className='col-sm-2'>
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