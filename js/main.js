/*
 * Danborough College - Enhanced Main JavaScript
 * Author: GitHub Copilot
 * Date: July 24, 2025
 */

$(document).ready(function() {
    // Initialize AOS (Animate On Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 100
        });
    }
    
    // Initialize enhanced animations and interactions
    initEnhancedAnimations();
    initParallaxEffects();
    initScrollAnimations();
    initInteractiveElements();
    
    // Sticky Header - Modified to keep header always visible
    $(window).on('scroll', function() {
        if ($(this).scrollTop() > 50) {
            $('#header').addClass('scrolled');
            $('.back-to-top').addClass('show');
        } else {
            $('#header').removeClass('scrolled');
            $('.back-to-top').removeClass('show');
        }
        
        // Ensure header is always visible
        $('#header').css({
            'visibility': 'visible',
            'opacity': '1',
            'transform': 'translateY(0)',
            'position': 'fixed',
            'top': '0'
        });
    });
    
    // Initialize header visibility on page load
    $('#header').css({
        'visibility': 'visible',
        'opacity': '1',
        'transform': 'translateY(0)',
        'position': 'fixed',
        'top': '0',
        'z-index': '9999'
    });
    
    // Mobile Menu Toggle
    $('.mobile-menu-btn').on('click', function() {
        $('#navbar').addClass('active');
        $('body').addClass('nav-open').append('<div class="mobile-nav-overlay active"></div>');
        
        // Close menu when clicking overlay
        $('.mobile-nav-overlay').on('click', function() {
            closeMobileNav();
        });
        
        // Add close button if it doesn't exist
        if (!$('.close-btn').length) {
            $('#navbar').prepend('<div class="close-btn"><i class="fas fa-times"></i></div>');
        }
        
        // Close button functionality
        $('.close-btn').off('click').on('click', function() {
            closeMobileNav();
        });
    });
    
    // Function to close mobile navigation
    function closeMobileNav() {
        $('#navbar').removeClass('active');
        $('.mobile-nav-overlay').removeClass('active');
        $('body').removeClass('nav-open');
        setTimeout(function() {
            $('.mobile-nav-overlay').remove();
        }, 300);
    }
    
    // Enhanced mobile dropdown toggle with improved animations
    $(document).on('click', '.dropdown .dropdown-toggle', function(e) {
        if ($(window).width() <= 991) {
            e.preventDefault();
            e.stopPropagation();
            
            // Close other dropdowns
            $('.dropdown').not($(this).parent()).removeClass('active');
            $('.dropdown').not($(this).parent()).find('.dropdown-menu').slideUp(300);
            $('.dropdown').not($(this).parent()).find('.fa-chevron-down').removeClass('rotated');
            
            // Toggle current dropdown
            const parent = $(this).parent();
            parent.toggleClass('active');
            
            // Toggle chevron icon rotation
            $(this).find('.fa-chevron-down').toggleClass('rotated');
            
            // Use slideDown and slideUp for smooth animation
            const dropdownMenu = $(this).next('.dropdown-menu');
            
            if (parent.hasClass('active')) {
                // Add highlight to active dropdown toggle
                $(this).addClass('active-toggle');
                
                // Slide down with a nice animation
                dropdownMenu.slideDown({
                    duration: 400,
                    easing: 'easeOutQuart',
                    start: function() {
                        $(this).css({display: 'flex'});
                    },
                    complete: function() {
                        // Add animation to each list item
                        $(this).find('li').each(function(index) {
                            $(this).css({
                                'animation': 'slideInDown 0.4s ease forwards',
                                'animation-delay': (index * 0.05) + 's',
                                'opacity': '0'
                            });
                        });
                    }
                });
            } else {
                // Remove highlight from inactive dropdown toggle
                $(this).removeClass('active-toggle');
                
                // Slide up with animation
                dropdownMenu.slideUp({
                    duration: 300,
                    easing: 'easeInOutQuad'
                });
                
                // Reset animations
                dropdownMenu.find('li').css({
                    'animation': 'none',
                    'opacity': '0'
                });
            }
        }
    });
    
    // Add easing functions if not already included with jQuery
    $.extend($.easing, {
        easeOutQuart: function(x) {
            return 1 - Math.pow(1 - x, 4);
        },
        easeInOutQuad: function(x) {
            return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
        }
    });
    
    // Close mobile menu when window is resized to desktop
    $(window).on('resize', function() {
        if ($(window).width() > 991) {
            closeMobileNav();
            $('.dropdown').removeClass('active');
            $('.dropdown-menu').hide();
        }
    });
    
    // Prevent body scroll when mobile menu is open
    $(document).on('click', '#navbar.active', function(e) {
        e.stopPropagation();
    });
    
    // Hero Slider
    let currentSlide = 0;
    const slides = $('.slide');
    const navBtns = $('.nav-btn');
    const totalSlides = slides.length;
    
    // Set initial background images
    slides.each(function(index) {
        const bgImg = $(this).css('background-image');
        if (!bgImg || bgImg === 'none') {
            $(this).css('background-image', 'url("images/hero' + (index + 1) + '.jpg")');
        }
    });
    
    // Function to change slides
    function changeSlide(index) {
        slides.removeClass('active');
        navBtns.removeClass('active');
        
        $(slides[index]).addClass('active');
        $(navBtns[index]).addClass('active');
        currentSlide = index;
    }
    
    // Auto slide change
    let slideInterval = setInterval(function() {
        let nextSlide = (currentSlide + 1) % totalSlides;
        changeSlide(nextSlide);
    }, 5000);
    
    // Click on navigation buttons
    navBtns.on('click', function() {
        let index = $(this).index();
        changeSlide(index);
        
        // Reset interval
        clearInterval(slideInterval);
        slideInterval = setInterval(function() {
            let nextSlide = (currentSlide + 1) % totalSlides;
            changeSlide(nextSlide);
        }, 5000);
    });
    
    // Testimonial Slider
    let currentTestimonial = 0;
    const testimonials = $('.testimonial-slide');
    const testimonialNavBtns = $('.testimonial-nav-btn');
    const totalTestimonials = testimonials.length;
    
    // Function to change testimonials
    function changeTestimonial(index) {
        testimonials.removeClass('active');
        testimonialNavBtns.removeClass('active');
        
        $(testimonials[index]).addClass('active');
        $(testimonialNavBtns[index]).addClass('active');
        currentTestimonial = index;
    }
    
    // Auto testimonial change
    let testimonialInterval = setInterval(function() {
        let nextTestimonial = (currentTestimonial + 1) % totalTestimonials;
        changeTestimonial(nextTestimonial);
    }, 6000);
    
    // Click on testimonial navigation buttons
    testimonialNavBtns.on('click', function() {
        let index = $(this).index();
        changeTestimonial(index);
        
        // Reset interval
        clearInterval(testimonialInterval);
        testimonialInterval = setInterval(function() {
            let nextTestimonial = (currentTestimonial + 1) % totalTestimonials;
            changeTestimonial(nextTestimonial);
        }, 6000);
    });
    
    // Counter Animation
    let counted = false;
    
    function animateCounters() {
        if (counted) return;
        
        if ($('#about').length && $(window).scrollTop() + $(window).height() > $('#about').offset().top) {
            $('.counter').each(function() {
                const $this = $(this);
                const target = parseInt($this.text());
                let count = 0;
                
                const interval = setInterval(function() {
                    if (count >= target) {
                        clearInterval(interval);
                        return;
                    }
                    
                    count += Math.ceil(target / 50);
                    if (count > target) count = target;
                    $this.text(count);
                }, 30);
            });
            
            counted = true;
        }
    }
    
    // Run on page load
    animateCounters();
    
    // Run on scroll
    $(window).on('scroll', function() {
        animateCounters();
    });
    
    // Smooth scroll for anchor links
    $('a[href*="#"]:not([href="#"])').on('click', function() {
        if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
            let target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top - 100
                }, 800);
                return false;
            }
        }
    });
    
    // Back to top button
    $('.back-to-top').on('click', function() {
        $('html, body').animate({
            scrollTop: 0
        }, 800);
        return false;
    });
    
    // Form Validation
    $('#contactForm').on('submit', function(e) {
        e.preventDefault();
        
        // Simple validation
        let valid = true;
        $(this).find('[required]').each(function() {
            if ($(this).val() === '') {
                valid = false;
                $(this).addClass('error');
            } else {
                $(this).removeClass('error');
            }
        });
        
        if (valid) {
            // Success message
            $(this).find('button[type="submit"]').text('Message Sent!');
            $(this).find('button[type="submit"]').prop('disabled', true);
            
            // Reset form after delay
            setTimeout(() => {
                $(this)[0].reset();
                $(this).find('button[type="submit"]').text('Send Message');
                $(this).find('button[type="submit"]').prop('disabled', false);
            }, 3000);
        }
    });
    
    // Newsletter Form
    $('.newsletter-form').on('submit', function(e) {
        e.preventDefault();
        
        // Simple validation
        let valid = true;
        $(this).find('[required]').each(function() {
            if ($(this).val() === '') {
                valid = false;
                $(this).addClass('error');
            } else {
                $(this).removeClass('error');
            }
        });
        
        if (valid) {
            // Success message
            $(this).find('button[type="submit"]').text('Subscribed!');
            $(this).find('button[type="submit"]').prop('disabled', true);
            
            // Reset form after delay
            setTimeout(() => {
                $(this)[0].reset();
                $(this).find('button[type="submit"]').text('Subscribe');
                $(this).find('button[type="submit"]').prop('disabled', false);
            }, 3000);
        }
    });
    
    // Active menu highlighting
    function highlightMenu() {
        let scrollPosition = $(window).scrollTop();
        
        $('section').each(function() {
            let currentSection = $(this);
            let sectionTop = currentSection.offset().top - 200;
            let sectionBottom = sectionTop + currentSection.height();
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                let id = currentSection.attr('id');
                $('#navbar ul li a').removeClass('active');
                $('#navbar ul li a[href="#' + id + '"]').addClass('active');
            }
        });
    }
    
    // Run on page load and scroll
    highlightMenu();
    $(window).on('scroll', function() {
        highlightMenu();
    });
    
    // Hide navbar on scroll down, show on scroll up
    let lastScrollTop = 0;
    $(window).on('scroll', function() {
        let st = $(this).scrollTop();
        if (st > lastScrollTop && st > 100) {
            // Scrolling down
            $('.main-header').css({
                'transform': 'translateY(-100%)',
                'transition': 'transform 0.3s ease'
            });
        } else {
            // Scrolling up
            $('.main-header').css({
                'transform': 'translateY(0)',
                'transition': 'transform 0.3s ease'
            });
        }
        lastScrollTop = st;
    });
});

// Add error class for form validation
(function($) {
    $.fn.addError = function(message) {
        return this.each(function() {
            $(this).addClass('error');
            if (message) {
                if (!$(this).next('.error-message').length) {
                    $(this).after('<div class="error-message">' + message + '</div>');
                }
            }
        });
    };
    
    $.fn.removeError = function() {
        return this.each(function() {
            $(this).removeClass('error');
            $(this).next('.error-message').remove();
        });
    };
})(jQuery);

// Loading animation
$(window).on('load', function() {
    setTimeout(function() {
        // If a loader exists, add fade out code here
    }, 500);
});

// Mobile Navigation
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navList = document.querySelector('.nav-list');
    const dropdowns = document.querySelectorAll('.dropdown');

    // Toggle mobile menu
    mobileMenuBtn.addEventListener('click', function() {
        navList.classList.toggle('active');
        this.querySelector('i').classList.toggle('fa-bars');
        this.querySelector('i').classList.toggle('fa-times');
    });

    // Handle dropdowns in mobile view
    dropdowns.forEach(dropdown => {
        if (window.innerWidth <= 991) {
            const link = dropdown.querySelector('.nav-link');
            link.addEventListener('click', (e) => {
                e.preventDefault();
                dropdown.classList.toggle('active');
            });
        }
    });
    
    // Hero Navigation Dropdown Functionality
    // Desktop hover functionality
    if ($(window).width() > 768) {
        $('.nav-dropdown').on('mouseenter', function() {
            $(this).find('.dropdown-menu').stop().fadeIn(300);
        }).on('mouseleave', function() {
            $(this).find('.dropdown-menu').stop().fadeOut(300);
        });
    }
    
    // Click functionality for touch devices and as fallback
    $('.nav-dropdown > a').on('click', function(e) {
        var $dropdown = $(this).parent();
        var $menu = $dropdown.find('.dropdown-menu');
        
        if ($(window).width() <= 768) {
            // Mobile behavior - slide toggle
            e.preventDefault();
            $menu.slideToggle(300);
            $(this).find('.fas').toggleClass('rotate');
        } else {
            // Desktop behavior - check if dropdown is visible
            if ($menu.is(':visible')) {
                // If already visible, follow the link
                return true;
            } else {
                // If not visible, show dropdown and prevent link
                e.preventDefault();
                $('.dropdown-menu').fadeOut(300); // Hide other dropdowns
                $menu.fadeIn(300);
            }
        }
    });
    
    // Handle window resize to rebind events
    $(window).on('resize', function() {
        if ($(window).width() > 768) {
            // Rebind hover events for desktop
            $('.nav-dropdown').off('mouseenter mouseleave').on('mouseenter', function() {
                $(this).find('.dropdown-menu').stop().fadeIn(300);
            }).on('mouseleave', function() {
                $(this).find('.dropdown-menu').stop().fadeOut(300);
            });
        } else {
            // Remove hover events on mobile
            $('.nav-dropdown').off('mouseenter mouseleave');
        }
    });
    
    // Mobile Navigation Menu Functionality
    $('.mobile-menu-toggle').on('click', function() {
        $('.mobile-nav-menu').addClass('active');
        $('.mobile-nav-overlay').addClass('active');
        $('body').css('overflow', 'hidden');
    });
    
    $('.mobile-close-btn, .mobile-nav-overlay').on('click', function() {
        $('.mobile-nav-menu').removeClass('active');
        $('.mobile-nav-overlay').removeClass('active');
        $('body').css('overflow', 'auto');
    });
    
    // Mobile dropdown functionality
    $('.mobile-dropdown > a').on('click', function(e) {
        e.preventDefault();
        var $dropdown = $(this).parent();
        var $menu = $dropdown.find('.mobile-dropdown-menu');
        
        // Toggle current dropdown
        $dropdown.toggleClass('active');
        
        // Close other dropdowns
        $('.mobile-dropdown').not($dropdown).removeClass('active');
    });
    
    // Close mobile nav when clicking on links (except dropdowns)
    $('.mobile-nav-link:not(.mobile-dropdown > a)').on('click', function() {
        $('.mobile-nav-menu').removeClass('active');
        $('.mobile-nav-overlay').removeClass('active');
        $('body').css('overflow', 'auto');
    });
    
    $('.mobile-dropdown-menu a').on('click', function() {
        $('.mobile-nav-menu').removeClass('active');
        $('.mobile-nav-overlay').removeClass('active');
        $('body').css('overflow', 'auto');
    });
    
    // Close dropdowns when clicking outside
    $(document).on('click', function(e) {
        if (!$(e.target).closest('.nav-dropdown').length) {
            $('.dropdown-menu').fadeOut(300);
        }
        if (!$(e.target).closest('.mobile-dropdown').length && !$(e.target).closest('.mobile-menu-toggle').length) {
            $('.mobile-dropdown').removeClass('active');
        }
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.main-nav') && !e.target.closest('.mobile-menu-btn')) {
            navList.classList.remove('active');
            mobileMenuBtn.querySelector('i').classList.remove('fa-times');
            mobileMenuBtn.querySelector('i').classList.add('fa-bars');
        }
    });
});

// Enhanced Animation Functions
function initEnhancedAnimations() {
    // Counter animation for statistics
    const animateCounters = () => {
        $('.stat-number').each(function() {
            const $this = $(this);
            const countTo = $this.text().replace(/[^0-9]/g, '');
            
            if (countTo) {
                $({ countNum: 0 }).animate({
                    countNum: countTo
                }, {
                    duration: 2000,
                    easing: 'swing',
                    step: function() {
                        const suffix = $this.text().includes('%') ? '%' : '+';
                        $this.text(Math.floor(this.countNum) + (countTo == Math.floor(this.countNum) ? suffix : ''));
                    },
                    complete: function() {
                        const suffix = $this.text().includes('%') ? '%' : '+';
                        $this.text(countTo + suffix);
                    }
                });
            }
        });
    };

    // Trigger counter animation when stats come into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    });

    const statsSection = document.querySelector('.enrollment-stats');
    if (statsSection) {
        observer.observe(statsSection);
    }
}

function initParallaxEffects() {
    // Parallax scrolling for background images
    $(window).on('scroll', function() {
        const scrolled = $(this).scrollTop();
        const parallaxSections = ['#features', '#about', '#programs', '#admission', '#newsletter', '.join-section'];
        
        parallaxSections.forEach(section => {
            const $section = $(section);
            if ($section.length) {
                const speed = 0.5;
                const yPos = -(scrolled * speed);
                $section.css('background-position', `center ${yPos}px`);
            }
        });
    });
}

function initScrollAnimations() {
    // Enhanced scroll-triggered animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                
                // Add staggered animations for grid items
                if (entry.target.classList.contains('features-grid') || 
                    entry.target.classList.contains('programs-grid') ||
                    entry.target.classList.contains('process-steps')) {
                    
                    const children = entry.target.children;
                    Array.from(children).forEach((child, index) => {
                        setTimeout(() => {
                            child.style.animationDelay = `${index * 0.1}s`;
                            child.classList.add('animate-on-scroll');
                        }, index * 100);
                    });
                }
            }
        });
    }, observerOptions);

    // Observe all animatable elements
    document.querySelectorAll('.feature-box, .program-card, .step, .stat-card').forEach(el => {
        observer.observe(el);
    });
}

function initInteractiveElements() {
    // Enhanced button interactions
    $('.btn, .feature-box, .program-card, .step').on('mouseenter', function() {
        $(this).addClass('hover-active');
    }).on('mouseleave', function() {
        $(this).removeClass('hover-active');
    });

    // Magnetic button effect
    $('.btn-primary, .btn-secondary').on('mousemove', function(e) {
        const btn = $(this);
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        btn.css('transform', `translate(${x * 0.1}px, ${y * 0.1}px) scale(1.05)`);
    }).on('mouseleave', function() {
        $(this).css('transform', 'translate(0px, 0px) scale(1)');
    });

    // Newsletter form enhancement
    $('.newsletter-form').on('submit', function(e) {
        e.preventDefault();
        const $btn = $(this).find('.btn');
        const originalText = $btn.text();
        
        $btn.addClass('btn-loading').text('Subscribing...');
        
        // Simulate form submission
        setTimeout(() => {
            $btn.removeClass('btn-loading').text('Subscribed!').css('background', '#28a745');
            
            setTimeout(() => {
                $btn.text(originalText).css('background', '');
                $(this)[0].reset();
            }, 2000);
        }, 1500);
    });

    // Smooth scrolling for anchor links
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        const target = $(this.getAttribute('href'));
        
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top - 80
            }, 800, 'easeInOutCubic');
        }
    });

    // Tab switching animation
    $('.nav-tabs .nav-link').on('click', function() {
        const $this = $(this);
        setTimeout(() => {
            const activePane = $($this.attr('data-bs-target'));
            activePane.find('.program-card').each(function(index) {
                $(this).css('animation-delay', `${index * 0.1}s`).addClass('fade-in-up');
            });
        }, 100);
    });
}

// Enhanced easing function
$.easing.easeInOutCubic = function (x, t, b, c, d) {
    if ((t/=d/2) < 1) return c/2*t*t*t + b;
    return c/2*((t-=2)*t*t + 2) + b;
};

// Loading animation
$(window).on('load', function() {
    // Add loading complete class to trigger animations
    $('body').addClass('loaded');
    
    // Initialize AOS with custom settings
    if (typeof AOS !== 'undefined') {
        AOS.refresh();
    }
});

// Performance optimization: throttle scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply throttling to scroll events
$(window).on('scroll', throttle(function() {
    // Scroll-dependent animations here
}, 16)); // ~60fps
