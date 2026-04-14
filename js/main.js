/**
 * Eye Clinic — Main JavaScript
 * Handles: navigation, scroll animations, form validation, dropdown menus
 */

document.addEventListener('DOMContentLoaded', () => {

    // ─── Hamburger Menu ──────────────────────────────────────────
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('mobile-open');
            document.body.classList.toggle('menu-open');
        });

        // Close menu when a link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('mobile-open');
                document.body.classList.remove('menu-open');
            });
        });
    }

    // ─── Sticky Header Shadow on Scroll ──────────────────────────
    const header = document.getElementById('main-header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // ─── Scroll Reveal Animations ────────────────────────────────
    const revealElements = document.querySelectorAll('.reveal');

    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach(el => revealObserver.observe(el));
    }

    // ─── Dropdown Menu (Desktop hover, Mobile click) ─────────────
    const dropdowns = document.querySelectorAll('.nav-dropdown');

    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('a');
        const menu = dropdown.querySelector('.dropdown-menu');

        // For touch devices — toggle on click
        if (link && menu) {
            link.addEventListener('click', (e) => {
                if (window.innerWidth <= 992) {
                    e.preventDefault();
                    dropdown.classList.toggle('open');
                }
            });
        }
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-dropdown')) {
            dropdowns.forEach(d => d.classList.remove('open'));
        }
    });

    // ─── Contact Form Validation ─────────────────────────────────
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const firstName = document.getElementById('first-name');
            const lastName = document.getElementById('last-name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');

            let isValid = true;

            // Clear previous errors
            contactForm.querySelectorAll('.form-error').forEach(el => el.remove());
            contactForm.querySelectorAll('.input-error').forEach(el => el.classList.remove('input-error'));

            // Validate fields
            if (!firstName.value.trim()) {
                showError(firstName, 'Please enter your first name');
                isValid = false;
            }

            if (!lastName.value.trim()) {
                showError(lastName, 'Please enter your last name');
                isValid = false;
            }

            if (!email.value.trim() || !isValidEmail(email.value)) {
                showError(email, 'Please enter a valid email address');
                isValid = false;
            }

            if (!message.value.trim()) {
                showError(message, 'Please enter a message');
                isValid = false;
            }

            if (isValid) {
                // Show success message
                const successMsg = document.createElement('div');
                successMsg.className = 'form-success';
                successMsg.innerHTML = '<i class="fas fa-check-circle"></i> Thank you! Your message has been sent successfully.';
                contactForm.appendChild(successMsg);
                contactForm.reset();

                // Remove success after 5s
                setTimeout(() => {
                    successMsg.classList.add('fade-out');
                    setTimeout(() => successMsg.remove(), 500);
                }, 5000);
            }
        });
    }

    function showError(input, message) {
        input.classList.add('input-error');
        const error = document.createElement('div');
        error.className = 'form-error';
        error.textContent = message;
        input.parentNode.appendChild(error);
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // ─── Smooth scroll for anchor links ──────────────────────────
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ─── Counter Animation for Stats ─────────────────────────────
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                updateCounter();
                observer.unobserve(counter);
            }
        });
        observer.observe(counter);
    });

});
