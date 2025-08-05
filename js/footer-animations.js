/* ====================================
   Footer JavaScript Functionality
   Inspired by Haas Hall Academy Design
   ==================================== */

// Footer Animation and Interaction Handler
document.addEventListener('DOMContentLoaded', function() {
    
    // Counter Animation for Statistics
    function setupCounterAnimation() {
        const counters = document.querySelectorAll('.stat-number[data-count]');
        
        const animateCounter = (counter) => {
            const target = parseInt(counter.getAttribute('data-count'));
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60fps
            let current = 0;
            
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };
            
            updateCounter();
        };

        // Intersection Observer for triggering counter animation
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                    entry.target.classList.add('counted');
                    animateCounter(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }

    // Newsletter Form Handling
    function setupNewsletterForm() {
        const form = document.getElementById('footerNewsletterForm');
        if (!form) return;

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const firstName = form.querySelector('input[placeholder="First Name"]').value;
            const lastName = form.querySelector('input[placeholder="Last Name"]').value;
            const email = form.querySelector('input[placeholder="Email Address"]').value;
            const confirmEmail = form.querySelector('input[placeholder="Confirm Email"]').value;

            // Validation
            if (!validateNewsletterForm(firstName, lastName, email, confirmEmail)) {
                return;
            }

            // Show loading state
            const submitBtn = form.querySelector('.btn-newsletter');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Subscribing...';
            submitBtn.disabled = true;

            // Simulate API call
            setTimeout(() => {
                showNotification(`Thank you ${firstName}! You've been subscribed to our newsletter.`, 'success');
                form.reset();
                
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }

    // Form Validation
    function validateNewsletterForm(firstName, lastName, email, confirmEmail) {
        if (!firstName.trim()) {
            showNotification('Please enter your first name.', 'error');
            return false;
        }

        if (!lastName.trim()) {
            showNotification('Please enter your last name.', 'error');
            return false;
        }

        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address.', 'error');
            return false;
        }

        if (email !== confirmEmail) {
            showNotification('Email addresses do not match.', 'error');
            return false;
        }

        return true;
    }

    // Email Validation
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Parallax Effect for Pre-Footer
    function setupParallaxEffect() {
        const preFooter = document.querySelector('.pre-footer-cta');
        if (!preFooter) return;

        // Enhanced parallax effect with subtle movement
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const viewportHeight = window.innerHeight;
            const elementTop = preFooter.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < viewportHeight - elementVisible) {
                const rate = (scrolled * 0.15) % 50;
                preFooter.style.backgroundPosition = `center ${rate}px`;
            }
        });
        
        // Add mouse movement effect to the pre-footer section
        preFooter.addEventListener('mousemove', function(e) {
            const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
            const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
            
            preFooter.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
        });
        
        preFooter.addEventListener('mouseleave', function() {
            preFooter.style.transform = 'translate3d(0, 0, 0)';
        });
        
        // Enhance ZIMSEC logo animation
        const accreditationBadge = document.querySelector('.accreditation-badge');
        if (accreditationBadge) {
            accreditationBadge.addEventListener('mouseenter', function() {
                const img = this.querySelector('img');
                if (img) {
                    img.style.transform = 'scale(1.1) rotate(2deg)';
                }
            });
            
            accreditationBadge.addEventListener('mouseleave', function() {
                const img = this.querySelector('img');
                if (img) {
                    img.style.transform = 'scale(1) rotate(0deg)';
                }
            });
        }
    }

    // Enhanced Scroll Animations
    function setupScrollAnimations() {
        // Social icons hover effect enhancement
        const socialIcons = document.querySelectorAll('.footer-social a');
        socialIcons.forEach(icon => {
            icon.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px) scale(1.1) rotate(5deg)';
            });
            
            icon.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1) rotate(0deg)';
            });
        });

        // Link hover effects
        const footerLinks = document.querySelectorAll('.footer-widget ul li a');
        footerLinks.forEach(link => {
            link.addEventListener('mouseenter', function() {
                this.style.paddingLeft = '10px';
            });
            
            link.addEventListener('mouseleave', function() {
                this.style.paddingLeft = '0px';
            });
        });
    }

    // Notification System
    function setupNotificationSystem() {
        // Create notification container if it doesn't exist
        if (!document.querySelector('.notification-container')) {
            const container = document.createElement('div');
            container.className = 'notification-container';
            container.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 10000;
                max-width: 400px;
            `;
            document.body.appendChild(container);
        }
    }

    // Show Notification
    function showNotification(message, type = 'info') {
        const container = document.querySelector('.notification-container');
        if (!container) return;

        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        
        const icon = getNotificationIcon(type);
        notification.innerHTML = `
            <div class="notification-content" style="display: flex; align-items: center; gap: 10px; flex: 1;">
                <i class="${icon}" style="font-size: 1.2rem; color: ${getNotificationColor(type)};"></i>
                <span style="color: #333; font-weight: 500; font-size: 0.9rem;">${message}</span>
            </div>
            <button class="notification-close" style="background: none; border: none; color: #666; cursor: pointer; padding: 5px; border-radius: 50%; transition: all 0.3s ease; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center;">
                <i class="fas fa-times"></i>
            </button>
        `;

        // Style the notification
        notification.style.cssText = `
            background: rgba(255, 255, 255, 0.95);
            border-radius: 10px;
            padding: 15px 20px;
            margin-bottom: 15px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            border-left: 4px solid ${getNotificationColor(type)};
            backdrop-filter: blur(10px);
            display: flex;
            align-items: center;
            justify-content: space-between;
            transform: translateX(400px);
            opacity: 0;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
        `;

        container.appendChild(notification);

        // Add show class for animation
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
            notification.style.opacity = '1';
        }, 100);

        // Auto remove after 5 seconds
        const autoRemove = setTimeout(() => {
            removeNotification(notification);
        }, 5000);

        // Manual close
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', function() {
            clearTimeout(autoRemove);
            removeNotification(notification);
        });

        closeBtn.addEventListener('mouseenter', function() {
            this.style.background = 'rgba(0, 0, 0, 0.1)';
            this.style.color = '#333';
            this.style.transform = 'scale(1.1)';
        });

        closeBtn.addEventListener('mouseleave', function() {
            this.style.background = 'none';
            this.style.color = '#666';
            this.style.transform = 'scale(1)';
        });
    }

    // Remove Notification
    function removeNotification(notification) {
        notification.style.transform = 'translateX(400px)';
        notification.style.opacity = '0';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }

    // Get Notification Icon
    function getNotificationIcon(type) {
        const icons = {
            success: 'fas fa-check-circle',
            error: 'fas fa-exclamation-circle',
            warning: 'fas fa-exclamation-triangle',
            info: 'fas fa-info-circle'
        };
        return icons[type] || icons.info;
    }

    // Get Notification Color
    function getNotificationColor(type) {
        const colors = {
            success: '#28a745',
            error: '#dc3545',
            warning: '#ffc107',
            info: '#17a2b8'
        };
        return colors[type] || colors.info;
    }

    // Copy email to clipboard
    function copyEmail(email) {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(email).then(() => {
                showNotification('Email copied to clipboard!', 'success');
            }).catch(() => {
                showNotification('Failed to copy email', 'error');
            });
        } else {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = email;
            document.body.appendChild(textArea);
            textArea.select();
            try {
                document.execCommand('copy');
                showNotification('Email copied to clipboard!', 'success');
            } catch (err) {
                showNotification('Failed to copy email', 'error');
            }
            document.body.removeChild(textArea);
        }
    }

    // Add click-to-copy functionality to email links
    function setupEmailCopy() {
        const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
        emailLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const email = this.getAttribute('href').replace('mailto:', '');
                copyEmail(email);
            });
        });
    }

    // Enhanced CTA Button Animations
    function setupCTAButtonAnimations() {
        const ctaButtons = document.querySelectorAll('.btn-cta');
        if (!ctaButtons.length) return;
        
        ctaButtons.forEach(button => {
            // Add ripple effect on click
            button.addEventListener('click', function(e) {
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const ripple = document.createElement('span');
                ripple.style.position = 'absolute';
                ripple.style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
                ripple.style.borderRadius = '50%';
                ripple.style.width = '0';
                ripple.style.height = '0';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                ripple.style.transform = 'translate(-50%, -50%)';
                ripple.style.animation = 'ripple 0.6s linear';
                
                button.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
            
            // Add hover animation
            button.addEventListener('mouseenter', function() {
                const icon = this.querySelector('i');
                if (icon) {
                    if (this.classList.contains('btn-cta-primary')) {
                        icon.style.transform = 'translateX(5px) scale(1.2)';
                    } else {
                        icon.style.transform = 'rotate(-15deg) scale(1.2)';
                    }
                }
            });
            
            button.addEventListener('mouseleave', function() {
                const icon = this.querySelector('i');
                if (icon) {
                    icon.style.transform = 'translateX(0) scale(1) rotate(0)';
                }
            });
        });
    }
    
    // Add ripple animation style
    function addRippleStyle() {
        if (!document.getElementById('ripple-style')) {
            const style = document.createElement('style');
            style.id = 'ripple-style';
            style.textContent = `
                @keyframes ripple {
                    0% {
                        width: 0;
                        height: 0;
                        opacity: 0.8;
                    }
                    100% {
                        width: 500px;
                        height: 500px;
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    // Initialize all footer functionality
    function init() {
        setupCounterAnimation();
        setupNewsletterForm();
        setupParallaxEffect();
        setupScrollAnimations();
        setupNotificationSystem();
        setupEmailCopy();
        setupCTAButtonAnimations();
        addRippleStyle();
    }

    // Start initialization
    init();

    // Export functions for external use
    window.FooterUtils = {
        showNotification: showNotification,
        copyEmail: copyEmail
    };
});
