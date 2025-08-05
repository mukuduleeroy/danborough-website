/**
 * Enhanced Hero Enroll Now Button Animations and Interactions
 */

document.addEventListener('DOMContentLoaded', function() {
    const applyButton = document.querySelector('.btn-apply');
    
    if (!applyButton) return;
    
    // Add click ripple effect
    applyButton.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple-effect');
        
        // Add ripple styles
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.6)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s linear';
        ripple.style.pointerEvents = 'none';
        
        this.appendChild(ripple);
        
        // Remove ripple after animation
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
    
    // Add hover sound effect (optional - can be enabled if audio files are available)
    let hoverSoundEnabled = false; // Set to true if you want sound effects
    
    if (hoverSoundEnabled) {
        applyButton.addEventListener('mouseenter', function() {
            // You can add a subtle hover sound here
            // const audio = new Audio('path/to/hover-sound.mp3');
            // audio.volume = 0.1;
            // audio.play().catch(() => {}); // Ignore if autoplay is blocked
        });
    }
    
    // Add magnetic effect on mouse move (for desktop)
    if (window.innerWidth > 768) {
        const buttonContainer = applyButton.closest('.hero-cta');
        
        buttonContainer.addEventListener('mousemove', function(e) {
            const rect = applyButton.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            // Limit the magnetic effect distance
            const distance = Math.sqrt(x * x + y * y);
            const maxDistance = 50;
            
            if (distance < maxDistance) {
                const magnetStrength = 0.3;
                const magnetX = x * magnetStrength;
                const magnetY = y * magnetStrength;
                
                applyButton.style.transform = `translate(${magnetX}px, ${magnetY}px) scale(1.02)`;
            }
        });
        
        buttonContainer.addEventListener('mouseleave', function() {
            applyButton.style.transform = '';
        });
    }
    
    // Add intersection observer for scroll-triggered animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '-50px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Add staggered animation to button elements
                setTimeout(() => {
                    const icon = entry.target.querySelector('i');
                    const text = entry.target.querySelector('span');
                    
                    if (icon) icon.style.animationDelay = '0.2s';
                    if (text) text.style.animationDelay = '0.4s';
                }, 100);
            }
        });
    }, observerOptions);
    
    observer.observe(applyButton);
    
    // Add CSS for scroll animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .btn-apply {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .btn-apply.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        @media (prefers-reduced-motion: reduce) {
            .btn-apply {
                opacity: 1;
                transform: none;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Add performance optimization for animations
    let ticking = false;
    
    function optimizeAnimations() {
        if (!ticking) {
            requestAnimationFrame(() => {
                // Reset magnetic effect if button is out of viewport
                const rect = applyButton.getBoundingClientRect();
                if (rect.bottom < 0 || rect.top > window.innerHeight) {
                    applyButton.style.transform = '';
                }
                ticking = false;
            });
            ticking = true;
        }
    }
    
    // Add scroll listener for performance optimization
    window.addEventListener('scroll', optimizeAnimations, { passive: true });
    
    // Add focus accessibility
    applyButton.addEventListener('focus', function() {
        this.style.outline = '3px solid rgba(0, 123, 255, 0.5)';
        this.style.outlineOffset = '2px';
    });
    
    applyButton.addEventListener('blur', function() {
        this.style.outline = '';
        this.style.outlineOffset = '';
    });
    
    console.log('Hero Enroll Now button animations initialized successfully!');
});