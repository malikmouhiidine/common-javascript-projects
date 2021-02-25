// Book constructor
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}
// UI constructor
class UI {
  constructor() {}
  addBookToTable(book) {
    const list = document.getElementById("book-list");
    const row = document.createElement("tr");
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">
        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times" class="svg-inline--fa fa-times fa-w-11" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512"><path fill="currentColor" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path></svg>
    </a></td>
    `;
    list.appendChild(row);
  }
  clearFields() {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("isbn").value = "";
  }
  showAlert(msg, className) {
    const div = document.createElement("div");
    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(msg));
    const container = document.querySelector(".container");
    const form = document.querySelector("#book-form");
    container.insertBefore(div, form);
    setTimeout(function () {
      document.querySelector(".alert").remove();
    }, 3000);
  }
  deleteBook(target, ui) {
    if (target.closest(".delete")) {
      const row = target.closest("tr");
      const isbn = row.childNodes[5].innerHTML;
      Store.removeBook(isbn);
      row.remove();
      ui.showAlert("Book Removed", "success");
    }
  }
}

// Local storage Class
class Store {
  constructor() {}
  static getBooks() {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem("books"));
    }
    return books;
  }
  static displayBooks() {
    const books = Store.getBooks();
    const ui = new UI();
    books.forEach(function (book) {
      ui.addBookToTable(book);
    });
  }
  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
  }
  static removeBook(isbn) {
    const books = Store.getBooks();
    books.forEach(function (book, index) {
      if (book.isbn === isbn) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem("books", JSON.stringify(books));
  }
}
//  Event Listeners
document.getElementById("book-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const title = document.getElementById("title").value,
    author = document.getElementById("author").value,
    isbn = document.getElementById("isbn").value;
  const book = new Book(title, author, isbn);
  const ui = new UI();
  if (title === "" || author === "" || isbn === "") {
    ui.showAlert("Please fill in all fields", "error");
  } else {
    ui.clearFields();
    ui.addBookToTable(book);
    Store.addBook(book);
    ui.showAlert("Book added successfully", "success");
  }
});

document.addEventListener("DOMContentLoaded", Store.displayBooks);

document.getElementById("book-list").addEventListener("click", function (e) {
  e.preventDefault();
  const ui = new UI();
  ui.deleteBook(e.target, ui);
});
