function getBooksOnShelf(shelf, books) { 
    if(!books) return;
    if(!shelf) return books;
    return books.filter((book) => book.shelf === shelf);
}

export {
    getBooksOnShelf
}