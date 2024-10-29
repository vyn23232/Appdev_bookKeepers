// js/script.js

// Example data
const books = [
    { id: 1, title: "Book One", author: "Author A", available: true },
    { id: 2, title: "Book Two", author: "Author B", available: true },
    // ... more book objects
];

// Function to load the book list into the book_list.html
function loadBookList() {
    const bookListContainer = document.getElementById("book-list");
    books.forEach(book => {
        const bookItem = document.createElement("div");
        bookItem.className = "book-card";
        bookItem.innerHTML = `<h3>${book.title}</h3><p>by ${book.author}</p>`;
        bookItem.addEventListener("click", () => loadBookDetail(book.id));
        bookListContainer.appendChild(bookItem);
    });
}

// Function to load details of a specific book
function loadBookDetail(bookId) {
    const book = books.find(b => b.id === bookId);
    const bookDetailContainer = document.getElementById("book-detail");
    bookDetailContainer.innerHTML = `
        <h2>${book.title}</h2>
        <p>Author: ${book.author}</p>
        <p>Status: ${book.available ? "Available" : "Not Available"}</p>
    `;
    document.getElementById("borrow-btn").onclick = () => borrowBook(bookId);
}

// Function to handle borrowing a book
function borrowBook(bookId) {
    const book = books.find(b => b.id === bookId);
    if (book && book.available) {
        book.available = false; // Mark as borrowed
        alert(`${book.title} has been borrowed!`);
        // Optionally, update the server here
        loadBookList(); // Refresh the book list
    } else {
        alert("This book is not available for borrowing.");
    }
}

// Load the book list when the page is ready
if (document.getElementById("book-list")) {
    loadBookList();
}

// Load book detail if on the book detail page
if (document.getElementById("book-detail")) {
    const bookId = 1; // Assume a book ID is passed or retrieved from URL
    loadBookDetail(bookId);
}
