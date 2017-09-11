function getBooksOnShelf(shelf, books) { 
    if(!books) return;
    if(!shelf) return books;
    return books.filter((book) => book.shelf === shelf);
}

function getRandomLibraryBookFromShelf(shelves, books) {
    if(!books) return;
    
    let booksOnShelf;
    for(let i = 0, shelf; i < shelves.length; ++i) {
        shelf = shelves[i];
        booksOnShelf = getBooksOnShelf(shelf, books);
        if(booksOnShelf.length) break;
    }
    
    if(!booksOnShelf) return;

    let randomIndex = Math.floor(Math.random() * booksOnShelf.length);
    return booksOnShelf[randomIndex];
}

export {
    getBooksOnShelf,
    getRandomLibraryBookFromShelf
}