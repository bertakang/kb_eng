var dropdown = document.querySelector('.dropdown');
var dropdownContent = document.querySelector('.dropdown-content'); // Move this outside


dropdown.addEventListener('mouseenter', function() {
    if (dropdownContent) {
        dropdownContent.style.display = "block"; 
    }
    
});



// Close dropdown if clicking outside
document.addEventListener('click', function(event) {
    if (!dropdown.contains(event.target)) {
        if (dropdownContent) {
            dropdownContent.style.display = "none"; 
        }
    }
});
