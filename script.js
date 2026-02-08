// DOM Elements
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const backToTopBtn = document.getElementById('backToTop');
const downloadBtn = document.getElementById('downloadBtn');
const downloadModal = document.getElementById('downloadModal');
const closeModalBtns = document.querySelectorAll('.close-modal, .close-modal-btn');
const contactForm = document.getElementById('contactForm');
const loadMoreBtn = document.getElementById('loadMoreExperience');
const currentYearSpan = document.getElementById('currentYear');

// Toggle Mobile Menu
menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    menuToggle.innerHTML = navMenu.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Back to Top Button
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopBtn.style.display = 'flex';
    } else {
        backToTopBtn.style.display = 'none';
    }
    
    // Update active nav link based on scroll position
    updateActiveNavLink();
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Download Resume Modal
downloadBtn.addEventListener('click', (e) => {
    e.preventDefault();
    downloadModal.style.display = 'flex';
});

closeModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        downloadModal.style.display = 'none';
    });
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === downloadModal) {
        downloadModal.style.display = 'none';
    }
});

// Contact Form Submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const formData = new FormData(contactForm);
    const name = formData.get('name') || document.querySelector('#contactForm input[type="text"]').value;
    const email = formData.get('email') || document.querySelector('#contactForm input[type="email"]').value;
    const subject = formData.get('subject') || document.querySelectorAll('#contactForm input[type="text"]')[1].value;
    const message = formData.get('message') || document.querySelector('#contactForm textarea').value;
    
    // In a real application, you would send this data to a server
    // For demo purposes, we'll just show an alert
    alert(`Thank you for your message, ${name}! I'll get back to you soon at ${email}.`);
    
    // Reset form
    contactForm.reset();
});

// Load More Experience (Demo)
loadMoreBtn.addEventListener('click', () => {
    const timeline = document.querySelector('.timeline');
    const additionalExperiences = [
        {
            date: "Apr 2011 - Jan 2014",
            title: "ATM Machine Maintenance",
            company: "PT. Tunas Artha Gardatama",
            location: "Jakarta, Indonesia",
            bullets: [
                "Performed regular maintenance on ATMs, including cleaning, calibrating sensors, and replacing parts.",
                "Fixed technical problems, such as money dispenser failure, software system errors, or network problems, according to the SLA.",
                "Monitored ATMs remotely and in the field, and responded to potential problems."
            ],
            skills: ["Electromechanical Engineering", "ATM Troubleshooting", "Inventory Management", "Data Analysis"]
        },
        {
            date: "Jul 2007 - Oct 2010",
            title: "Cook",
            company: "PT. Fastfood Indonesia (KFC Indonesia)",
            location: "Tangerang Selatan, Indonesia",
            bullets: [
                "Processed raw materials into ready-to-eat products according to recipes, SOPs, and KFC quality standards.",
                "Controlled raw material stocks and ensured product freshness, reporting restock needs to the logistics team.",
                "Managed cooking time efficiently to meet fast-service targets during peak hours."
            ],
            skills: ["Frying Techniques", "Inventory Management", "Food Safety", "Team Collaboration"]
        }
    ];
    
    additionalExperiences.forEach(exp => {
        const timelineItem = document.createElement('div');
        timelineItem.className = 'timeline-item';
        
        timelineItem.innerHTML = `
            <div class="timeline-date">${exp.date}</div>
            <div class="timeline-content">
                <h3>${exp.title}</h3>
                <h4>${exp.company}</h4>
                <p class="company-location">${exp.location}</p>
                <ul>
                    ${exp.bullets.map(bullet => `<li>${bullet}</li>`).join('')}
                </ul>
                <div class="skill-tags">
                    ${exp.skills.map(skill => `<span>${skill}</span>`).join('')}
                </div>
            </div>
        `;
        
        timeline.appendChild(timelineItem);
    });
    
    loadMoreBtn.style.display = 'none';
    alert('Additional experiences loaded!');
});

// Update active navigation link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Set current year in footer
currentYearSpan.textContent = new Date().getFullYear();

// Initialize with active nav link
updateActiveNavLink();

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.timeline-item, .skill-category, .cert-card, .stat-card').forEach(el => {
    observer.observe(el);
});
