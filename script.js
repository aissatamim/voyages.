// Enhanced Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    if (navMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.style.overflow = 'auto';
}));

// Close mobile menu when clicking outside
document.addEventListener('click', function(e) {
    if (navMenu && navMenu.classList.contains('active') && 
        !navMenu.contains(e.target) && !hamburger.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Enhanced Search functionality
function searchDestination() {
    const searchInput = document.getElementById('searchInput');
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    if (searchTerm === '') {
        alert('يرجى إدخال اسم الدولة أو المدينة للبحث');
        return;
    }
    
    // Define comprehensive search mappings
    const destinations = {
        // المغرب
        'المغرب': 'morocco.html',
        'مراكش': 'morocco.html',
        'الرباط': 'morocco.html',
        'فاس': 'morocco.html',
        'الدار البيضاء': 'morocco.html',
        'شفشاون': 'morocco.html',
        'أكادير': 'morocco.html',
        'morocco': 'morocco.html',
        'marrakech': 'morocco.html',
        'casablanca': 'morocco.html',
        'fes': 'morocco.html',
        'chefchaouen': 'morocco.html',
        
        // فرنسا
        'فرنسا': 'france.html',
        'باريس': 'france.html',
        'ليون': 'france.html',
        'نيس': 'france.html',
        'مرسيليا': 'france.html',
        'كان': 'france.html',
        'بوردو': 'france.html',
        'france': 'france.html',
        'paris': 'france.html',
        'lyon': 'france.html',
        'nice': 'france.html',
        'marseille': 'france.html',
        'cannes': 'france.html',
        
        // تركيا
        'تركيا': 'turkey.html',
        'إسطنبول': 'turkey.html',
        'أنقرة': 'turkey.html',
        'أنطاليا': 'turkey.html',
        'كابادوكيا': 'turkey.html',
        'باموكالي': 'turkey.html',
        'بودروم': 'turkey.html',
        'turkey': 'turkey.html',
        'istanbul': 'turkey.html',
        'ankara': 'turkey.html',
        'antalya': 'turkey.html',
        'cappadocia': 'turkey.html',
        'pamukkale': 'turkey.html',
        
        // اليابان
        'اليابان': 'japan.html',
        'طوكيو': 'japan.html',
        'أوساكا': 'japan.html',
        'كيوتو': 'japan.html',
        'هيروشيما': 'japan.html',
        'ناغويا': 'japan.html',
        'يوكوهاما': 'japan.html',
        'japan': 'japan.html',
        'tokyo': 'japan.html',
        'osaka': 'japan.html',
        'kyoto': 'japan.html',
        'hiroshima': 'japan.html',
        
        // الولايات المتحدة
        'الولايات المتحدة': 'usa.html',
        'أمريكا': 'usa.html',
        'نيويورك': 'usa.html',
        'لوس أنجلوس': 'usa.html',
        'سان فرانسيسكو': 'usa.html',
        'لاس فيغاس': 'usa.html',
        'شيكاغو': 'usa.html',
        'ميامي': 'usa.html',
        'usa': 'usa.html',
        'america': 'usa.html',
        'new york': 'usa.html',
        'los angeles': 'usa.html',
        'san francisco': 'usa.html',
        'las vegas': 'usa.html',
        'chicago': 'usa.html',
        'miami': 'usa.html',
        
        // إيطاليا
        'إيطاليا': 'italy.html',
        'روما': 'italy.html',
        'ميلان': 'italy.html',
        'فلورنسا': 'italy.html',
        'البندقية': 'italy.html',
        'نابولي': 'italy.html',
        'تورين': 'italy.html',
        'italy': 'italy.html',
        'rome': 'italy.html',
        'milan': 'italy.html',
        'florence': 'italy.html',
        'venice': 'italy.html',
        'naples': 'italy.html'
    };
    
    // Search for exact match first
    let destination = destinations[searchTerm];
    
    if (destination) {
        window.location.href = destination;
        searchInput.value = '';
        return;
    }
    
    // Search for partial matches
    const partialMatches = [];
    for (const [key, value] of Object.entries(destinations)) {
        if (key.includes(searchTerm) || searchTerm.includes(key)) {
            if (!partialMatches.find(match => match.page === value)) {
                partialMatches.push({ name: key, page: value });
            }
        }
    }
    
    if (partialMatches.length > 0) {
        // Show suggestions
        let message = 'هل تقصد إحدى هذه الوجهات؟\n\n';
        partialMatches.slice(0, 5).forEach((match, index) => {
            message += `${index + 1}. ${match.name}\n`;
        });
        
        const choice = prompt(message + '\nأدخل رقم الخيار (1-' + Math.min(5, partialMatches.length) + ') أو اضغط إلغاء:');
        const choiceIndex = parseInt(choice) - 1;
        
        if (choiceIndex >= 0 && choiceIndex < partialMatches.length) {
            window.location.href = partialMatches[choiceIndex].page;
        }
    } else {
        alert('عذراً، لم نجد معلومات عن هذه الوجهة. جرب البحث عن: المغرب، فرنسا، تركيا، اليابان، أمريكا، أو إيطاليا');
    }
    
    // Clear search input
    searchInput.value = '';
}

// Allow search on Enter key press
document.getElementById('searchInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        searchDestination();
    }
});

// Enhanced search with dropdown suggestions
function createSearchSuggestions() {
    const searchInput = document.getElementById('searchInput');
    const searchContainer = searchInput.parentElement;
    
    // Create suggestions dropdown
    const suggestionsDiv = document.createElement('div');
    suggestionsDiv.className = 'search-suggestions';
    suggestionsDiv.style.cssText = `
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: white;
        border: 1px solid #ddd;
        border-top: none;
        border-radius: 0 0 10px 10px;
        max-height: 200px;
        overflow-y: auto;
        z-index: 1000;
        display: none;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    `;
    searchContainer.appendChild(suggestionsDiv);
    
    const popularDestinations = [
        { name: 'المغرب', page: 'morocco.html' },
        { name: 'فرنسا', page: 'france.html' },
        { name: 'تركيا', page: 'turkey.html' },
        { name: 'اليابان', page: 'japan.html' },
        { name: 'الولايات المتحدة', page: 'usa.html' },
        { name: 'إيطاليا', page: 'italy.html' }
    ];
    
    searchInput.addEventListener('input', function() {
        const value = this.value.toLowerCase().trim();
        if (value.length > 0) {
            const matches = popularDestinations.filter(dest => 
                dest.name.includes(value)
            );
            
            if (matches.length > 0) {
                suggestionsDiv.innerHTML = matches.map(match => 
                    `<div class="suggestion-item" onclick="window.location.href='${match.page}'" style="padding: 12px; cursor: pointer; border-bottom: 1px solid #eee; transition: background 0.3s; font-family: 'Cairo', sans-serif;">${match.name}</div>`
                ).join('');
                suggestionsDiv.style.display = 'block';
                
                // Add hover effects
                suggestionsDiv.querySelectorAll('.suggestion-item').forEach(item => {
                    item.addEventListener('mouseenter', function() {
                        this.style.background = '#f8f9fa';
                    });
                    item.addEventListener('mouseleave', function() {
                        this.style.background = 'white';
                    });
                });
            } else {
                suggestionsDiv.style.display = 'none';
            }
        } else {
            suggestionsDiv.style.display = 'none';
        }
    });
    
    // Hide suggestions when clicking outside
    document.addEventListener('click', function(e) {
        if (!searchContainer.contains(e.target)) {
            suggestionsDiv.style.display = 'none';
        }
    });
}

// Open country page function
function openCountryPage(country) {
    const countryPages = {
        'morocco': 'morocco.html',
        'france': 'france.html',
        'turkey': 'turkey.html',
        'japan': 'japan.html',
        'usa': 'usa.html',
        'italy': 'italy.html'
    };
    
    if (countryPages[country]) {
        window.location.href = countryPages[country];
    }
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Close mobile menu if open
            if (navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        }
    });
});

// Enhanced Contact form submission
document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const name = this.querySelector('input[type="text"]').value.trim();
    const email = this.querySelector('input[type="email"]').value.trim();
    const message = this.querySelector('textarea').value.trim();
    
    // Validation
    if (name === '' || email === '' || message === '') {
        alert('يرجى ملء جميع الحقول المطلوبة');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('يرجى إدخال بريد إلكتروني صحيح');
        return;
    }
    
    // Name validation
    if (name.length < 2) {
        alert('يرجى إدخال اسم صحيح');
        return;
    }
    
    // Message validation
    if (message.length < 10) {
        alert('يرجى كتابة رسالة أكثر تفصيلاً (على الأقل 10 أحرف)');
        return;
    }
    
    // Simulate form submission with loading
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'جاري الإرسال...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        alert('شكراً لك! تم إرسال رسالتك بنجاح. سنتواصل معك خلال 24 ساعة.');
        this.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 1500);
});

// Back to top button
function createBackToTopButton() {
    const backToTopBtn = document.createElement('button');
    backToTopBtn.id = 'back-to-top';
    backToTopBtn.innerHTML = '↑';
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 20px;
        background: linear-gradient(135deg, #2c5aa0, #764ba2);
        color: white;
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        font-size: 20px;
        cursor: pointer;
        display: none;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        transition: all 0.3s ease;
        font-family: Arial, sans-serif;
    `;
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    backToTopBtn.addEventListener('mouseenter', () => {
        backToTopBtn.style.transform = 'scale(1.1)';
    });
    
    backToTopBtn.addEventListener('mouseleave', () => {
        backToTopBtn.style.transform = 'scale(1)';
    });
    
    document.body.appendChild(backToTopBtn);
    
    // Show/hide based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.display = 'block';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });
}

// Enhanced animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Create search suggestions
    createSearchSuggestions();
    
    // Create back to top button
    createBackToTopButton();
    
    // Animate elements on scroll
    const animatedElements = document.querySelectorAll('.destination-card, .article-card, .feature-card');
    
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
    
    // Add hover effects to interactive elements
    const interactiveElements = document.querySelectorAll('.destination-card, .article-card, button, .btn');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            if (!this.style.transform.includes('scale')) {
                this.style.transform = 'translateY(-5px)';
            }
        });
        
        element.addEventListener('mouseleave', function() {
            if (!this.style.transform.includes('scale')) {
                this.style.transform = 'translateY(0)';
            }
        });
    });
    
    // Add loading states to buttons
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.type !== 'submit') {
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);
            }
        });
    });
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Fade in hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.opacity = '0';
        hero.style.transition = 'opacity 1s ease';
        setTimeout(() => {
            hero.style.opacity = '1';
        }, 100);
    }
});

// Weather widget (enhanced placeholder)
function getWeatherInfo(city) {
    // This would typically connect to a weather API
    const weatherData = {
        'مراكش': { temperature: '28°C', condition: 'مشمس', humidity: '45%' },
        'باريس': { temperature: '15°C', condition: 'غائم جزئياً', humidity: '70%' },
        'إسطنبول': { temperature: '22°C', condition: 'صافي', humidity: '60%' },
        'طوكيو': { temperature: '20°C', condition: 'ممطر خفيف', humidity: '80%' },
        'نيويورك': { temperature: '18°C', condition: 'مشمس', humidity: '55%' },
        'روما': { temperature: '25°C', condition: 'مشمس', humidity: '50%' }
    };
    
    return weatherData[city] || { temperature: '25°C', condition: 'مشمس', humidity: '60%' };
}

// Currency converter (enhanced placeholder)
function convertCurrency(amount, fromCurrency, toCurrency) {
    // This would typically connect to a currency API
    const rates = {
        'USD': 1,
        'EUR': 0.85,
        'SAR': 3.75,
        'AED': 3.67,
        'MAD': 10.5,
        'TRY': 27.5,
        'JPY': 150
    };
    
    const result = (amount / rates[fromCurrency]) * rates[toCurrency];
    return result.toFixed(2);
}

// Newsletter subscription (if exists on page)
function subscribeNewsletter() {
    const emailInput = document.querySelector('.newsletter input[type="email"]');
    if (!emailInput) return;
    
    const email = emailInput.value.trim();
    
    if (!email) {
        alert('يرجى إدخال بريدك الإلكتروني');
        return;
    }
    
    if (!email.includes('@') || !email.includes('.')) {
        alert('يرجى إدخال بريد إلكتروني صحيح');
        return;
    }
    
    // Simulate subscription
    alert('شكراً لك! تم تسجيل اشتراكك في النشرة الإخبارية بنجاح.');
    emailInput.value = '';
}

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Escape key closes mobile menu
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    // Enter key on search input
    if (e.key === 'Enter' && document.activeElement.id === 'searchInput') {
        searchDestination();
    }
});
document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', function () {
        navMenu.classList.toggle('active');
    });
});
