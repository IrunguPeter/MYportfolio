// ===== CONFIG =====
const CONFIG = {
    web3FormsKey: '691b935c-2b39-41cd-9894-2b117f8b9ff4',
    sheetUrl: 'YOUR_APP_SCRIPT_URL' // Google Apps Script web app URL (orders storage)
};

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

    /* ===== Rotating Word (CTA) ===== */
    const rotateWord = document.querySelector('.rotate-word');
    if (rotateWord) {
        const words = ['Restaurant', 'Therapist', 'Speaker', 'Blogger', 'Shop owner', 'Store', 'Salon'];
        let wordIndex = 0;
        setInterval(() => {
            wordIndex = (wordIndex + 1) % words.length;
            rotateWord.classList.add('is-leaving');
            setTimeout(() => {
                rotateWord.textContent = words[wordIndex];
                rotateWord.classList.remove('is-leaving');
                rotateWord.classList.add('is-entering');
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        rotateWord.classList.add('in');
                    });
                });
                setTimeout(() => {
                    rotateWord.classList.remove('is-entering', 'in');
                }, 400);
            }, 400);
        }, 3000);
    }

    /* ===== Optimized Scroll Handler ===== */
    const navbar = document.getElementById('navbar');
    const topBtn = document.getElementById('scrollTop');
    const sections = document.querySelectorAll('section[id]');
    const navLinksList = document.querySelectorAll('.nav-link');

    let isScrolling = false;

    function handleScroll() {
        const scrollY = window.scrollY;

        // Navbar Effect
        navbar.classList.toggle('scrolled', scrollY > 50);

        // Scroll Progress Bar Fallback
        const progressEl = document.getElementById('scrollProgress');
        if (progressEl && !CSS.supports('animation-timeline', 'scroll()')) {
            const scrollable = document.documentElement.scrollHeight - window.innerHeight;
            if (scrollable > 0) {
                const percent = scrollY / scrollable;
                progressEl.style.transform = `scaleX(${percent})`;
            }
        }

        // Scroll Spy
        let currentId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollY >= sectionTop - 150) {
                currentId = section.getAttribute('id');
            }
        });

        navLinksList.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentId}`) {
                link.classList.add('active');
            }
        });

        // Top Button & Counters
        topBtn.classList.toggle('visible', scrollY > 400);
        animateCounters();
    }

    window.addEventListener('scroll', () => {
        if (!isScrolling) {
            window.requestAnimationFrame(() => {
                handleScroll();
                isScrolling = false;
            });
            isScrolling = true;
        }
    }, { passive: true });

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
                    } else {
                        c.textContent = target + '+';
                    }
                }
                tick();
            });
        }
    }

    /* ===== Scroll-to-Top Click ===== */
    topBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    animateCounters();

    /* ===== Form Validation ===== */
    const form = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const btnText = document.getElementById('btnText');
    const success = document.getElementById('successMsg');

    /* ===== Service Selection (remember what they chose) ===== */
    let selectedService = '';

    document.querySelectorAll('.btn-service').forEach(btn => {
        btn.addEventListener('click', () => {
            selectedService = btn.dataset.service || '';
            const subjectField = document.getElementById('subject');
            if (subjectField && selectedService && !subjectField.value.trim()) {
                subjectField.value = 'Quote: ' + selectedService;
            }
        });
    });

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

        const payload = {
            name: name.value.trim(),
            email: email.value.trim(),
            subject: subject.value.trim(),
            message: message.value.trim(),
            service: selectedService || 'Not specified'
        };

        // Store order to Google Sheet (fire-and-forget so emails still work)
        if (CONFIG.sheetUrl.indexOf('YOUR_APP_SCRIPT_URL') !== 0) {
            fetch(CONFIG.sheetUrl, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                body: JSON.stringify(payload)
            }).catch(() => {});
        }

        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                access_key: CONFIG.web3FormsKey,
                ...payload
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