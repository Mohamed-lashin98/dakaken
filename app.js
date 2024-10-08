document.addEventListener("DOMContentLoaded", function () {
    const sliderContainers = document.querySelectorAll('.slider-container');
    const prevBtns = document.querySelectorAll('.prev-btn');
    const nextBtns = document.querySelectorAll('.next-btn');
    const cardWidth = 250; // Adjust this value based on your card width

    sliderContainers.forEach((sliderContainer, index) => {
        let scrollPosition = 0;

        prevBtns[index].addEventListener('click', function () {
            scrollPosition -= cardWidth;
            scrollPosition = Math.max(scrollPosition, 0);
            sliderContainer.scrollTo({
                left: scrollPosition,
                behavior: 'smooth'
            });
            updateButtonStyles();
        });

        nextBtns[index].addEventListener('click', function () {
            scrollPosition += cardWidth;
            const maxScrollPosition = sliderContainer.scrollWidth - sliderContainer.clientWidth;
            if (scrollPosition >= maxScrollPosition) {
                scrollPosition = maxScrollPosition;
            }
            sliderContainer.scrollTo({
                left: scrollPosition,
                behavior: 'smooth'
            });
            updateButtonStyles();
        });

        function updateButtonStyles() {
            var maxScroll = sliderContainer.scrollWidth - sliderContainer.clientWidth;

            if (scrollPosition === 0) {
                prevBtns[index].classList.remove('active');
                nextBtns[index].classList.add('active');
                nextBtns[index].disabled = false;
            } else if (scrollPosition >= maxScroll) {
                nextBtns[index].classList.remove('active');
                prevBtns[index].classList.add('active');
                nextBtns[index].disabled = true; // Disable next button
            } else {
                nextBtns[index].classList.add('active');
                prevBtns[index].classList.add('active');
                nextBtns[index].disabled = false; // Enable next button
            }
        }
    });
});
