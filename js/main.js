window.addEventListener('load', function() {
  var script = document.createElement('script');
  script.src = "https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.2/anime.min.js";
  document.body.appendChild(script);
});

// Select elements
var dropdown = document.querySelector(".dropdown");
var dropdownContent = document.querySelector(".dropdown-content");
var hamburger = document.querySelector(".hamburger");
var navigation = document.querySelector(".header-center"); // Assuming this is the navigation
var menuItems = document.querySelectorAll(".menu-item");
let menuOpen = false;  

// Hover functionality for desktop view (for larger screens)
dropdown.addEventListener("mouseenter", function () {
  if (!mediaQuery.matches) { // Apply hover only on desktop
    dropdownContent.style.display = "flex";
  }
});

dropdown.addEventListener("click", function () {
  if (!mediaQuery.matches) { // Apply hover only on desktop
    dropdownContent.style.display = "none";
  }
});


// Close dropdown if clicked outside
document.addEventListener("click", function (event) {
  // Check if the click is outside the dropdown
  if (!dropdown.contains(event.target)) {
    dropdownContent.style.display = "none";
  }
});

// Function to add event listeners for mobile view (768px and below)
function setupMobileNavigation() {
  // Dropdown toggle on click for mobile
  dropdown.addEventListener("click", function () {
    if (dropdownContent.style.display === "flex") {
      dropdownContent.style.display = "none";
    } else {
      dropdownContent.style.display = "flex";
    }
  });

  // Hamburger button functionality for mobile
  hamburger.addEventListener("click", function () {
    if (navigation.style.display === "flex") {
      navigation.style.display = "none";
    } else {
      navigation.style.display = "flex";
    }
  });
}

// Media query to target screens 768px and below
var mediaQuery = window.matchMedia("(max-width: 768px)");

// Check if the media query matches the current screen size
if (mediaQuery.matches) {
  setupMobileNavigation();
}

// Add a listener for screen resizing to ensure the script is applied dynamically
mediaQuery.addListener(function (e) {
  if (e.matches) {
    setupMobileNavigation(); // Add event listeners for mobile view
  } else {
    // Remove display styles when switching to larger screens
    dropdownContent.style.display = "";
    navigation.style.display = "";
  }
});



//animeJS functionality
document.addEventListener("scroll", function () {
    const sections = document.querySelectorAll(".scroll-section");
    const scrollY = window.scrollY;
    var mediaQuery = window.matchMedia("(max-width: 768px)");
    var about = document.querySelector(".about-text-wrapper");

  
    const serviceButtons = document.querySelectorAll(".service-button-wrap button");
    const borderPaths = document.querySelectorAll(".border-path");

    borderPaths.forEach((path) => {
        const pathLength = path.getTotalLength();
        path.style.strokeDasharray = pathLength;
        path.style.strokeDashoffset = pathLength;
    });

  
    sections.forEach((section) => {
      const sectionRect = section.getBoundingClientRect();
      const sectionHeight = sectionRect.height;
      const sectionTop = sectionRect.top + window.scrollY;
      const sectionBottom = sectionTop + sectionHeight;
  
      if (scrollY >= sectionTop && scrollY < sectionBottom) {
        const scrollPercentage = (scrollY - sectionTop) / sectionHeight;
        const translateX = scrollPercentage * 100;
        
  
        anime({
          targets: section.querySelector(".img-container"),
          translateX: `${translateX}%`,
          duration: 50,
        });
  
        anime({
          targets: section.querySelector(".about-img-wrapper"),
          translateX: `-${translateX}%`,
          duration: 100,
        });
  
        anime({
          targets: section.querySelector(".intro"),
          opacity: Math.max(0, 1 - scrollPercentage * 2.5),
          duration: 300,
        });

        if (mediaQuery.matches) {
          about.style.opacity = "1";
        } else {
          anime({
            targets: section.querySelector(".about-text-wrapper"),
            opacity: Math.max(0, 1 - scrollPercentage * 2.5),
            duration: 300,
          });
        };

        borderPaths.forEach((path) => {
          const pathLength = path.getTotalLength();
    
          anime({
            targets: path,
            strokeDashoffset: pathLength * (1 - scrollPercentage),  // Reveal path based on scroll
            duration: 0,
          });
        });

      } else if (scrollY < sectionTop) {
        anime({
          targets: section.querySelector(".img-container"),
          translateX: "0vw",
          duration: 50,
        });

        anime({
          targets: section.querySelector(".about-img-wrapper"),
          translateX: "0vw",
          duration: 50,
        });

        borderPaths.forEach((path) => {
          const pathLength = path.getTotalLength();
          anime({
            targets: path,
            strokeDashoffset: pathLength,  // Hide the path completely
            duration: 0,
          });
        });

      } else if (sectionTop < scrollY) {
        borderPaths.forEach((path) => {
          const pathLength = path.getTotalLength();
          anime({
          targets: path,
          strokeDashoffset: 0, 
          duration: 0,
          });
      });
      }

    });
  });
  

  hamburger.addEventListener("click", function() {
    if (!menuOpen) {
      // Menu is closed, so animate to bring items into view
      anime({
        targets: menuItems,
        translateX: 270,        // Move 270px to the right
        delay: anime.stagger(100),
        easing: 'easeInOutQuad' // Stagger the animation
      });
      menuOpen = true;  // Set the state to open
      menuItems.forEach(function(menuItem) {
        menuItem.addEventListener("click", function() {
          navigation.style.display = "none";
          anime({
            targets: menuItems,
            translateX: 0,        // Move 270px to the right
            delay: anime.stagger(100),
            easing: 'easeInOutQuad' // Stagger the animation
          });
        });
      });
    } else {
      // Menu is open, so animate to hide items back off-screen
      menuOpen = false;  // Set the state to closed
      anime({
        targets: menuItems,
        translateX: 270,        // Move 270px to the right
        delay: anime.stagger(100),
        easing: 'easeInOutQuad' // Stagger the animation
      });
    }
  });



