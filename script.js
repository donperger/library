if( typeof Element.prototype.clearChildren === 'undefined' ) {
    Object.defineProperty(Element.prototype, 'clearChildren', {
      configurable: true,
      enumerable: false,
      value: function() {
        while(this.firstChild) this.removeChild(this.lastChild);
      }
    });
}

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
const addFromContainer = document.querySelector(".add-container");

const addNewBookButton = document.querySelector(".add-new");
const addBookButton = document.querySelector(".add");
const cancelButton = document.querySelector(".cancel");

const titleInput = document.querySelector("#book_title");
const authorInput = document.querySelector("#book_author");
const numOfPagesInput = document.querySelector("#book_pages");
const isReadInput = document.querySelector("#is_read")

addNewBookButton.addEventListener("click", showAddFrom);
addBookButton.addEventListener("click", addBook);
cancelButton.addEventListener("click", hideAddFrom);

displayBooks();

function Book(title, author, numOfPages, isread) {
    this.title = title
    this.author = author
    this.numOfPages = numOfPages
    this.isread = isread
}

function displayBooks() {
    bookContainer.clearChildren();

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

function showAddFrom() {
    addFromContainer.style.display = "flex";
    titleInput.focus();
}

function hideAddFrom() {
    addFromContainer.style.display = "none"
}

function addBook() {
    const title = titleInput.value;
    const author = authorInput.value;
    const numOfPages = numOfPagesInput.value;
    const isread = isReadInput.checked;

    const newBook = new Book(title, author, numOfPages, isread);

    library.push(newBook);

    hideAddFrom();
    displayBooks();
}