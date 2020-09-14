import React from 'react'
//import PropTypes from 'prop-types'

const SpotifyButton = (props) => {
  const isLoggedIn = props.isLoggedIn

  let button
  if(isLoggedIn) {
    button = null
  } else {
    button = <a href='http://localhost:5000/api/spotify/auth'>Login</a>
  }

  return (
    <div>
      {button}
    </div>
  )
}

SpotifyButton.propTypes = {

}

export default SpotifyButton