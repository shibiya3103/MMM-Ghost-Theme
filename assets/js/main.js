document.addEventListener('DOMContentLoaded', function () {

    /* ---------- Mobile menu ---------- */
    var toggle = document.getElementById('menuToggle');
    var mobileNav = document.getElementById('mobileNav');
    var closeBtn = document.getElementById('mobileNavClose');

    if (toggle && mobileNav) {
        toggle.addEventListener('click', function () {
            mobileNav.classList.add('is-open');
            mobileNav.setAttribute('aria-hidden', 'false');
            toggle.setAttribute('aria-expanded', 'true');
        });
    }
    if (closeBtn && mobileNav) {
        closeBtn.addEventListener('click', function () {
            mobileNav.classList.remove('is-open');
            mobileNav.setAttribute('aria-hidden', 'true');
            if (toggle) toggle.setAttribute('aria-expanded', 'false');
        });
    }

    /* ---------- Hero slider (auto-advance + dots + arrows) ---------- */
    var slider = document.getElementById('heroSlider');
    if (slider) {
        var slides = slider.querySelectorAll('.hero-slide');
        var dots = slider.querySelectorAll('.hero-dot');
        var prevBtn = document.getElementById('heroPrev');
        var nextBtn = document.getElementById('heroNext');
        var current = 0;
        var timer = null;
        var AUTOPLAY_MS = 6000;

        function setActive(index) {
            slides[current].classList.remove('is-active');
            if (dots[current]) dots[current].classList.remove('is-active');

            // restart the zoom animation on the new slide by forcing reflow
            var bg = slides[current].querySelector('.hero-slide-bg');
            if (bg) {
                bg.style.animation = 'none';
            }

            current = index;

            slides[current].classList.add('is-active');
            if (dots[current]) dots[current].classList.add('is-active');

            var newBg = slides[current].querySelector('.hero-slide-bg');
            if (newBg) {
                // force reflow so the animation restarts every time this slide becomes active
                void newBg.offsetWidth;
                newBg.style.animation = '';
            }
        }

        function goToSlide(index) {
            var next = (index + slides.length) % slides.length;
            if (next === current) return;
            setActive(next);
            restartAutoplay();
        }

        function nextSlide() { goToSlide(current + 1); }
        function prevSlide() { goToSlide(current - 1); }

        function restartAutoplay() {
            if (timer) clearInterval(timer);
            if (slides.length > 1) {
                timer = setInterval(nextSlide, AUTOPLAY_MS);
            }
        }

        if (slides.length > 1) {
            dots.forEach(function (dot) {
                dot.addEventListener('click', function () {
                    goToSlide(parseInt(dot.getAttribute('data-slide-index'), 10));
                });
            });
            if (nextBtn) nextBtn.addEventListener('click', nextSlide);
            if (prevBtn) prevBtn.addEventListener('click', prevSlide);

            restartAutoplay();
        }
    }

    /* ---------- Team tabs (Board / Staff) ---------- */
    var tabs = document.querySelectorAll('.team-tab');
    if (tabs.length) {
        tabs.forEach(function (tab) {
            tab.addEventListener('click', function () {
                tabs.forEach(function (t) { t.classList.remove('is-active'); });
                tab.classList.add('is-active');

                var targetId = tab.getAttribute('data-target');
                document.querySelectorAll('#team-board, #team-staff').forEach(function (panel) {
                    panel.style.display = (panel.id === targetId) ? '' : 'none';
                });
            });
        });
    }

    /* ---------- Contact form (client-side success note) ---------- */
    var form = document.getElementById('contactForm');
    var note = document.getElementById('cfNote');
    if (form && note) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            // NOTE: this only shows a success message locally.
            // To actually receive submissions, connect this form to a
            // backend endpoint (e.g. Formspree, a webhook, or your own API)
            // and send the form data there before showing the note.
            note.hidden = false;
            form.reset();
        });
    }

});

// Scrolled state on header
const siteHeader = document.querySelector('.site-header');
if (siteHeader) {
    const onScroll = () => {
        siteHeader.classList.toggle('scrolled', window.scrollY > 10);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
}

// Desktop dropdown: click toggle (in addition to CSS hover)
document.querySelectorAll('.nav-build .has-sub > a').forEach((link) => {
    link.addEventListener('click', function (e) {
        if (window.innerWidth <= 900) return; // handled by drawer on mobile
        const parent = link.closest('.has-sub');
        const isOpen = parent.classList.contains('js-open');
        document.querySelectorAll('.nav-build .has-sub.js-open').forEach((el) => {
            el.classList.remove('js-open');
        });
        if (!isOpen) {
            e.preventDefault();
            parent.classList.add('js-open');
        }
    });
});

document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-build .has-sub')) {
        document.querySelectorAll('.nav-build .has-sub.js-open').forEach((el) => {
            el.classList.remove('js-open');
        });
    }
});

// Mobile drawer open/close
const navToggle = document.getElementById('navToggle');
const drawer = document.getElementById('mobileDrawer');
const drawerClose = document.getElementById('drawerClose');

function openDrawer() {
    drawer.classList.add('open');
    navToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
}
function closeDrawer() {
    drawer.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
}

if (navToggle && drawer) {
    navToggle.addEventListener('click', openDrawer);
}
if (drawerClose) {
    drawerClose.addEventListener('click', closeDrawer);
}
if (drawer) {
    drawer.addEventListener('click', (e) => {
        if (e.target === drawer) closeDrawer();
    });
}

// Mobile submenu accordion inside drawer
document.querySelectorAll('.mobile-drawer .has-sub > a').forEach((link) => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        link.closest('.has-sub').classList.toggle('open');
    });
});
document.addEventListener('DOMContentLoaded', function () {
    var aboutSplit = document.querySelector('.about-split');
    if (aboutSplit) {
        var contentBox = aboutSplit.querySelector('.about-content');
        var firstImg = contentBox ? contentBox.querySelector('img') : null;
        if (firstImg) {
            var mediaDiv = document.createElement('div');
            mediaDiv.className = 'about-split-media';
            var wrapper = firstImg.closest('figure, p') || firstImg;
            mediaDiv.appendChild(wrapper);
            aboutSplit.insertBefore(mediaDiv, aboutSplit.firstChild);
        }
    }
});
/* =========================================================
   IMPACT PAGE — ANIMATED STAT NUMBERS
   ========================================================= */

(function () {

    function startImpactCounters() {

        const counters = document.querySelectorAll('.impact-num');

        if (!counters.length) {
            return;
        }

        counters.forEach(function (counter) {

            const target = parseInt(
                counter.dataset.count,
                10
            );

            if (isNaN(target)) {
                return;
            }

            const hasPlus =
                counter.dataset.plus === 'true';

            const duration = 1800;
            const start = performance.now();

            counter.textContent = '0';

            function update(currentTime) {

                const elapsed = currentTime - start;

                const progress = Math.min(
                    elapsed / duration,
                    1
                );

                /*
                 * Smooth ease-out animation
                 */
                const eased =
                    1 - Math.pow(1 - progress, 3);

                const current = Math.floor(
                    target * eased
                );

                counter.textContent =
                    current.toLocaleString('en-IN') +
                    (hasPlus ? '+' : '');

                if (progress < 1) {

                    requestAnimationFrame(update);

                } else {

                    counter.textContent =
                        target.toLocaleString('en-IN') +
                        (hasPlus ? '+' : '');

                }
            }

            requestAnimationFrame(update);
        });
    }


    /*
     * Start when the page loads
     */
    document.addEventListener(
        'DOMContentLoaded',
        function () {

            const section =
                document.querySelector('.impact-stats-section');

            if (!section) {
                return;
            }

            /*
             * Start when stats enter the screen
             */
            const observer =
                new IntersectionObserver(
                    function (entries, observer) {

                        entries.forEach(function (entry) {

                            if (entry.isIntersecting) {

                                startImpactCounters();

                                observer.unobserve(
                                    entry.target
                                );

                            }

                        });

                    },
                    {
                        threshold: 0.25
                    }
                );

            observer.observe(section);

        }
    );

})();