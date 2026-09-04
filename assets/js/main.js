document.addEventListener('DOMContentLoaded', function () {

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

            var bg = slides[current].querySelector('.hero-slide-bg');
            if (bg) {
                bg.style.animation = 'none';
            }

            current = index;

            slides[current].classList.add('is-active');
            if (dots[current]) dots[current].classList.add('is-active');

            var newBg = slides[current].querySelector('.hero-slide-bg');
            if (newBg) {
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
        if (window.innerWidth <= 900) return;
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

            const target = parseInt(counter.dataset.count, 10);

            if (isNaN(target)) {
                return;
            }

            const hasPlus = counter.dataset.plus === 'true';

            const duration = 1800;
            const start = performance.now();

            counter.textContent = '0';

            function update(currentTime) {

                const elapsed = currentTime - start;
                const progress = Math.min(elapsed / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                const current = Math.floor(target * eased);

                counter.textContent =
                    current.toLocaleString('en-IN') + (hasPlus ? '+' : '');

                if (progress < 1) {
                    requestAnimationFrame(update);
                } else {
                    counter.textContent =
                        target.toLocaleString('en-IN') + (hasPlus ? '+' : '');
                }
            }

            requestAnimationFrame(update);
        });
    }

    document.addEventListener('DOMContentLoaded', function () {

        const section = document.querySelector('.impact-stats-section');

        if (!section) {
            return;
        }

        const observer = new IntersectionObserver(
            function (entries, observer) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        startImpactCounters();
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.25 }
        );

        observer.observe(section);
    });

})();