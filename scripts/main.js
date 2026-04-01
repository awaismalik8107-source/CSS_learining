// Peak & Pulse - Main JavaScript

// DOM Ready
(function() {
  'use strict';

  // Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', function() {
      navLinks.classList.toggle('active');
      this.classList.toggle('active');
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
      });
    });
  }

  // Navbar scroll effect
  const navbar = document.getElementById('navbar');
  let lastScrollY = window.scrollY;

  function handleScroll() {
    const currentScrollY = window.scrollY;

    if (currentScrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    lastScrollY = currentScrollY;
  }

  window.addEventListener('scroll', handleScroll, { passive: true });

  // Testimonial Slider
  const testimonialTrack = document.getElementById('testimonialTrack');
  const prevBtn = document.getElementById('prevTestimonial');
  const nextBtn = document.getElementById('nextTestimonial');

  if (testimonialTrack && prevBtn && nextBtn) {
    let currentSlide = 0;
    const slides = testimonialTrack.children;
    const totalSlides = slides.length;

    function updateSlider() {
      testimonialTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
    }

    prevBtn.addEventListener('click', function() {
      currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
      updateSlider();
    });

    nextBtn.addEventListener('click', function() {
      currentSlide = (currentSlide + 1) % totalSlides;
      updateSlider();
    });

    // Auto-advance slides
    setInterval(() => {
      currentSlide = (currentSlide + 1) % totalSlides;
      updateSlider();
    }, 6000);
  }

  // Gear Concierge Widget
  const conciergeTrigger = document.getElementById('conciergeTrigger');
  const conciergePopup = document.getElementById('conciergePopup');
  const conciergeClose = document.getElementById('conciergeClose');

  if (conciergeTrigger && conciergePopup) {
    conciergeTrigger.addEventListener('click', function() {
      conciergePopup.classList.toggle('active');
    });

    if (conciergeClose) {
      conciergeClose.addEventListener('click', function() {
        conciergePopup.classList.remove('active');
      });
    }

    // Close on outside click
    document.addEventListener('click', function(e) {
      if (!conciergeTrigger.contains(e.target) && !conciergePopup.contains(e.target)) {
        conciergePopup.classList.remove('active');
      }
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Intersection Observer for fade-in animations
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const fadeInObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe elements for fade-in
  document.querySelectorAll('.trip-card, .feature-item, .insta-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeInObserver.observe(el);
  });

  // Newsletter form submission
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const email = this.querySelector('input[type="email"]').value;

      // Simulate submission
      const btn = this.querySelector('button');
      const originalText = btn.textContent;
      btn.textContent = 'Subscribed!';
      btn.disabled = true;

      setTimeout(() => {
        btn.textContent = originalText;
        btn.disabled = false;
        this.reset();
      }, 2000);
    });
  }

  // Trip finder form (placeholder functionality)
  const tripFinderForm = document.querySelector('.trip-finder-bar');
  if (tripFinderForm) {
    const findBtn = tripFinderForm.querySelector('.finder-btn');
    if (findBtn) {
      findBtn.addEventListener('click', function() {
        window.location.href = 'packages.html';
      });
    }
  }

  // Preload images for smoother experience
  const imagesToPreload = [
    'https://images.unsplash.com/photo-1506905924426-5a12b3cfc5a0?w=800&q=80',
    'https://images.unsplash.com/photo-1476610182048-b716b8518aae?w=800&q=80',
    'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80'
  ];

  imagesToPreload.forEach(src => {
    const img = new Image();
    img.src = src;
  });

})();
