"use strict";

var currentImageIndex = 0;
var images = document.querySelectorAll(".product-navigate img");

function clickme(smallImg) {
  var fullImg = document.getElementById("imagebox");
  fullImg.src = smallImg.src;
  currentImageIndex = Array.from(images).indexOf(smallImg);
  images.forEach(function (img) {
    return img.classList.remove("active-image");
  }); // Add border to the current active image

  images[currentImageIndex].classList.add("active-image");
}

function nextImage() {
  currentImageIndex = (currentImageIndex + 1) % images.length;
  updateImage();
}

function previousImage() {
  currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
  updateImage();
}

function updateImage() {
  var fullImg = document.getElementById("imagebox");
  fullImg.src = images[currentImageIndex].src; // Remove border from all images

  images.forEach(function (img) {
    return img.classList.remove("active-image");
  }); // Add border to the current active image

  images[currentImageIndex].classList.add("active-image");
} //------ counter-------


function increment() {
  event.preventDefault();
  var counterValue = document.getElementById("counterValue");
  counterValue.value++;
}

function decrement() {
  event.preventDefault();
  var counterValue = document.getElementById("counterValue");

  if (counterValue.value > 0) {
    counterValue.value--;
  }
} // ---------------------

document.addEventListener("DOMContentLoaded", function () {
    var productContainer = document.getElementById('productContainer');
    var prevBtn = document.getElementById('prevBtn');
    var nextBtn = document.getElementById('nextBtn');
    var cardWidth = 300; // Width of each product card, adjust as needed

    var scrollPosition = 0; // Event listeners for navigation buttons

    prevBtn.addEventListener('click', function () {
        scrollPosition -= cardWidth;
        scrollPosition = Math.max(scrollPosition, 0);
        productContainer.scrollTo({
            left: scrollPosition,
            behavior: 'smooth' // Use smooth scrolling behavior
        });
        updateButtonStyles();
    });

    nextBtn.addEventListener('click', function () {
        scrollPosition += cardWidth;
        var maxScroll = productContainer.scrollWidth - productContainer.clientWidth;
        if (scrollPosition >= maxScroll) {
            scrollPosition = maxScroll;
        }
        productContainer.scrollTo({
            left: scrollPosition,
            behavior: 'smooth' // Use smooth scrolling behavior
        });
        updateButtonStyles();
    });

    // Touch event handling
    var isDragging = false;
    var startX;
    var scrollLeft;

    productContainer.addEventListener("touchstart", function (e) {
        isDragging = true;
        startX = e.touches[0].pageX - productContainer.offsetLeft;
        scrollLeft = productContainer.scrollLeft;
    });

    productContainer.addEventListener("touchend", function () {
        isDragging = false;
    });

    productContainer.addEventListener("touchcancel", function () {
        isDragging = false;
    });

    productContainer.addEventListener("touchmove", function (e) {
        if (!isDragging) return;
        e.preventDefault();
        var x = e.touches[0].pageX - productContainer.offsetLeft;
        var walk = (x - startX) * 2;
        productContainer.scrollLeft = scrollLeft - walk;
    });

    // Disable default drag behavior on images and links
    productContainer.querySelectorAll('img, a').forEach(function (item) {
        item.draggable = false;
    });

    // Function to update button styles
    function updateButtonStyles() {
        var maxScroll = productContainer.scrollWidth - productContainer.clientWidth;

        if (scrollPosition === 0) {
            prevBtn.classList.remove('active');
            nextBtn.classList.add('active');
        } else if (scrollPosition >= maxScroll) {
            nextBtn.classList.remove('active');
            prevBtn.classList.add('active');
            nextBtn.disabled = true; // Disable next button
        } else {
            nextBtn.classList.add('active');
            prevBtn.classList.add('active');
            nextBtn.disabled = false; // Enable next button
        }
    }
});
