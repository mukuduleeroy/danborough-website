/*
   Desktop Responsive JavaScript
   Danborough Group of Colleges
   Author: GitHub Copilot
   Date: July 24, 2025
*/

class DesktopResponsive {
    constructor() {
        this.isDesktop = window.innerWidth >= 992;
        this.breakpoints = {
            largeDesktop: 1400,
            desktop: 1200,
            mediumDesktop: 992,
            tablet: 768,
            mobile: 480
        };
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initializeDesktopFeatures();
        this.setupParallaxEffects();
        this.setupDesktopAnimations();
        this.optimizeDesktopPerformance();
    }

    setupEventListeners() {
        window.addEventListener('resize', this.debounce(() => {
            this.handleResize();
        }, 250));

        window.addEventListener('scroll', this.throttle(() => {
            this.handleScroll();
        }, 16));

        window.addEventListener('load', () => {
            this.handlePageLoad();
        });

        document.addEventListener('DOMContentLoaded', () => {
            this.setupDesktopInteractions();
        });
    }

    // ====================================
    // DESKTOP FEATURE INITIALIZATION
    // ====================================

    initializeDesktopFeatures() {
        if (!this.isDesktop) return;

        this.setupGridLayouts();
        this.setupDesktopNavigation();
        this.setupAdvancedAnimations();
        this.setupKeyboardShortcuts();
        this.setupDesktopTooltips();
    }

    setupGridLayouts() {
        const containers = document.querySelectorAll('.container');
        containers.forEach(container => {
            if (window.innerWidth >= this.breakpoints.largeDesktop) {
                container.style.maxWidth = '1320px';
            } else if (window.innerWidth >= this.breakpoints.desktop) {
                container.style.maxWidth = '1140px';
            } else if (window.innerWidth >= this.breakpoints.mediumDesktop) {
                container.style.maxWidth = '960px';
            }
        });

        // Setup dynamic grid layouts
        this.setupDynamicGrids();
    }

    setupDynamicGrids() {
        const featuresGrid = document.querySelector('.features-grid');
        const programsGrid = document.querySelector('.programs-grid');

        if (featuresGrid) {
            this.updateGridColumns(featuresGrid, 'features');
        }

        if (programsGrid) {
            this.updateGridColumns(programsGrid, 'programs');
        }
    }

    updateGridColumns(grid, type) {
        const width = window.innerWidth;
        let columns;

        if (width >= this.breakpoints.largeDesktop) {
            columns = type === 'features' ? 4 : 3;
        } else if (width >= this.breakpoints.desktop) {
            columns = type === 'features' ? 4 : 3;
        } else if (width >= this.breakpoints.mediumDesktop) {
            columns = type === 'features' ? 2 : 2;
        } else {
            columns = 1;
        }

        grid.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
    }

    // ====================================
    // PARALLAX EFFECTS
    // ====================================

    setupParallaxEffects() {
        if (!this.isDesktop) return;

        this.parallaxElements = [
            {
                element: document.querySelector('.hero-background'),
                speed: 0.5
            },
            {
                element: document.querySelector('#about'),
                speed: 0.3
            },
            {
                element: document.querySelector('#programs'),
                speed: 0.4
            },
            {
                element: document.querySelector('#newsletter'),
                speed: 0.6
            },
            {
                element: document.querySelector('#join-danborough'),
                speed: 0.5
            }
        ].filter(item => item.element);

        this.updateParallax();
    }

    updateParallax() {
        if (!this.isDesktop || this.prefersReducedMotion()) return;

        const scrollTop = window.pageYOffset;

        this.parallaxElements.forEach(({ element, speed }) => {
            const rect = element.getBoundingClientRect();
            const elementTop = rect.top + scrollTop;
            const elementHeight = rect.height;
            const windowHeight = window.innerHeight;

            // Check if element is in viewport
            if (scrollTop + windowHeight > elementTop && scrollTop < elementTop + elementHeight) {
                const yPos = -(scrollTop - elementTop) * speed;
                element.style.transform = `translate3d(0, ${yPos}px, 0)`;
            }
        });
    }

    // ====================================
    // DESKTOP ANIMATIONS
    // ====================================

    setupDesktopAnimations() {
        if (!this.isDesktop) return;

        this.setupIntersectionObserver();
        this.setupHoverEffects();
        this.setupAdvancedTransitions();
    }

    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        };

        this.animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.triggerDesktopAnimation(entry.target);
                }
            });
        }, observerOptions);

        // Observe elements for animation
        const animateElements = document.querySelectorAll(
            '.feature-box, .program-card, .about-image, .join-image, .section-header'
        );

        animateElements.forEach(el => {
            el.classList.add('desktop-fade-in');
            this.animationObserver.observe(el);
        });
    }

    triggerDesktopAnimation(element) {
        if (this.prefersReducedMotion()) {
            element.style.opacity = '1';
            element.style.transform = 'none';
            return;
        }

        element.classList.add('visible');
        
        // Add staggered animation for grid items
        if (element.closest('.features-grid, .programs-grid')) {
            const siblings = Array.from(element.parentElement.children);
            const index = siblings.indexOf(element);
            element.style.animationDelay = `${index * 0.1}s`;
        }
    }

    setupHoverEffects() {
        // Enhanced hover effects for desktop
        const interactiveElements = document.querySelectorAll(
            '.feature-box, .program-card, .btn, .social-icon'
        );

        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', (e) => {
                this.handleMouseEnter(e.target);
            });

            element.addEventListener('mouseleave', (e) => {
                this.handleMouseLeave(e.target);
            });
        });
    }

    handleMouseEnter(element) {
        if (!this.isDesktop || this.prefersReducedMotion()) return;

        element.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        
        if (element.classList.contains('feature-box')) {
            element.style.transform = 'translateY(-15px) scale(1.02)';
            element.style.boxShadow = '0 25px 60px rgba(30, 136, 41, 0.2)';
        } else if (element.classList.contains('program-card')) {
            element.style.transform = 'translateY(-10px) scale(1.02)';
            element.style.boxShadow = '0 30px 70px rgba(30, 136, 41, 0.25)';
        }
    }

    handleMouseLeave(element) {
        if (!this.isDesktop) return;

        element.style.transform = '';
        element.style.boxShadow = '';
    }

    setupAdvancedTransitions() {
        // Setup smooth page transitions
        const links = document.querySelectorAll('a[href^="#"]');
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                this.handleSmoothScroll(e);
            });
        });
    }

    handleSmoothScroll(event) {
        const href = event.currentTarget.getAttribute('href');
        const target = document.querySelector(href);
        
        if (target) {
            event.preventDefault();
            
            const offsetTop = target.offsetTop - 80;
            const startPosition = window.pageYOffset;
            const distance = offsetTop - startPosition;
            const duration = 800;
            let start = null;

            const animation = (currentTime) => {
                if (start === null) start = currentTime;
                const timeElapsed = currentTime - start;
                const run = this.easeInOutQuad(timeElapsed, startPosition, distance, duration);
                window.scrollTo(0, run);
                if (timeElapsed < duration) requestAnimationFrame(animation);
            };

            requestAnimationFrame(animation);
        }
    }

    easeInOutQuad(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    // ====================================
    // KEYBOARD SHORTCUTS
    // ====================================

    setupKeyboardShortcuts() {
        if (!this.isDesktop) return;

        document.addEventListener('keydown', (e) => {
            // Only activate shortcuts when not in input fields
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

            switch (e.key) {
                case 'h':
                case 'H':
                    if (e.ctrlKey || e.metaKey) {
                        e.preventDefault();
                        this.scrollToSection('#hero');
                    }
                    break;
                case 'a':
                case 'A':
                    if (e.ctrlKey || e.metaKey) {
                        e.preventDefault();
                        this.scrollToSection('#about');
                    }
                    break;
                case 'p':
                case 'P':
                    if (e.ctrlKey || e.metaKey) {
                        e.preventDefault();
                        this.scrollToSection('#programs');
                    }
                    break;
                case 'c':
                case 'C':
                    if (e.ctrlKey || e.metaKey) {
                        e.preventDefault();
                        window.location.href = 'contact.html';
                    }
                    break;
                case 'Escape':
                    this.closeAllModals();
                    break;
            }
        });
    }

    scrollToSection(selector) {
        const section = document.querySelector(selector);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    closeAllModals() {
        // Close any open modals or overlays
        const modals = document.querySelectorAll('.modal, .overlay');
        modals.forEach(modal => {
            if (modal.classList.contains('active') || modal.classList.contains('show')) {
                modal.classList.remove('active', 'show');
            }
        });
    }

    // ====================================
    // DESKTOP TOOLTIPS
    // ====================================

    setupDesktopTooltips() {
        if (!this.isDesktop) return;

        const tooltipElements = document.querySelectorAll('[data-tooltip]');
        
        tooltipElements.forEach(element => {
            element.addEventListener('mouseenter', (e) => {
                this.showTooltip(e.target);
            });

            element.addEventListener('mouseleave', (e) => {
                this.hideTooltip(e.target);
            });
        });
    }

    showTooltip(element) {
        const tooltipText = element.getAttribute('data-tooltip');
        if (!tooltipText) return;

        const tooltip = document.createElement('div');
        tooltip.className = 'desktop-tooltip';
        tooltip.textContent = tooltipText;
        tooltip.style.cssText = `
            position: absolute;
            background: var(--text-color);
            color: white;
            padding: 8px 12px;
            border-radius: 6px;
            font-size: 0.8rem;
            white-space: nowrap;
            z-index: 1000;
            opacity: 0;
            transform: translateY(10px);
            transition: all 0.3s ease;
            pointer-events: none;
        `;

        document.body.appendChild(tooltip);

        const rect = element.getBoundingClientRect();
        tooltip.style.left = `${rect.left + rect.width / 2 - tooltip.offsetWidth / 2}px`;
        tooltip.style.top = `${rect.top - tooltip.offsetHeight - 10}px`;

        requestAnimationFrame(() => {
            tooltip.style.opacity = '1';
            tooltip.style.transform = 'translateY(0)';
        });

        element._tooltip = tooltip;
    }

    hideTooltip(element) {
        if (element._tooltip) {
            element._tooltip.style.opacity = '0';
            element._tooltip.style.transform = 'translateY(10px)';
            
            setTimeout(() => {
                if (element._tooltip && element._tooltip.parentNode) {
                    element._tooltip.parentNode.removeChild(element._tooltip);
                }
                delete element._tooltip;
            }, 300);
        }
    }

    // ====================================
    // PERFORMANCE OPTIMIZATION
    // ====================================

    optimizeDesktopPerformance() {
        if (!this.isDesktop) return;

        // Preload critical images
        this.preloadImages();
        
        // Setup lazy loading for non-critical images
        this.setupLazyLoading();
        
        // Optimize animations
        this.optimizeAnimations();
    }

    preloadImages() {
        const criticalImages = [
            'images/hero1.jpg',
            'images/campus1.jpg',
            'images/campus2.jpg',
            'images/about-college.jpg'
        ];

        criticalImages.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }

    setupLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    optimizeAnimations() {
        // Use will-change property for animated elements
        const animatedElements = document.querySelectorAll(
            '.feature-box, .program-card, .hero-background'
        );

        animatedElements.forEach(element => {
            element.style.willChange = 'transform, opacity';
        });
    }

    // ====================================
    // EVENT HANDLERS
    // ====================================

    handleResize() {
        const wasDesktop = this.isDesktop;
        this.isDesktop = window.innerWidth >= this.breakpoints.mediumDesktop;

        if (wasDesktop !== this.isDesktop) {
            if (this.isDesktop) {
                this.initializeDesktopFeatures();
            } else {
                this.cleanupDesktopFeatures();
            }
        }

        if (this.isDesktop) {
            this.setupGridLayouts();
        }
    }

    handleScroll() {
        if (this.isDesktop) {
            this.updateParallax();
            this.updateScrollIndicator();
        }
    }

    handlePageLoad() {
        if (this.isDesktop) {
            this.optimizeDesktopPerformance();
            this.setupAdvancedFeatures();
        }
    }

    setupDesktopInteractions() {
        if (!this.isDesktop) return;

        // Setup right-click context menu (if needed)
        document.addEventListener('contextmenu', (e) => {
            // Custom context menu logic here if needed
        });

        // Setup drag and drop (if needed)
        this.setupDragAndDrop();
    }

    setupDragAndDrop() {
        // Placeholder for drag and drop functionality
        // Can be extended based on specific needs
    }

    updateScrollIndicator() {
        const scrollProgress = (window.pageYOffset / (document.body.scrollHeight - window.innerHeight)) * 100;
        const indicator = document.querySelector('.scroll-indicator');
        
        if (indicator) {
            indicator.style.width = `${scrollProgress}%`;
        }
    }

    setupAdvancedFeatures() {
        // Setup advanced desktop features like:
        // - Multi-column layouts
        // - Advanced grid systems
        // - Desktop-specific UI elements
        this.setupMultiColumnLayouts();
        this.setupAdvancedGrids();
    }

    setupMultiColumnLayouts() {
        const textBlocks = document.querySelectorAll('.desktop-multi-column');
        textBlocks.forEach(block => {
            if (window.innerWidth >= this.breakpoints.largeDesktop) {
                block.style.columnCount = '2';
                block.style.columnGap = '40px';
            }
        });
    }

    setupAdvancedGrids() {
        // Setup CSS Grid with advanced features for desktop
        const advancedGrids = document.querySelectorAll('.desktop-advanced-grid');
        advancedGrids.forEach(grid => {
            if (window.innerWidth >= this.breakpoints.desktop) {
                grid.style.display = 'grid';
                grid.style.gridTemplateAreas = '"header header" "sidebar main" "footer footer"';
            }
        });
    }

    // ====================================
    // CLEANUP METHODS
    // ====================================

    cleanupDesktopFeatures() {
        // Remove desktop-specific event listeners and styles
        if (this.animationObserver) {
            this.animationObserver.disconnect();
        }

        // Reset parallax transforms
        this.parallaxElements?.forEach(({ element }) => {
            if (element) {
                element.style.transform = '';
            }
        });

        // Remove desktop tooltips
        const tooltips = document.querySelectorAll('.desktop-tooltip');
        tooltips.forEach(tooltip => tooltip.remove());
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
        if (width >= this.breakpoints.largeDesktop) return 'largeDesktop';
        if (width >= this.breakpoints.desktop) return 'desktop';
        if (width >= this.breakpoints.mediumDesktop) return 'mediumDesktop';
        if (width >= this.breakpoints.tablet) return 'tablet';
        return 'mobile';
    }

    isCurrentlyDesktop() {
        return this.isDesktop;
    }

    updateLayout() {
        this.setupGridLayouts();
    }

    refreshAnimations() {
        this.setupDesktopAnimations();
    }
}

// Initialize Desktop Responsive Manager
const desktopResponsive = new DesktopResponsive();

// Export for global access
window.DesktopResponsive = desktopResponsive;

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DesktopResponsive;
}
