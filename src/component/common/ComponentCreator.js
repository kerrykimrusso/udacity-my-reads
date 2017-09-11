import React from 'react';
import BookListItem from '../BookListItem';  

export const createBookListItemFromBook = (book, changeShelf) => {
    return (<BookListItem 
      key={book.id}
      id={book.id}
      imageSrc={book.imageLinks ? book.imageLinks.smallThumbnail : ''} // TODO: add placeholder image
      title={book.title}
      subtitle={book.subtitle}
      authors={book.authors}
      description={book.description}
      shelf={book.shelf}
      onChangeShelf={changeShelf}
    />);
  };