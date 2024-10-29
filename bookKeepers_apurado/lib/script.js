// js/script.js

// Example data (replace with dynamic data from your actual books)
let books = [
    { id: 1, title: "Book One", author: "Author A", available: true },
    { id: 2, title: "Book Two", author: "Author B", available: true },
    { id: 3, title: "Book Three", author: "Author C", available: true },
    { id: 4, title: "Book Four", author: "Author D", available: false }, // Example borrowed book
];

let borrowedBooks = []; // To track borrowed books
const currentUserId = 1; // Example user ID

// Load the book list into book_list.html
function loadBookList() {
    const bookListContainer = document.getElementById("book-list");
    bookListContainer.innerHTML = ''; // Clear previous content
    books.forEach(book => {
        const bookItem = document.createElement("div");
        bookItem.className = "book-card";
        bookItem.innerHTML = `
            <h3>${book.title}</h3>
            <p>by ${book.author}</p>
            <button onclick="loadBookDetail(${book.id})">View Details</button>
        `;
        bookListContainer.appendChild(bookItem);
    });
}

// Load details of a specific book with fade-in effect
function loadBookDetail(bookId) {
    const book = books.find(b => b.id === bookId);
    const bookDetailContainer = document.getElementById("book-detail");
    bookDetailContainer.classList.remove("fade-in"); // Remove the class for reanimation

    // Timeout to allow the animation to reset before adding it back
    setTimeout(() => {
        bookDetailContainer.innerHTML = `
            <h2>${book.title}</h2>
            <p>Author: ${book.author}</p>
            <p>Status: ${book.available ? "Available" : "Not Available"}</p>
        `;
        const borrowBtn = document.getElementById("borrow-btn");
        borrowBtn.style.display = book.available ? 'block' : 'none'; // Show/hide button based on availability
        borrowBtn.onclick = () => borrowBook(bookId); // Bind borrow function
        bookDetailContainer.classList.add("fade-in"); // Add the class for animation
    }, 0); // Delay to allow class removal
}

// Function to handle borrowing a book
function borrowBook(bookId) {
    const book = books.find(b => b.id === bookId);
    if (book && book.available) {
        book.available = false; // Mark as borrowed
        borrowedBooks.push(book); // Add to borrowed books list
        alert(`${book.title} has been borrowed!`);
        loadBookList(); // Refresh the book list
        loadBookDetail(bookId); // Refresh book detail
    } else {
        alert("This book is not available for borrowing.");
    }
}

// Function to return a book
function returnBook(bookId) {
    const book = borrowedBooks.find(b => b.id === bookId);
    if (book) {
        book.available = true; // Mark as available
        borrowedBooks = borrowedBooks.filter(b => b.id !== bookId); // Remove from borrowed books
        alert(`${book.title} has been returned!`);
        loadBookList(); // Refresh the book list
    } else {
        alert("You haven't borrowed this book.");
    }
}

// Load the book list when the page is ready
if (document.getElementById("book-list")) {
    loadBookList();
}

// Load book detail if on the book detail page
if (document.getElementById("book-detail")) {
    const bookId = 1; // Example: Replace this with actual logic to get the book ID from URL
    loadBookDetail(bookId);
}
