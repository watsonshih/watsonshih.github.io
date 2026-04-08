document.addEventListener('DOMContentLoaded', function () {
    // Hero scroll click
    var heroScroll = document.querySelector('.web-hero-scroll');
    if (heroScroll) {
        heroScroll.addEventListener('click', function () {
            var next = document.querySelector('.web-feature-section') || document.querySelector('.web-section');
            if (next) next.scrollIntoView({ behavior: 'smooth' });
        });
    }

    // Hero parallax
    var hero = document.querySelector('.web-hero');
    if (hero) {
        var heroContent = hero.querySelector('.web-hero-content');
        window.addEventListener('scroll', function () {
            var scrolled = window.pageYOffset;
            if (heroContent && scrolled < window.innerHeight) {
                heroContent.style.transform = 'translateY(' + scrolled * 0.5 + 'px)';
                heroContent.style.opacity = 1 - (scrolled / window.innerHeight);
            }
        });
    }

    // Feature carousel
    var track = document.querySelector('.web-feature-track');
    var dotsContainer = document.querySelector('.web-feature-dots');
    var playPauseBtn = document.querySelector('.web-feature-playpause');
    if (!track || !dotsContainer) return;

    var slides = track.querySelectorAll('.web-feature-slide');
    var count = slides.length;
    var currentIndex = 0;
    var autoplayTimer = null;
    var isPlaying = false;
    var manualPaused = false;
    var INTERVAL = 10000;

    // Disable manual scroll
    track.style.overflowX = 'hidden';

    // Build dots
    for (var i = 0; i < count; i++) {
        var dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'web-feature-dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', '第 ' + (i + 1) + ' 張');
        dot.dataset.index = i;
        var bar = document.createElement('span');
        bar.className = 'dot-progress';
        dot.appendChild(bar);
        dotsContainer.appendChild(dot);
    }

    var dots = dotsContainer.querySelectorAll('.web-feature-dot');

    function scrollToSlide(index) {
        if (index >= count) index = 0;
        if (index < 0) index = count - 1;
        currentIndex = index;
        var slideLeft = slides[index].offsetLeft;
        var slideWidth = slides[index].offsetWidth;
        var trackWidth = track.offsetWidth;
        track.scrollTo({ left: slideLeft - (trackWidth - slideWidth) / 2, behavior: 'smooth' });
        updateDots();
    }

    function updateDots() {
        dots.forEach(function (d, i) {
            d.classList.remove('active', 'paused');
            var bar = d.querySelector('.dot-progress');
            if (i === currentIndex) {
                d.classList.add('active');
                if (!isPlaying) d.classList.add('paused');
                // Restart animation
                bar.style.animation = 'none';
                bar.offsetHeight;
                bar.style.animation = '';
            } else {
                bar.style.animation = 'none';
            }
        });
    }

    // Click on side slides to navigate
    slides.forEach(function (slide, i) {
        slide.addEventListener('click', function () {
            if (i === currentIndex) return;
            scrollToSlide(i);
            resetAutoplay();
        });
    });

    // Dot click
    dotsContainer.addEventListener('click', function (e) {
        var dot = e.target.closest('.web-feature-dot');
        if (!dot) return;
        scrollToSlide(parseInt(dot.dataset.index));
        resetAutoplay();
    });

    // Autoplay
    function startAutoplay() {
        stopAutoplay();
        isPlaying = true;
        if (playPauseBtn) playPauseBtn.querySelector('.playpause-icon').textContent = '❚❚';
        updateDots();
        autoplayTimer = setInterval(function () {
            scrollToSlide(currentIndex + 1);
            resetAutoplay();
        }, INTERVAL);
    }

    function stopAutoplay() {
        clearInterval(autoplayTimer);
        autoplayTimer = null;
        isPlaying = false;
        if (playPauseBtn) playPauseBtn.querySelector('.playpause-icon').textContent = '▶';
        var activeDot = dotsContainer.querySelector('.web-feature-dot.active');
        if (activeDot) activeDot.classList.add('paused');
    }

    function resetAutoplay() {
        if (isPlaying) startAutoplay();
    }

    if (playPauseBtn) {
        playPauseBtn.addEventListener('click', function () {
            if (isPlaying) {
                manualPaused = true;
                stopAutoplay();
            } else {
                manualPaused = false;
                startAutoplay();
            }
        });
    }

    // Start autoplay only when carousel is visible
    var featureSection = document.querySelector('.web-feature-section');
    if (featureSection && 'IntersectionObserver' in window) {
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.intersectionRatio >= 0.3) {
                    if (!isPlaying && !manualPaused) startAutoplay();
                } else {
                    if (isPlaying) stopAutoplay();
                }
            });
        }, { threshold: [0, 0.3] });
        observer.observe(featureSection);
    } else {
        startAutoplay();
    }
});
