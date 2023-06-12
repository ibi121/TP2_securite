import React, { useState } from 'react'
import Axios from 'axios'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from 'prop-types';

Axios.defaults.withCredentials= true;

export default function Calendrier() {

  const [nomEvent, setNomEvent] = useState(0); 
  const [dateEvent, setDateEvent] = useState(0);
  const [events, setEvents] = useState([]);

  const supprimer = (title, date) => {
    Axios.delete(" http://127.0.0.1:3069/supprimerEvent", {
      data: {  
        nom: title,
        date: date
      }
    }).then((response) => {
      if (response.data.message) {
      console.log(response.data.message)
      }
    });
  }
  
  const enregistrer = () => {

    setEvents([
      ...events,
      {
        title: nomEvent,
        start: dateEvent
      },
    ]);

    Axios.post(" http://127.0.0.1:3069/enregistrementEvent", {
      nom : nomEvent,
      date : dateEvent
      
    }).then((response) => {
      console.log(response)
    })

  }

  useEffect(() => {
    Axios.get(" http://127.0.0.1:3069/getEvents", {
    }).then((reponse) => {
      var data = reponse.data;
      var i;
      const newEvents = [];

      for(i = 0; i < data.length; i++){
        newEvents.push({
          title: data[i].title,
          start: (data[i].start).slice(0, 10),
        });
         
      }
      setEvents(newEvents);
    });
  }, []);
    
  return (
    <div>
      <div>
        <h1>Calendrier</h1>
        <div>
          <FullCalendar
        plugins={[ dayGridPlugin ]}
        initialView="dayGridMonth" 
        eventClick={
          (e) => {
          console.log(e.event.title + " " + e.event.startStr)
          if (window.confirm("Voulez vous supprimer cet évènement?") === true) {
            supprimer(e.event.title, e.event.startStr)
            e.event.remove();
          }
          }
        }
        events= {events}
      />
      <div id="ajoutEvent">
        <h4>Ajout d'un événement</h4>
        <label>
           Nom de l'événement :
          <input type ="text"  onChange={(e) => setNomEvent(e.target.value)}></input>
        </label>
        <label>
           Date de l'événement : 
          <input type ="date"  onChange={(e) => setDateEvent(e.target.value)}></input>
        </label>
        <button type='button' className="btn btn-primary" onClick={() => enregistrer()}>Ajouter l'événement au calendrier</button>
      </div>
      </div>
        </div>
    </div>
  )
}

Calendrier.propTypes = {nomEvent: PropTypes.string, dateEvent: PropTypes.any , events: PropTypes.array };