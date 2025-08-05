/* ====================================
   Enhanced Footer and Page Animations
   Inspired by Haas Hall Academy Design
   ==================================== */

// Enhanced Footer Animation and Interaction Handler
document.addEventListener('DOMContentLoaded', function() {
    
    // Animate statistics counters with enhanced effects
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-count'));
                    let current = 0;
                    const increment = target / 100;
                    const duration = 2000;
                    const stepTime = duration / 100;

                    counter.classList.add('animated', 'counted');
                    
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            current = target;
                            clearInterval(timer);
                        }
                        counter.textContent = Math.floor(current);
                    }, stepTime);
                }
            });
        }, observerOptions);

        counters.forEach(counter => observer.observe(counter));
    }

    // Animate footer widgets with stagger effect
    function animateFooterWidgets() {
        const footerWidgets = document.querySelectorAll('.footer-widget');
        const observerOptions = {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                        entry.target.classList.add('animated');
                    }, index * 200);
                }
            });
        }, observerOptions);

        footerWidgets.forEach(widget => {
            widget.style.opacity = '0';
            widget.style.transform = 'translateY(30px)';
            widget.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            observer.observe(widget);
        });
    }

    // Enhanced parallax effect for hero sections
    function initParallax() {
        const parallaxElements = document.querySelectorAll('.page-hero');
        let ticking = false;
        
        function updateParallax() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.3;
            
            parallaxElements.forEach(element => {
                element.style.transform = `translate3d(0, ${rate}px, 0)`;
            });
            ticking = false;
        }

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        });
    }

    // Interactive card hover effects with enhanced animations
    function initCardInteractions() {
        const cards = document.querySelectorAll('.content-card, .feature-item, .gallery-item');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', function(e) {
                this.style.transform = 'translateY(-8px) scale(1.02)';
                this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
                this.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
                
                // Add ripple effect
                const ripple = document.createElement('div');
                ripple.classList.add('ripple');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = e.clientX - rect.left - size / 2 + 'px';
                ripple.style.top = e.clientY - rect.top - size / 2 + 'px';
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
            });
        });
    }

    // Enhanced social media animations
    function initSocialAnimations() {
        const socialLinks = document.querySelectorAll('.footer-social a, .social-links a');
        
        socialLinks.forEach((link, index) => {
            link.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            link.style.animationDelay = `${index * 0.1}s`;
            
            link.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px) scale(1.2) rotate(5deg)';
                this.style.color = '#ffc107';
                this.style.textShadow = '0 4px 8px rgba(255, 193, 7, 0.3)';
            });
            
            link.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1) rotate(0deg)';
                this.style.color = '';
                this.style.textShadow = 'none';
            });
        });
    }

    // Back to top button with enhanced animation
    function initBackToTop() {
        const backToTopButton = document.querySelector('.back-to-top');
        
        if (backToTopButton) {
            backToTopButton.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
            
            window.addEventListener('scroll', () => {
                if (window.pageYOffset > 300) {
                    backToTopButton.style.opacity = '1';
                    backToTopButton.style.transform = 'translateY(0) scale(1)';
                    backToTopButton.style.visibility = 'visible';
                } else {
                    backToTopButton.style.opacity = '0';
                    backToTopButton.style.transform = 'translateY(20px) scale(0.8)';
                    backToTopButton.style.visibility = 'hidden';
                }
            });

            backToTopButton.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Add click animation
                backToTopButton.style.transform = 'scale(0.9)';
                setTimeout(() => {
                    backToTopButton.style.transform = 'scale(1)';
                }, 150);
                
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    }

    // Form field animations
    function initFormAnimations() {
        const formFields = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');
        
        formFields.forEach(field => {
            field.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
                this.style.transform = 'translateY(-2px)';
                this.style.boxShadow = '0 0 0 3px rgba(46, 125, 50, 0.1)';
                this.style.borderColor = '#2e7d32';
            });
            
            field.addEventListener('blur', function() {
                this.parentElement.classList.remove('focused');
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = 'none';
                this.style.borderColor = '#e0e0e0';
            });
        });
    }

    // Navigation menu animations
    function initNavigationAnimations() {
        const navLinks = document.querySelectorAll('.navbar-nav a');
        
        navLinks.forEach(link => {
            link.style.position = 'relative';
            link.style.transition = 'all 0.3s ease';
            
            // Add underline effect
            const underline = document.createElement('span');
            underline.style.cssText = `
                position: absolute;
                bottom: -5px;
                left: 50%;
                width: 0;
                height: 2px;
                background: #ffc107;
                transition: all 0.3s ease;
                transform: translateX(-50%);
            `;
            link.appendChild(underline);
            
            link.addEventListener('mouseenter', function() {
                this.style.color = '#ffc107';
                this.style.transform = 'translateY(-2px)';
                underline.style.width = '100%';
            });
            
            link.addEventListener('mouseleave', function() {
                this.style.color = '';
                this.style.transform = 'translateY(0)';
                underline.style.width = '0';
            });
        });
    }

    // Image hover effects
    function initImageHoverEffects() {
        const images = document.querySelectorAll('.content-image img, .gallery-item img');
        
        images.forEach(img => {
            const container = img.parentElement;
            container.style.overflow = 'hidden';
            container.style.borderRadius = '12px';
            
            img.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
            
            container.addEventListener('mouseenter', function() {
                img.style.transform = 'scale(1.1) rotate(2deg)';
                img.style.filter = 'brightness(1.1) contrast(1.1)';
            });
            
            container.addEventListener('mouseleave', function() {
                img.style.transform = 'scale(1) rotate(0deg)';
                img.style.filter = 'brightness(1) contrast(1)';
            });
        });
    }

    // Button hover effects with ripple animation
    function initButtonEffects() {
        const buttons = document.querySelectorAll('.btn-primary-custom, .btn-secondary-custom, .btn');
        
        buttons.forEach(button => {
            button.style.position = 'relative';
            button.style.overflow = 'hidden';
            button.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            
            button.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                
                ripple.style.cssText = `
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.6);
                    transform: scale(0);
                    animation: ripple 0.6s linear;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${e.clientX - rect.left - size / 2}px;
                    top: ${e.clientY - rect.top - size / 2}px;
                `;
                
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
            
            button.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-3px) scale(1.05)';
                this.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.2)';
            });
            
            button.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.boxShadow = '';
            });
        });
    }

    // Stagger animation for grid items
    function staggerGridAnimation() {
        const gridItems = document.querySelectorAll('.feature-grid .feature-item, .stats-grid .stat-item, .requirements-grid .requirement-category');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                        entry.target.classList.add('animate-in');
                    }, index * 100);
                }
            });
        }, { threshold: 0.3 });
        
        gridItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(30px)';
            item.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            observer.observe(item);
        });
    }

    // Text reveal animation
    function initTextRevealAnimation() {
        const textElements = document.querySelectorAll('.section-header h2, .section-header p');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.5 });
        
        textElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            observer.observe(element);
        });
    }

    // Initialize all animations
    animateCounters();
    animateFooterWidgets();
    initParallax();
    initCardInteractions();
    initSocialAnimations();
    initBackToTop();
    initFormAnimations();
    initNavigationAnimations();
    initImageHoverEffects();
    initButtonEffects();
    staggerGridAnimation();
    initTextRevealAnimation();

    // Page load animation
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
        document.body.style.opacity = '1';
        
        // Trigger entrance animations
        const animatedElements = document.querySelectorAll('[data-aos]');
        animatedElements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('aos-animate');
            }, index * 50);
        });
    });

    // Performance optimization: throttle scroll events
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
});

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .ripple {
        pointer-events: none;
    }
`;
document.head.appendChild(style);
