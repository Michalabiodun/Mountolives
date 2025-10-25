// JavaScript for About Page Tab Functionality

document.addEventListener('DOMContentLoaded', function() {
    // About Tab Functionality
    const aboutTabs = document.querySelectorAll('.about-tab');
    const aboutSections = document.querySelectorAll('.about-section');
    
    // Function to switch between tabs
    function switchTab(tabName) {
        // Remove active class from all tabs and sections
        aboutTabs.forEach(tab => tab.classList.remove('active'));
        aboutSections.forEach(section => section.classList.remove('active'));
        
        // Add active class to clicked tab and corresponding section
        const activeTab = document.querySelector(`[data-tab="${tabName}"]`);
        const activeSection = document.getElementById(tabName);
        
        if (activeTab && activeSection) {
            activeTab.classList.add('active');
            activeSection.classList.add('active');
            
            // Update URL hash without scrolling
            history.replaceState(null, null, `#${tabName}`);
            
            // Trigger any section-specific animations
            triggerSectionAnimations(tabName);
        }
    }
    
    // Add click event listeners to tabs
    aboutTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            switchTab(targetTab);
        });
    });
    
    // Check URL hash on page load
    function checkInitialTab() {
        const hash = window.location.hash.substring(1);
        const validTabs = ['mission', 'story', 'team', 'facilities', 'achievements'];
        
        if (validTabs.includes(hash)) {
            switchTab(hash);
        } else {
            // Default to mission if no valid hash
            switchTab('mission');
        }
    }
    
    // Initialize tabs
    checkInitialTab();
    
    // Section-specific animations
    function triggerSectionAnimations(sectionName) {
        switch(sectionName) {
            case 'story':
                animateTimeline();
                break;
            case 'team':
                animateTeamMembers();
                break;
            case 'facilities':
                animateFacilities();
                break;
            case 'achievements':
                animateAchievements();
                break;
        }
    }
    
    // Timeline animation
    function animateTimeline() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        timelineItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-20px)';
            item.style.transition = `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s`;
            
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, 100);
        });
    }
    
    // Team members animation
    function animateTeamMembers() {
        const teamMembers = document.querySelectorAll('.team-member');
        teamMembers.forEach((member, index) => {
            member.style.opacity = '0';
            member.style.transform = 'translateY(20px)';
            member.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
            
            setTimeout(() => {
                member.style.opacity = '1';
                member.style.transform = 'translateY(0)';
            }, 100);
        });
    }
    
    // Facilities animation
    function animateFacilities() {
        const facilityCards = document.querySelectorAll('.facility-card');
        facilityCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.9)';
            card.style.transition = `opacity 0.4s ease ${index * 0.1}s, transform 0.4s ease ${index * 0.1}s`;
            
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'scale(1)';
            }, 100);
        });
    }
    
    // Achievements animation
    function animateAchievements() {
        const achievementCards = document.querySelectorAll('.achievement-card');
        achievementCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'rotateX(90deg)';
            card.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
            
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'rotateX(0)';
            }, 100);
        });
    }
    
    // Stats counter animation
    function initStatsCounter() {
        const statNumbers = document.querySelectorAll('.stat-number');
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const statsObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const statNumber = entry.target;
                    const targetValue = parseInt(statNumber.textContent);
                    const duration = 2000; // 2 seconds
                    const step = targetValue / (duration / 16); // 60fps
                    let currentValue = 0;
                    
                    const timer = setInterval(() => {
                        currentValue += step;
                        if (currentValue >= targetValue) {
                            statNumber.textContent = targetValue + (statNumber.textContent.includes('+') ? '+' : '');
                            clearInterval(timer);
                        } else {
                            statNumber.textContent = Math.floor(currentValue) + (statNumber.textContent.includes('+') ? '+' : '');
                        }
                    }, 16);
                    
                    statsObserver.unobserve(statNumber);
                }
            });
        }, observerOptions);
        
        statNumbers.forEach(stat => {
            statsObserver.observe(stat);
        });
    }
    
    // Initialize stats counter when story section is active
    const storySection = document.getElementById('story');
    if (storySection) {
        const storyObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    initStatsCounter();
                    storyObserver.unobserve(storySection);
                }
            });
        }, { threshold: 0.1 });
        
        storyObserver.observe(storySection);
    }
    
    // Print-Friendly Functionality
    function addPrintButton() {
        const printBtn = document.createElement('button');
        printBtn.textContent = 'Print This Section';
        printBtn.className = 'btn btn-secondary print-btn';
        printBtn.style.marginTop = '20px';
        printBtn.style.marginLeft = 'auto';
        printBtn.style.marginRight = 'auto';
        printBtn.style.display = 'block';
        
        printBtn.addEventListener('click', function() {
            const activeSection = document.querySelector('.about-section.active');
            if (activeSection) {
                const printContent = activeSection.innerHTML;
                const originalContent = document.body.innerHTML;
                
                document.body.innerHTML = `
                    <div style="padding: 20px; max-width: 800px; margin: 0 auto;">
                        <h1 style="color: var(--primary-color); text-align: center; margin-bottom: 30px;">
                            Mountolives Kiddies School - About Us
                        </h1>
                        ${printContent}
                        <div style="text-align: center; margin-top: 40px; color: #666; font-size: 0.9rem;">
                            Printed from: ${window.location.href}<br>
                            Date: ${new Date().toLocaleDateString()}
                        </div>
                    </div>
                `;
                
                window.print();
                document.body.innerHTML = originalContent;
                // Re-initialize the tabs after printing
                checkInitialTab();
            }
        });
        
        const activeSection = document.querySelector('.about-section.active');
        if (activeSection) {
            activeSection.appendChild(printBtn);
        }
        
        // Update print button when switching tabs
        aboutTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                setTimeout(() => {
                    const newActiveSection = document.querySelector('.about-section.active');
                    if (newActiveSection && !newActiveSection.querySelector('.print-btn')) {
                        newActiveSection.appendChild(printBtn);
                    }
                }, 100);
            });
        });
    }
    
    // Uncomment the line below to enable print functionality
    // addPrintButton();
    
    // Team member modal functionality (bonus feature)
    function initTeamModals() {
        const teamMembers = document.querySelectorAll('.team-member');
        
        teamMembers.forEach(member => {
            member.style.cursor = 'pointer';
            member.addEventListener('click', function() {
                const name = this.querySelector('h3').textContent;
                const role = this.querySelector('.member-role').textContent;
                const qualifications = this.querySelector('.member-qualifications').textContent;
                const experience = this.querySelector('.member-experience').textContent;
                const bio = this.querySelector('.member-bio').textContent;
                
                // In a real application, you would show a modal with more details
                // For now, we'll log to console
                console.log(`Team Member: ${name}`);
                console.log(`Role: ${role}`);
                console.log(`Qualifications: ${qualifications}`);
                console.log(`Experience: ${experience}`);
                console.log(`Bio: ${bio}`);
                
                // Example modal implementation (commented out):
                /*
                showTeamModal({
                    name: name,
                    role: role,
                    qualifications: qualifications,
                    experience: experience,
                    bio: bio
                });
                */
            });
        });
    }
    
    // Initialize team modals
    initTeamModals();
});