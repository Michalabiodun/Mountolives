// JavaScript for Mountolives Kiddies School Website

// Force scroll to top on page load
window.onload = function() {
    setTimeout(function() {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'instant'
        });
    }, 0);
};

// Disable scroll restoration
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

// Reset scroll position when clicking on navigation links
document.addEventListener('click', function(e) {
    if (e.target.tagName === 'A' && e.target.href && !e.target.href.includes('#')) {
        sessionStorage.setItem('shouldScrollTop', 'true');
    }
});

document.addEventListener('DOMContentLoaded', function() {
    if (sessionStorage.getItem('shouldScrollTop')) {
        window.scrollTo(0, 0);
        sessionStorage.removeItem('shouldScrollTop');
    }
    
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            
            // Ensure scroll to top on navigation
            if (!this.getAttribute('href').includes('#')) {
                sessionStorage.setItem('shouldScrollTop', 'true');
            }
        });
    });
    
    // Contact Form Handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Simple validation
            if (!data.fullName || !data.subject || !data.message) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // In a real application, you would send this data to a server
            console.log('Form submitted:', data);
            
            // Show success message
            alert('Thank you for your message! We will get back to you soon.');
            
            // Reset form
            contactForm.reset();
        });
    }
    
    // Portal Access Buttons
    const portalButtons = document.querySelectorAll('.portal-btn');
    portalButtons.forEach(button => {
        button.addEventListener('click', function() {
            const portalType = this.closest('.portal-card').querySelector('h3').textContent;
            alert(`The ${portalType} would open in a new window. This is a demo.`);
        });
    });
    
    // Chat Button Functionality
    const chatButtons = document.querySelectorAll('.chat-btn, .chat-trigger');
    chatButtons.forEach(button => {
        button.addEventListener('click', function() {
            alert('Chat functionality would open here. This is a demo.');
        });
    });
    
    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Active Navigation Highlighting
    function setActiveNav() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-menu a');
        
        navLinks.forEach(link => {
            const linkHref = link.getAttribute('href');
            if (linkHref === currentPage) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
    
    setActiveNav();
    
    // Announcements Date Formatting
    function formatAnnouncementDates() {
        const announcementDates = document.querySelectorAll('.announcement-date');
        announcementDates.forEach(dateElement => {
            const dateText = dateElement.textContent;
            // In a real application, you might format dates here
            // For now, we'll just ensure they're displayed properly
        });
    }
    
    formatAnnouncementDates();
    
    // Dynamic Year in Footer
    function updateFooterYear() {
        const yearElement = document.querySelector('.footer-bottom p');
        if (yearElement) {
            const currentYear = new Date().getFullYear();
            yearElement.innerHTML = yearElement.innerHTML.replace('2024', currentYear);
        }
    }
    
    updateFooterYear();
    
    // Responsive Table Handling
    function makeTablesResponsive() {
        const tables = document.querySelectorAll('table');
        tables.forEach(table => {
            const wrapper = document.createElement('div');
            wrapper.className = 'table-responsive';
            table.parentNode.insertBefore(wrapper, table);
            wrapper.appendChild(table);
        });
    }
    
    makeTablesResponsive();
    
    // Lazy Loading for Images (if implemented)
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // Form Validation Enhancement
    function enhanceFormValidation() {
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            const inputs = form.querySelectorAll('input, select, textarea');
            
            inputs.forEach(input => {
                // Add validation styling
                input.addEventListener('invalid', function() {
                    this.classList.add('invalid');
                });
                
                input.addEventListener('input', function() {
                    if (this.classList.contains('invalid')) {
                        this.classList.remove('invalid');
                    }
                });
            });
        });
    }
    
    enhanceFormValidation();
    
    // Scroll to Top Button (optional enhancement)
    function addScrollToTopButton() {
        const scrollButton = document.createElement('button');
        scrollButton.innerHTML = '↑';
        scrollButton.className = 'scroll-to-top';
        scrollButton.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background-color: var(--primary-color);
            color: white;
            border: none;
            font-size: 20px;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 1000;
        `;
        
        document.body.appendChild(scrollButton);
        
        scrollButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollButton.style.opacity = '1';
                scrollButton.style.visibility = 'visible';
            } else {
                scrollButton.style.opacity = '0';
                scrollButton.style.visibility = 'hidden';
            }
        });
    }
    
    addScrollToTopButton();
});

// Additional functionality for specific pages
if (window.location.pathname.includes('admissions.html')) {
    // Admissions page specific JavaScript
    document.addEventListener('DOMContentLoaded', function() {
        // Application form handling (if exists on the page)
        const applicationForm = document.querySelector('#apply form');
        if (applicationForm) {
            applicationForm.addEventListener('submit', function(e) {
                e.preventDefault();
                alert('Application submitted successfully! We will contact you soon.');
                this.reset();
            });
        }
        
        // Tuition calculator (simplified demo)
        const tuitionCalculator = document.createElement('div');
        tuitionCalculator.innerHTML = `
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3>Tuition Calculator</h3>
                <p>Select a program to see estimated costs:</p>
                <select id="programSelect" style="padding: 10px; width: 100%; margin-bottom: 10px;">
                    <option value="">Select a program</option>
                    <option value="8500">Pre-K (Half Day) - $8,500</option>
                    <option value="12000">Pre-K (Full Day) - $12,000</option>
                    <option value="13500">Kindergarten - $13,500</option>
                    <option value="15000">Grades 1-2 - $15,000</option>
                    <option value="16500">Grades 3-5 - $16,500</option>
                </select>
                <div id="tuitionResult" style="font-weight: bold; margin-top: 10px;"></div>
            </div>
        `;
        
        const tuitionSection = document.querySelector('.tuition-content');
        if (tuitionSection) {
            tuitionSection.appendChild(tuitionCalculator);
            
            const programSelect = document.getElementById('programSelect');
            const tuitionResult = document.getElementById('tuitionResult');
            
            programSelect.addEventListener('change', function() {
                if (this.value) {
                    const tuition = parseInt(this.value);
                    const registrationFee = 350; // Average fee
                    const total = tuition + registrationFee;
                    
                    tuitionResult.innerHTML = `
                        Annual Tuition: $${tuition.toLocaleString()}<br>
                        Registration Fee: $${registrationFee.toLocaleString()}<br>
                        <strong>Total First Year: $${total.toLocaleString()}</strong>
                    `;
                } else {
                    tuitionResult.innerHTML = '';
                }
            });
        }
    });
}

if (window.location.pathname.includes('contact.html')) {
    // Contact page specific JavaScript
    document.addEventListener('DOMContentLoaded', function() {
        // Enhanced form validation
        const phoneInput = document.getElementById('phoneNumber');
        if (phoneInput) {
            phoneInput.addEventListener('input', function() {
                this.value = this.value.replace(/[^0-9+-\s()]/g, '');
            });
        }
        
        // Auto-fill subject based on page referrer
        const subjectSelect = document.getElementById('subject');
        if (subjectSelect && document.referrer) {
            if (document.referrer.includes('admissions')) {
                subjectSelect.value = 'admissions';
            } else if (document.referrer.includes('about')) {
                subjectSelect.value = 'general';
            }
        }
    });
}
// JavaScript for Programs Page

// JavaScript for Programs Page - Updated with Image Functionality

document.addEventListener('DOMContentLoaded', function() {
    // Program Tab Functionality
    const programTabs = document.querySelectorAll('.program-tab');
    const programDetails = document.querySelectorAll('.program-details');
    
    programTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all tabs and details
            programTabs.forEach(t => t.classList.remove('active'));
            programDetails.forEach(d => d.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding detail
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
            
            // Update image placeholder text based on active program
            updateImagePlaceholder(targetTab);
        });
    });
    
    // Function to update image placeholder text
    function updateImagePlaceholder(programId) {
        const imagePlaceholder = document.querySelector(`#${programId} .image-placeholder span`);
        if (imagePlaceholder) {
            const programTitles = {
                'toddler': 'Toddler Program Activities',
                'preschool': 'Preschool Learning Environment',
                'prek': 'Pre-K Classroom Setup',
                'aftercare': 'After School Care Program'
            };
            
            imagePlaceholder.textContent = programTitles[programId] || `${programId} Program Image`;
        }
    }
    
    // Initialize with first program
    updateImagePlaceholder('toddler');
    
    // Image Gallery Functionality (Bonus Feature)
    function initImageGallery() {
        const programImages = document.querySelectorAll('.program-image');
        
        programImages.forEach(imageSection => {
            // Add click handler for image sections
            imageSection.style.cursor = 'pointer';
            imageSection.addEventListener('click', function() {
                const programId = this.closest('.program-details').id;
                const programTitle = this.closest('.program-details').querySelector('h3').textContent;
                
                // In a real application, this would open a gallery modal
                // For now, we'll show a message
                console.log(`View gallery for: ${programTitle}`);
                
                // Example modal implementation (commented out):
                /*
                showProgramGallery(programId, programTitle);
                */
            });
            
            // Add hover effect
            imageSection.addEventListener('mouseenter', function() {
                const placeholder = this.querySelector('.image-placeholder');
                if (placeholder) {
                    placeholder.style.transform = 'scale(1.05)';
                    placeholder.style.transition = 'transform 0.3s ease';
                }
            });
            
            imageSection.addEventListener('mouseleave', function() {
                const placeholder = this.querySelector('.image-placeholder');
                if (placeholder) {
                    placeholder.style.transform = 'scale(1)';
                }
            });
        });
    }
    
    // Initialize image gallery functionality
    initImageGallery();
    
    // Download Application Button
    const downloadAppBtn = document.getElementById('downloadApp');
    if (downloadAppBtn) {
        downloadAppBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // In a real application, this would download a PDF
            // For demo purposes, we'll show an alert
            alert('Application form would download here. This is a demo.');
        });
    }
    
    // Enrichment Program Cards Interaction
    const enrichmentCards = document.querySelectorAll('.enrichment-card');
    enrichmentCards.forEach(card => {
        card.addEventListener('click', function() {
            const programName = this.querySelector('h3').textContent;
            const programDescription = this.querySelector('p').textContent;
            
            // Show modal or more details about the enrichment program
            // For now, we'll log to console
            console.log(`Clicked on: ${programName}`);
            console.log(`Description: ${programDescription}`);
        });
    });
    
    // Schedule Item Animation
    const scheduleItems = document.querySelectorAll('.schedule-item');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const scheduleObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }
        });
    }, observerOptions);
    
    scheduleItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
        scheduleObserver.observe(item);
    });
    
    // Program Age Calculator (Bonus Feature)
    function calculateProgramAge() {
        // ... (keep existing age calculator code)
    }
    
    // Uncomment the line below to enable the age calculator feature
    // calculateProgramAge();
});
