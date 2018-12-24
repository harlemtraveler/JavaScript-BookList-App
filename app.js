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
    // Hard-coded StoredBooks array for demo (Acts as local storage)
    const StoredBooks = [
      {
        title: 'Book One',
        author: 'John Doe',
        isbn: '3434434'
      },
      {
        title: 'Book Two',
        author: 'Jane Doe',
        isbn: '45545'
      }
    ];

    const books = StoredBooks;

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
}

// Store Class: Handles Storage

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

  // Instantiate Book
  const book = new Book(title, author, isbn);

  // Add Book to UI
  UI.addBookToList(book);
});

// Event: Remove a Book
