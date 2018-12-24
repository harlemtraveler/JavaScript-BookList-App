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

    const book = StoredBooks;

  }
}

// Store Class: Handles Storage

// Event: Display Books

// Event: Add a Book

// Event: Remove a Book
