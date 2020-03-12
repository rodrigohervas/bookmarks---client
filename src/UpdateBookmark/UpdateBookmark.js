import React, { useState, useEffect } from 'react'
import '../AddBookmark/AddBookmark.css'
import { useHistory } from 'react-router-dom'
import config from '../config'

const Required = () => (
    <span className='AddBookmark__required'>*</span>
  )

function UpdateBookmark(props) {
    
    const [error, setError] = useState()
    const [title, setTitle] = useState()
    const [url, setUrl] = useState()
    const [description, setDescription] = useState()
    const [rating, setRating] = useState()
    
    const history = useHistory()

    useEffect( () => {
        setTitle(bookmark.title)
        setUrl(bookmark.url)
        setDescription(bookmark.description)
        setRating(bookmark.rating)
    }, [])

    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        if(name === 'title') {
            setTitle(value)
        }
        if(name === 'url') {
            setUrl(value)
        }
        if(name === 'description') {
            setDescription(value)
        }
        if(name === 'rating') {
            setRating(value)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const updatedBookmark = {
            id: bookmark.id, 
            title: title,
            url: url, 
            description: description, 
            rating: rating
        }

        const endpointUrl = `${config.API_ENDPOINT}/${bookmark.id}`
        const options = {
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${config.API_KEY}`,
            }, 
            method: 'PATCH', 
            body: JSON.stringify(updatedBookmark)
        }
        
        fetch(endpointUrl, options)
            .then(response => {
                if(!response.ok) {
                    throw new Error('Error updating bookmark')
                }
            })
            .then( () => {
                updateBookmark(updatedBookmark)
                history.push('/')
            })
            .catch(error => console.log('Error:', error))
    }

    const handleCancel = () => history.push('/')

    const { bookmark, updateBookmark } = props

    return (
        <section className='UpdateBookmark'>
      
            <h2>Update bookmark {props.title}</h2>

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
                <input type='text' name='title' id='title' onChange={(e) => handleChange(e)} value={title} placeholder='Great website!' required />
                </div>

                <div>          
                <label htmlFor='url'>
                    URL
                    {' '}
                    <Required />
                </label>
                <input type='url' name='url' id='url' onChange={(e) => handleChange(e)} value={url} placeholder='https://www.website.com/' required />
                </div>

                <div>
                <label htmlFor='description'>
                    Description
                </label>
                <textarea name='description' id='description' onChange={(e) => handleChange(e)} value={description} />
                </div>

                <div>
                <label htmlFor='rating'>
                    Rating
                    {' '}
                    <Required />
                </label>
                <input type='number' name='rating' id='rating' onChange={(e) => handleChange(e)} value={rating} defaultValue='1' min='1' max='5' required />
                </div>

                <div className='AddBookmark__buttons'>
                <button type='button' onClick={() => handleCancel()}> Cancel </button>
                {' '}
                <button type='submit'> Save </button>
                </div>

            </form>
        </section>
    )
}

export default UpdateBookmark