import React from 'react';
import Rating from '../Rating/Rating';
import './BookmarkItem.css';
import config from '../config';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom'

function deleteBookmarkRequest(bookmarkId) { //}, callback) {

  fetch(config.API_ENDPOINT + `/${bookmarkId}`, {
    method: 'DELETE',
    headers: {
      'authorization': `bearer ${config.API_KEY}`
    }
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('error deleting bookmark')
    }
    return response.json()
  })
  .then(data => {
    //response
  })
  .catch(error => {
    console.error(error)
  })

}

export default function BookmarkItem(props) {

  const history = useHistory()

  const handleDelete = (id) => {
    deleteBookmarkRequest(id)
    props.deleteBookmark(id)
  }

  const goToUpdate = (id) => {
    //history.push(`/update/${id}`)
    history.push({
      pathname: `/update/${id}`, 
      bookmarkId: id
    })
  }
  
  return (
    <li className='BookmarkItem'>
      <div className='BookmarkItem__row'>
        <h3 className='BookmarkItem__title'>
          <a href={props.url} target='_blank' rel='noopener noreferrer'> {props.title} </a>
        </h3>
        <Rating value={props.rating} />
      </div>
      
      <p className='BookmarkItem__description'> {props.description} </p>
      
      <div className='BookmarkItem__buttons'>
        <button className='BookmarkItem__description' onClick={ () => handleDelete(props.id) }>
          Delete
        </button>
        {' '}
        <button className='BookmarkItem__description' onClick={ () => goToUpdate(props.id)} >
          Update
        </button>
      </div>
    </li>
  )
}

BookmarkItem.defaultProps = {
  rating: 1, 
  description: '', 
  onClickDelete: () => {},
}

BookmarkItem.propTypes = {
  title: PropTypes.string.isRequired, 
  url: PropTypes.string.isRequired, 
  rating: PropTypes.number, 
  description: PropTypes.string
}
