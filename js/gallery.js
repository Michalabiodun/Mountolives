// JavaScript for Gallery Page

document.addEventListener('DOMContentLoaded', function() {
    // Gallery Elements
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const loadMoreBtn = document.getElementById('loadMore');
    const lightbox = document.getElementById('galleryLightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxDesc = document.getElementById('lightbox-desc');
    const lightboxCategory = document.getElementById('lightbox-category');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');

    // Filter Functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter items
            galleryItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.classList.remove('hidden');
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.classList.add('hidden');
                    }, 300);
                }
            });
            
            // Check if no results
            checkNoResults();
        });
    });

    // Check for no results
    function checkNoResults() {
        const visibleItems = document.querySelectorAll('.gallery-item:not(.hidden)');
        let noResults = document.querySelector('.gallery-no-results');
        
        if (visibleItems.length === 0) {
            if (!noResults) {
                noResults = document.createElement('div');
                noResults.className = 'gallery-no-results';
                noResults.innerHTML = `
                    <h3>No Photos Found</h3>
                    <p>There are no photos in this category yet. Check back soon!</p>
                `;
                document.querySelector('.gallery-grid').appendChild(noResults);
            }
        } else if (noResults) {
            noResults.remove();
        }
    }

    // Lightbox Functionality
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            const title = this.querySelector('.gallery-info h3').textContent;
            const desc = this.querySelector('.gallery-info p').textContent;
            const category = this.querySelector('.gallery-category').textContent;
            
            openLightbox(img.src, title, desc, category, this);
        });
    });

    function openLightbox(src, title, desc, category, currentItem) {
        lightboxImg.src = src;
        lightboxTitle.textContent = title;
        lightboxDesc.textContent = desc;
        lightboxCategory.textContent = category;
        lightbox.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Store current item for navigation
        lightbox.currentItem = currentItem;
    }

    function closeLightbox() {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    // Lightbox Event Listeners
    lightboxClose.addEventListener('click', closeLightbox);
    
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    document.addEventListener('keydown', function(e) {
        if (lightbox.style.display === 'block') {
            if (e.key === 'Escape') {
                closeLightbox();
            } else if (e.key === 'ArrowLeft') {
                navigateLightbox('prev');
            } else if (e.key === 'ArrowRight') {
                navigateLightbox('next');
            }
        }
    });

    // Lightbox Navigation
    lightboxPrev.addEventListener('click', () => navigateLightbox('prev'));
    lightboxNext.addEventListener('click', () => navigateLightbox('next'));

    function navigateLightbox(direction) {
        const currentItem = lightbox.currentItem;
        const currentCategory = currentItem.getAttribute('data-category');
        const visibleItems = Array.from(document.querySelectorAll(`.gallery-item[data-category="${currentCategory}"]:not(.hidden)`));
        
        let currentIndex = visibleItems.indexOf(currentItem);
        let newIndex;
        
        if (direction === 'next') {
            newIndex = (currentIndex + 1) % visibleItems.length;
        } else {
            newIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length;
        }
        
        const newItem = visibleItems[newIndex];
        const img = newItem.querySelector('img');
        const title = newItem.querySelector('.gallery-info h3').textContent;
        const desc = newItem.querySelector('.gallery-info p').textContent;
        const category = newItem.querySelector('.gallery-category').textContent;
        
        openLightbox(img.src, title, desc, category, newItem);
    }

    // Load More Functionality (Simulated)
    let loadedItems = 12; // Initial items loaded
    const totalItems = galleryItems.length;

    loadMoreBtn.addEventListener('click', function() {
        // Show loading state
        this.textContent = 'Loading...';
        this.disabled = true;
        
        // Simulate loading delay
        setTimeout(() => {
            // Show next batch of items
            const itemsToShow = Math.min(loadedItems + 6, totalItems);
            
            for (let i = loadedItems; i < itemsToShow; i++) {
                if (galleryItems[i]) {
                    galleryItems[i].classList.remove('hidden');
                    setTimeout(() => {
                        galleryItems[i].style.opacity = '1';
                        galleryItems[i].style.transform = 'scale(1)';
                    }, 50 * (i - loadedItems));
                }
            }
            
            loadedItems = itemsToShow;
            
            // Update button text or hide if all items are loaded
            if (loadedItems >= totalItems) {
                this.style.display = 'none';
            } else {
                this.textContent = 'Load More Photos';
                this.disabled = false;
            }
        }, 1000);
    });

    // Initially hide items beyond initial load
    for (let i = loadedItems; i < totalItems; i++) {
        galleryItems[i].classList.add('hidden');
    }

    // Lazy loading for images
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
});