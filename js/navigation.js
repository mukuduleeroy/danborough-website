/*
   Navigation JavaScript - Desktop & Mobile
   Danborough Group of Colleges
   Author: GitHub Copilot
   Date: July 24, 2025
*/

class NavigationManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupMobileNavigation();
        this.setupDesktopNavigation();
        this.setupScrollEffects();
        this.setupAccessibility();
    }

    setupEventListeners() {
        // Wait for DOM to be fully loaded
        document.addEventListener('DOMContentLoaded', () => {
            this.bindEvents();
        });

        // Handle window resize
        window.addEventListener('resize', this.debounce(this.handleResize.bind(this), 250));
        
        // Handle window scroll
        window.addEventListener('scroll', this.throttle(this.handleScroll.bind(this), 16));
    }

    bindEvents() {
        // Mobile menu toggle
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        const mobileCloseBtn = document.querySelector('.mobile-close-btn');
        const mobileOverlay = document.querySelector('.mobile-nav-overlay');
        
        if (mobileToggle) {
            mobileToggle.addEventListener('click', () => this.toggleMobileMenu());
        }
        
        if (mobileCloseBtn) {
            mobileCloseBtn.addEventListener('click', () => this.closeMobileMenu());
        }
        
        if (mobileOverlay) {
            mobileOverlay.addEventListener('click', () => this.closeMobileMenu());
        }

        // Mobile dropdown toggles
        const mobileDropdowns = document.querySelectorAll('.mobile-dropdown');
        mobileDropdowns.forEach(dropdown => {
            const link = dropdown.querySelector('.mobile-nav-link');
            if (link) {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.toggleMobileDropdown(dropdown);
                });
            }
        });

        // Desktop dropdown hover effects (enhanced)
        const desktopDropdowns = document.querySelectorAll('.nav-dropdown');
        desktopDropdowns.forEach(dropdown => {
            let hoverTimeout;
            
            dropdown.addEventListener('mouseenter', () => {
                clearTimeout(hoverTimeout);
                this.showDesktopDropdown(dropdown);
                console.log('Showing desktop dropdown', dropdown);
            });
            
            dropdown.addEventListener('mouseleave', () => {
                hoverTimeout = setTimeout(() => {
                    this.hideDesktopDropdown(dropdown);
                }, 100); // Reduced delay for faster response
            });
            
            // Also add click handler for mobile touch devices
            const link = dropdown.querySelector('.hero-nav-link');
            if (link) {
                link.addEventListener('click', (e) => {
                    // Prevent default only on mobile touch devices
                    if (window.innerWidth <= 992) {
                        e.preventDefault();
                        this.toggleDesktopDropdown(dropdown);
                    }
                });
            }
        });

        // Smooth scrolling for anchor links
        const anchorLinks = document.querySelectorAll('a[href^="#"]');
        anchorLinks.forEach(link => {
            link.addEventListener('click', (e) => this.handleAnchorClick(e));
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => this.handleKeyboardNavigation(e));
    }

    // ====================================
    // MOBILE NAVIGATION METHODS
    // ====================================

    setupMobileNavigation() {
        // Set initial states
        this.isMobileMenuOpen = false;
        
        // Create mobile elements if they don't exist
        this.ensureMobileElements();
    }

    ensureMobileElements() {
        // This method ensures mobile navigation elements exist
        // Useful if pages are dynamically loaded
        if (!document.querySelector('.mobile-nav-overlay')) {
            const overlay = document.createElement('div');
            overlay.className = 'mobile-nav-overlay';
            document.body.appendChild(overlay);
        }
    }

    toggleMobileMenu() {
        const mobileMenu = document.querySelector('.mobile-nav-menu');
        const overlay = document.querySelector('.mobile-nav-overlay');
        const body = document.body;

        if (this.isMobileMenuOpen) {
            this.closeMobileMenu();
        } else {
            this.openMobileMenu();
        }
    }

    openMobileMenu() {
        const mobileMenu = document.querySelector('.mobile-nav-menu');
        const overlay = document.querySelector('.mobile-nav-overlay');
        const body = document.body;

        if (mobileMenu && overlay) {
            mobileMenu.classList.add('active');
            overlay.classList.add('active');
            body.style.overflow = 'hidden';
            this.isMobileMenuOpen = true;

            // Focus management for accessibility
            setTimeout(() => {
                const firstLink = mobileMenu.querySelector('.mobile-nav-link');
                if (firstLink) firstLink.focus();
            }, 100);
        }
    }

    closeMobileMenu() {
        const mobileMenu = document.querySelector('.mobile-nav-menu');
        const overlay = document.querySelector('.mobile-nav-overlay');
        const body = document.body;

        if (mobileMenu && overlay) {
            mobileMenu.classList.remove('active');
            overlay.classList.remove('active');
            body.style.overflow = '';
            this.isMobileMenuOpen = false;

            // Close all mobile dropdowns
            const openDropdowns = document.querySelectorAll('.mobile-dropdown.active');
            openDropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    }

    toggleMobileDropdown(dropdown) {
        const isActive = dropdown.classList.contains('active');
        
        // Close other dropdowns
        const allDropdowns = document.querySelectorAll('.mobile-dropdown');
        allDropdowns.forEach(dd => {
            if (dd !== dropdown) {
                dd.classList.remove('active');
            }
        });

        // Toggle current dropdown
        dropdown.classList.toggle('active', !isActive);
    }

    // ====================================
    // DESKTOP NAVIGATION METHODS
    // ====================================

    setupDesktopNavigation() {
        // Add enhanced hover effects and animations
        this.setupDesktopAnimations();
    }

    setupDesktopAnimations() {
        const navLinks = document.querySelectorAll('.hero-nav-link');
        
        navLinks.forEach(link => {
            link.addEventListener('mouseenter', () => this.animateNavLink(link, 'enter'));
            link.addEventListener('mouseleave', () => this.animateNavLink(link, 'leave'));
        });
    }

    animateNavLink(link, action) {
        if (action === 'enter') {
            link.style.transform = 'translateY(-2px)';
            link.style.textShadow = '0 0 10px rgba(255, 204, 0, 0.3)';
        } else {
            link.style.transform = '';
            link.style.textShadow = '';
        }
    }

    showDesktopDropdown(dropdown) {
        const menu = dropdown.querySelector('.dropdown-menu');
        if (menu) {
            menu.style.opacity = '1';
            menu.style.visibility = 'visible';
            // Simplified transform - no movement
            menu.style.transform = 'translateX(-50%)';
        }
    }

    hideDesktopDropdown(dropdown) {
        const menu = dropdown.querySelector('.dropdown-menu');
        if (menu) {
            menu.style.opacity = '0';
            menu.style.visibility = 'hidden';
            // Simplified transform - no movement
            menu.style.transform = 'translateX(-50%)';
        }
    }
    
    toggleDesktopDropdown(dropdown) {
        const menu = dropdown.querySelector('.dropdown-menu');
        if (!menu) return;
        
        const isVisible = menu.style.visibility === 'visible';
        
        if (isVisible) {
            this.hideDesktopDropdown(dropdown);
        } else {
            // Close all other dropdowns first
            document.querySelectorAll('.nav-dropdown').forEach(item => {
                if (item !== dropdown) {
                    this.hideDesktopDropdown(item);
                }
            });
            
            this.showDesktopDropdown(dropdown);
        }
    }

    // ====================================
    // SCROLL EFFECTS
    // ====================================

    setupScrollEffects() {
        this.lastScrollY = window.scrollY;
        this.scrollDirection = 'up';
    }

    handleScroll() {
        const currentScrollY = window.scrollY;
        this.scrollDirection = currentScrollY > this.lastScrollY ? 'down' : 'up';
        
        // Add/remove scrolled class based on scroll position
        const heroNav = document.querySelector('.hero-nav');
        if (heroNav) {
            if (currentScrollY > 100) {
                heroNav.classList.add('scrolled');
            } else {
                heroNav.classList.remove('scrolled');
            }
        }

        this.lastScrollY = currentScrollY;
    }

    // ====================================
    // ACCESSIBILITY FEATURES
    // ====================================

    setupAccessibility() {
        // Add ARIA attributes
        this.addAriaAttributes();
        
        // Setup focus management
        this.setupFocusManagement();
    }

    addAriaAttributes() {
        // Add ARIA labels to navigation elements
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        if (mobileToggle) {
            mobileToggle.setAttribute('aria-label', 'Toggle mobile navigation menu');
            mobileToggle.setAttribute('aria-expanded', 'false');
        }

        const dropdowns = document.querySelectorAll('.nav-dropdown, .mobile-dropdown');
        dropdowns.forEach((dropdown, index) => {
            const trigger = dropdown.querySelector('.hero-nav-link, .mobile-nav-link');
            const menu = dropdown.querySelector('.dropdown-menu, .mobile-dropdown-menu');
            
            if (trigger && menu) {
                const menuId = `dropdown-menu-${index}`;
                trigger.setAttribute('aria-haspopup', 'true');
                trigger.setAttribute('aria-expanded', 'false');
                trigger.setAttribute('aria-controls', menuId);
                menu.setAttribute('id', menuId);
                menu.setAttribute('role', 'menu');
            }
        });
    }

    setupFocusManagement() {
        // Trap focus within mobile menu when open
        const mobileMenu = document.querySelector('.mobile-nav-menu');
        if (mobileMenu) {
            mobileMenu.addEventListener('keydown', (e) => {
                if (e.key === 'Tab' && this.isMobileMenuOpen) {
                    this.trapFocus(e, mobileMenu);
                }
            });
        }
    }

    trapFocus(e, container) {
        const focusableElements = container.querySelectorAll(
            'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
        }
    }

    // ====================================
    // EVENT HANDLERS
    // ====================================

    handleResize() {
        // Close mobile menu on resize to desktop
        if (window.innerWidth > 768 && this.isMobileMenuOpen) {
            this.closeMobileMenu();
        }
    }

    handleAnchorClick(e) {
        const href = e.currentTarget.getAttribute('href');
        if (href && href.startsWith('#')) {
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                
                // Close mobile menu if open
                if (this.isMobileMenuOpen) {
                    this.closeMobileMenu();
                }

                // Smooth scroll to target
                const offsetTop = target.offsetTop - 80; // Account for fixed header
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });

                // Update URL hash
                history.pushState(null, null, href);
            }
        }
    }

    handleKeyboardNavigation(e) {
        // ESC key closes mobile menu
        if (e.key === 'Escape' && this.isMobileMenuOpen) {
            this.closeMobileMenu();
        }

        // Enter/Space activates dropdown toggles
        if ((e.key === 'Enter' || e.key === ' ') && e.target.classList.contains('mobile-nav-link')) {
            const dropdown = e.target.closest('.mobile-dropdown');
            if (dropdown) {
                e.preventDefault();
                this.toggleMobileDropdown(dropdown);
            }
        }
    }

    // ====================================
    // UTILITY METHODS
    // ====================================

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
    // PUBLIC API METHODS
    // ====================================

    // Method to manually trigger mobile menu
    openMobileMenuAPI() {
        this.openMobileMenu();
    }

    closeMobileMenuAPI() {
        this.closeMobileMenu();
    }

    // Method to set active navigation item
    setActiveNavItem(href) {
        // Remove active class from all nav links
        const allNavLinks = document.querySelectorAll('.hero-nav-link, .mobile-nav-link');
        allNavLinks.forEach(link => link.classList.remove('active'));

        // Add active class to matching links
        const matchingLinks = document.querySelectorAll(`a[href="${href}"]`);
        matchingLinks.forEach(link => {
            if (link.classList.contains('hero-nav-link') || link.classList.contains('mobile-nav-link')) {
                link.classList.add('active');
            }
        });
    }

    // Method to update navigation based on current page
    updateActiveNavigation() {
        const currentPath = window.location.pathname;
        const currentPage = currentPath.split('/').pop() || 'index.html';
        this.setActiveNavItem(currentPage);
    }
}

// Initialize Navigation Manager
const navigationManager = new NavigationManager();

// Export for use in other scripts if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = NavigationManager;
}

// Global access
window.NavigationManager = navigationManager;
