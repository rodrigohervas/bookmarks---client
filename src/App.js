import React, { useState, useEffect } from 'react';
import { Route, Switch, useParams, useHistory } from 'react-router-dom';
import Nav from './Nav/Nav';
import config from './config';
import './App.css';
import AddBookmark from './AddBookmark/AddBookmark';
import BookmarkList from './BookmarkList/BookmarkList';
import UpdateBookmark from './UpdateBookmark/UpdateBookmark'
import { checkPropTypes } from 'prop-types';
require('dotenv').config()

function App() {
  const [bookmarks, setBookmarks] = useState([])
  const [error, setError] = useState()

  const params = useParams()
  const history = useHistory()
  
  useEffect( () => {
    const url = config.API_ENDPOINT
    const options = {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${config.API_KEY}`
      }
    }
    
    fetch(url, options)
      .then(res => {
        if(!res) {
          throw new Error('error getting bookmarks')
        }
        return res.json()
      })
      .then(res => {
        setBookmarks(res)
        setError(null)
      })
      .catch(error => {
        console.log(error)
        setError(error)
      })
  }, [])

  const addBookmark = bookmark => {
    const newBookmarks = [ ...bookmarks, bookmark ]
    setBookmarks(newBookmarks)
  }

  const deleteBookmark = bookmarkId => {
    const newBookmarks = bookmarks.filter(bookmark => bookmark.id !== bookmarkId )
    setBookmarks(newBookmarks)
  }

  const updateBookmark = bookmark => {
    const bookmarkId = bookmark.id
    const bookmarkList = bookmarks.filter(bookmark => bookmark.id !== bookmarkId)
    const newBookmarks = [ ...bookmarkList, bookmark ]
    setBookmarks(newBookmarks)
  }

  return (
    <main className='App'>
      <h1>Bookmarks!</h1>
      <Nav />
      <div className='content' aria-live='polite'>
      <Switch>
        <Route exact path='/'>
          <BookmarkList bookmarks={bookmarks} deleteBookmark={deleteBookmark} />
        </Route>
        
        <Route path='/add'>
          <AddBookmark addBookmark={addBookmark} />
        </Route>

        <Route path='/update/:id'>
          <UpdateBookmark 
              bookmark={
                bookmarks.filter(bookmark => bookmark.id === history.location.bookmarkId)[0]
              }
              updateBookmark={updateBookmark} />
        </Route>
      </Switch>
      </div>
    </main>
  );
}

export default App;
