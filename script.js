// ===== PAGE LOADER =====
window.addEventListener('load', function() {
    const loader = document.getElementById('page-loader');
    if (loader) {
        // Check if this is the first visit in this browser session
        if (!sessionStorage.getItem('siteVisited')) {
            // Mark site as visited
            sessionStorage.setItem('siteVisited', 'true');
            
            // Show loader for 2 seconds then hide
            setTimeout(() => {
                loader.style.opacity = '0';
                loader.style.visibility = 'hidden';
                loader.style.pointerEvents = 'none';
            }, 2000);
        } else {
            // Hide loader immediately on subsequent visits
            loader.style.display = 'none';
            loader.style.pointerEvents = 'none';
        }
    }
});

// Prevent loader from showing on page navigation
window.addEventListener('beforeunload', function() {
    const loader = document.getElementById('page-loader');
    if (loader && sessionStorage.getItem('siteVisited')) {
        loader.style.display = 'none';
    }
});

// ===== NAVBAR SCROLL EFFECT =====
let ticking = false;
const navbar = document.getElementById('mainNav');

function updateNavbar() {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    ticking = false;
}

window.addEventListener('scroll', function() {
    if (!ticking) {
        window.requestAnimationFrame(updateNavbar);
        ticking = true;
    }
});

// ===== SCROLL TO TOP BUTTON =====
const scrollTopBtn = document.getElementById('scrollTop');
let scrollTicking = false;

function updateScrollTopBtn() {
    if (window.scrollY > 300) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
    scrollTicking = false;
}

window.addEventListener('scroll', function() {
    if (!scrollTicking) {
        window.requestAnimationFrame(updateScrollTopBtn);
        scrollTicking = true;
    }
});

scrollTopBtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===== ANIMATED COUNTERS =====
const counters = document.querySelectorAll('.counter');
const speed = 200;

const runCounter = (counter) => {
    const target = +counter.getAttribute('data-target');
    const increment = target / speed;

    const updateCount = () => {
        const count = +counter.innerText;

        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(updateCount, 10);
        } else {
            counter.innerText = target;
        }
    };

    updateCount();
};

// Intersection Observer for counters
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            runCounter(counter);
            observer.unobserve(counter);
        }
    });
}, observerOptions);

counters.forEach(counter => {
    observer.observe(counter);
});

// ===== AOS INITIALIZATION =====
AOS.init({
    duration: 600,
    once: true,
    offset: 50,
    disable: window.innerWidth < 768 ? 'mobile' : false,
    throttleDelay: 99
});

// ===== TESTIMONIALS CAROUSEL =====
const testimonialCarousel = document.getElementById('testimonialCarousel');
if (testimonialCarousel) {
    new bootstrap.Carousel(testimonialCarousel, {
        interval: 5000,
        wrap: true
    });
}

// ===== FORM VALIDATION =====
const forms = document.querySelectorAll('form');
forms.forEach(form => {
    form.addEventListener('submit', function(e) {
        if (!form.checkValidity()) {
            e.preventDefault();
            e.stopPropagation();
        }
        form.classList.add('was-validated');
    }, false);
});

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }, false);
});

// ===== NAVBAR COLLAPSE ON LINK CLICK =====
const navbarCollapse = document.querySelector('.navbar-collapse');
const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navbarCollapse.classList.contains('show')) {
            const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                toggle: false
            });
            bsCollapse.hide();
        }
    });
});

// ===== CONTACT FORM VALIDATION =====
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate form
        if (!this.checkValidity()) {
            e.stopPropagation();
            this.classList.add('was-validated');
            return;
        }
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Log submission (in production, send to backend)
        console.log('Contact form submitted:', data);
        alert('Thank you for your message! We will get back to you soon.');
        this.reset();
        this.classList.remove('was-validated');
    });
}

// ===== ENQUIRY FORM VALIDATION =====
const enquiryForm = document.getElementById('enquiryForm');
if (enquiryForm) {
    enquiryForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate form
        if (!this.checkValidity()) {
            e.stopPropagation();
            this.classList.add('was-validated');
            return;
        }
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Log submission (in production, send to backend)
        console.log('Enquiry form submitted:', data);
        alert('Thank you for your enquiry! We will contact you soon.');
        this.reset();
        this.classList.remove('was-validated');
    });
}

// ===== GALLERY FILTER =====
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');
const galleryGrid = document.getElementById('galleryGrid');

function checkAndShowNoData() {
    const visibleItems = Array.from(galleryItems).filter(item => item.style.display !== 'none');
    
    // Remove existing no-data message
    const existingNoData = galleryGrid.querySelector('.no-data-message');
    if (existingNoData) {
        existingNoData.remove();
    }
    
    // Show no-data message if no items are visible
    if (visibleItems.length === 0) {
        const noDataDiv = document.createElement('div');
        noDataDiv.className = 'no-data-message';
        noDataDiv.innerHTML = `
            <i class="fas fa-image"></i>
            <h3>No Images Found</h3>
            <p>There are no images in this category yet.</p>
        `;
        galleryGrid.appendChild(noDataDiv);
    }
}

filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        this.classList.add('active');

        const filterValue = this.getAttribute('data-filter');

        galleryItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                }, 10);
            } else {
                item.style.opacity = '0';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
        
        // Check and show no-data message after filter
        setTimeout(() => {
            checkAndShowNoData();
            initGallery();
        }, 350);
    });
});

// ===== GALLERY IMAGE OPEN IN MODAL =====
const previewModal = document.getElementById('previewModal');
const previewImg = document.getElementById('previewImg');
const previewClose = document.querySelector('.preview-close');
const previewPrev = document.querySelector('.preview-prev');
const previewNext = document.querySelector('.preview-next');

let currentImageIndex = 0;
let allImages = [];

function initGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item img');
    allImages = Array.from(galleryItems);
    
    if (allImages.length === 0) {
        return;
    }
    
    galleryItems.forEach((img, index) => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', function(e) {
            e.stopPropagation();
            currentImageIndex = index;
            openPreview();
        });
    });
}

function openPreview() {
    if (previewModal && previewImg && allImages.length > 0 && allImages[currentImageIndex]) {
        previewImg.src = allImages[currentImageIndex].src;
        previewModal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

function closePreview() {
    if (previewModal) {
        previewModal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
}

function nextImage() {
    if (allImages.length > 0) {
        currentImageIndex = (currentImageIndex + 1) % allImages.length;
        openPreview();
    }
}

function prevImage() {
    if (allImages.length > 0) {
        currentImageIndex = (currentImageIndex - 1 + allImages.length) % allImages.length;
        openPreview();
    }
}

// Event listeners
if (previewClose) {
    previewClose.addEventListener('click', closePreview);
}

if (previewPrev) {
    previewPrev.addEventListener('click', prevImage);
}

if (previewNext) {
    previewNext.addEventListener('click', nextImage);
}

if (previewModal) {
    previewModal.addEventListener('click', function(e) {
        if (e.target === previewModal) {
            closePreview();
        }
    });
}

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    if (previewModal && previewModal.classList.contains('show')) {
        if (e.key === 'Escape') {
            closePreview();
        } else if (e.key === 'ArrowRight') {
            nextImage();
        } else if (e.key === 'ArrowLeft') {
            prevImage();
        }
    }
});

// Initialize on page load
window.addEventListener('load', initGallery);

// ===== ADMISSION MODAL =====
const admissionModal = document.getElementById('admissionModal');
const admissionBtns = document.querySelectorAll('[data-bs-target="#admissionModal"]');
const closeModalBtn = document.querySelector('.modal-close');

if (admissionModal) {
    const modal = new bootstrap.Modal(admissionModal);

    admissionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            modal.show();
        });
    });

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', function() {
            modal.hide();
        });
    }
}

// ===== BROCHURE DOWNLOAD =====
const downloadBtns = document.querySelectorAll('.download-brochure');
downloadBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        alert('Brochure download will start shortly. Thank you!');
        // In a real scenario, this would trigger an actual file download
    });
});

// ===== FLOATING BUTTONS ANIMATION =====
window.addEventListener('load', function() {
    const floatingBtns = document.querySelectorAll('.float-btn');
    floatingBtns.forEach((btn, index) => {
        btn.style.animationDelay = (index * 0.1) + 's';
    });
});

// ===== SMOOTH REVEAL ON SCROLL =====
const revealElements = document.querySelectorAll('[data-aos]');
let revealTicking = false;

const revealOnScroll = () => {
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;

        if (elementTop < window.innerHeight && elementBottom > 0) {
            element.classList.add('aos-animate');
        }
    });
    revealTicking = false;
};

window.addEventListener('scroll', () => {
    if (!revealTicking) {
        window.requestAnimationFrame(revealOnScroll);
        revealTicking = true;
    }
}, false);

revealOnScroll(); // Call on page load

// ===== ACCORDION ANIMATION =====
const accordionButtons = document.querySelectorAll('.accordion-button');
accordionButtons.forEach(button => {
    button.addEventListener('click', function() {
        const accordionItem = this.closest('.accordion-item');
        const accordionBody = accordionItem.querySelector('.accordion-body');
        
        if (this.classList.contains('collapsed')) {
            accordionBody.style.animation = 'slideDown 0.3s ease-out';
        }
    });
});

// ===== UTILITY FUNCTION: DEBOUNCE =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ===== LAZY LOAD IMAGES =====
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}


// ===== PAGE LOADER - Hide on navigation =====
document.addEventListener('DOMContentLoaded', function() {
    const loader = document.getElementById('page-loader');
    if (loader && sessionStorage.getItem('siteVisited')) {
        // If already visited, hide loader immediately
        loader.style.display = 'none';
        loader.style.pointerEvents = 'none';
    }
});
