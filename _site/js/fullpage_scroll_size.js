window.addEventListener('scroll', function () {
    const swintroGrid12Elements = document.querySelectorAll('.introhero');

    swintroGrid12Elements.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;

        if (elementTop + element.offsetHeight / 50 < -150) {
            const scrollPercent = Math.max(0, (windowHeight - elementTop) / element.offsetHeight);
            const scale = 1 - scrollPercent * 0.05;
            const opacity = 1 - scrollPercent * 0.3;
            const insetPercent = scrollPercent * 1;

            element.style.scale = `${scale}`;
            element.style.transform = `translateY(-150px)`;
            element.style.opacity = `${opacity}`;
            element.style.clipPath = `inset(${insetPercent}% round 44px)`;
        } else {
            element.style.scale = '';
            element.style.transform = '';
            element.style.opacity = '';
            element.style.clipPath = 'inset(0%)';
        }
    });
});