/*
   Dropdown Visibility Fixes
   Danborough Group of Colleges
   Author: GitHub Copilot
   Date: August 3, 2025
*/

// This script ensures dropdown menus are properly displayed on both desktop and mobile
document.addEventListener('DOMContentLoaded', function() {
    // Fix for desktop dropdowns
    const desktopDropdowns = document.querySelectorAll('.nav-dropdown');
    
    desktopDropdowns.forEach(dropdown => {
        // Force visibility on hover
        dropdown.addEventListener('mouseenter', function() {
            const menu = this.querySelector('.dropdown-menu');
            if (menu) {
                menu.style.opacity = '1';
                menu.style.visibility = 'visible';
                menu.style.display = 'block';
                menu.style.transform = 'translateX(-50%) translateY(0) scale(1)';
                menu.style.zIndex = '2000';
            }
        });
        
        // Hide on mouse leave with a slight delay
        dropdown.addEventListener('mouseleave', function() {
            const menu = this.querySelector('.dropdown-menu');
            if (menu) {
                setTimeout(() => {
                    menu.style.opacity = '0';
                    menu.style.visibility = 'hidden';
                }, 200);
            }
        });
    });
    
    // Fix for mobile dropdowns
    const mobileDropdownTriggers = document.querySelectorAll('.mobile-dropdown .mobile-nav-link');
    
    mobileDropdownTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            e.preventDefault();
            const parent = this.parentElement;
            const menu = parent.querySelector('.mobile-dropdown-menu');
            
            // Toggle active class
            const isActive = parent.classList.contains('active');
            
            // Close all dropdowns first
            document.querySelectorAll('.mobile-dropdown').forEach(dropdown => {
                dropdown.classList.remove('active');
            });
            
            // Toggle current dropdown
            if (!isActive) {
                parent.classList.add('active');
                console.log('Mobile dropdown activated', menu);
            }
        });
    });
    
    // Log initialization
    console.log('Dropdown visibility fixes initialized');
});
