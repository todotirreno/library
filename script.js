// BOOK

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

// LIBRARY

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

// NEW BOOK POPUP

const newBookBtn = document.getElementById('newBookBtn')
const newBookPopup = document.getElementById('newBookPopup')
const overlay = document.getElementById('overlay')

newBookBtn.addEventListener('click', openNewBookPopup)
overlay.addEventListener('click', closeNewBookPopup)

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeNewBookPopup()
})

function openNewBookPopup() {
  form.reset()
  newBookPopup.classList.add('popup--active')
  overlay.classList.add('overlay--active')
}

function closeNewBookPopup() {
  newBookPopup.classList.remove('popup--active')
  overlay.classList.remove('overlay--active')
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
  const title = `"${document.getElementById('title').value}"`
  const author = document.getElementById('author').value
  const pages = document.getElementById('pages').value
  const isRead = document.getElementById('is-read').checked
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
    e.target.classList.remove('btn--light-green')
    e.target.classList.add('btn--light-red')
    save()
  } else {
    getBook(e.target.parentNode.firstChild.innerHTML).isRead = true
    e.target.innerHTML = 'Read'
    e.target.classList.remove('btn--light-red')
    e.target.classList.add('btn--light-green')
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
  const readBtn = document.createElement('button')
  const removeBtn = document.createElement('button')

  bookCard.classList.add('books-grid__book-card')
  title.classList.add('book-card__text')
  author.classList.add('book-card__text')
  pages.classList.add('book-card__text')
  readBtn.classList.add('btn')
  removeBtn.classList.add('btn')
  removeBtn.classList.add('btn--red')
  readBtn.onclick = toggleRead
  removeBtn.onclick = removeBook

  title.textContent = book.title
  author.textContent = book.author
  pages.textContent = `${book.pages} pages`
  removeBtn.textContent = 'Remove'
  readBtn.style.width = '120px'
  if (book.isRead) {
    readBtn.textContent = 'Read'
    readBtn.classList.add('btn--light-green')
  } else {
    readBtn.textContent = 'Not read'
    readBtn.classList.add('btn--light-red')
  }

  bookCard.appendChild(title)
  bookCard.appendChild(author)
  bookCard.appendChild(pages)
  bookCard.appendChild(readBtn)
  bookCard.appendChild(removeBtn)
  booksGrid.appendChild(bookCard)
}

// STORAGE

let storageType = ''
const storagePopup = document.getElementById('storagePopup')
const localStorageBtn = document.getElementById('localStorageBtn')
const googleCloudBtn = document.getElementById('googleCloudBtn')
localStorageBtn.addEventListener('click', setStorageTypeLocal)
googleCloudBtn.addEventListener('click', setStorageTypeGoogle)

function openStoragePopup() {
  storagePopup.classList.add('popup--active')
  overlay.classList.add('overlay--active')
}

function closeStoragePopup() {
  storagePopup.classList.remove('popup--active')
  overlay.classList.remove('overlay--active')
}

function setStorageTypeLocal() {
  storageType = 'localStorage'
  closeStoragePopup()
  restore()
}

function setStorageTypeGoogle() {
  storageType = 'googleCloud'
  // after log in
  closeStoragePopup()
  restore()
}

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

openStoragePopup()
