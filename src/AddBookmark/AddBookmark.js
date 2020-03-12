import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import config from '../config'
import './AddBookmark.css';

const Required = () => (
  <span className='AddBookmark__required'>*</span>
)

function AddBookmark(props) {
  
  const [error, setError] = useState()

  const history = useHistory()

  const handleSubmit = (e) => {
    
    e.preventDefault()
    const { title, url, description, rating } = e.target
    const bookmark = {
      title: title.value,
      url: url.value,
      description: description.value,
      rating: rating.value,
    }

    setError(null)

    fetch(config.API_ENDPOINT, {
      method: 'POST',
      body: JSON.stringify(bookmark),
      headers: {
        'content-type': 'application/json',
        'authorization': `Bearer ${config.API_KEY}`
      }
    })
    .then(res => {
      if (!res.ok) {
        throw new Error('error creating bookmark')
      }
      return res.json()
    })
    .then(data => {
      title.value = ''
      url.value = ''
      description.value = ''
      rating.value = ''
      props.addBookmark(data)
      history.push('/')
    })
    .catch( error => setError(error) )
  }

  const handleClickCancel = () => {
    history.push("/");
  }

  return (
    <section className='AddBookmark'>
      
      <h2>Create a bookmark</h2>

      <form className='AddBookmark__form' onSubmit={handleSubmit} >
        
        <div className='AddBookmark__error' role='alert'>
          {error && <p>{error.message}</p>}
        </div>

        <div>
          <label htmlFor='title'>
            Title
            {' '}
            <Required />
          </label>
          <input type='text' name='title' id='title' placeholder='Great website!' required />
        </div>

        <div>          
          <label htmlFor='url'>
            URL
            {' '}
            <Required />
          </label>
          <input type='url' name='url' id='url' placeholder='https://www.great-website.com/' required />
        </div>

        <div>
          <label htmlFor='description'>
            Description
          </label>
          <textarea name='description' id='description' />
        </div>

        <div>
          <label htmlFor='rating'>
            Rating
            {' '}
            <Required />
          </label>
          <input type='number' name='rating' id='rating' defaultValue='1' min='1' max='5' required />
        </div>

        <div className='AddBookmark__buttons'>
          <button type='button' onClick={() => handleClickCancel()}> Cancel </button>
          {' '}
          <button type='submit'> Save </button>
        </div>

      </form>
    </section>
  )
}

export default AddBookmark
