'use strict'

// BOOK CLASS

class Book {
  constructor(
    title = 'Unknown',
    author = 'Unknown',
    pages = '0',
    isRead = 'false'
  ) {
    this.title = title
    this.author = author
    this.pages = pages
    this.isRead = isRead
  }
}

// BOOKS ARRAY

let library = []

function addToLibrary(newBook) {
  if (library.some((book) => book.title === newBook.title)) return false
  library.push(newBook)
  save()
  return true
}

function removeFromLibrary(bookTitle) {
  library = library.filter((book) => book.title !== bookTitle)
  save()
}

function getBook(bookTitle) {
  return library.find((book) => book.title === bookTitle)
}

// MEMORY CHOICE POPUP

let memoryChoice = ''

// function

// NEW BOOK POPUP

const newBookButton = document.getElementById('newBookButton')
const popup = document.getElementById('popup')
const newBookOverlay = document.getElementById('newBookOverlay')

newBookButton.addEventListener('click', openNewBookPopup)
newBookOverlay.addEventListener('click', closeNewBookPopup)

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeNewBookPopup()
})

function openNewBookPopup() {
  form.reset()
  popup.classList.add('popup--active')
  newBookOverlay.classList.add('overlay--active')
}

function closeNewBookPopup() {
  popup.classList.remove('popup--active')
  newBookOverlay.classList.remove('overlay--active')
}

// FORM

const form = document.getElementById('popupForm')
form.addEventListener('submit', addBook)

function addBook(e) {
  e.preventDefault()
  if (addToLibrary(getBookFromInput())) {
    updateBooksGrid()
    closeNewBookPopup()
  } else {
    alert('This book already exists in your library')
  }
}

function getBookFromInput() {
  const title = `"${document.querySelector('#title').value}"`
  const author = document.querySelector('#author').value
  const pages = document.querySelector('#pages').value
  const isRead = document.querySelector('#is-read').checked
  return new Book(title, author, pages, isRead)
}

// BOOKS GRID

const booksGrid = document.getElementById('booksGrid')

function removeBook(e) {
  removeFromLibrary(e.target.parentNode.firstChild.innerHTML)
  e.target.parentNode.parentNode.removeChild(e.target.parentNode)
}

function toggleRead(e) {
  if (e.target.innerHTML === 'Read') {
    getBook(e.target.parentNode.firstChild.innerHTML).isRead = false
    e.target.innerHTML = 'Not read'
    e.target.classList.remove('button--light-green')
    e.target.classList.add('button--light-red')
    save()
  } else {
    getBook(e.target.parentNode.firstChild.innerHTML).isRead = true
    e.target.innerHTML = 'Read'
    e.target.classList.remove('button--light-red')
    e.target.classList.add('button--light-green')
    save()
  }
}

function updateBooksGrid() {
  resetGrid()
  for (let element of library) {
    createBookCard(element)
  }
}

function resetGrid() {
  booksGrid.innerHTML = ''
}

function createBookCard(book) {
  const bookCard = document.createElement('div')
  const title = document.createElement('h3')
  const author = document.createElement('h3')
  const pages = document.createElement('h3')
  const readButton = document.createElement('button')
  const removeButton = document.createElement('button')

  bookCard.classList.add('books-grid__book-card')
  title.classList.add('books-grid__book-text')
  author.classList.add('books-grid__book-text')
  pages.classList.add('books-grid__book-text')
  readButton.classList.add('button')
  removeButton.classList.add('button')
  removeButton.classList.add('button--red')
  readButton.onclick = toggleRead
  removeButton.onclick = removeBook

  title.textContent = book.title
  author.textContent = book.author
  pages.textContent = `${book.pages} pages`
  removeButton.textContent = 'Remove'
  readButton.style.width = '120px'
  if (book.isRead) {
    readButton.textContent = 'Read'
    readButton.classList.add('button--light-green')
  } else {
    readButton.textContent = 'Not read'
    readButton.classList.add('button--light-red')
  }

  bookCard.appendChild(title)
  bookCard.appendChild(author)
  bookCard.appendChild(pages)
  bookCard.appendChild(readButton)
  bookCard.appendChild(removeButton)
  booksGrid.appendChild(bookCard)
}

// STORAGE

function save() {
  saveLocal()
}

function restore() {
  restoreLocal()
}

// FIREBASE

// LOCAL STORAGE

function saveLocal() {
  localStorage.setItem('myLibrary', JSON.stringify(library))
}

function restoreLocal() {
  library = JSON.parse(localStorage.getItem('myLibrary'))
  if (library === null) library = []
  updateBooksGrid()
}

restore()
