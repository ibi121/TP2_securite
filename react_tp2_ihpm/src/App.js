import './App.css';
import React, {useState, useEffect} from 'react';
import Acceuil from './components/Acceuil';
import Inscription from './components/Inscription';
import Connection from './components/Connection';
import Calendrier from './components/Calendrier';
import { Row, Col } from 'react-bootstrap';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MyNavbar from './components/MyNavbar';
import Axios from 'axios';
import PropTypes from 'prop-types';

Axios.defaults.withCredentials= true;

function App() {
  const [logged, setLogged] = useState(false);
  const [prenom, setPrenom] = useState("");

  useEffect(() => {
    Axios.get("127.0.0.1/login", {
    }).then((reponse) => {
      if(reponse.data.loggedIn === true) {
        setLogged(reponse.data.loggedIn)
        setPrenom(reponse.data.utilisateur[0].prenom);
      }
    });
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
      <MyNavbar isOn={logged} onClick={v => {setLogged(v)}} />
      <Row className='justify-content-md-center'>
        <Col sm={7}>
          <Routes>
            <Route exact path="/" element={<Acceuil isOn={prenom} />} />
            <Route path="/Acceuil" element={<Acceuil isOn={prenom} />} />
            <Route path="/Inscription" element={<Inscription />} />
            <Route path="/Connection" element={<Connection isOn={logged} onClick={v => {setLogged(v)}} />} />
            {logged ?
            <Route path="/Calendrier" element={<Calendrier />} /> :
            <Route path="/Calendrier" element={<Navigate replace to="/" />} />}
          </Routes>
        </Col>
      </Row>
    </BrowserRouter>
    </div>
  );
}

App.propTypes = { logged: PropTypes.bool, prenom: PropTypes.string };

export default App;
