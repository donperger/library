let library = [
    {title: "Harry Potter and the Order of the Phoenix",
    author: "J. K. Rowling",
    numOfPages: 766,
    isread: true
    },
    {title: "The Hobbit",
    author: "J.R.R. Tolkien",
    numOfPages: 295,
    isread: false
    }
];

function Book(title, author, numOfPages, isread) {
    this.title = title
    this.author = author
    this.numOfPages = numOfPages
    this.isread = isread
    this.info = function() {
        if(isread === true) {
            return `${this.title} by ${this.author}, ${this.numOfPages} pages, have read`
        } else {
            return `${this.title} by ${this.author}, ${this.numOfPages} pages, not read yet`
        } 
    }
}