// Initialize GSAP and ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});


function initializeApp() {
    // Set dark theme as default immediately
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
    
    // Hide loading screen
    setTimeout(() => {
        gsap.to('.loading-screen', {
            opacity: 0,
            duration: 0.8,
            onComplete: () => {
                document.querySelector('.loading-screen').style.display = 'none';
            }
        });
    }, 2000);

    // Initialize components
    initCustomCursor();
    initTheme();
    initAnimations();
    initEventListeners();
    initPortfolioFilter();
    initTestimonialsSlider();
    initSmoothScrolling();
    initCounterAnimation();
}

// Enhanced Custom Cursor
function initCustomCursor() {
    const cursor = document.querySelector('.custom-cursor');
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    
    // Create cursor trail elements
    const cursorTrail = [];
    const trailCount = 5;
    
    for (let i = 0; i < trailCount; i++) {
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        document.body.appendChild(trail);
        cursorTrail.push({
            element: trail,
            x: 0,
            y: 0,
            delay: i * 0.1
        });
    }
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function updateCursor() {
        // Smooth main cursor movement
        cursorX += (mouseX - cursorX) * 0.2;
        cursorY += (mouseY - cursorY) * 0.2;
        
        gsap.to(cursor, {
            x: cursorX - 10,
            y: cursorY - 10,
            duration: 0.1,
            ease: 'power2.out'
        });
        
        // Update trail elements with delay
        cursorTrail.forEach((trail, index) => {
            const trailX = cursorX - (index * 3);
            const trailY = cursorY - (index * 3);
            
            gsap.to(trail.element, {
                x: trailX - 4,
                y: trailY - 4,
                duration: 0.3,
                delay: trail.delay,
                ease: 'power2.out'
            });
        });
        
        requestAnimationFrame(updateCursor);
    }
    
    updateCursor();

    // Cursor effects on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .portfolio-card, .play-button, .nav-link, .filter-btn');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            gsap.to(cursor, {
                scale: 1.5,
                backgroundColor: 'rgba(255, 123, 0, 0.3)',
                borderColor: 'var(--orange-primary)',
                duration: 0.3
            });
            
            cursorTrail.forEach(trail => {
                gsap.to(trail.element, {
                    scale: 0.5,
                    opacity: 0.3,
                    duration: 0.3
                });
            });
        });
        
        element.addEventListener('mouseleave', () => {
            gsap.to(cursor, {
                scale: 1,
                backgroundColor: 'transparent',
                borderColor: 'var(--orange-primary)',
                duration: 0.3
            });
            
            cursorTrail.forEach(trail => {
                gsap.to(trail.element, {
                    scale: 1,
                    opacity: 0.6,
                    duration: 0.3
                });
            });
        });
    });

    // Click effect
    document.addEventListener('click', () => {
        gsap.to(cursor, {
            scale: 0.8,
            duration: 0.1,
            yoyo: true,
            repeat: 1
        });
    });
}
// Theme Toggle Functionality - Force dark as default
function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('.theme-icon i');
    
    // Force dark theme as default
    const savedTheme = localStorage.getItem('theme');
    if (!savedTheme) {
        localStorage.setItem('theme', 'dark');
    }
    const currentTheme = localStorage.getItem('theme') || 'dark';
    
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(themeIcon, currentTheme);
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        // Animate theme transition
        gsap.to('body', {
            opacity: 0.8,
            duration: 0.3,
            onComplete: () => {
                document.documentElement.setAttribute('data-theme', newTheme);
                localStorage.setItem('theme', newTheme);
                updateThemeIcon(themeIcon, newTheme);
                
                gsap.to('body', {
                    opacity: 1,
                    duration: 0.3
                });
            }
        });
    });
}
function updateThemeIcon(icon, theme) {
    if (theme === 'light') {
        icon.className = 'fas fa-moon';
    } else {
        icon.className = 'fas fa-sun';
    }
}

// Counter Animation
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        // Start counter when in viewport
        ScrollTrigger.create({
            trigger: counter,
            start: 'top 80%',
            onEnter: updateCounter
        });
    });
}

// Enhanced GSAP Animations
function initAnimations() {
    // Hero section animations
    const heroTl = gsap.timeline();
    heroTl
        .from('.pre-title', {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        })
        .from('.hero-title span', {
            y: 100,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: 'power3.out'
        }, '-=0.5')
        .from('.hero-subtitle', {
            y: 50,
            opacity: 0,
            duration: 0.8
        }, '-=0.5')
        .from('.hero-buttons', {
            y: 30,
            opacity: 0,
            duration: 0.6
        }, '-=0.3')
        .from('.hero-stats', {
            y: 30,
            opacity: 0,
            duration: 0.6
        }, '-=0.2')
        .from('.premium-showcase', {
            scale: 0.8,
            opacity: 0,
            duration: 1,
            ease: 'back.out(1.7)'
        }, '-=0.5');

    // Floating orbs animation
    gsap.to('.orb-1', {
        y: '+=40',
        x: '+=20',
        rotation: 360,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
    });

    gsap.to('.orb-2', {
        y: '+=30',
        x: '-=15',
        rotation: -360,
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 1
    });

    gsap.to('.orb-3', {
        y: '+=25',
        x: '+=10',
        rotation: 180,
        duration: 9,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 2
    });

    // Section animations with ScrollTrigger
    gsap.utils.toArray('section').forEach(section => {
        gsap.from(section, {
            y: 100,
            opacity: 0,
            duration: 1.2,
            scrollTrigger: {
                trigger: section,
                start: 'top 85%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        });
    });

    // Portfolio items animation
    gsap.utils.toArray('.portfolio-item').forEach((item, i) => {
        gsap.from(item, {
            y: 100,
            opacity: 0,
            duration: 0.8,
            delay: i * 0.1,
            scrollTrigger: {
                trigger: item,
                start: 'top 90%',
                toggleActions: 'play none none reverse'
            }
        });
    });

    // Service cards animation
    gsap.utils.toArray('.service-card').forEach((card, i) => {
        gsap.from(card, {
            y: 50,
            opacity: 0,
            duration: 0.8,
            delay: i * 0.2,
            scrollTrigger: {
                trigger: card,
                start: 'top 90%',
                toggleActions: 'play none none reverse'
            }
        });
    });

    // Navbar background on scroll
    ScrollTrigger.create({
        start: 'top -100',
        end: 99999,
        toggleClass: { className: 'navbar-scrolled', targets: '.navbar' }
    });
}

// Event Listeners
function initEventListeners() {
    // Navigation scroll effect
    window.addEventListener('scroll', throttle(handleScroll, 100));
    
    // Mobile menu
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Animate mobile menu
        if (navMenu.classList.contains('active')) {
            gsap.from('.nav-link', {
                x: -50,
                opacity: 0,
                duration: 0.3,
                stagger: 0.1
            });
        }
    });
    
    // Hero buttons
    document.getElementById('viewWork').addEventListener('click', () => {
        document.getElementById('portfolio').scrollIntoView({ behavior: 'smooth' });
    });
    
    document.getElementById('contactBtn').addEventListener('click', () => {
        document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    });
    
    // Portfolio item hover effects
    document.querySelectorAll('.portfolio-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                y: -10,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                y: 0,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });

    // Play button animation
    document.querySelectorAll('.play-button').forEach(button => {
        button.addEventListener('mouseenter', () => {
            gsap.to(button, {
                scale: 1.1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        button.addEventListener('mouseleave', () => {
            gsap.to(button, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });
}

// Scroll handler with throttle
function handleScroll() {
    const navbar = document.querySelector('.navbar');
    const scrollY = window.scrollY;
    
    if (scrollY > 100) {
        navbar.style.background = 'rgba(10, 10, 10, 0.98)';
        navbar.style.backdropFilter = 'blur(20px)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
    }
}

// Throttle function for scroll performance
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Portfolio Filtering
function initPortfolioFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            
            // Filter items with animation
            portfolioItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || filter === category) {
                    gsap.to(item, {
                        opacity: 1,
                        scale: 1,
                        duration: 0.4,
                        display: 'block'
                    });
                } else {
                    gsap.to(item, {
                        opacity: 0,
                        scale: 0.8,
                        duration: 0.4,
                        onComplete: () => {
                            item.style.display = 'none';
                        }
                    });
                }
            });
        });
    });
}

// Testimonials Slider
function initTestimonialsSlider() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    let currentIndex = 0;
    
    function showTestimonial(index) {
        testimonialCards.forEach(card => card.classList.remove('active'));
        
        gsap.to(testimonialCards[currentIndex], {
            opacity: 0,
            x: -100,
            duration: 0.4,
            onComplete: () => {
                testimonialCards[currentIndex].style.display = 'none';
                currentIndex = index;
                testimonialCards[currentIndex].style.display = 'block';
                
                gsap.fromTo(testimonialCards[currentIndex], 
                    { opacity: 0, x: 100 },
                    { 
                        opacity: 1, 
                        x: 0, 
                        duration: 0.4, 
                        onComplete: () => {
                            testimonialCards[currentIndex].classList.add('active');
                        }
                    }
                );
            }
        });
    }
    
    // Auto-rotate testimonials
    setInterval(() => {
        let newIndex = currentIndex + 1;
        if (newIndex >= testimonialCards.length) newIndex = 0;
        showTestimonial(newIndex);
    }, 6000);
}

// Smooth Scrolling
function initSmoothScrolling() {
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
}

// Form Submission Handler
function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    // Simulate form submission
    submitBtn.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        // Show success message
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <span>Message sent successfully! We'll get back to you soon.</span>
        `;
        successMessage.style.cssText = `
            background: var(--gradient-primary);
            color: white;
            padding: 1.5rem;
            border-radius: 12px;
            margin-top: 1rem;
            text-align: center;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            font-weight: 600;
        `;
        
        form.appendChild(successMessage);
        
        // Reset form
        form.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Remove success message after 4 seconds
        setTimeout(() => {
            successMessage.style.opacity = '0';
            setTimeout(() => {
                successMessage.remove();
            }, 300);
        }, 4000);
    }, 2000);
}

// Add form submission event listener
document.querySelector('.contact-form').addEventListener('submit', handleFormSubmit);

// Parallax effect for hero background
function initParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        gsap.to('.gradient-orbs', {
            y: rate,
            ease: 'none'
        });
    });
}

// Initialize parallax
initParallax();

// Add resize handler for responsive adjustments
window.addEventListener('resize', throttle(() => {
    ScrollTrigger.refresh();
}, 250));

// Add page transition effects
window.addEventListener('beforeunload', () => {
    document.querySelector('.loading-screen').style.display = 'flex';
    gsap.to('.loading-screen', {
        opacity: 1,
        duration: 0.3
    });
});

