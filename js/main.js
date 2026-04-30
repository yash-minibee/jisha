// Mobile Navigation Toggle
const mobileToggle = document.getElementById('mobileToggle');
const nav = document.getElementById('nav');

if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
        mobileToggle.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-list a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        mobileToggle.classList.remove('active');
    });
});

// Enhanced Sticky Header with Glassmorphism
const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.background = 'rgba(248, 250, 250, 0.95)';
        header.style.boxShadow = '0 8px 32px rgba(51, 198, 198, 0.15)';
    } else {
        header.style.background = 'rgba(248, 250, 250, 0.8)';
        header.style.boxShadow = '0 4px 30px rgba(51, 198, 198, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Enhanced Scroll Animation Observer with Stagger Effect
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -80px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('active');
            }, index * 100);
        }
    });
}, observerOptions);

// Observe elements for scroll animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.product-card, .feature-card, .industry-card, .testimonial-card, .strength-card, .product-card-large');
    
    animateElements.forEach(el => {
        el.classList.add('scroll-animate');
        observer.observe(el);
    });
    
    // Animate section headers
    const sectionHeaders = document.querySelectorAll('.section-header');
    sectionHeaders.forEach(header => {
        header.classList.add('scroll-animate');
        observer.observe(header);
    });
});

// Contact Form Handling with Enhanced Feedback
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = {
            fullName: document.getElementById('fullName').value,
            phone: document.getElementById('phone').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };
        
        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';
        
        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            // Show success message
            let successMsg = document.querySelector('.success-message');
            if (!successMsg) {
                successMsg = document.createElement('div');
                successMsg.className = 'success-message';
                successMsg.innerHTML = '<strong>✓ Success!</strong> Your message has been sent. We will contact you soon.';
                contactForm.appendChild(successMsg);
            }
            successMsg.classList.add('show');
            
            // Reset form
            contactForm.reset();
            
            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            submitBtn.style.opacity = '1';
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                successMsg.classList.remove('show');
            }, 5000);
        }, 1500);
    });
}

// Lazy Loading Images with Fade Effect
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => imageObserver.observe(img));
}

// Add active class to current page in navigation
const currentLocation = window.location.pathname.split('/').pop() || 'index.html';
const navItems = document.querySelectorAll('.nav-list a');

navItems.forEach(item => {
    const href = item.getAttribute('href');
    if (href === currentLocation) {
        item.classList.add('active');
    } else {
        item.classList.remove('active');
    }
});

// Enhanced Parallax Effect for Hero Section
let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const hero = document.querySelector('.hero');
            if (hero) {
                const scrolled = window.pageYOffset;
                const parallax = scrolled * 0.4;
                hero.style.transform = `translateY(${parallax}px)`;
            }
            ticking = false;
        });
        ticking = true;
    }
});

// Animated Counter for Statistics (if needed)
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = Math.round(target);
            clearInterval(timer);
        } else {
            element.textContent = Math.round(start);
        }
    }, 16);
}

// Mouse Follow Effect for Cards
document.querySelectorAll('.product-card, .feature-card, .testimonial-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// Floating Animation for Background Shapes
const shapes = document.querySelectorAll('.shape');
shapes.forEach((shape, index) => {
    const randomX = Math.random() * 100 - 50;
    const randomY = Math.random() * 100 - 50;
    const randomDelay = Math.random() * 5;
    
    shape.style.animationDelay = `${randomDelay}s`;
});

// Add Glow Effect on Button Hover
document.querySelectorAll('.btn-primary').forEach(btn => {
    btn.addEventListener('mouseenter', function(e) {
        const x = e.offsetX;
        const y = e.offsetY;
        
        const ripple = document.createElement('span');
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.className = 'ripple';
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Console log to confirm script loaded
console.log('🎨 Jisha Polyfilm - Enhanced Creative Website Loaded!');
console.log('✨ Glassmorphism Effects Active');
console.log('🌊 Smooth Animations Enabled');


// ========================================
// Premium Hero Section Enhancements
// ========================================

// Mouse Parallax Effect for Hero
const heroPremium = document.querySelector('.hero-premium');
if (heroPremium) {
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;
    
    heroPremium.addEventListener('mousemove', (e) => {
        const rect = heroPremium.getBoundingClientRect();
        mouseX = (e.clientX - rect.left - rect.width / 2) / rect.width;
        mouseY = (e.clientY - rect.top - rect.height / 2) / rect.height;
    });
    
    function animateParallax() {
        currentX += (mouseX - currentX) * 0.05;
        currentY += (mouseY - currentY) * 0.05;
        
        // Move floating films
        const films = document.querySelectorAll('.floating-film');
        films.forEach((film, index) => {
            const speed = (index + 1) * 10;
            film.style.transform = `translate(${currentX * speed}px, ${currentY * speed}px)`;
        });
        
        // Move glass circles
        const circles = document.querySelectorAll('.glass-circle');
        circles.forEach((circle, index) => {
            const speed = (index + 1) * 5;
            const currentTransform = circle.style.transform || '';
            const rotateMatch = currentTransform.match(/rotate\([^)]+\)/);
            const rotate = rotateMatch ? rotateMatch[0] : '';
            circle.style.transform = `translate(${currentX * speed}px, ${currentY * speed}px) ${rotate}`;
        });
        
        requestAnimationFrame(animateParallax);
    }
    
    animateParallax();
}

// Animated Wave Path
const wavePaths = document.querySelectorAll('.wave-path');
if (wavePaths.length > 0) {
    let waveOffset = 0;
    
    function animateWaves() {
        waveOffset += 0.5;
        
        wavePaths.forEach((path, index) => {
            const offset = waveOffset + (index * 50);
            const y1 = 200 + Math.sin(offset * 0.01) * 30;
            const y2 = 200 + Math.sin((offset + 300) * 0.01) * 30;
            
            const d = `M0,${y1} Q300,${y1 - 50} 600,${y1} T1200,${y1} L1200,600 L0,600 Z`;
            path.setAttribute('d', d);
        });
        
        requestAnimationFrame(animateWaves);
    }
    
    animateWaves();
}

// Hero Stats Counter Animation
const statNumbers = document.querySelectorAll('.stat-number');
if (statNumbers.length > 0) {
    const observerStats = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                const text = entry.target.textContent;
                const number = parseInt(text.replace(/\D/g, ''));
                const suffix = text.replace(/[0-9]/g, '');
                
                if (!isNaN(number)) {
                    animateStatCounter(entry.target, number, suffix, 2000);
                }
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => observerStats.observe(stat));
}

function animateStatCounter(element, target, suffix, duration) {
    let start = 0;
    const increment = target / (duration / 16);
    const startTime = Date.now();
    
    function update() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(easeOutQuart * target);
        
        element.textContent = current + suffix;
        
        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = target + suffix;
        }
    }
    
    update();
}

// Premium Button Ripple Effect Enhancement
document.querySelectorAll('.btn-premium').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const ripple = document.createElement('span');
        ripple.className = 'btn-ripple';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Scroll Indicator Hide on Scroll
const scrollIndicator = document.querySelector('.hero-scroll-indicator');
if (scrollIndicator) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 100) {
            scrollIndicator.style.opacity = '0';
            scrollIndicator.style.pointerEvents = 'none';
        } else {
            scrollIndicator.style.opacity = '1';
            scrollIndicator.style.pointerEvents = 'auto';
        }
    });
}

// Glass Card Tilt Effect
const glassCard = document.querySelector('.hero-glass-card');
if (glassCard) {
    glassCard.addEventListener('mousemove', (e) => {
        const rect = glassCard.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 30;
        const rotateY = (centerX - x) / 30;
        
        glassCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    glassCard.addEventListener('mouseleave', () => {
        glassCard.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
}

// Particle System Enhancement
const particles = document.querySelectorAll('.particle');
particles.forEach((particle, index) => {
    const randomSize = Math.random() * 3 + 2;
    const randomDelay = Math.random() * 20;
    const randomDuration = Math.random() * 10 + 15;
    
    particle.style.width = randomSize + 'px';
    particle.style.height = randomSize + 'px';
    particle.style.animationDelay = `-${randomDelay}s`;
    particle.style.animationDuration = `${randomDuration}s`;
});

// Hero Center Icon Interaction
const centerIcon = document.querySelector('.hero-center-icon');
if (centerIcon) {
    centerIcon.addEventListener('mouseenter', () => {
        centerIcon.style.transform = 'scale(1.1) rotate(10deg)';
    });
    
    centerIcon.addEventListener('mouseleave', () => {
        centerIcon.style.transform = 'scale(1) rotate(0deg)';
    });
}

// Smooth Scroll to Next Section
if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
        const nextSection = document.querySelector('.about-preview');
        if (nextSection) {
            nextSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// Add Gradient Animation to Title Highlight
const titleHighlight = document.querySelector('.title-highlight');
if (titleHighlight) {
    let gradientPosition = 0;
    
    function animateGradient() {
        gradientPosition += 0.5;
        const gradient = `linear-gradient(${gradientPosition}deg, #33C6C6, #73B92D, #A9C91D)`;
        titleHighlight.style.background = gradient;
        titleHighlight.style.webkitBackgroundClip = 'text';
        titleHighlight.style.backgroundClip = 'text';
        
        requestAnimationFrame(animateGradient);
    }
    
    animateGradient();
}

// Performance: Pause animations when tab is not visible
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        document.body.style.animationPlayState = 'paused';
    } else {
        document.body.style.animationPlayState = 'running';
    }
});

console.log('🎬 Premium Hero Section Loaded!');
console.log('✨ Interactive Parallax Active');
console.log('🌊 Wave Animations Running');
console.log('💫 Particle System Initialized');
