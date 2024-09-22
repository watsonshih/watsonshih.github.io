function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    const offset = 150;
    return rect.bottom < 0 || rect.top + offset > window.innerHeight;
}

function addClassToVisibleElements() {
    var fadeElements = document.querySelectorAll(".fade");
    fadeElements.forEach(function (fadeElement) {
        if (!isElementInViewport(fadeElement)) fadeElement.classList.add("shows");
        else fadeElement.classList.remove("shows");
    });
}

document.addEventListener("scroll", addClassToVisibleElements);
document.addEventListener("DOMContentLoaded", addClassToVisibleElements);


function customScrollBy(element, targetPosition, duration) {
    const start = element.scrollLeft;
    const distance = targetPosition - start;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = easeInOutQuad(timeElapsed, start, distance, duration);
        element.scrollLeft = run;
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function easeInOutQuad(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return (c / 2) * t * t + b;
        t--;
        return (-c / 2) * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
}

const emToPx = (em) => {
    const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
    return em * rootFontSize;
};

document.addEventListener('DOMContentLoaded', () => {
    const carouselContainers = document.querySelectorAll('.carousel-container');

    carouselContainers.forEach(container => {
        const carousel = container.querySelector('.carousel');
        const leftArrow = container.querySelector('.left-arrow');
        const rightArrow = container.querySelector('.right-arrow');
        const carouselItems = container.querySelectorAll('.carousel-item');

        if (carousel && leftArrow && rightArrow && carouselItems.length > 0) {
            const itemWidth = carouselItems[0].offsetWidth;
            let touchStartX = 0;

            const updateArrows = () => {
                if (carousel.scrollLeft === 0) {
                    leftArrow.classList.add('hidden');
                } else {
                    leftArrow.classList.remove('hidden');
                }
                if (carousel.scrollLeft + carousel.offsetWidth >= carousel.scrollWidth) {
                    rightArrow.classList.add('hidden');
                } else {
                    rightArrow.classList.remove('hidden');
                }
            };

            container.addEventListener('mouseenter', () => {
                updateArrows();
            });

            container.addEventListener('mouseleave', () => {
                leftArrow.classList.add('hidden');
                rightArrow.classList.add('hidden');
            });

            carousel.addEventListener('scroll', () => {
                updateArrows();
            });

            rightArrow.addEventListener('click', () => {
                customScrollBy(carousel, carousel.scrollLeft + itemWidth + 20, 750);
            });

            leftArrow.addEventListener('click', () => {
                customScrollBy(carousel, carousel.scrollLeft - itemWidth - 20, 750);
            });

            // Touch events for mobile
            carousel.addEventListener('touchstart', (e) => {
                touchStartX = e.touches[0].clientX;
            });

            carousel.addEventListener('touchend', (e) => {
                const touchEndX = e.changedTouches[0].clientX;
                const touchDiff = touchStartX - touchEndX;

                if (Math.abs(touchDiff) > 1) {
                    if (touchDiff > 0) {
                        customScrollBy(carousel, carousel.scrollLeft + itemWidth + 30 - touchDiff, 750);
                    } else {
                        customScrollBy(carousel, carousel.scrollLeft - itemWidth - 30 - touchDiff, 750);
                    }
                }
            });
        } else {
            console.error('ERROR: Carousel container is missing one of the required elements.');
        }
    });
});