import React from 'react'

export default function Acceuil(props) {

  return (
    <div>
      <h1>Bienvenue sur mon site{props.isOn.lenght > 0 && props.isOn} :o) </h1>
      <div>
      </div>
    </div>
  )
}
