import React, { useState } from 'react';
import Axios from 'axios';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

Axios.defaults.withCredentials= true;

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

  function register(){
    Axios.post("http://localhost:3069/inscription", {
      courriel : courriel,
      motDePasse : motDePasse,
      prenom : prenom,
      numeroDeTelephone : numeroDeTelephone,
      age : age,
      nom: nom,
      dateNaissance: dateNaissance,
    }).then((response) => {
      if (response.data.message) {
        console.log(response);
        goToConnection();
      }
    })
  };

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
          <input type="number" className='form-control-sm' onChange={(e) => setNumeroTelephone(e.target.value)}  />
        </div>
      </div>
      <div className='form-group row'>
        <label className='col-sm-5 col-form-label'>Age : </label>
        <div className='col-sm-1'>
          <input type ="number" className='form-control-sm' onChange={(e) => setAge(e.target.value)}></input>
        </div>
      </div>
      <div className='form-group row'>
        <label className='col-sm-5 col-form-label'>Date de naissance :</label>
        <div className='col-sm-2'>
          <input type ="date" className='form-control-sm' onChange={(e) => setDateNaissance(e.target.value)}></input>
        </div>
      </div>
        <Button onClick={() => register()}>Inscription</Button>
    </div>
    </form>
  )
}

Inscription.propTypes = { motDePasse: PropTypes.string, 
  prenom: PropTypes.string, 
  courriel: PropTypes.string, 
  numeroDeTelephone: PropTypes.string, 
  age: PropTypes.number, 
  nom: PropTypes.string, 
  dateNaissance: PropTypes.any }; 