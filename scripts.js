// Simple client-side validation for the contact form
document.addEventListener('DOMContentLoaded', function () {
  var form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = form.name.value.trim();
      var email = form.email.value.trim();
      var message = form.message.value.trim();
      var status = document.getElementById('formStatus');

      if (!name || !email || !message) {
        status.textContent = 'Please fill out all required fields.';
        return;
      }

      // Basic email check
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
        status.textContent = 'Please enter a valid email address.';
        return;
      }

      // Placeholder: here you would send the data to your server or an email service
      status.textContent = 'Sending…';

      // Simulate success
      setTimeout(function () {
        status.textContent = 'Message sent. Thank you!';
        form.reset();
      }, 700);
    });
  }

  // Scrollspy + smooth scrolling when using the internal scroll container
  var container = document.getElementById('scrollContainer') || document.scrollingElement || document.documentElement;
  var navLinks = Array.from(document.querySelectorAll('.nav-link'));
  var sections = navLinks.map(function (lnk) {
    var id = lnk.getAttribute('href') || lnk.getAttribute('data-target');
    if (!id) return null;
    return document.querySelector(id);
  }).filter(Boolean);

  // Smooth scrolling for nav links (target the scroll container)
  navLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      var href = link.getAttribute('href');
      if (!href || href.charAt(0) !== '#') return;
      var target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      if (container && container.scrollTo) {
        var top = target.offsetTop - (document.querySelector('.site-header')?.offsetHeight || 0);
        container.scrollTo({top: top, behavior: 'smooth'});
      } else {
        target.scrollIntoView({behavior: 'smooth', block: 'start'});
      }
    });
  });

  // Use IntersectionObserver on sections within the scroll container to update active nav link
  if (sections.length && 'IntersectionObserver' in window) {
    var options = {
      root: container === document.scrollingElement || container === document.documentElement ? null : container,
      rootMargin: '0px',
      threshold: 0.5
    };

    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var id = entry.target.id;
        var link = document.querySelector('.nav-link[href="#' + id + '"]');
        if (entry.isIntersecting) {
          navLinks.forEach(function (l) { l.classList.remove('active'); });
          if (link) link.classList.add('active');
        }
      });
    }, options);

    sections.forEach(function (sec) { obs.observe(sec); });
  }
});
