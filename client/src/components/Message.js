import React from 'react'

const Message = ({message}) => {
  let link
  message ? link = <a 
  className="btn bg-white hover:bg-gray-100 text-gray-800 font-semibold my-2 mx-2 py-2 px-4 border border-gray-400 rounded shadow" 
  href={message} 
  target="_blank">Your Playlist</a>
  : link = null

  return (
    <div className="flex justify-center my-2">
      {link}
    </div>
  )
}

export default Message