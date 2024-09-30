//animeJS functionality
document.addEventListener("scroll", function () {
    const sections = document.querySelectorAll(".scroller");
    const scrollY = window.scrollY;
  
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
          targets: section.querySelector(".project-image"),
          translateX: `-${translateX}%`,
          duration: 50,
        });

  
        anime({
          targets: section.querySelector(".services-about"),
          opacity: Math.max(0, 1 - scrollPercentage * 2.5),
          duration: 300,
        });

        borderPaths.forEach((path) => {
          const pathLength = path.getTotalLength();
          anime({
          targets: path,
          strokeDashoffset:  0.7 * pathLength * (1 -scrollPercentage), 
          easing: "easeInOutSine",
          duration: 0,
          loop: true,

          });
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
  