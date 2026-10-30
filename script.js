(function () {
  // Reveal sections as they scroll into view
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
      });
    }, { threshold: 0.05 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('visible'); });
  }

  // Highlight the current section in the nav
  var links = document.querySelectorAll('.nav a');
  var map = {};
  links.forEach(function (a) { map[a.getAttribute('href').slice(1)] = a; });
  if ('IntersectionObserver' in window) {
    var so = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting && map[e.target.id]) {
          links.forEach(function (l) { l.classList.remove('active'); });
          map[e.target.id].classList.add('active');
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    Object.keys(map).forEach(function (id) {
      var s = document.getElementById(id); if (s) so.observe(s);
    });
  }

  // Click-to-zoom lightbox for drawings and photos
  var box = document.getElementById('lightbox');
  var boxImg = box.querySelector('img');
  function close() { box.hidden = true; boxImg.src = ''; document.body.style.overflow = ''; }
  document.querySelectorAll('.figure:not(.lowres) img').forEach(function (img) {
    img.addEventListener('click', function () {
      boxImg.src = img.src; boxImg.alt = img.alt;
      box.hidden = false; document.body.style.overflow = 'hidden';
    });
  });
  box.addEventListener('click', close);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !box.hidden) close(); });
})();
