var dropdown = document.querySelector('.dropdown');
var dropdownContent = document.querySelector('.dropdown-content'); // Move this outside
var serviceContainers = document.querySelectorAll('.service-container'); 
var serviceCard = document.querySelector('.service-card');
var serviceCardImage = document.querySelector('.service-card-img');

dropdown.addEventListener('mouseenter', function() {
    if (dropdownContent) {
        dropdownContent.style.display = "block"; 
    }
    
});

serviceContainers.forEach(container => {
    var serviceCard = container.querySelector('.service-card');
    var serviceCardImage = container.querySelector('.service-card-img');

    container.addEventListener('mouseenter', function() {
        serviceCard.style.color = "aliceblue";
        serviceCard.style.display = "flex";
        serviceCard.style.textShadow = "2px 4px 6px rgba(0, 0, 0, 0.5)";
        serviceCardImage.style.display = "flex";
        serviceCardImage.style.position = "absolute";
    });

    container.addEventListener('mouseleave', function() {
        serviceCard.style.color = "black";
        serviceCardImage.style.display = "none";
        serviceCard.style.textShadow = "none";
    });

});


// Close dropdown if clicking outside
document.addEventListener('click', function(event) {
    if (!dropdown.contains(event.target)) {
        if (dropdownContent) {
            dropdownContent.style.display = "none"; 
        }
    }
});

anime.stagger(serviceCard, {grid: grid, from: index})