// Global variables
let currentSlideIndex = 0;
let slideInterval;
let currentUser = null;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeSlider();
    initializeAuth();
    initializeNavigation();
});

// Slider functionality
function initializeSlider() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    
    if (slides.length === 0) return;
    
    // Auto-slide functionality
    slideInterval = setInterval(() => {
        changeSlide(1);
    }, 5000);
    
    // Pause auto-slide on hover
    const sliderContainer = document.querySelector('.slider-container');
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        
        sliderContainer.addEventListener('mouseleave', () => {
            slideInterval = setInterval(() => {
                changeSlide(1);
            }, 5000);
        });
    }
}

function changeSlide(direction) {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    
    if (slides.length === 0) return;
    
    // Remove active class from current slide and dot
    slides[currentSlideIndex].classList.remove('active');
    dots[currentSlideIndex].classList.remove('active');
    
    // Calculate new slide index
    currentSlideIndex += direction;
    
    if (currentSlideIndex >= slides.length) {
        currentSlideIndex = 0;
    } else if (currentSlideIndex < 0) {
        currentSlideIndex = slides.length - 1;
    }
    
    // Add active class to new slide and dot
    slides[currentSlideIndex].classList.add('active');
    dots[currentSlideIndex].classList.add('active');
}

function currentSlide(index) {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    
    if (slides.length === 0) return;
    
    // Remove active class from current slide and dot
    slides[currentSlideIndex].classList.remove('active');
    dots[currentSlideIndex].classList.remove('active');
    
    // Set new slide index
    currentSlideIndex = index - 1;
    
    // Add active class to new slide and dot
    slides[currentSlideIndex].classList.add('active');
    dots[currentSlideIndex].classList.add('active');
}

// Service tabs functionality
function showService(serviceId) {
    // Remove active class from all tabs and panels
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.service-panel').forEach(panel => panel.classList.remove('active'));
    
    // Add active class to clicked tab
    event.target.classList.add('active');
    
    // Show corresponding service panel
    const panel = document.getElementById(serviceId);
    if (panel) {
        panel.classList.add('active');
    }
}

// Navigation functionality
function initializeNavigation() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Update active navigation link on scroll
    window.addEventListener('scroll', updateActiveNavLink);
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Authentication functionality
function initializeAuth() {
    // Check if user is already logged in (from localStorage)
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        showUserProfile();
    }
    
    // Add event listeners
    const loginBtn = document.getElementById('loginBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    
    if (loginBtn) {
        loginBtn.addEventListener('click', handleGoogleLogin);
    }
    
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }
}

function handleGoogleLogin() {
    // Simulate Google login (in real implementation, use Google OAuth)
    // For demo purposes, we'll create a mock user
    const mockUser = {
        name: 'John Doe',
        email: 'john.doe@gmail.com',
        picture: null
    };
    
    // In a real implementation, you would integrate with Google OAuth API
    // This is just for demonstration
    currentUser = mockUser;
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    showUserProfile();
    
    // Show success message
    showNotification('Successfully signed in with Google!', 'success');
}

function handleLogout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    showLoginButton();
    showNotification('Successfully logged out!', 'info');
}

function showUserProfile() {
    const userProfile = document.getElementById('userProfile');
    const loginBtn = document.getElementById('loginBtn');
    const userName = document.getElementById('userName');
    const userEmail = document.getElementById('userEmail');
    
    if (userProfile && loginBtn && userName && userEmail && currentUser) {
        userProfile.style.display = 'block';
        loginBtn.style.display = 'none';
        userName.textContent = currentUser.name;
        userEmail.textContent = currentUser.email;
    }
}

function showLoginButton() {
    const userProfile = document.getElementById('userProfile');
    const loginBtn = document.getElementById('loginBtn');
    
    if (userProfile && loginBtn) {
        userProfile.style.display = 'none';
        loginBtn.style.display = 'flex';
    }
}

// Navigation to shop page
function goToShop() {
    window.location.href = 'shop.html';
}

// Utility functions
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 90px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 10px;
        font-weight: 500;
        animation: slideInRight 0.3s ease-out;
    `;
    
    // Add to document
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-in';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Add notification animations to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
  const counters = document.querySelectorAll('.counter');
  const speed = 200; // lower = faster

  counters.forEach(counter => {
    const updateCount = () => {
      const target = +counter.getAttribute('data-target');
      const count = +counter.innerText;

      const increment = target / speed;

      if (count < target) {
        counter.innerText = Math.ceil(count + increment);
        setTimeout(updateCount, 20);
      } else {
        // Format final output with suffix
        if (target >= 1000) {
          counter.innerText = (target / 1000).toFixed(1).replace('.0', '') + 'k+';
        } else {
          counter.innerText = target + '+';
        }
      }
    };

    updateCount();
  });
