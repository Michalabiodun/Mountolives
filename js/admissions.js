// JavaScript for Admissions Page Tab Functionality

document.addEventListener('DOMContentLoaded', function() {
    // Admissions Tab Functionality
    const admissionsTabs = document.querySelectorAll('.admissions-tab');
    const admissionsSections = document.querySelectorAll('.admissions-section');
    
    // Modal Elements
    const applicationModal = document.getElementById('applicationModal');
    const applicationForm = document.getElementById('applicationForm');
    const closeModal = document.querySelector('.close-modal');
    const cancelApplication = document.getElementById('cancelApplication');
    
    // Function to switch between tabs
    function switchTab(tabName) {
        // Remove active class from all tabs and sections
        admissionsTabs.forEach(tab => tab.classList.remove('active'));
        admissionsSections.forEach(section => section.classList.remove('active'));
        
        // Add active class to clicked tab and corresponding section
        const activeTab = document.querySelector(`[data-tab="${tabName}"]`);
        const activeSection = document.getElementById(tabName);
        
        if (activeTab && activeSection) {
            activeTab.classList.add('active');
            activeSection.classList.add('active');
            
            // Update URL hash without scrolling
            history.replaceState(null, null, `#${tabName}`);
        }
    }
    
    // Add click event listeners to tabs
    admissionsTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            switchTab(targetTab);
        });
    });
    
    // Check URL hash on page load
    function checkInitialTab() {
        const hash = window.location.hash.substring(1);
        const validTabs = ['overview', 'requirements', 'tuition'];
        
        if (validTabs.includes(hash)) {
            switchTab(hash);
        } else {
            // Default to overview if no valid hash
            switchTab('overview');
        }
    }
    
    // Initialize tabs
    checkInitialTab();
    
    // Modal Functionality
    function openApplicationModal() {
        applicationModal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
    
    function closeApplicationModal() {
        applicationModal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Re-enable scrolling
        applicationForm.reset(); // Reset form when closing
    }
    
    // Event listeners for modal
    document.querySelectorAll('.btn-primary[href="#"]').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            openApplicationModal();
        });
    });
    
    closeModal.addEventListener('click', closeApplicationModal);
    cancelApplication.addEventListener('click', closeApplicationModal);
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === applicationModal) {
            closeApplicationModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && applicationModal.style.display === 'block') {
            closeApplicationModal();
        }
    });
    
    // Form Submission Handling
    applicationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Basic form validation
        if (!validateApplicationForm()) {
            return;
        }
        
        // Get form data
        const formData = new FormData(applicationForm);
        const data = Object.fromEntries(formData);
        
        // Show loading state
        const submitButton = applicationForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Submitting...';
        submitButton.disabled = true;
        
        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            // In a real application, you would send the data to your server
            console.log('Application submitted:', data);
            
            // Show success message
            showApplicationSuccess(data.studentFirstName + ' ' + data.studentLastName);
            
            // Reset button state
            submitButton.textContent = originalText;
            submitButton.disabled = false;
            
            // Close modal
            closeApplicationModal();
        }, 2000);
    });
    
    // Form Validation
    function validateApplicationForm() {
        const requiredFields = applicationForm.querySelectorAll('[required]');
        let isValid = true;
        
        // Clear previous error messages
        clearErrorMessages();
        
        // Check required fields
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                showFieldError(field, 'This field is required');
                isValid = false;
            }
        });
        
        // Validate email format
        const emailField = document.getElementById('parentEmail');
        if (emailField.value && !isValidEmail(emailField.value)) {
            showFieldError(emailField, 'Please enter a valid email address');
            isValid = false;
        }
        
        // Validate phone number
        const phoneField = document.getElementById('parentPhone');
        if (phoneField.value && !isValidPhone(phoneField.value)) {
            showFieldError(phoneField, 'Please enter a valid phone number');
            isValid = false;
        }
        
        // Validate emergency phone
        const emergencyPhoneField = document.getElementById('emergencyPhone');
        if (emergencyPhoneField.value && !isValidPhone(emergencyPhoneField.value)) {
            showFieldError(emergencyPhoneField, 'Please enter a valid phone number');
            isValid = false;
        }
        
        // Validate date of birth
        const birthDateField = document.getElementById('studentBirthDate');
        if (birthDateField.value) {
            const birthDate = new Date(birthDateField.value);
            const today = new Date();
            const age = today.getFullYear() - birthDate.getFullYear();
            
            if (age > 18) {
                showFieldError(birthDateField, 'Student must be under 18 years old');
                isValid = false;
            }
        }
        
        return isValid;
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function isValidPhone(phone) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
    }
    
    function showFieldError(field, message) {
        field.classList.add('error');
        
        let errorElement = field.parentNode.querySelector('.error-message');
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            field.parentNode.appendChild(errorElement);
        }
        errorElement.textContent = message;
    }
    
    function clearErrorMessages() {
        const errorMessages = applicationForm.querySelectorAll('.error-message');
        errorMessages.forEach(msg => msg.remove());
        
        const errorFields = applicationForm.querySelectorAll('.error');
        errorFields.forEach(field => field.classList.remove('error'));
    }
    
    // Real-time validation
    applicationForm.querySelectorAll('input, select, textarea').forEach(field => {
        field.addEventListener('blur', function() {
            if (this.hasAttribute('required') && !this.value.trim()) {
                showFieldError(this, 'This field is required');
            } else {
                clearFieldError(this);
            }
        });
        
        field.addEventListener('input', function() {
            if (this.value.trim()) {
                clearFieldError(this);
            }
        });
    });
    
    function clearFieldError(field) {
        field.classList.remove('error');
        const errorElement = field.parentNode.querySelector('.error-message');
        if (errorElement) {
            errorElement.remove();
        }
    }
    
    // Success Message
    function showApplicationSuccess(studentName) {
        const successHTML = `
            <div class="success-modal">
                <div class="success-content">
                    <div class="success-icon">✓</div>
                    <h3>Application Submitted Successfully!</h3>
                    <p>Thank you for applying to Mountolives Kiddies School, <strong>${studentName}</strong>!</p>
                    <p>We have received your application and will review it carefully. Our admissions team will contact you within 2-3 business days to discuss the next steps.</p>
                    <div class="success-actions">
                        <button class="btn btn-primary" id="closeSuccess">Close</button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', successHTML);
        
        const successModal = document.querySelector('.success-modal');
        const closeSuccess = document.getElementById('closeSuccess');
        
        closeSuccess.addEventListener('click', function() {
            successModal.remove();
        });
        
        // Close success modal when clicking outside
        successModal.addEventListener('click', function(e) {
            if (e.target === successModal) {
                successModal.remove();
            }
        });
        
        // Close success modal with Escape key
        document.addEventListener('keydown', function closeOnEscape(e) {
            if (e.key === 'Escape') {
                successModal.remove();
                document.removeEventListener('keydown', closeOnEscape);
            }
        });
    }
    
    // Auto-fill program interest based on current tab
    admissionsTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            if (tabName === 'tuition') {
                // You could auto-select a program based on the tuition section
                // For now, we'll just ensure the program dropdown is available
            }
        });
    });
    
    // Tuition Calculator (Bonus Feature) - Keep existing code
    function initTuitionCalculator() {
        // ... (keep the existing tuition calculator code)
    }
    
    // Print-Friendly Functionality - Keep existing code
    function addPrintButton() {
        // ... (keep the existing print functionality code)
    }
    
    // Uncomment the line below to enable the tuition calculator
    // initTuitionCalculator();
    
    // Uncomment the line below to enable print functionality
    // addPrintButton();
});