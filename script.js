let library = [
    {
        title: "Harry Potter and the Order of the Phoenix",
        author: "J. K. Rowling",
        numOfPages: 766,
        isread: true
    },
    {
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        numOfPages: 295,
        isread: false
    }
];

const bookContainer = document.querySelector(".book-container");

displayBooks();

function Book(title, author, numOfPages, isread) {
    this.title = title
    this.author = author
    this.numOfPages = numOfPages
    this.isread = isread
}

function displayBooks() {
    library.map((book, i) => {
        const bookCard = createBookCard(book.title, book.author, book.numOfPages, i+1)

        bookContainer.appendChild(bookCard);
    })
}

function createBookCard(title, author, numOfPages, number) {
    const bookDiv = document.createElement("div");
    bookDiv.classList.add("book-card", number);

    const titleDiv = document.createElement("div");
    titleDiv.classList.add("book-title");

    const infoDiv = document.createElement("div");
    infoDiv.classList.add("book-info");

    titleDiv.innerText = title;
    infoDiv.innerText = `by ${author}, ${numOfPages} pages`;

    bookDiv.append(titleDiv, infoDiv);

    return bookDiv;
}