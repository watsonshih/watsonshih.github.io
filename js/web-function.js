// Smooth scroll for hero section
document.addEventListener('DOMContentLoaded', function () {
    const heroScroll = document.querySelector('.web-hero-scroll');

    if (heroScroll) {
        heroScroll.addEventListener('click', function () {
            const nextSection = document.querySelector('.web-section');
            if (nextSection) {
                nextSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // Parallax effect for hero section
    const hero = document.querySelector('.web-hero');
    if (hero) {
        window.addEventListener('scroll', function () {
            const scrolled = window.pageYOffset;
            const heroContent = hero.querySelector('.web-hero-content');
            if (heroContent && scrolled < window.innerHeight) {
                heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
                heroContent.style.opacity = 1 - (scrolled / window.innerHeight);
            }
        });
    }

    // Add hover effect to feature cards
    const featureCards = document.querySelectorAll('.web-feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Animate process numbers on scroll
    const processNumbers = document.querySelectorAll('.web-process-number');
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };

    const processObserver = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'pulse 0.6s ease-out';
                setTimeout(() => {
                    entry.target.style.animation = '';
                }, 600);
            }
        });
    }, observerOptions);

    processNumbers.forEach(number => {
        processObserver.observe(number);
    });

    // Add CSS animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0%, 100% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.15);
            }
        }
    `;
    document.head.appendChild(style);
});
