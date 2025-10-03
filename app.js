// Presentation navigation functionality
class PresentationApp {
    constructor() {
        this.currentSlide = 1;
        this.totalSlides = 10;
        this.slides = document.querySelectorAll('.slide');
        this.progressFill = document.querySelector('.progress-fill');
        this.currentSlideSpan = document.getElementById('current-slide');
        this.totalSlidesSpan = document.getElementById('total-slides');
        this.prevBtn = document.getElementById('prev-btn');
        this.nextBtn = document.getElementById('next-btn');
        
        this.init();
    }
    
    init() {
        // Set total slides
        this.totalSlidesSpan.textContent = this.totalSlides;
        
        // Add keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight' || e.key === ' ') {
                e.preventDefault();
                this.nextSlide();
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                this.previousSlide();
            }
        });
        
        // Initialize first slide
        this.updateSlide();
        
        // Add smooth scroll prevention
        document.addEventListener('wheel', (e) => {
            e.preventDefault();
        }, { passive: false });
        
        // Add touch/swipe support for mobile
        this.addTouchSupport();
    }
    
    addTouchSupport() {
        let touchStartX = 0;
        let touchEndX = 0;
        
        document.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        document.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe();
        });
        
        const handleSwipe = () => {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    // Swipe left - next slide
                    this.nextSlide();
                } else {
                    // Swipe right - previous slide
                    this.previousSlide();
                }
            }
        };
        
        this.handleSwipe = handleSwipe;
    }
    
    nextSlide() {
        if (this.currentSlide < this.totalSlides) {
            this.currentSlide++;
            this.updateSlide();
        }
    }
    
    previousSlide() {
        if (this.currentSlide > 1) {
            this.currentSlide--;
            this.updateSlide();
        }
    }
    
    updateSlide() {
        // Remove active class from all slides
        this.slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Add active class to current slide
        const currentSlideElement = document.querySelector(`[data-slide="${this.currentSlide}"]`);
        if (currentSlideElement) {
            currentSlideElement.classList.add('active');
        }
        
        // Update progress bar
        const progressPercentage = (this.currentSlide / this.totalSlides) * 100;
        this.progressFill.style.width = `${progressPercentage}%`;
        
        // Update slide counter
        this.currentSlideSpan.textContent = this.currentSlide;
        
        // Update navigation buttons
        this.updateNavigationButtons();
        
        // Add animation effects
        this.addSlideAnimations();
    }
    
    updateNavigationButtons() {
        // Update previous button
        if (this.currentSlide === 1) {
            this.prevBtn.disabled = true;
            this.prevBtn.style.opacity = '0.5';
        } else {
            this.prevBtn.disabled = false;
            this.prevBtn.style.opacity = '1';
        }
        
        // Update next button
        if (this.currentSlide === this.totalSlides) {
            this.nextBtn.disabled = true;
            this.nextBtn.style.opacity = '0.5';
        } else {
            this.nextBtn.disabled = false;
            this.nextBtn.style.opacity = '1';
        }
    }
    
    addSlideAnimations() {
        const currentSlideElement = document.querySelector(`[data-slide="${this.currentSlide}"]`);
        if (!currentSlideElement) return;
        
        // Animate elements within the slide
        const animatedElements = currentSlideElement.querySelectorAll(
            '.outline-item, .point-card, .instrument-card, .trade-item, .conclusion-item, .currency-card, table'
        );
        
        animatedElements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                element.style.transition = 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 100 + 200);
        });
    }
    
    // Method to go to a specific slide (useful for future enhancements)
    goToSlide(slideNumber) {
        if (slideNumber >= 1 && slideNumber <= this.totalSlides) {
            this.currentSlide = slideNumber;
            this.updateSlide();
        }
    }
}

// Global functions for HTML onclick events
function nextSlide() {
    if (window.presentationApp) {
        window.presentationApp.nextSlide();
    }
}

function previousSlide() {
    if (window.presentationApp) {
        window.presentationApp.previousSlide();
    }
}

// Initialize the presentation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.presentationApp = new PresentationApp();
    
    // Add some visual enhancements
    addVisualEnhancements();
    
    // Add accessibility features
    addAccessibilityFeatures();
});

// Additional visual enhancements
function addVisualEnhancements() {
    // Add hover effects to interactive elements
    const interactiveElements = document.querySelectorAll(
        '.point-card, .instrument-card, .outline-item, .currency-card'
    );
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = this.style.transform.includes('scale') 
                ? this.style.transform 
                : (this.style.transform || '') + ' scale(1.02)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = this.style.transform.replace(' scale(1.02)', '');
        });
    });
    
    // Add subtle parallax effect to background elements
    document.addEventListener('mousemove', (e) => {
        const islamicPattern = document.querySelector('.islamic-pattern');
        if (islamicPattern) {
            const x = (e.clientX / window.innerWidth) * 10;
            const y = (e.clientY / window.innerHeight) * 10;
            islamicPattern.style.transform = `translate(${x}px, ${y}px)`;
        }
    });
}

// Accessibility features
function addAccessibilityFeatures() {
    // Add ARIA labels
    const slides = document.querySelectorAll('.slide');
    slides.forEach((slide, index) => {
        slide.setAttribute('aria-label', `Slide ${index + 1} of ${slides.length}`);
        slide.setAttribute('role', 'img');
    });
    
    // Add focus management
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(button => {
        button.addEventListener('focus', function() {
            this.style.boxShadow = '0 0 0 3px rgba(33, 128, 141, 0.4)';
        });
        
        button.addEventListener('blur', function() {
            this.style.boxShadow = '';
        });
    });
    
    // Add screen reader announcements
    const slideCounter = document.querySelector('.slide-counter');
    if (slideCounter) {
        slideCounter.setAttribute('aria-live', 'polite');
        slideCounter.setAttribute('aria-atomic', 'true');
    }
}

// Utility functions for potential future enhancements
const PresentationUtils = {
    // Method to export slide content (for future use)
    exportSlideContent: function(slideNumber) {
        const slide = document.querySelector(`[data-slide="${slideNumber}"]`);
        if (slide) {
            return slide.innerHTML;
        }
        return null;
    },
    
    // Method to add custom animations
    addCustomAnimation: function(element, animationType) {
        const animations = {
            fadeIn: 'opacity: 0; animation: fadeIn 0.5s ease-in-out forwards',
            slideUp: 'transform: translateY(50px); opacity: 0; animation: slideUp 0.5s ease-out forwards',
            bounce: 'animation: bounce 0.6s ease-in-out'
        };
        
        if (animations[animationType]) {
            element.style.cssText += animations[animationType];
        }
    },
    
    // Method to handle fullscreen mode (for future use)
    toggleFullscreen: function() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                console.log(`Error attempting to enable fullscreen: ${err.message}`);
            });
        } else {
            document.exitFullscreen();
        }
    }
};

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes slideUp {
        from { 
            transform: translateY(50px); 
            opacity: 0; 
        }
        to { 
            transform: translateY(0); 
            opacity: 1; 
        }
    }
    
    @keyframes bounce {
        0%, 20%, 53%, 80%, 100% {
            animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
            transform: translate3d(0,0,0);
        }
        40%, 43% {
            animation-timing-function: cubic-bezier(0.755, 0.050, 0.855, 0.060);
            transform: translate3d(0, -8px, 0);
        }
        70% {
            animation-timing-function: cubic-bezier(0.755, 0.050, 0.855, 0.060);
            transform: translate3d(0, -4px, 0);
        }
        90% {
            transform: translate3d(0, -2px, 0);
        }
    }
    
    /* Enhanced focus styles */
    .nav-btn:focus-visible {
        outline: 2px solid var(--color-primary);
        outline-offset: 2px;
    }
    
    /* Smooth transitions for all interactive elements */
    * {
        transition: transform 0.2s ease, opacity 0.2s ease, box-shadow 0.2s ease;
    }
`;

document.head.appendChild(style);

// Performance optimization: Preload next slide content
function preloadNextSlide() {
    const currentSlideNum = window.presentationApp?.currentSlide || 1;
    const nextSlideNum = currentSlideNum + 1;
    
    if (nextSlideNum <= 10) {
        const nextSlide = document.querySelector(`[data-slide="${nextSlideNum}"]`);
        if (nextSlide) {
            // Trigger layout calculation to preload content
            nextSlide.offsetHeight;
        }
    }
}

// Call preload on slide change
document.addEventListener('DOMContentLoaded', () => {
    setInterval(preloadNextSlide, 1000);
});