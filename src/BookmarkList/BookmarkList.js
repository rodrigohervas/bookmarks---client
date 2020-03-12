import React from 'react';
import BookmarkItem from '../BookmarkItem/BookmarkItem';
import './BookmarkList.css'
import PropTypes from 'prop-types';

function BookmarkList(props) {
        
  const { bookmarks, deleteBookmark } = props
  const bookmarkList = bookmarks ? bookmarks.map(bookmark => 
                      <BookmarkItem 
                              key={bookmark.id} 
                              {...bookmark} 
                              deleteBookmark={deleteBookmark} />)
                      : 'There are no bookmarks available'

  return (
    <section className='BookmarkList'>
      <h2>Your bookmarks</h2>
      <ul className='BookmarkList__list' aria-live='polite'>
        {bookmarkList}
      </ul>
    </section>
  );
}

export default BookmarkList;

BookmarkList.defaultProps = {
  bookmarks: []
}

BookmarkList.propTypes = {
  bookmarks: PropTypes.arrayOf( PropTypes.shape( 
    {
      title: PropTypes.string.isRequired, 
      url: PropTypes.string.isRequired, 
      rating: PropTypes.number, 
      description: PropTypes.string
    }
  ))
}
