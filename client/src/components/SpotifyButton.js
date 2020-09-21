import React from 'react'
//import PropTypes from 'prop-types'

const SpotifyButton = () => {
  return (
    <div className="mx-8">
      <div className="flex flex-wrap justify-center">
        <h1 className="py-4 my-4 text-gray-700 font-semibold">Login to Spotify to create a playlist customized to your first generation Pokemon team</h1>
        <a 
          href='http://localhost:5000/api/spotify/auth'
          className="btn bg-white hover:bg-gray-100 text-gray-800 font-semibold my-2 mx-2 py-2 px-4 border border-gray-400 rounded shadow"
        >Login</a>
      </div>
      <div>
        <img className="my-4" src={process.env.PUBLIC_URL + '/images/pokeshelfdrib.webp'} alt="pokeshelf"/>
      </div>
    </div>
  )
}

export default SpotifyButton