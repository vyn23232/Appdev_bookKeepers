// Smooth scroll to section
function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    const carouselContainer = document.querySelector('.book-carousel');
    const books = document.querySelectorAll('.book-card');
    const carouselSpeed = 3000;
  
    if (books.length > 0) {
      // Clone all books for seamless infinite loop
      books.forEach(book => {
        const clone = book.cloneNode(true);
        carouselContainer.appendChild(clone);
      });
  
      let scrollPosition = 0;
      const bookWidth = books[0].offsetWidth + 20; // Including margin for smooth spacing
  
      function rotateCarousel() {
        scrollPosition += bookWidth;
  
        // Reset the carousel when reaching the clone items
        if (scrollPosition >= bookWidth * books.length) {
          scrollPosition = 0; // Jump back to the start
          carouselContainer.scrollTo({ left: 0, behavior: "auto" });
        } else {
          carouselContainer.scrollTo({ left: scrollPosition, behavior: "smooth" });
        }
      }
  
      // Start the carousel auto-scroll every 3 seconds
      setInterval(rotateCarousel, carouselSpeed);
    }
  });
  