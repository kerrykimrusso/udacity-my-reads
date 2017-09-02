const Shelf = {};

Object.defineProperties(Shelf, {
    CURRENTLY_READING: {
        value: 'currentlyReading',
        writable: false,
        enumerable: true,
    }, 
    WANT_TO_READ: {
        value: 'wantToRead',
        writable: false,
        enumerable: true,
    },
    READ: {
        value: 'read',
        writable: false,
        enumerable: true,
    }
});

export default Shelf;