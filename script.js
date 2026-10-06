/* ============================================================
   BADULLA KALAGOTLA — PORTFOLIO
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {
    'use strict';

    /* ---------- Mobile Menu ---------- */

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


    /* ---------- Header shadow on scroll ---------- */

    var header = document.getElementById('header');

    function updateHeader() {
        if (!header) return;
        if (window.scrollY > 20) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });


    /* ---------- Active nav link on scroll ---------- */

    var sections = document.querySelectorAll('section[id]');
    var navLinks = document.querySelectorAll('.nav a[href^="#"]');

    function updateActive() {
        var y = window.scrollY + 120;
        var current = '';

        sections.forEach(function (sec) {
            if (y >= sec.offsetTop) current = sec.id;
        });

        navLinks.forEach(function (link) {
            link.classList.toggle(
                'active',
                link.getAttribute('href') === '#' + current
            );
        });
    }

    updateActive();
    window.addEventListener('scroll', updateActive, { passive: true });


    /* ---------- Footer year ---------- */

    var yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

});