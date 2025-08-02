// Country page specific JavaScript

// City details functionality
function openCityDetails(cityId) {
    // Hide all city details
    const allDetails = document.querySelectorAll('.city-details');
    allDetails.forEach(detail => {
        detail.classList.remove('active');
    });
    
    // Show specific city details
    const cityDetails = document.getElementById(cityId + '-details');
    if (cityDetails) {
        cityDetails.classList.add('active');
        
        // Smooth scroll to details
        cityDetails.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

function closeCityDetails() {
    const allDetails = document.querySelectorAll('.city-details');
    allDetails.forEach(detail => {
        detail.classList.remove('active');
    });
}

// Photo gallery lightbox
function openLightbox(img) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightbox.classList.add('active');
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
    
    // Restore body scroll
    document.body.style.overflow = 'auto';
}

// Close lightbox when clicking outside the image
document.getElementById('lightbox').addEventListener('click', function(e) {
    if (e.target === this) {
        closeLightbox();
    }
});

// Close lightbox with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeLightbox();
        closeCityDetails();
    }
});

// Weather widget simulation
function updateWeatherInfo(city) {
    // This would typically connect to a weather API
    const weatherData = {
        'marrakech': {
            temperature: '28°C',
            condition: 'مشمس',
            humidity: '45%',
            windSpeed: '15 كم/س'
        },
        'casablanca': {
            temperature: '22°C',
            condition: 'غائم جزئياً',
            humidity: '65%',
            windSpeed: '20 كم/س'
        },
        'fes': {
            temperature: '25°C',
            condition: 'صافي',
            humidity: '50%',
            windSpeed: '10 كم/س'
        }
    };
    
    return weatherData[city] || weatherData['marrakech'];
}

// Currency converter simulation
function convertToLocalCurrency(amount, currency = 'USD') {
    const exchangeRates = {
        'USD': 10.5, // MAD per USD
        'EUR': 11.2, // MAD per EUR
        'SAR': 2.8,  // MAD per SAR
        'AED': 2.9   // MAD per AED
    };
    
    const madAmount = amount * (exchangeRates[currency] || exchangeRates['USD']);
    return madAmount.toFixed(2) + ' درهم مغربي';
}

// Travel tips based on season
function getSeasonalTips() {
    const currentMonth = new Date().getMonth() + 1; // 1-12
    
    if (currentMonth >= 6 && currentMonth <= 8) {
        return [
            'اشرب الكثير من الماء - الصيف حار جداً',
            'ارتدِ ملابس خفيفة وفاتحة اللون',
            'تجنب الخروج في ساعات الذروة (12-4 مساءً)',
            'استخدم واقي الشمس بقوة عالية'
        ];
    } else if (currentMonth >= 12 || currentMonth <= 2) {
        return [
            'أحضر ملابس دافئة للمساء',
            'الطقس معتدل ومثالي للتجول',
            'قد تحتاج لمعطف خفيف',
            'أفضل وقت لزيارة الصحراء'
        ];
    } else {
        return [
            'الطقس مثالي للسياحة',
            'ملابس خفيفة للنهار ودافئة للمساء',
            'وقت رائع لجميع الأنشطة الخارجية',
            'لا تنس الكاميرا - الطبيعة في أجمل حالاتها'
        ];
    }
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    // Add seasonal tips
    const tipsContainer = document.querySelector('.tips-info ul');
    if (tipsContainer) {
        const seasonalTips = getSeasonalTips();
        seasonalTips.forEach(tip => {
            const li = document.createElement('li');
            li.textContent = tip;
            li.style.color = '#e67e22';
            li.style.fontWeight = '500';
            tipsContainer.appendChild(li);
        });
    }
    
    // Add loading animation for images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        // Set initial opacity
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s ease';
    });
    
    // Add scroll animations
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
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.city-card, .fact, .booking-link');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Share functionality
function shareCountry(countryName, url) {
    if (navigator.share) {
        navigator.share({
            title: `السياحة في ${countryName}`,
            text: `اكتشف جمال ${countryName} وأهم معالمها السياحية`,
            url: url
        });
    } else {
        // Fallback for browsers that don't support Web Share API
        const shareText = `اكتشف جمال ${countryName} وأهم معالمها السياحية: ${url}`;
        navigator.clipboard.writeText(shareText).then(() => {
            alert('تم نسخ الرابط إلى الحافظة');
        });
    }
}

// Print functionality
function printCountryInfo() {
    window.print();
}

// Bookmark functionality
function bookmarkCountry(countryName) {
    if (localStorage) {
        let bookmarks = JSON.parse(localStorage.getItem('tourismBookmarks') || '[]');
        const bookmark = {
            name: countryName,
            url: window.location.href,
            date: new Date().toISOString()
        };
        
        // Check if already bookmarked
        const exists = bookmarks.find(b => b.url === bookmark.url);
        if (!exists) {
            bookmarks.push(bookmark);
            localStorage.setItem('tourismBookmarks', JSON.stringify(bookmarks));
            alert(`تم حفظ ${countryName} في المفضلة`);
        } else {
            alert(`${countryName} محفوظ مسبقاً في المفضلة`);
        }
    }
}

