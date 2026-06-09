document.addEventListener('DOMContentLoaded', () => {

    /* ===== Theme Toggle ===== */
    const themeBtn = document.getElementById('themeToggle');
    const icon = themeBtn.querySelector('i');
    const saved = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', saved);
    icon.className = saved === 'dark' ? 'fas fa-sun' : 'fas fa-moon';

    themeBtn.addEventListener('click', () => {
        const cur = document.documentElement.getAttribute('data-theme');
        const next = cur === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
        icon.className = next === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    });

    /* ===== Mobile Menu ===== */
    const menuBtn = document.getElementById('menuBtn');
    const navLinks = document.getElementById('navLinks');

    menuBtn.addEventListener('click', () => {
        menuBtn.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            menuBtn.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    /* ===== Navbar Scroll Effect ===== */
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });

    /* ===== Scroll Spy ===== */
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.scrollY + 100;
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            if (scrollY >= top && scrollY < top + height) {
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                const match = document.querySelector(`.nav-link[href="#${id}"]`);
                if (match) match.classList.add('active');
            }
        });
    });

    /* ===== Scroll Reveal (Intersection Observer) ===== */
    const revealElements = document.querySelectorAll('[data-reveal]');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const delay = parseInt(el.getAttribute('data-reveal-delay')) || 0;
                setTimeout(() => {
                    el.classList.add('revealed');
                }, delay);
                revealObserver.unobserve(el);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    /* ===== Hero Parallax ===== */
    const heroBg = document.getElementById('heroBg');

    window.addEventListener('scroll', () => {
        if (!heroBg) return;
        const scrollY = window.scrollY;
        const hero = document.querySelector('.hero');
        if (!hero) return;
        const heroHeight = hero.offsetHeight;
        if (scrollY < heroHeight) {
            const translateY = scrollY * 0.4;
            heroBg.style.transform = `translateY(${translateY}px) scale(1.05)`;
        }
    });

    /* ===== Counter Animation ===== */
    const counters = document.querySelectorAll('.stat-num');
    let counted = false;

    function animateCounters() {
        if (counted) return;
        const about = document.querySelector('.about');
        if (!about) return;
        const rect = about.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            counted = true;
            counters.forEach(c => {
                const target = parseInt(c.getAttribute('data-target'));
                let cur = 0;
                const step = Math.ceil(target / 40);
                function tick() {
                    if (cur < target) {
                        cur = Math.min(cur + step, target);
                        c.textContent = cur + '+';
                        requestAnimationFrame(tick);
                    }
                }
                tick();
            });
        }
    }

    /* ===== Scroll-to-Top ===== */
    const topBtn = document.getElementById('scrollTop');
    window.addEventListener('scroll', () => {
        topBtn.classList.toggle('visible', window.scrollY > 400);
        animateCounters();
    });

    topBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    animateCounters();

    /* ===== Form Validation ===== */
    const form = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const btnText = document.getElementById('btnText');
    const btnIcon = document.getElementById('btnIcon');
    const success = document.getElementById('successMsg');

    function isValidEmail(v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
    }

    function showError(input) {
        input.closest('.form-group').classList.add('error');
    }

    function clearError(input) {
        input.closest('.form-group').classList.remove('error');
    }

    function validate(name, email, subject, message) {
        let ok = true;
        document.querySelectorAll('.form-group').forEach(g => g.classList.remove('error'));
        if (!name.value.trim()) { showError(name); ok = false; }
        if (!email.value.trim() || !isValidEmail(email.value.trim())) { showError(email); ok = false; }
        if (!subject.value.trim()) { showError(subject); ok = false; }
        if (!message.value.trim()) { showError(message); ok = false; }
        return ok;
    }

    form.addEventListener('submit', e => {
        e.preventDefault();
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const subject = document.getElementById('subject');
        const message = document.getElementById('message');

        if (!validate(name, email, subject, message)) return;

        submitBtn.classList.add('loading');
        btnText.textContent = 'Sending...';

        fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: name.value.trim(),
                email: email.value.trim(),
                subject: subject.value.trim(),
                message: message.value.trim()
            })
        })
        .then(res => res.json())
        .then(data => {
            submitBtn.classList.remove('loading');
            btnText.textContent = 'Send message';
            if (data.success) {
                form.reset();
                form.style.display = 'none';
                success.classList.add('show');
            } else {
                alert('Something went wrong. Please try again.');
            }
        })
        .catch(() => {
            submitBtn.classList.remove('loading');
            btnText.textContent = 'Send message';
            alert('Network error. Please try again.');
        });
    });

    document.querySelectorAll('.form-group input, .form-group textarea').forEach(el => {
        el.addEventListener('input', function() {
            if (this.value.trim()) clearError(this);
        });
    });

    /* ===== Carousel ===== */
    const track = document.getElementById('carouselTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dotsContainer = document.getElementById('carouselDots');
    const cards = track.querySelectorAll('.work-card');
    let currentIndex = 0;

    cards.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    });

    function goToSlide(index) {
        currentIndex = index;
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        dotsContainer.querySelectorAll('button').forEach((d, i) => {
            d.classList.toggle('active', i === currentIndex);
        });
    }

    prevBtn.addEventListener('click', () => {
        currentIndex = currentIndex > 0 ? currentIndex - 1 : cards.length - 1;
        goToSlide(currentIndex);
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = currentIndex < cards.length - 1 ? currentIndex + 1 : 0;
        goToSlide(currentIndex);
    });

    document.addEventListener('keydown', e => {
        if (e.key === 'ArrowLeft') prevBtn.click();
        if (e.key === 'ArrowRight') nextBtn.click();
    });

    /* ===== Touch Swipe for Carousel ===== */
    let startX = 0;
    let isDragging = false;

    track.addEventListener('touchstart', e => {
        startX = e.touches[0].clientX;
        isDragging = true;
    }, { passive: true });

    track.addEventListener('touchend', e => {
        if (!isDragging) return;
        const endX = e.changedTouches[0].clientX;
        const diff = startX - endX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) nextBtn.click();
            else prevBtn.click();
        }
        isDragging = false;
    }, { passive: true });

    /* ===== Smooth anchor scrolling ===== */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

});
