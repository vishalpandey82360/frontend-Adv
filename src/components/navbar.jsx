import React from 'react'

const Card = (props) => {
  return (
     <div className='parent'>
     <div className='card'>
      <img src={props.img}></img>
      <h1>{props.user}</h1>
      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Delectus quas porro ullam sunt nulla dolorum eius. Laudantium, amet tempore</p>
      <button>view</button>
    </div>
    </div>
  )
}

export default Card

