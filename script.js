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
        isRead: true
    },
    {
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        numOfPages: 295,
        isRead: false
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

function Book(title, author, numOfPages, isRead) {
    this.title = title
    this.author = author
    this.numOfPages = numOfPages
    this.isRead = isRead
}

function displayBooks() {
    bookContainer.clearChildren();

    library.map((book, i) => {
        const bookCard = createBookCard(book.title, book.author, book.numOfPages, i+1, book.isRead)

        bookContainer.appendChild(bookCard);
    })
}

function createBookCard(title, author, numOfPages, number, isRead) {
    const bookDiv = document.createElement("div");
    bookDiv.classList.add("book-card", number);

    const titleDiv = document.createElement("div");
    titleDiv.classList.add("book-title");

    const infoDiv = document.createElement("div");
    infoDiv.classList.add("book-info");

    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("card-btn-container")

    const isReadButton = document.createElement("button");
    const deleteButton = document.createElement("button");
    isReadButton.classList.add("card-btn");

    deleteButton.classList.add("card-btn", "delete-btn")
    
    const isReadIcon = document.createElement("img");
    isReadIcon.classList.add("is-read-icon")
    if (isRead) {
        isReadIcon.classList.add("read");
    }

    const deleteIcon = document.createElement("img");
    deleteIcon.src = "./icons/delete-outline.svg";

    isReadButton.append(isReadIcon);
    deleteButton.append(deleteIcon);

    buttonContainer.append(isReadButton, deleteButton);

    titleDiv.innerText = title;
    infoDiv.innerText = `by ${author}, ${numOfPages} pages`;

    bookDiv.append(titleDiv, infoDiv, buttonContainer);

    return bookDiv;
}

function showAddFrom() {
    addFromContainer.style.display = "flex";
    titleInput.focus();
}

function hideAddFrom() {
    clearInputFields();
    addFromContainer.style.display = "none"
}

function addBook() {
    const title = titleInput.value;
    const author = authorInput.value;
    const numOfPages = numOfPagesInput.value;
    const isRead = isReadInput.checked;

    const newBook = new Book(title, author, numOfPages, isRead);

    library.push(newBook);

    clearInputFields();
    hideAddFrom();
    displayBooks();
}

function clearInputFields() {
    titleInput.value = "";
    authorInput.value = "";
    numOfPagesInput.value = "";
    isReadInput.checked = false;
}