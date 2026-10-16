/* ============================================================
   BADULLA KALAGOTLA — CINEMATIC PORTFOLIO SCRIPT
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {
    'use strict';

    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ============================================================
       1. CINEMATIC PRELOADER
       ============================================================ */

    var preloader = document.getElementById('preloader');
    var barFill = document.getElementById('plBarFill');
    var countEl = document.getElementById('plCount');

    document.body.classList.add('locked');

    if (prefersReducedMotion) {
        preloader.classList.add('hidden');
        document.body.classList.remove('locked');
    } else {
        var progress = 0;
        var loadInterval = setInterval(function () {
            progress += Math.random() * 18 + 6;
            if (progress >= 100) {
                progress = 100;
                clearInterval(loadInterval);

                setTimeout(function () {
                    preloader.classList.add('exit');
                    document.body.classList.remove('locked');

                    setTimeout(function () {
                        preloader.classList.add('hidden');
                    }, 950);
                }, 500);
            }
            barFill.style.width = progress + '%';
            countEl.textContent = Math.floor(progress) + '%';
        }, 160);
    }


    /* ============================================================
       2. MOBILE MENU
       ============================================================ */

    var menuBtn = document.querySelector('.menu-btn');
    var nav = document.getElementById('nav');

    if (menuBtn && nav) {
        menuBtn.addEventListener('click', function () {
            nav.classList.toggle('open');
            menuBtn.classList.toggle('open');
            menuBtn.setAttribute('aria-expanded', nav.classList.contains('open'));
        });

        nav.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                nav.classList.remove('open');
                menuBtn.classList.remove('open');
                menuBtn.setAttribute('aria-expanded', 'false');
            });
        });

        document.addEventListener('click', function (e) {
            if (!nav.contains(e.target) && !menuBtn.contains(e.target)) {
                nav.classList.remove('open');
                menuBtn.classList.remove('open');
                menuBtn.setAttribute('aria-expanded', 'false');
            }
        });
    }


    /* ============================================================
       3. HEADER SCROLL STATE
       ============================================================ */

    var header = document.getElementById('header');
    function updateHeader() {
        if (!header) return;
        header.classList.toggle('scrolled', window.scrollY > 20);
    }
    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });


    /* ============================================================
       4. ACTIVE NAV LINK
       ============================================================ */

    var sections = document.querySelectorAll('section[id]');
    var navLinks = document.querySelectorAll('.nav a[href^="#"]');

    function updateActive() {
        var y = window.scrollY + 120;
        var current = '';
        sections.forEach(function (sec) {
            if (y >= sec.offsetTop) current = sec.id;
        });
        navLinks.forEach(function (link) {
            link.classList.toggle('active', link.getAttribute('href') === '#' + current);
        });
    }
    updateActive();
    window.addEventListener('scroll', updateActive, { passive: true });


    /* ============================================================
       5. FOOTER YEAR
       ============================================================ */

    var yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();


    if (prefersReducedMotion) return;


    /* ============================================================
       6. SCROLL PROGRESS BAR
       ============================================================ */

    var progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', function () {
        var scrollTop = window.scrollY;
        var docHeight = document.documentElement.scrollHeight - window.innerHeight;
        var scrolled = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        progressBar.style.width = scrolled + '%';
    }, { passive: true });


    /* ============================================================
       7. FLOATING BACKGROUND ORBS
       ============================================================ */

    var orbsContainer = document.createElement('div');
    orbsContainer.className = 'bg-orbs';
    orbsContainer.innerHTML = '<div class="orb orb-1"></div><div class="orb orb-2"></div><div class="orb orb-3"></div>';
    document.body.appendChild(orbsContainer);


    /* ============================================================
       8. SCROLL REVEAL OBSERVER
       ============================================================ */

    var revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

    document.querySelectorAll('[data-reveal], [data-stagger]').forEach(function (el) {
        revealObserver.observe(el);
    });


    /* ============================================================
       9. PROJECT VISUAL (ARCH DIAGRAM) ANIMATION
       ============================================================ */

    var archObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, { threshold: 0.3 });

    document.querySelectorAll('.project-visual').forEach(function (el) {
        archObserver.observe(el);
    });


    /* ============================================================
       10. MAGNETIC BUTTON EFFECT
       ============================================================ */

    document.querySelectorAll('.btn, .hero-socials a, .footer-socials a').forEach(function (el) {
        el.addEventListener('mousemove', function (e) {
            var rect = el.getBoundingClientRect();
            var x = e.clientX - rect.left - rect.width / 2;
            var y = e.clientY - rect.top - rect.height / 2;
            el.style.transform = 'translate(' + (x * 0.25) + 'px, ' + (y * 0.25) + 'px)';
        });
        el.addEventListener('mouseleave', function () {
            el.style.transform = 'translate(0, 0)';
        });
    });


    /* ============================================================
       11. 3D CARD TILT
       ============================================================ */

    document.querySelectorAll('.skill-card, .mini-project, .learn-card, .contact-card, .about-card').forEach(function (card) {
        card.addEventListener('mousemove', function (e) {
            var rect = card.getBoundingClientRect();
            var x = e.clientX - rect.left;
            var y = e.clientY - rect.top;
            var rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -6;
            var rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 6;
            card.style.transform = 'perspective(1000px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) translateY(-4px)';
        });
        card.addEventListener('mouseleave', function () {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });


    /* ============================================================
       12. HERO IMAGE PARALLAX
       ============================================================ */

    var heroImage = document.querySelector('.hero-image img');
    var heroSection = document.querySelector('.hero');

    if (heroImage && heroSection) {
        heroSection.addEventListener('mousemove', function (e) {
            var x = (e.clientX / window.innerWidth - 0.5) * 20;
            var y = (e.clientY / window.innerHeight - 0.5) * 20;
            heroImage.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
        });
        heroSection.addEventListener('mouseleave', function () {
            heroImage.style.transform = 'translate(0, 0)';
        });
    }


    /* ============================================================
       13. CUSTOM CURSOR (Desktop only)
       ============================================================ */

    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches && window.innerWidth > 1024) {
        var cursorDot = document.createElement('div');
        var cursorOutline = document.createElement('div');
        cursorDot.className = 'cursor-dot';
        cursorOutline.className = 'cursor-outline';
        document.body.appendChild(cursorDot);
        document.body.appendChild(cursorOutline);

        var mouseX = 0, mouseY = 0, outlineX = 0, outlineY = 0;

        document.addEventListener('mousemove', function (e) {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursorDot.style.left = mouseX + 'px';
            cursorDot.style.top = mouseY + 'px';
            cursorDot.classList.add('visible');
            cursorOutline.classList.add('visible');
        });

        document.addEventListener('mouseleave', function () {
            cursorDot.classList.remove('visible');
            cursorOutline.classList.remove('visible');
        });

        function animateOutline() {
            outlineX += (mouseX - outlineX) * 0.15;
            outlineY += (mouseY - outlineY) * 0.15;
            cursorOutline.style.left = outlineX + 'px';
            cursorOutline.style.top = outlineY + 'px';
            requestAnimationFrame(animateOutline);
        }
        animateOutline();

        document.querySelectorAll('a, button, .skill-card, .mini-project, .learn-card, .contact-card, .project-card').forEach(function (el) {
            el.addEventListener('mouseenter', function () {
                cursorDot.classList.add('hover');
                cursorOutline.classList.add('hover');
            });
            el.addEventListener('mouseleave', function () {
                cursorDot.classList.remove('hover');
                cursorOutline.classList.remove('hover');
            });
        });
    }


    /* ============================================================
       14. SMOOTH SCROLL WITH EASING
       ============================================================ */

    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var targetId = this.getAttribute('href');
            if (targetId === '#' || targetId.length < 2) return;

            var target = document.querySelector(targetId);
            if (!target) return;

            e.preventDefault();

            var offset = 90;
            var targetPos = target.getBoundingClientRect().top + window.scrollY - offset;
            var startPos = window.scrollY;
            var distance = targetPos - startPos;
            var duration = 900;
            var startTime = null;

            function easeOutExpo(t) {
                return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
            }

            function animation(currentTime) {
                if (startTime === null) startTime = currentTime;
                var timeElapsed = currentTime - startTime;
                var progress = Math.min(timeElapsed / duration, 1);
                window.scrollTo(0, startPos + distance * easeOutExpo(progress));
                if (timeElapsed < duration) requestAnimationFrame(animation);
            }

            requestAnimationFrame(animation);
        });
    });

});