var dropdown = document.querySelector(".dropdown");
var dropdownContent = document.querySelector(".dropdown-content"); // Move this outside

//dropdown functionality
dropdown.addEventListener("mouseenter", function () {
  if (dropdownContent) {
    dropdownContent.style.display = "block";
  }
});

document.addEventListener("click", function (event) {
  if (!dropdown.contains(event.target)) {
    if (dropdownContent) {
      dropdownContent.style.display = "none";
    }
  }
});

//animeJS functionality
document.addEventListener("scroll", function () {
    const sections = document.querySelectorAll(".scroll-section");
    const scrollY = window.scrollY;
  
    const serviceButtons = document.querySelectorAll(".service-button-wrap button");
    const borderPaths = document.querySelectorAll("path");

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
          duration: 50,
        });
  
        anime({
          targets: section.querySelector(".intro"),
          opacity: Math.max(0, 1 - scrollPercentage * 2.5),
          duration: 300,
        });
  
        anime({
          targets: section.querySelector(".about-text-wrapper"),
          opacity: Math.max(0, 1 - scrollPercentage * 2.5),
          duration: 300,
        });
  
        borderPaths.forEach((path) => {
            const pathLength = path.getTotalLength();
            anime({
            targets: path,
            strokeDashoffset: pathLength * (1 - scrollPercentage), 
            easing: "easeInOutSine",
            duration: 0,
            loop: true,
            // complete: function() {
            //     scrollPercentage == 100%;
            // }
            });
        });


      } else if (scrollY < sectionTop) {
        anime({
          targets: section.querySelector(".img-container"),
          translateX: "0vw",
          duration: 50,
        });

        borderPaths.forEach((path) => {
            const pathLength = path.getTotalLength();
            anime({
            targets: path,
            strokeDashoffset: pathLength * (scrollPercentage), 
            easing: "easeInOutSine",
            duration: 0,
            // complete: function() {
            //     // Optional: reset stroke dash for re-animation
            //     scrollPercentage == 100%;
            // }
            });
        });
      }
    });
  });
  