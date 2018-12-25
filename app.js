// Book Class: Represents a Book
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

// UI Class: Handle UI Tasks
class UI {
  static displayBooks() {
    // Get currently stored books
    const books = Store.getBooks();

    // Iterates "books" & calls "addBookToList()" func
    books.forEach((book) => UI.addBookToList(book));
  }

  static addBookToList(book) {
    // Creates a row to insert into the table within index.html

    // Obtain DOM element "#book-list" (stored in list var)
    const list = document.querySelector('#book-list');

    // Create a table-row HTML element (stored in row var)
    const row = document.createElement('tr');

    // Store input in new table-row element
    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
    `;

    // Add new row to the table
    list.appendChild(row);
  }

  // Deletes a targeted element(book)
  static deleteBook(el) {
    // Check if element has the class "delete"
    if(el.classList.contains('delete')) {
      // Remove "parent el" of the "parent el" (2 levels up to get entire row)
      el.parentElement.parentElement.remove();
    }
  }

  // Alert
  static showAlert(message, className) {
    // Creates a DOM "div" element
    const div = document.createElement('div');
    // Assigns "className" param as the new "div"s class'
    div.className = `alert alert-${className}`;
    // Assigns "message" param as the new "div"s text
    div.appendChild(document.createTextNode(message));
    // Find desired parent element & place the new alert within it:

    // The parent element: container
    const container = document.querySelector('.container');
    // The form element: book-form
    const form = document.querySelector('#book-form');
    // Take the "container" and insert our "div" before the "form"
    container.insertBefore(div, form);
    // Vanish in 3 seconds
    setTimeout(() => document.querySelector('.alert').remove(), 3000);
  }

  // Clears fields after submission
  static clearFields() {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#isbn').value = '';
  }
}

// Store Class: Handles Storage
class Store {
  static getBooks() {
    let books;
    // Check if there's a current "book" item
    if(localStorage.getItem('books') === null) {
      books = [];
    } else {
      // parse as json to be used as reg JS array of objs
      books = JSON.parse(localStorage.getItem('books'));
    }

    return books;
  }

  static addBook(book) {
    // Get currently stored books
    const books = Store.getBooks();

    // Add new book to "books" array
    books.push(book);

    // Set (or save) local storage with books array (converted to a string)
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(isbn) {
    // Get currently stored books
    const books = Store.getBooks();

    // Iterate through "books" array
    books.forEach((book, index) => {
      // Check if current iterated item's "isbn" matches passed "isbn" param
      if(book.isbn === isbn) {
        // Splice out current iterated item from array by its index
        books.splice(index, 1);
      }
    });

    localStorage.setItem('books', JSON.stringify(books));
  }
}

// Event: Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks);

// Event: Add a Book
document.querySelector('#book-form').addEventListener('submit', (e) => {
  // Prevent default submit
  e.preventDefault();

  // Get Form Values
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const isbn = document.querySelector('#isbn').value;

  // Validate
  if(title === '' || author === '' || isbn === '') {
    UI.showAlert('Please fill in all fields', 'danger');
  } else {
    // Instantiate Book
    const book = new Book(title, author, isbn);

    // Add Book to UI
    UI.addBookToList(book);

    // Add Book to store
    Store.addBook(book);

    // Show success message
    UI.showAlert('Book Added', 'success');

    // Clear Fields
    UI.clearFields();
  }
});

// Event: Remove a Book
document.querySelector('#book-list').addEventListener('click', (e) => {
  // "deleteBook()" targets specific element (else it would only target first instance)

  // Remove book from UI
  UI.deleteBook(e.target);

  // Remove book from store: target ISBN instead of entire row (what e.target points to)
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

  // Show success message
  UI.showAlert('Book Removed', 'success');
});
