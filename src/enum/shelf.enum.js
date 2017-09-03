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

Shelf.stringFromEnum = function(enumType) {
    const map = {
        [Shelf.CURRENTLY_READING]: 'Currently Reading',
        [Shelf.WANT_TO_READ]: 'Want to Read',
        [Shelf.READ]: 'Read',
    }

    return map[enumType];
}

export default Shelf;