document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for fade-in animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.card, .hero-content, .ceo-profile').forEach((el) => {
        el.style.opacity = 0;
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });

    // Parallax effect on cards with mouse movement
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-15px) scale(1.05)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

    // Parallax effect on hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        document.addEventListener('mousemove', (e) => {
            const moveX = (e.clientX - window.innerWidth / 2) / 50;
            const moveY = (e.clientY - window.innerHeight / 2) / 50;

            const heroContent = document.querySelector('.hero-content');
            if (heroContent) {
                heroContent.style.transform = `translate(${moveX}px, ${moveY}px)`;
            }
        });
    }

    // Add floating animation to section headers
    const sectionHeaders = document.querySelectorAll('.section-header');
    sectionHeaders.forEach((header, index) => {
        header.style.animation = `fadeIn 1s ease-out ${index * 0.2}s forwards`;
    });

    // Remove preloader after load
    window.addEventListener('load', () => {
        const preloader = document.getElementById('preloader');
        setTimeout(() => {
            preloader.classList.add('fade-out');
            setTimeout(() => {
                preloader.remove(); // Remove from DOM completely
            }, 500); // Wait for transition to finish
        }, 1500); // Show animation for 1.5 seconds
    });

    // Cursor trail effect
    const cursorTrail = [];
    const maxTrailLength = 20;

    // Create trail particles
    function createTrailParticle(x, y) {
        const particle = document.createElement('div');
        particle.className = 'cursor-trail';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';

        // Random color from the website palette
        const colors = ['#00f0ff', '#0055ff', '#00d4ff'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        particle.style.background = randomColor;
        particle.style.boxShadow = `0 0 10px ${randomColor}`;

        document.body.appendChild(particle);
        cursorTrail.push(particle);

        // Remove old particles
        if (cursorTrail.length > maxTrailLength) {
            const oldParticle = cursorTrail.shift();
            oldParticle.remove();
        }

        // Fade out and remove particle
        setTimeout(() => {
            particle.style.opacity = '0';
            particle.style.transform = 'scale(0)';
        }, 10);

        setTimeout(() => {
            particle.remove();
            const index = cursorTrail.indexOf(particle);
            if (index > -1) {
                cursorTrail.splice(index, 1);
            }
        }, 600);
    }

    // Track mouse movement
    let lastX = 0;
    let lastY = 0;
    let throttleTimer = false;

    document.addEventListener('mousemove', (e) => {
        const distance = Math.sqrt(Math.pow(e.clientX - lastX, 2) + Math.pow(e.clientY - lastY, 2));

        // Only create particles if mouse moved enough
        if (distance > 5) {
            if (!throttleTimer) {
                createTrailParticle(e.clientX, e.clientY);
                lastX = e.clientX;
                lastY = e.clientY;

                throttleTimer = true;
                setTimeout(() => {
                    throttleTimer = false;
                }, 30);
            }
        }

        // Update custom cursor position
        updateCursorPosition(e.clientX, e.clientY);
    });

    // Create custom cursor element
    const customCursor = document.createElement('div');
    customCursor.className = 'custom-cursor';
    document.body.appendChild(customCursor);

    function updateCursorPosition(x, y) {
        customCursor.style.left = (x - 10) + 'px';
        customCursor.style.top = (y - 10) + 'px';
    }
});
