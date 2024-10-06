var hamburger = document.querySelector(".hamburger");
var navigation = document.querySelector(".header-center"); // Assuming this is the navigation
var menuItems = document.querySelectorAll(".menu-item");
let menuOpen = false;  

  // Hamburger button functionality for mobile
  hamburger.addEventListener("click", function () {
    if (navigation.style.display === "flex") {
      navigation.style.display = "none";
    } else {
      navigation.style.display = "flex";
    }
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


//animeJS functionality
document.addEventListener("scroll", function () {
    const sections = document.querySelectorAll(".scroller");
    const scrollY = window.scrollY;

    sections.forEach((section) => {
      const sectionRect = section.getBoundingClientRect();
      const sectionHeight = sectionRect.height;
      const sectionTop = sectionRect.top + window.scrollY;
      const sectionBottom = sectionTop + sectionHeight;
  
      if (scrollY >= sectionTop && scrollY < sectionBottom) {
        const scrollPercentage = (scrollY - sectionTop) / sectionHeight;
        const translateX = scrollPercentage * 100;
  
  
        anime({
          targets: section.querySelectorAll(".project-image"),
          translateX: `-${translateX}%`,    
          duration: 50,      
        });

      } else if (scrollY < sectionTop) {
        anime({
          targets: section.querySelector(".project-image"),
          translateX: "0vw",
          duration: 50,
        });
      }
    });
  });