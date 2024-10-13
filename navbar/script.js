document.getElementById("menu-icon").addEventListener("click", function() {
    var links = document.querySelector(".navbar-links");
    var menuIcon = document.getElementById("menu-icon");
    
    links.classList.toggle("active");
    menuIcon.classList.toggle("open"); // Toggle hamburger animation
});
