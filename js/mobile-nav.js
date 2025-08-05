/*
   Mobile Navigation JavaScript
   Danborough Group of Colleges
   Author: GitHub Copilot
   Date: July 24, 2025
*/

class MobileNavigation {
    constructor() {
        this.isMobileMenuOpen = false;
        this.activeDropdown = null;
        this.init();
    }

    init() {
        this.bindEvents();
        this.setupAccessibility();
        this.setupTouchEvents();
        this.detectMobileDevice();
    }

    bindEvents() {
        document.addEventListener('DOMContentLoaded', () => {
            this.setupMobileElements();
            this.bindMobileEvents();
        });

        window.addEventListener('resize', this.debounce(() => {
            this.handleResize();
        }, 250));

        window.addEventListener('orientationchange', () => {
            setTimeout(() => this.handleOrientationChange(), 100);
        });
    }

    setupMobileElements() {
        this.mobileToggle = document.querySelector('.mobile-menu-toggle');
        this.mobileMenu = document.querySelector('.mobile-nav-menu');
        this.mobileClose = document.querySelector('.mobile-close-btn');
        this.mobileOverlay = document.querySelector('.mobile-nav-overlay');
        this.mobileDropdowns = document.querySelectorAll('.mobile-dropdown');

        // Debug logging
        console.log('Mobile Navigation Setup:', {
            toggle: this.mobileToggle,
            menu: this.mobileMenu,
            close: this.mobileClose,
            overlay: this.mobileOverlay,
            dropdowns: this.mobileDropdowns.length
        });

        // Create overlay if it doesn't exist
        if (!this.mobileOverlay) {
            this.createMobileOverlay();
        }
    }

    createMobileOverlay() {
        this.mobileOverlay = document.createElement('div');
        this.mobileOverlay.className = 'mobile-nav-overlay';
        document.body.appendChild(this.mobileOverlay);
    }

    bindMobileEvents() {
        // Mobile menu toggle
        if (this.mobileToggle) {
            console.log('Binding click event to mobile toggle');
            
            // Add multiple event types for better mobile support
            this.mobileToggle.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Mobile toggle clicked');
                this.toggleMobileMenu();
            });

            this.mobileToggle.addEventListener('touchend', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Mobile toggle touched');
                this.toggleMobileMenu();
            });
        } else {
            console.error('Mobile toggle button not found!');
        }

        // Mobile close button
        if (this.mobileClose) {
            this.mobileClose.addEventListener('click', () => {
                this.closeMobileMenu();
            });
        }

        // Mobile overlay click
        if (this.mobileOverlay) {
            this.mobileOverlay.addEventListener('click', () => {
                this.closeMobileMenu();
            });
        }

        // Mobile dropdown toggles
        this.mobileDropdowns.forEach((dropdown, index) => {
            const trigger = dropdown.querySelector('.mobile-nav-link');
            if (trigger) {
                trigger.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.toggleMobileDropdown(dropdown);
                });

                // Add touch events for better mobile experience
                this.addTouchEvents(trigger, dropdown);
            }
        });

        // Keyboard events
        document.addEventListener('keydown', (e) => {
            this.handleKeydown(e);
        });

        // Prevent body scroll when menu is open
        document.addEventListener('touchmove', (e) => {
            if (this.isMobileMenuOpen && !this.isScrollableElement(e.target)) {
                e.preventDefault();
            }
        }, { passive: false });
    }

    // ====================================
    // MOBILE MENU METHODS
    // ====================================

    toggleMobileMenu() {
        console.log('Toggle mobile menu called, current state:', this.isMobileMenuOpen);
        
        if (this.isMobileMenuOpen) {
            this.closeMobileMenu();
        } else {
            this.openMobileMenu();
        }
    }

    openMobileMenu() {
        console.log('Opening mobile menu');
        
        if (!this.mobileMenu || !this.mobileOverlay) {
            console.error('Mobile menu elements not found:', {
                menu: this.mobileMenu,
                overlay: this.mobileOverlay
            });
            return;
        }

        // Add classes
        this.mobileMenu.classList.add('active');
        this.mobileOverlay.classList.add('active');
        this.mobileToggle?.classList.add('active');

        // Prevent body scroll
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.width = '100%';

        this.isMobileMenuOpen = true;
        console.log('Mobile menu opened successfully');

        // Announce to screen readers
        this.announceToScreenReader('Navigation menu opened');

        // Focus management
        setTimeout(() => {
            const firstLink = this.mobileMenu.querySelector('.mobile-nav-link');
            firstLink?.focus();
        }, 100);

        // Update ARIA attributes
        this.mobileToggle?.setAttribute('aria-expanded', 'true');

        // Add escape key listener
        this.addEscapeListener();
    }

    closeMobileMenu() {
        console.log('Closing mobile menu');
        
        if (!this.mobileMenu || !this.mobileOverlay) return;

        // Remove classes
        this.mobileMenu.classList.remove('active');
        this.mobileOverlay.classList.remove('active');
        this.mobileToggle?.classList.remove('active');

        // Restore body scroll
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.width = '';

        this.isMobileMenuOpen = false;
        console.log('Mobile menu closed successfully');

        // Close all dropdowns
        this.closeAllDropdowns();

        // Announce to screen readers
        this.announceToScreenReader('Navigation menu closed');

        // Update ARIA attributes
        this.mobileToggle?.setAttribute('aria-expanded', 'false');

        // Return focus to toggle button
        this.mobileToggle?.focus();

        // Remove escape key listener
        this.removeEscapeListener();
    }

    // ====================================
    // MOBILE DROPDOWN METHODS
    // ====================================

    toggleMobileDropdown(dropdown) {
        const isActive = dropdown.classList.contains('active');
        const trigger = dropdown.querySelector('.mobile-nav-link');
        const menu = dropdown.querySelector('.mobile-dropdown-menu');

        // Debug logging
        console.log('Toggle mobile dropdown', dropdown, isActive, menu);

        if (isActive) {
            this.closeMobileDropdown(dropdown);
        } else {
            // Close other dropdowns first
            this.closeAllDropdowns();
            this.openMobileDropdown(dropdown);
        }
    }

    openMobileDropdown(dropdown) {
        const trigger = dropdown.querySelector('.mobile-nav-link');
        const menu = dropdown.querySelector('.mobile-dropdown-menu');

        dropdown.classList.add('active');
        this.activeDropdown = dropdown;

        // Update ARIA attributes
        trigger?.setAttribute('aria-expanded', 'true');

        // Smooth scroll to show dropdown if needed
        setTimeout(() => {
            this.scrollToDropdown(dropdown);
        }, 300);

        // Announce to screen readers
        const dropdownName = trigger?.textContent?.trim() || 'Dropdown';
        this.announceToScreenReader(`${dropdownName} menu expanded`);
    }

    closeMobileDropdown(dropdown) {
        const trigger = dropdown.querySelector('.mobile-nav-link');

        dropdown.classList.remove('active');
        
        if (this.activeDropdown === dropdown) {
            this.activeDropdown = null;
        }

        // Update ARIA attributes
        trigger?.setAttribute('aria-expanded', 'false');
    }

    closeAllDropdowns() {
        this.mobileDropdowns.forEach(dropdown => {
            this.closeMobileDropdown(dropdown);
        });
    }

    scrollToDropdown(dropdown) {
        if (!this.mobileMenu) return;

        const menuRect = this.mobileMenu.getBoundingClientRect();
        const dropdownRect = dropdown.getBoundingClientRect();

        // Check if dropdown is fully visible
        if (dropdownRect.bottom > menuRect.bottom) {
            const scrollAmount = dropdownRect.bottom - menuRect.bottom + 20;
            this.mobileMenu.scrollTop += scrollAmount;
        }
    }

    // ====================================
    // TOUCH EVENTS
    // ====================================

    setupTouchEvents() {
        this.touchStartY = 0;
        this.touchEndY = 0;
    }

    addTouchEvents(trigger, dropdown) {
        let touchStartTime = 0;
        let touchEndTime = 0;

        trigger.addEventListener('touchstart', (e) => {
            touchStartTime = Date.now();
            this.touchStartY = e.touches[0].clientY;
        }, { passive: true });

        trigger.addEventListener('touchend', (e) => {
            touchEndTime = Date.now();
            this.touchEndY = e.changedTouches[0].clientY;

            const touchDuration = touchEndTime - touchStartTime;
            const touchDistance = Math.abs(this.touchEndY - this.touchStartY);

            // If it's a quick tap (not a scroll), treat as click
            if (touchDuration < 200 && touchDistance < 10) {
                e.preventDefault();
                this.toggleMobileDropdown(dropdown);
            }
        });
    }

    // ====================================
    // ACCESSIBILITY METHODS
    // ====================================

    setupAccessibility() {
        // Set initial ARIA attributes
        this.mobileToggle?.setAttribute('aria-expanded', 'false');
        this.mobileToggle?.setAttribute('aria-controls', 'mobile-nav-menu');
        this.mobileToggle?.setAttribute('aria-label', 'Open navigation menu');

        if (this.mobileMenu) {
            this.mobileMenu.setAttribute('id', 'mobile-nav-menu');
            this.mobileMenu.setAttribute('role', 'navigation');
            this.mobileMenu.setAttribute('aria-label', 'Mobile navigation');
        }

        // Set up dropdown ARIA attributes
        this.mobileDropdowns.forEach((dropdown, index) => {
            const trigger = dropdown.querySelector('.mobile-nav-link');
            const menu = dropdown.querySelector('.mobile-dropdown-menu');

            if (trigger && menu) {
                const menuId = `mobile-dropdown-${index}`;
                trigger.setAttribute('aria-haspopup', 'true');
                trigger.setAttribute('aria-expanded', 'false');
                trigger.setAttribute('aria-controls', menuId);
                menu.setAttribute('id', menuId);
                menu.setAttribute('role', 'menu');
            }
        });
    }

    announceToScreenReader(message) {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.style.position = 'absolute';
        announcement.style.left = '-10000px';
        announcement.style.width = '1px';
        announcement.style.height = '1px';
        announcement.style.overflow = 'hidden';
        announcement.textContent = message;

        document.body.appendChild(announcement);

        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    }

    // ====================================
    // EVENT HANDLERS
    // ====================================

    handleKeydown(e) {
        if (!this.isMobileMenuOpen) return;

        switch (e.key) {
            case 'Escape':
                this.closeMobileMenu();
                break;
            case 'Tab':
                this.handleTabNavigation(e);
                break;
            case 'ArrowUp':
            case 'ArrowDown':
                this.handleArrowNavigation(e);
                break;
            case 'Enter':
            case ' ':
                this.handleEnterSpace(e);
                break;
        }
    }

    handleTabNavigation(e) {
        const focusableElements = this.mobileMenu.querySelectorAll(
            'a[href], button, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
        }
    }

    handleArrowNavigation(e) {
        e.preventDefault();
        const currentFocus = document.activeElement;
        const navLinks = Array.from(this.mobileMenu.querySelectorAll('.mobile-nav-link, .mobile-dropdown-menu a'));
        const currentIndex = navLinks.indexOf(currentFocus);

        if (currentIndex === -1) return;

        let nextIndex;
        if (e.key === 'ArrowDown') {
            nextIndex = (currentIndex + 1) % navLinks.length;
        } else {
            nextIndex = (currentIndex - 1 + navLinks.length) % navLinks.length;
        }

        navLinks[nextIndex].focus();
    }

    handleEnterSpace(e) {
        if (e.target.classList.contains('mobile-nav-link')) {
            const dropdown = e.target.closest('.mobile-dropdown');
            if (dropdown) {
                e.preventDefault();
                this.toggleMobileDropdown(dropdown);
            }
        }
    }

    addEscapeListener() {
        this.escapeHandler = (e) => {
            if (e.key === 'Escape') {
                this.closeMobileMenu();
            }
        };
        document.addEventListener('keydown', this.escapeHandler);
    }

    removeEscapeListener() {
        if (this.escapeHandler) {
            document.removeEventListener('keydown', this.escapeHandler);
            this.escapeHandler = null;
        }
    }

    // ====================================
    // UTILITY METHODS
    // ====================================

    handleResize() {
        // Close mobile menu when resizing to desktop
        if (window.innerWidth > 768 && this.isMobileMenuOpen) {
            this.closeMobileMenu();
        }
    }

    handleOrientationChange() {
        // Adjust menu height on orientation change
        if (this.isMobileMenuOpen) {
            this.mobileMenu.style.height = `${window.innerHeight}px`;
            setTimeout(() => {
                this.mobileMenu.style.height = '100vh';
            }, 500);
        }
    }

    detectMobileDevice() {
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        if (isMobile) {
            document.body.classList.add('mobile-device');
        }
    }

    isScrollableElement(element) {
        const scrollableParent = element.closest('.mobile-nav-menu');
        return scrollableParent !== null;
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

    // ====================================
    // PUBLIC API
    // ====================================

    isOpen() {
        return this.isMobileMenuOpen;
    }

    open() {
        this.openMobileMenu();
    }

    close() {
        this.closeMobileMenu();
    }

    toggle() {
        this.toggleMobileMenu();
    }

    closeDropdowns() {
        this.closeAllDropdowns();
    }

    setActiveItem(href) {
        const links = this.mobileMenu.querySelectorAll('.mobile-nav-link, .mobile-dropdown-menu a');
        links.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === href) {
                link.classList.add('active');
            }
        });
    }
}

// Initialize mobile navigation
const mobileNavigation = new MobileNavigation();

// Export for global access
window.MobileNavigation = mobileNavigation;

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MobileNavigation;
}
