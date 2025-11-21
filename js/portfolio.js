// Portfolio Gallery JavaScript
(function () {
    'use strict';

    // Photo Modal Elements
    const photoModal = document.getElementById('photoModal');
    const modalImage = document.getElementById('modalImage');
    const modalDescription = document.getElementById('modalDescription');
    const photoModalContent = photoModal ? photoModal.querySelector('.modal-content') : null;

    // Film Modal Elements
    const filmModal = document.getElementById('filmModal');
    const iframeContainer = document.getElementById('iframeContainer');
    const filmModalDescription = document.getElementById('filmModalDescription');
    const filmModalContent = filmModal ? filmModal.querySelector('.modal-content') : null;

    // Scroll lock state
    const body = document.body;
    let isScrollLocked = false;
    let previousOverflow = '';
    let previousPaddingRight = '';

    function lockScroll() {
        if (isScrollLocked) {
            return;
        }

        previousOverflow = body.style.overflow;
        previousPaddingRight = body.style.paddingRight;

        const scrollbarGap = window.innerWidth - document.documentElement.clientWidth;
        if (scrollbarGap > 0) {
            body.style.paddingRight = `${scrollbarGap}px`;
        }

        body.style.overflow = 'hidden';
        isScrollLocked = true;
    }

    function unlockScroll() {
        if (!isScrollLocked) {
            return;
        }

        body.style.overflow = previousOverflow;
        body.style.paddingRight = previousPaddingRight;
        isScrollLocked = false;
    }

    const photoModalBreakpoint = window.matchMedia('(max-width: 768px)');

    let isPhotoZoomed = false;

    // Initialize Photo Gallery
    function initPhotoGallery() {
        const photoItems = document.querySelectorAll('.photo-item');

        photoItems.forEach(item => {
            item.addEventListener('click', function () {
                if (photoModalBreakpoint.matches) {
                    return;
                }

                if (!photoModal || !photoModalContent || !modalImage) {
                    return;
                }

                const img = this.querySelector('img');
                if (!img) {
                    return;
                }

                const description = this.querySelector('.photo-description');
                const descriptionText = description ? description.textContent : '';
                const thumbRect = img.getBoundingClientRect();

                const showModal = () => {
                    modalImage.alt = img.alt || '';

                    if (descriptionText) {
                        modalDescription.textContent = descriptionText;
                        modalDescription.style.display = 'block';
                    } else {
                        modalDescription.style.display = 'none';
                    }

                    openPhotoModal(thumbRect);
                };

                if (modalImage.src !== img.src) {
                    modalImage.addEventListener('load', showModal, { once: true });
                    modalImage.src = img.src;
                } else if (modalImage.complete) {
                    showModal();
                } else {
                    modalImage.addEventListener('load', showModal, { once: true });
                }
            });
        });
    }

    // Open Photo Modal
    function openPhotoModal(thumbRect) {
        if (!photoModal || !photoModalContent) {
            return;
        }

        lockScroll();
        isPhotoZoomed = false;
        photoModalContent.classList.remove('zoomed');

        photoModal.style.display = 'block';
        photoModal.setAttribute('aria-hidden', 'false');

        // Prepare for animation measurement
        photoModalContent.style.transition = 'none';
        photoModalContent.style.transform = 'translate(-50%, -50%) scale(1)';

        const modalRect = photoModalContent.getBoundingClientRect();
        const viewportCenterX = window.innerWidth / 2;
        const viewportCenterY = window.innerHeight / 2;
        let deltaX = 0;
        let deltaY = 0;
        let scaleX = 0.9;
        let scaleY = 0.9;

        if (thumbRect) {
            deltaX = (thumbRect.left + thumbRect.width / 2) - viewportCenterX;
            deltaY = (thumbRect.top + thumbRect.height / 2) - viewportCenterY;
            scaleX = modalRect.width ? thumbRect.width / modalRect.width : 0.9;
            scaleY = modalRect.height ? thumbRect.height / modalRect.height : 0.9;
        }

        const initialTransform = `translate(calc(-50% + ${deltaX}px), calc(-50% + ${deltaY}px)) scale(${scaleX}, ${scaleY})`;
        photoModalContent.style.transform = initialTransform;

        requestAnimationFrame(() => {
            photoModalContent.style.transition = 'transform 0.45s cubic-bezier(0.4, 0, 0.2, 1)';
            photoModal.classList.add('show');
            photoModalContent.style.transform = 'translate(-50%, -50%) scale(1)';
        });

        const cleanupAfterAnimation = () => {
            photoModalContent.style.transition = '';
            photoModalContent.style.transform = '';
            photoModalContent.removeEventListener('transitionend', cleanupAfterAnimation);
        };

        photoModalContent.addEventListener('transitionend', cleanupAfterAnimation, { once: true });
    }

    // Close Photo Modal
    function closePhotoModal() {
        if (!photoModal || !photoModalContent) {
            return;
        }

        photoModal.classList.remove('show');
        photoModal.setAttribute('aria-hidden', 'true');
        isPhotoZoomed = false;
        photoModalContent.classList.remove('zoomed');

        setTimeout(() => {
            photoModal.style.display = 'none';
            photoModalContent.style.transition = '';
            photoModalContent.style.transform = '';
            unlockScroll();
        }, 300);
    }

    // Photo Modal Zoom Toggle
    if (modalImage) {
        modalImage.addEventListener('click', function (e) {
            e.stopPropagation();
            if (!photoModalContent) {
                return;
            }

            isPhotoZoomed = !isPhotoZoomed;
            photoModalContent.classList.toggle('zoomed');
        });
    }

    // Photo Modal Close Events
    if (photoModal) {
        const photoCloseBtn = photoModal.querySelector('.modal-close');

        if (photoCloseBtn) {
            photoCloseBtn.addEventListener('click', closePhotoModal);
        }

        photoModal.addEventListener('click', function (e) {
            if (e.target === this) {
                closePhotoModal();
            }
        });
    }

    // Initialize Film Gallery
    function initFilmGallery() {
        const filmItems = document.querySelectorAll('.film-item');

        filmItems.forEach(item => {
            item.addEventListener('click', function () {
                const youtubeId = this.getAttribute('data-youtube');
                const filmInfo = this.querySelector('.film-info');
                const filmTitle = filmInfo ? filmInfo.querySelector('.film-title').textContent : '';

                if (youtubeId) {
                    openFilmModal(youtubeId, filmTitle);
                }
            });
        });
    }

    // Open Film Modal
    function openFilmModal(youtubeId, title) {
        // Create YouTube iframe
        const iframe = document.createElement('iframe');
        iframe.src = `https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`;
        iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
        iframe.allowFullscreen = true;

        iframeContainer.innerHTML = '';
        iframeContainer.appendChild(iframe);

        if (title) {
            filmModalDescription.textContent = title;
            filmModalDescription.style.display = 'block';
        } else {
            filmModalDescription.style.display = 'none';
        }

        filmModal.style.display = 'block';
        filmModal.setAttribute('aria-hidden', 'false');
        lockScroll();

        requestAnimationFrame(() => {
            if (filmModalContent) {
                filmModalContent.style.transition = '';
                filmModalContent.style.transform = '';
            }
            filmModal.classList.add('show');
        });
    }

    // Close Film Modal
    function closeFilmModal() {
        if (!filmModal) {
            return;
        }

        filmModal.classList.remove('show');
        filmModal.setAttribute('aria-hidden', 'true');

        setTimeout(() => {
            filmModal.style.display = 'none';
            iframeContainer.innerHTML = '';
            unlockScroll();
        }, 300);
    }

    // Film Modal Close Events
    if (filmModal) {
        const filmCloseBtn = filmModal.querySelector('.modal-close');

        if (filmCloseBtn) {
            filmCloseBtn.addEventListener('click', closeFilmModal);
        }

        filmModal.addEventListener('click', function (e) {
            if (e.target === this) {
                closeFilmModal();
            }
        });
    }

    // Keyboard Navigation
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            if (photoModal.classList.contains('show')) {
                closePhotoModal();
            }
            if (filmModal.classList.contains('show')) {
                closeFilmModal();
            }
        }
    });

    // Smooth Scroll for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));

            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // Close mobile menu if open
                const mobileMenu = document.querySelector('.mobile-menu');
                if (mobileMenu && mobileMenu.classList.contains('show')) {
                    mobileMenu.classList.remove('show');
                }
            }
        });
    });

    // Intersection Observer for Fade-in Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Initialize all galleries when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () {
            initPhotoGallery();
            initFilmGallery();
        });
    } else {
        initPhotoGallery();
        initFilmGallery();
    }

    // Prevent right-click on images (optional, for protection)

    document.querySelectorAll('.photo-item img, .modal-content img').forEach(img => {
        img.addEventListener('contextmenu', function (e) {
            e.preventDefault();
        });
    });
})();
