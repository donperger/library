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
        id: 1,
        title: "Harry Potter and the Order of the Phoenix",
        author: "J. K. Rowling",
        numOfPages: 766,
        isRead: true
    },
    {
        id: 2,
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

function Book(id, title, author, numOfPages, isRead) {
    this.id = id
    this.title = title
    this.author = author
    this.numOfPages = numOfPages
    this.isRead = isRead
}

function displayBooks() {
    bookContainer.clearChildren();

    library.map((book) => {
        const bookCard = createBookCard(book.title, book.author, book.numOfPages, book.id, book.isRead)

        bookContainer.appendChild(bookCard);
    })

    const deleteButtons = document.querySelectorAll(".delete-btn");

    deleteButtons.forEach(button => button.addEventListener("click", () => {
        const id = Number(button.classList[2]);
        
        deleteBook(id);
    }))

    const readButton = document.querySelectorAll(".mark-btn");

    readButton.forEach(button => button.addEventListener("click", () => {
        const id = Number(button.classList[2]);

        switchReadProperty(id);
    }))
}

function createBookCard(title, author, numOfPages, id, isRead) {
    const bookDiv = document.createElement("div");
    bookDiv.classList.add("book-card");

    const titleDiv = document.createElement("div");
    titleDiv.classList.add("book-title");

    const infoDiv = document.createElement("div");
    infoDiv.classList.add("book-info");

    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("card-btn-container")

    const isReadButton = document.createElement("button");
    const deleteButton = document.createElement("button");
    isReadButton.classList.add("card-btn", "mark-btn", id);

    deleteButton.classList.add("card-btn", "delete-btn", id)
    
    const isReadIcon = document.createElement("img");
    isReadIcon.classList.add("is-read-icon");

    if (isRead) {
        isReadIcon.classList.add("read");
        bookDiv.classList.add("book-read");
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
    const id = library[library.length - 1].id + 1;
    const title = titleInput.value;
    const author = authorInput.value;
    const numOfPages = numOfPagesInput.value;
    const isRead = isReadInput.checked;

    const newBook = new Book(id, title, author, numOfPages, isRead);

    library.push(newBook);;

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

function deleteBook(id) {
    library = library.filter(bookObj => bookObj.id !== id);

    displayBooks();
}

function switchReadProperty(id) {
    library = library.map(bookObj => {
        if (id === bookObj.id) {
            bookObj.isRead = !bookObj.isRead;
        }

        return bookObj
    })

    displayBooks();
}