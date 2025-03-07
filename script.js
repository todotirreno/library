class Book {
  constructor(
    title = "Unknown",
    author = "Unknown",
    pages = "0",
    isRead = false
  ) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
  }

  setRead(isRead) {
    this.isRead = isRead;
  }
}

// BOOK CLASS

// BOOKS ARRAY

class Library {
  books;
  constructor() {
    this.books = [];
  }

  add(newBook) {
    if (this.books.some((book) => book.title === newBook.title)) return false;
    this.books.push(newBook);
    return true;
  }

  remove(title) {
    this.books = this.books.filter((book) => book.title !== title);
  }

  find(title) {
    return this.books.find((book) => book.title === title);
  }

  get books() {
    return [...this.books];
  }
}
// let myLibrary = [];
const myLibrary = new Library();

// POPUP

const newBookButton = document.querySelector(".js-new-book-button");
const popup = document.querySelector(".js-popup");
const overlay = document.querySelector(".js-overlay");

newBookButton.addEventListener("click", openPopup);
overlay.addEventListener("click", closePopup);

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closePopup();
});

function openPopup() {
  form.reset();
  popup.classList.add("popup--active");
  overlay.classList.add("overlay--active");
}

function closePopup() {
  popup.classList.remove("popup--active");
  overlay.classList.remove("overlay--active");
}

// FORM

const form = document.querySelector(".js-popup-form");
form.addEventListener("submit", addBook);

function addBook(e) {
  e.preventDefault();
  if (myLibrary.add(getBookFromInput())) {
    updateBooksGrid();
    closePopup();
  } else {
    alert("This book already exists in your library");
  }
}

function getBookFromInput() {
  const title = `"${document.querySelector("#title").value}"`;
  const author = document.querySelector("#author").value;
  const pages = document.querySelector("#pages").value;
  const isRead = document.querySelector("#is-read").checked;
  return new Book(title, author, pages, isRead);
}

// BOOKS GRID

const booksGrid = document.querySelector(".js-books-grid");
booksGrid.addEventListener("click", checkBooksGridInput);

function updateBooksGrid() {
  resetGrid();
  for (let element of myLibrary.books) {
    createBookCard(element);
  }
}

function resetGrid() {
  booksGrid.innerHTML = "";
}

function createBookCard(book) {
  const bookCard = document.createElement("div");
  const title = document.createElement("h3");
  const author = document.createElement("h3");
  const pages = document.createElement("h3");
  const readButton = document.createElement("button");
  const removeButton = document.createElement("button");

  bookCard.classList.add("books-grid__book-card");
  title.classList.add("books-grid__book-text");
  author.classList.add("books-grid__book-text");
  pages.classList.add("books-grid__book-text");
  readButton.classList.add("button");
  readButton.classList.add("js-is-read-button");
  removeButton.classList.add("button");
  removeButton.classList.add("button--red");
  removeButton.classList.add("js-remove-button");

  title.textContent = book.title;
  author.textContent = book.author;
  pages.textContent = `${book.pages} pages`;
  removeButton.textContent = "Remove";
  readButton.style.width = "120px";
  if (book.isRead) {
    readButton.textContent = "Read";
    readButton.classList.add("button--light-green");
  } else {
    readButton.textContent = "Not read";
    readButton.classList.add("button--light-red");
  }

  bookCard.appendChild(title);
  bookCard.appendChild(author);
  bookCard.appendChild(pages);
  bookCard.appendChild(readButton);
  bookCard.appendChild(removeButton);
  booksGrid.appendChild(bookCard);
}

function checkBooksGridInput(e) {
  if (e.target.classList.contains("js-remove-button")) {
    myLibrary.remove(e.target.parentNode.firstChild.innerHTML);
    e.target.parentNode.parentNode.removeChild(e.target.parentNode);
  } else if (e.target.classList.contains("js-is-read-button")) {
    if (e.target.innerHTML === "Read") {
      myLibrary.find(e.target.parentNode.firstChild.innerHTML).setRead(false);
      e.target.innerHTML = "Not read";
      e.target.classList.remove("button--light-green");
      e.target.classList.add("button--light-red");
    } else {
      myLibrary.find(e.target.parentNode.firstChild.innerHTML).setRead(true);
      e.target.innerHTML = "Read";
      e.target.classList.remove("button--light-red");
      e.target.classList.add("button--light-green");
    }
  }
}
