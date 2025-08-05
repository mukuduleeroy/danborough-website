/*
   Mobile Responsive JavaScript
   Danborough Group of Colleges
   Author: GitHub Copilot
   Date: July 24, 2025
*/

class MobileResponsive {
    constructor() {
        this.isMobile = window.innerWidth <= 768;
        this.isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        this.breakpoints = {
            largeMobile: 991,
            mobile: 768,
            smallMobile: 480,
            tinyMobile: 320
        };
        this.init();
    }

    init() {
        this.detectDeviceCapabilities();
        this.setupEventListeners();
        this.initializeMobileFeatures();
        this.setupTouchGestures();
        this.optimizeMobilePerformance();
        this.setupMobileAccessibility();
    }

    detectDeviceCapabilities() {
        // Detect device type and capabilities
        this.deviceInfo = {
            isIOS: /iPad|iPhone|iPod/.test(navigator.userAgent),
            isAndroid: /Android/.test(navigator.userAgent),
            isTablet: window.innerWidth > 768 && window.innerWidth < 1024,
            hasTouch: this.isTouch,
            hasHover: window.matchMedia('(hover: hover)').matches,
            pixelRatio: window.devicePixelRatio || 1,
            orientation: window.innerHeight > window.innerWidth ? 'portrait' : 'landscape'
        };

        // Add device classes to body
        document.body.classList.toggle('ios-device', this.deviceInfo.isIOS);
        document.body.classList.toggle('android-device', this.deviceInfo.isAndroid);
        document.body.classList.toggle('touch-device', this.deviceInfo.hasTouch);
        document.body.classList.toggle('no-hover', !this.deviceInfo.hasHover);
    }

    setupEventListeners() {
        window.addEventListener('resize', this.debounce(() => {
            this.handleResize();
        }, 250));

        window.addEventListener('orientationchange', () => {
            this.handleOrientationChange();
        });

        window.addEventListener('scroll', this.throttle(() => {
            this.handleScroll();
        }, 16));

        document.addEventListener('DOMContentLoaded', () => {
            this.setupMobileInteractions();
        });

        // Touch event listeners
        if (this.isTouch) {
            this.setupTouchEventListeners();
        }

        // Viewport change listener for mobile browsers
        window.addEventListener('resize', this.debounce(() => {
            this.handleViewportChange();
        }, 100));
    }

    // ====================================
    // MOBILE FEATURE INITIALIZATION
    // ====================================

    initializeMobileFeatures() {
        if (!this.isMobile) return;

        this.setupMobileLayouts();
        this.setupMobileNavigation();
        this.setupMobileForms();
        this.setupMobileImages();
        this.setupMobileAnimations();
        this.preventZoom();
        this.optimizeScrolling();
    }

    setupMobileLayouts() {
        // Convert desktop grids to mobile-friendly stacks
        this.convertGridsToStacks();
        
        // Adjust spacing for mobile
        this.adjustMobileSpacing();
        
        // Setup mobile-specific containers
        this.setupMobileContainers();
    }

    convertGridsToStacks() {
        const grids = document.querySelectorAll('.features-grid, .programs-grid');
        grids.forEach(grid => {
            grid.style.display = 'flex';
            grid.style.flexDirection = 'column';
            grid.style.gap = '20px';
        });

        // Handle two-column layouts
        const twoColumnLayouts = document.querySelectorAll('.about-content, .join-content, .newsletter-content');
        twoColumnLayouts.forEach(layout => {
            layout.style.display = 'flex';
            layout.style.flexDirection = 'column';
            layout.style.gap = '30px';
        });
    }

    adjustMobileSpacing() {
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            section.style.padding = '60px 0';
        });

        const containers = document.querySelectorAll('.container');
        containers.forEach(container => {
            container.style.padding = '0 15px';
        });
    }

    setupMobileContainers() {
        const containers = document.querySelectorAll('.container');
        containers.forEach(container => {
            container.style.maxWidth = '100%';
            container.style.margin = '0 auto';
        });
    }

    // ====================================
    // TOUCH GESTURES
    // ====================================

    setupTouchGestures() {
        if (!this.isTouch) return;

        this.touchState = {
            startX: 0,
            startY: 0,
            endX: 0,
            endY: 0,
            startTime: 0,
            endTime: 0
        };

        this.setupSwipeGestures();
        this.setupTapGestures();
        this.setupPinchGestures();
    }

    setupSwipeGestures() {
        const swipeElements = document.querySelectorAll('.swipe-enabled, .program-tabs, .gallery-container');
        
        swipeElements.forEach(element => {
            element.addEventListener('touchstart', (e) => {
                this.handleTouchStart(e);
            }, { passive: true });

            element.addEventListener('touchmove', (e) => {
                this.handleTouchMove(e);
            }, { passive: true });

            element.addEventListener('touchend', (e) => {
                this.handleTouchEnd(e, element);
            }, { passive: true });
        });
    }

    handleTouchStart(e) {
        const touch = e.touches[0];
        this.touchState.startX = touch.clientX;
        this.touchState.startY = touch.clientY;
        this.touchState.startTime = Date.now();
    }

    handleTouchMove(e) {
        // Prevent default for horizontal swipes to avoid interference
        const touch = e.touches[0];
        const deltaX = Math.abs(touch.clientX - this.touchState.startX);
        const deltaY = Math.abs(touch.clientY - this.touchState.startY);
        
        if (deltaX > deltaY && deltaX > 10) {
            e.preventDefault();
        }
    }

    handleTouchEnd(e, element) {
        const touch = e.changedTouches[0];
        this.touchState.endX = touch.clientX;
        this.touchState.endY = touch.clientY;
        this.touchState.endTime = Date.now();

        const deltaX = this.touchState.endX - this.touchState.startX;
        const deltaY = this.touchState.endY - this.touchState.startY;
        const deltaTime = this.touchState.endTime - this.touchState.startTime;

        // Detect swipe
        if (Math.abs(deltaX) > 50 && deltaTime < 300) {
            if (deltaX > 0) {
                this.handleSwipeRight(element);
            } else {
                this.handleSwipeLeft(element);
            }
        }

        // Detect tap
        if (Math.abs(deltaX) < 10 && Math.abs(deltaY) < 10 && deltaTime < 200) {
            this.handleTap(element, touch);
        }
    }

    handleSwipeLeft(element) {
        if (element.classList.contains('program-tabs')) {
            this.nextTab();
        }
        
        // Trigger custom swipe event
        element.dispatchEvent(new CustomEvent('swipeleft'));
    }

    handleSwipeRight(element) {
        if (element.classList.contains('program-tabs')) {
            this.previousTab();
        }
        
        // Trigger custom swipe event
        element.dispatchEvent(new CustomEvent('swiperight'));
    }

    handleTap(element, touch) {
        // Enhanced tap handling for mobile
        const tapEvent = new CustomEvent('mobiletap', {
            detail: {
                x: touch.clientX,
                y: touch.clientY,
                element: element
            }
        });
        element.dispatchEvent(tapEvent);
    }

    setupTapGestures() {
        // Add tap feedback to interactive elements
        const interactiveElements = document.querySelectorAll(
            '.btn, .program-card, .feature-box, .nav-link'
        );

        interactiveElements.forEach(element => {
            element.addEventListener('touchstart', () => {
                element.classList.add('tap-active');
            }, { passive: true });

            element.addEventListener('touchend', () => {
                setTimeout(() => {
                    element.classList.remove('tap-active');
                }, 150);
            }, { passive: true });

            element.addEventListener('touchcancel', () => {
                element.classList.remove('tap-active');
            }, { passive: true });
        });
    }

    setupPinchGestures() {
        // Setup pinch-to-zoom for images
        const images = document.querySelectorAll('.zoomable-image, .gallery img');
        
        images.forEach(img => {
            let scale = 1;
            let initialDistance = 0;

            img.addEventListener('touchstart', (e) => {
                if (e.touches.length === 2) {
                    initialDistance = this.getDistance(e.touches[0], e.touches[1]);
                }
            });

            img.addEventListener('touchmove', (e) => {
                if (e.touches.length === 2) {
                    e.preventDefault();
                    const currentDistance = this.getDistance(e.touches[0], e.touches[1]);
                    const newScale = scale * (currentDistance / initialDistance);
                    img.style.transform = `scale(${Math.min(Math.max(newScale, 0.5), 3)})`;
                }
            });

            img.addEventListener('touchend', () => {
                scale = parseFloat(img.style.transform.replace('scale(', '').replace(')', '')) || 1;
            });
        });
    }

    getDistance(touch1, touch2) {
        const dx = touch1.clientX - touch2.clientX;
        const dy = touch1.clientY - touch2.clientY;
        return Math.sqrt(dx * dx + dy * dy);
    }

    // ====================================
    // MOBILE FORMS
    // ====================================

    setupMobileForms() {
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            this.optimizeFormForMobile(form);
        });

        // Setup mobile keyboard handling
        this.setupMobileKeyboard();
    }

    optimizeFormForMobile(form) {
        const inputs = form.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            // Prevent zoom on focus for iOS
            if (this.deviceInfo.isIOS) {
                input.style.fontSize = '16px';
            }

            // Add mobile-specific attributes
            if (input.type === 'email') {
                input.setAttribute('autocomplete', 'email');
                input.setAttribute('inputmode', 'email');
            } else if (input.type === 'tel') {
                input.setAttribute('inputmode', 'tel');
            } else if (input.type === 'number') {
                input.setAttribute('inputmode', 'numeric');
            }

            // Add touch-friendly styling
            input.style.minHeight = '44px';
            input.style.padding = '12px 16px';
        });

        // Setup form validation feedback
        this.setupMobileFormValidation(form);
    }

    setupMobileKeyboard() {
        let viewportHeight = window.visualViewport ? window.visualViewport.height : window.innerHeight;
        
        const handleViewportChange = () => {
            const currentHeight = window.visualViewport ? window.visualViewport.height : window.innerHeight;
            const heightDiff = viewportHeight - currentHeight;
            
            if (heightDiff > 150) {
                // Keyboard is likely open
                document.body.classList.add('keyboard-open');
                this.adjustForKeyboard(true);
            } else {
                // Keyboard is likely closed
                document.body.classList.remove('keyboard-open');
                this.adjustForKeyboard(false);
            }
        };

        if (window.visualViewport) {
            window.visualViewport.addEventListener('resize', handleViewportChange);
        } else {
            window.addEventListener('resize', this.debounce(handleViewportChange, 150));
        }
    }

    adjustForKeyboard(isOpen) {
        const fixedElements = document.querySelectorAll('.fixed-bottom, .floating-button');
        
        fixedElements.forEach(element => {
            if (isOpen) {
                element.style.bottom = '10px';
            } else {
                element.style.bottom = '';
            }
        });
    }

    setupMobileFormValidation(form) {
        const inputs = form.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                this.validateMobileInput(input);
            });
        });
    }

    validateMobileInput(input) {
        const isValid = input.checkValidity();
        const feedbackElement = input.nextElementSibling;
        
        if (!isValid) {
            input.classList.add('invalid');
            if (feedbackElement && feedbackElement.classList.contains('feedback')) {
                feedbackElement.textContent = input.validationMessage;
                feedbackElement.style.display = 'block';
            }
        } else {
            input.classList.remove('invalid');
            if (feedbackElement && feedbackElement.classList.contains('feedback')) {
                feedbackElement.style.display = 'none';
            }
        }
    }

    // ====================================
    // MOBILE IMAGES
    // ====================================

    setupMobileImages() {
        this.setupLazyLoading();
        this.setupResponsiveImages();
        this.setupImageOptimization();
    }

    setupLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    this.loadMobileImage(img);
                    imageObserver.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px'
        });

        images.forEach(img => {
            imageObserver.observe(img);
        });
    }

    loadMobileImage(img) {
        const src = img.dataset.src;
        const mobileSrc = img.dataset.mobileSrc;
        
        // Use mobile-specific image if available
        img.src = (this.isMobile && mobileSrc) ? mobileSrc : src;
        img.classList.remove('lazy');
        img.classList.add('loaded');
    }

    setupResponsiveImages() {
        const images = document.querySelectorAll('img');
        
        images.forEach(img => {
            img.style.maxWidth = '100%';
            img.style.height = 'auto';
            img.style.display = 'block';
        });
    }

    setupImageOptimization() {
        // Convert images to WebP if supported and mobile
        if (this.isMobile && this.supportsWebP()) {
            this.convertToWebP();
        }
    }

    supportsWebP() {
        const canvas = document.createElement('canvas');
        return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    }

    convertToWebP() {
        // Implementation for WebP conversion would go here
        // This is a placeholder for the concept
    }

    // ====================================
    // MOBILE ANIMATIONS
    // ====================================

    setupMobileAnimations() {
        // Simplify animations for mobile performance
        this.reduceMobileAnimations();
        this.setupMobileScrollAnimations();
    }

    reduceMobileAnimations() {
        if (this.prefersReducedMotion() || this.isMobile) {
            const style = document.createElement('style');
            style.textContent = `
                * {
                    animation-duration: 0.3s !important;
                    transition-duration: 0.3s !important;
                }
                .parallax-element {
                    background-attachment: scroll !important;
                }
            `;
            document.head.appendChild(style);
        }
    }

    setupMobileScrollAnimations() {
        const animatedElements = document.querySelectorAll('.animate-on-scroll');
        
        const scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('mobile-animate-in');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -20px 0px'
        });

        animatedElements.forEach(element => {
            scrollObserver.observe(element);
        });
    }

    // ====================================
    // MOBILE PERFORMANCE
    // ====================================

    optimizeMobilePerformance() {
        this.setupMobileImageCompression();
        this.optimizeMobileScrolling();
        this.reduceMobileReflows();
        this.setupMobileMemoryManagement();
    }

    setupMobileImageCompression() {
        // Implement image compression for mobile
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            if (this.isMobile) {
                // Add loading="lazy" for native lazy loading
                img.setAttribute('loading', 'lazy');
                
                // Optimize image quality for mobile
                if (img.src.includes('.jpg') || img.src.includes('.jpeg')) {
                    img.style.imageRendering = 'optimizeQuality';
                }
            }
        });
    }

    optimizeMobileScrolling() {
        // Enable momentum scrolling on iOS
        if (this.deviceInfo.isIOS) {
            document.body.style.webkitOverflowScrolling = 'touch';
        }

        // Optimize scroll performance
        const scrollableElements = document.querySelectorAll('.scrollable, .mobile-nav-menu');
        scrollableElements.forEach(element => {
            element.style.webkitOverflowScrolling = 'touch';
            element.style.overflowScrolling = 'touch';
        });
    }

    reduceMobileReflows() {
        // Use transform instead of changing position properties
        const animatedElements = document.querySelectorAll('.animate-element');
        animatedElements.forEach(element => {
            element.style.willChange = 'transform, opacity';
        });
    }

    setupMobileMemoryManagement() {
        // Clean up event listeners and observers when not needed
        window.addEventListener('pagehide', () => {
            this.cleanup();
        });

        // Monitor memory usage (if available)
        if ('memory' in performance) {
            setInterval(() => {
                if (performance.memory.usedJSHeapSize > 50 * 1024 * 1024) { // 50MB
                    this.performMemoryCleanup();
                }
            }, 30000);
        }
    }

    performMemoryCleanup() {
        // Remove unused event listeners
        // Clear caches
        // Trigger garbage collection if possible
        if (window.gc) {
            window.gc();
        }
    }

    // ====================================
    // MOBILE ACCESSIBILITY
    // ====================================

    setupMobileAccessibility() {
        this.setupMobileFocusManagement();
        this.setupMobileScreenReader();
        this.setupMobileVoiceOver();
    }

    setupMobileFocusManagement() {
        // Ensure focus is visible on mobile
        const focusableElements = document.querySelectorAll(
            'a, button, input, textarea, select, [tabindex]'
        );

        focusableElements.forEach(element => {
            element.addEventListener('focus', () => {
                element.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            });
        });
    }

    setupMobileScreenReader() {
        // Add ARIA labels for mobile screen readers
        const images = document.querySelectorAll('img:not([alt])');
        images.forEach(img => {
            img.setAttribute('alt', 'Danborough College Image');
        });

        // Setup live regions for dynamic content
        const liveRegion = document.createElement('div');
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.style.position = 'absolute';
        liveRegion.style.left = '-10000px';
        liveRegion.id = 'mobile-live-region';
        document.body.appendChild(liveRegion);
    }

    setupMobileVoiceOver() {
        // iOS VoiceOver optimizations
        if (this.deviceInfo.isIOS) {
            const interactiveElements = document.querySelectorAll('.btn, .nav-link, .program-card');
            interactiveElements.forEach(element => {
                element.setAttribute('role', 'button');
                if (!element.getAttribute('aria-label')) {
                    element.setAttribute('aria-label', element.textContent.trim());
                }
            });
        }
    }

    announceToMobileScreenReader(message) {
        const liveRegion = document.getElementById('mobile-live-region');
        if (liveRegion) {
            liveRegion.textContent = message;
            setTimeout(() => {
                liveRegion.textContent = '';
            }, 1000);
        }
    }

    // ====================================
    // TAB NAVIGATION
    // ====================================

    nextTab() {
        const tabs = document.querySelectorAll('.nav-tabs .nav-link');
        const activeTab = document.querySelector('.nav-tabs .nav-link.active');
        const currentIndex = Array.from(tabs).indexOf(activeTab);
        const nextIndex = (currentIndex + 1) % tabs.length;
        
        tabs[nextIndex].click();
        this.announceToMobileScreenReader(`Switched to ${tabs[nextIndex].textContent} tab`);
    }

    previousTab() {
        const tabs = document.querySelectorAll('.nav-tabs .nav-link');
        const activeTab = document.querySelector('.nav-tabs .nav-link.active');
        const currentIndex = Array.from(tabs).indexOf(activeTab);
        const prevIndex = (currentIndex - 1 + tabs.length) % tabs.length;
        
        tabs[prevIndex].click();
        this.announceToMobileScreenReader(`Switched to ${tabs[prevIndex].textContent} tab`);
    }

    // ====================================
    // EVENT HANDLERS
    // ====================================

    handleResize() {
        const wasMobile = this.isMobile;
        this.isMobile = window.innerWidth <= this.breakpoints.mobile;

        if (wasMobile !== this.isMobile) {
            if (this.isMobile) {
                this.initializeMobileFeatures();
            } else {
                this.cleanupMobileFeatures();
            }
        }

        if (this.isMobile) {
            this.adjustMobileSpacing();
        }
    }

    handleOrientationChange() {
        setTimeout(() => {
            this.deviceInfo.orientation = window.innerHeight > window.innerWidth ? 'portrait' : 'landscape';
            document.body.classList.toggle('portrait', this.deviceInfo.orientation === 'portrait');
            document.body.classList.toggle('landscape', this.deviceInfo.orientation === 'landscape');
            
            this.adjustForOrientation();
        }, 100);
    }

    adjustForOrientation() {
        if (this.deviceInfo.orientation === 'landscape' && this.isMobile) {
            // Adjust layout for landscape mode
            const hero = document.querySelector('#hero');
            if (hero) {
                hero.style.minHeight = '100vh';
            }
        }
    }

    handleScroll() {
        if (this.isMobile) {
            this.updateMobileScrollIndicator();
            this.handleMobileScrollEffects();
        }
    }

    updateMobileScrollIndicator() {
        const scrollProgress = (window.pageYOffset / (document.body.scrollHeight - window.innerHeight)) * 100;
        const indicator = document.querySelector('.mobile-scroll-indicator');
        
        if (indicator) {
            indicator.style.width = `${scrollProgress}%`;
        }
    }

    handleMobileScrollEffects() {
        // Hide/show elements based on scroll direction
        const currentScrollY = window.pageYOffset;
        const scrollDirection = currentScrollY > this.lastScrollY ? 'down' : 'up';
        
        const hideOnScroll = document.querySelectorAll('.hide-on-scroll');
        hideOnScroll.forEach(element => {
            if (scrollDirection === 'down' && currentScrollY > 100) {
                element.style.transform = 'translateY(-100%)';
            } else {
                element.style.transform = 'translateY(0)';
            }
        });

        this.lastScrollY = currentScrollY;
    }

    handleViewportChange() {
        // Handle viewport changes (e.g., when browser UI shows/hides)
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }

    setupMobileInteractions() {
        this.preventZoom();
        this.setupMobileMenuInteractions();
        this.setupMobileFormInteractions();
    }

    preventZoom() {
        // Prevent double-tap zoom
        let lastTouchEnd = 0;
        document.addEventListener('touchend', (e) => {
            const now = Date.now();
            if (now - lastTouchEnd <= 300) {
                e.preventDefault();
            }
            lastTouchEnd = now;
        }, false);
    }

    setupMobileMenuInteractions() {
        // Add haptic feedback if supported
        if ('vibrate' in navigator) {
            const menuToggle = document.querySelector('.mobile-menu-toggle');
            if (menuToggle) {
                menuToggle.addEventListener('click', () => {
                    navigator.vibrate(50);
                });
            }
        }
    }

    setupMobileFormInteractions() {
        // Handle form submission with mobile optimizations
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                this.handleMobileFormSubmit(e);
            });
        });
    }

    handleMobileFormSubmit(e) {
        // Show loading state
        const submitButton = e.target.querySelector('button[type="submit"]');
        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = 'Submitting...';
            
            // Re-enable after timeout (in case of network issues)
            setTimeout(() => {
                submitButton.disabled = false;
                submitButton.textContent = 'Submit';
            }, 10000);
        }
    }

    setupTouchEventListeners() {
        // Setup global touch event optimizations
        document.addEventListener('touchstart', () => {}, { passive: true });
        document.addEventListener('touchmove', () => {}, { passive: true });
        document.addEventListener('touchend', () => {}, { passive: true });
    }

    // ====================================
    // CLEANUP METHODS
    // ====================================

    cleanupMobileFeatures() {
        // Remove mobile-specific classes and styles
        document.body.classList.remove('keyboard-open', 'portrait', 'landscape');
        
        // Reset mobile-specific styles
        const elements = document.querySelectorAll('*[style]');
        elements.forEach(element => {
            // Reset specific mobile styles
            element.style.webkitOverflowScrolling = '';
            element.style.overflowScrolling = '';
        });
    }

    cleanup() {
        // Cleanup method called on page unload
        if (this.scrollObserver) {
            this.scrollObserver.disconnect();
        }
        if (this.imageObserver) {
            this.imageObserver.disconnect();
        }
    }

    // ====================================
    // UTILITY METHODS
    // ====================================

    prefersReducedMotion() {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }

    debounce(func, wait) {
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

    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // ====================================
    // PUBLIC API
    // ====================================

    getCurrentBreakpoint() {
        const width = window.innerWidth;
        if (width <= this.breakpoints.tinyMobile) return 'tinyMobile';
        if (width <= this.breakpoints.smallMobile) return 'smallMobile';
        if (width <= this.breakpoints.mobile) return 'mobile';
        if (width <= this.breakpoints.largeMobile) return 'largeMobile';
        return 'desktop';
    }

    isCurrentlyMobile() {
        return this.isMobile;
    }

    getDeviceInfo() {
        return this.deviceInfo;
    }

    updateLayout() {
        this.setupMobileLayouts();
    }

    refreshAnimations() {
        this.setupMobileAnimations();
    }
}

// Initialize Mobile Responsive Manager
const mobileResponsive = new MobileResponsive();

// Export for global access
window.MobileResponsive = mobileResponsive;

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MobileResponsive;
}
