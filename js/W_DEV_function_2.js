let isScrolling = false;

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
    if (isScrolling) return;
    isScrolling = true;
    const start = element.scrollLeft;
    const distance = targetPosition - start;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = easeInOutQuad(timeElapsed, start, distance, duration);
        element.scrollLeft = run;
        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        } else {
            isScrolling = false;
        }
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
            let touchStartY = 0;
            let touchEndX = 0;
            let touchEndY = 0;
            const touchThreshold = 10; // touch threshold in pixels

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
                if (!isScrolling) {
                    customScrollBy(carousel, carousel.scrollLeft + itemWidth + 20, 750);
                }
            });

            leftArrow.addEventListener('click', () => {
                if (!isScrolling) {
                    customScrollBy(carousel, carousel.scrollLeft - itemWidth - 20, 750);
                }
            });

            // Touch events for mobile
            carousel.addEventListener('touchstart', (e) => {
                touchStartX = e.touches[0].clientX;
                touchStartY = e.touches[0].clientY;
            }, { passive: true });

            carousel.addEventListener('touchend', (e) => {
                if (isScrolling) return;

                touchEndX = e.changedTouches[0].clientX;
                touchEndY = e.changedTouches[0].clientY;

                const touchDiffX = touchStartX - touchEndX;
                const touchDiffY = touchStartY - touchEndY;

                if (Math.abs(touchDiffX) < touchThreshold && Math.abs(touchDiffY) < touchThreshold) {
                    return;
                }

                if (Math.abs(touchDiffX) > Math.abs(touchDiffY) && Math.abs(touchDiffX) > touchThreshold) {
                    e.preventDefault();
                    if (touchDiffX > 0) {
                        customScrollBy(carousel, carousel.scrollLeft + itemWidth + 20, 750);
                    } else {
                        customScrollBy(carousel, carousel.scrollLeft - itemWidth - 20, 750);
                    }
                }
            });

            carousel.addEventListener('touchmove', (e) => {
                const touchDiffX = touchStartX - e.touches[0].clientX;
                if (Math.abs(touchDiffX) > touchThreshold) {
                    e.preventDefault();
                }
            }, { passive: false });
        } else {
            console.error('ERROR: Carousel container is missing one of the required elements.');
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.querySelector('.menu-toggle');
    if (!menuToggle) return;

    menuToggle.addEventListener('click', function () {
        this.classList.toggle('active');
        const mobileMenu = document.querySelector('.mobile-menu');
        mobileMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');

        if (mobileMenu.classList.contains('active')) {
            document.querySelectorAll('.mobile-menu .nav-link').forEach((link, index) => {
                link.style.transitionDelay = `${(index + 1) * 0.1}s`;
            });
        } else {
            document.querySelectorAll('.mobile-menu .nav-link').forEach(link => {
                link.style.transitionDelay = '0s';
            });
        }
    });

    document.querySelectorAll('.mobile-menu .nav-link').forEach(link => {
        link.addEventListener('click', function () {
            document.querySelector('.menu-toggle').classList.remove('active');
            document.querySelector('.mobile-menu').classList.remove('active');
            document.body.classList.remove('menu-open');
            document.querySelectorAll('.mobile-menu .nav-link').forEach(link => {
                link.style.transitionDelay = '0s';
            });
        });
    });
});