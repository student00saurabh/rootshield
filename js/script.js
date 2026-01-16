// RootShield Website JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('shadow-sm');
        } else {
            navbar.classList.remove('shadow-sm');
        }
    });
    
    // Course card hover effect enhancement
    const courseCards = document.querySelectorAll('.card');
    courseCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Back to top button
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '<i class="bi bi-arrow-up"></i>';
    backToTopButton.className = 'btn btn-primary-blue rounded-circle position-fixed bottom-0 end-0 m-3 d-none';
    backToTopButton.style.width = '50px';
    backToTopButton.style.height = '50px';
    backToTopButton.style.zIndex = '1000';
    document.body.appendChild(backToTopButton);
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopButton.classList.remove('d-none');
        } else {
            backToTopButton.classList.add('d-none');
        }
    });
    
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Form validation example
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const email = this.querySelector('input[type="email"]');
            if (email && !validateEmail(email.value)) {
                e.preventDefault();
                alert('Please enter a valid email address');
                email.focus();
            }
        });
    });
    
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Counter animation for stats
    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current).toLocaleString();
        }, 20);
    }
    
    // Animate counters when they come into view
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counters = entry.target.querySelectorAll('.counter');
                counters.forEach(counter => {
                    const target = parseInt(counter.getAttribute('data-target'));
                    animateCounter(counter, target);
                });
            }
        });
    }, observerOptions);
    
    // Add this to elements with counters
    // <span class="counter" data-target="10000">0</span>
    
    console.log('RootShield website loaded successfully!');
});

// Cookie consent management
function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

// Initialize on page load
window.onload = function() {
    // Check if cookie consent already given
    if(!getCookie('cookieConsent')) {
        // Show cookie consent banner after 2 seconds
        setTimeout(() => {
            showCookieConsent();
        }, 2000);
    }
};

function showCookieConsent() {
    const consentHTML = `
        <div id="cookieConsent" class="fixed-bottom bg-dark text-white p-3" style="z-index: 1050;">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-md-8">
                        <p class="mb-0">We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies. 
                        <a href="privacypolicy.html" class="text-warning text-decoration-none">Learn more</a></p>
                    </div>
                    <div class="col-md-4 text-end">
                        <button onclick="acceptCookies()" class="btn btn-primary btn-sm me-2">Accept</button>
                        <button onclick="declineCookies()" class="btn btn-outline-light btn-sm">Decline</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', consentHTML);
}

function acceptCookies() {
    setCookie('cookieConsent', 'true', 365);
    document.getElementById('cookieConsent').remove();
}

function declineCookies() {
    setCookie('cookieConsent', 'false', 365);
    document.getElementById('cookieConsent').remove();
}

// Function to handle course clicks
function setupCourseEnrollmentLinks() {
    // For course cards/buttons
    document.querySelectorAll('.course-enroll-btn, .course-card, .btn-enroll').forEach(element => {
        element.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get course name from data attribute or text
            let courseName = this.getAttribute('data-course') || 
                            this.querySelector('.course-title')?.textContent ||
                            this.textContent;
            
            // Clean course name
            courseName = courseName.replace('Enroll', '').replace('Course', '').trim();
            
            // Store in sessionStorage for immediate use
            sessionStorage.setItem('selectedCourse', courseName);
            
            // Redirect to contact page
            window.location.href = 'contact.html';
        });
    });
    
    // For dropdown menu items
    document.querySelectorAll('.dropdown-item').forEach(item => {
        if (item.textContent.includes('DSA') || 
            item.textContent.includes('Web') || 
            item.textContent.includes('Cyber')) {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                sessionStorage.setItem('selectedCourse', this.textContent);
                window.location.href = 'contact.html';
            });
        }
    });
}

// Call this function when DOM is loaded
document.addEventListener('DOMContentLoaded', setupCourseEnrollmentLinks);

// Course Enrollment Functions
function setupCourseEnrollment() {
    // For course cards
    document.querySelectorAll('.course-card').forEach(card => {
        card.addEventListener('click', function() {
            const courseName = this.querySelector('.course-title').textContent;
            enrollCourse(courseName);
        });
    });
    
    // For enroll buttons
    document.querySelectorAll('.btn-enroll').forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const courseName = this.getAttribute('data-course');
            enrollCourse(courseName);
        });
    });
}

function enrollCourse(courseName) {
    // Store course in sessionStorage
    sessionStorage.setItem('selectedCourse', courseName);
    
    // Show loading message
    const card = event.target.closest('.course-card');
    if (card) {
        const originalHTML = card.innerHTML;
        card.innerHTML = `
            <div class="text-center p-4">
                <div class="spinner-border text-primary-blue mb-3"></div>
                <p>Redirecting to enrollment...</p>
            </div>
        `;
        
        setTimeout(() => {
            window.location.href = 'contact.html';
        }, 1000);
    } else {
        window.location.href = 'contact.html';
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    setupCourseEnrollment();
});