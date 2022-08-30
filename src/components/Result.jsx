import React from 'react'
import salut from '.././img/salut.svg'
function Result({ correct }) {

  return (
    <div>
      <img src={salut} alt="vin" />
      <p>You answered 3 questions correctly. Congratulations!</p>

      <a href="/" className='toStart'>Try again</a>
    </div>
  )
}



export default Result