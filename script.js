// Food Data with new images
const foodItems = [
    {
        id: 1,
        name: "محشي ورق عنب",
        cook: "أم أحمد",
        category: "traditional",
        price: 85,
        time: "45 دقيقة",
        rating: 4.9,
        reviews: 128,
        badges: ["ai", "trust"],
        img: "https://images.unsplash.com/photo-1541518763669-27fef04b14ea?w=600&h=400&fit=crop",
        cookImg: "https://images.unsplash.com/photo-1581299894007-aaa50297cf16?w=100&h=100&fit=crop"
    },
    {
        id: 2,
        name: "كشري بلدي",
        cook: "أم حسن",
        category: "traditional",
        price: 55,
        time: "30 دقيقة",
        rating: 4.8,
        reviews: 234,
        badges: ["popular"],
        img: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&h=400&fit=crop",
        cookImg: "https://images.unsplash.com/photo-1594744803329-e58b31de6bf5?w=100&h=100&fit=crop"
    },
    {
        id: 3,
        name: "ملوخية بالأرز",
        cook: "أم فاطمة",
        category: "traditional",
        price: 70,
        time: "50 دقيقة",
        rating: 4.9,
        reviews: 89,
        badges: ["ai", "trust"],
        img: "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=600&h=400&fit=crop",
        cookImg: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop"
    },
    {
        id: 4,
        name: "كفتة مشوية",
        cook: "أم خالد",
        category: "traditional",
        price: 95,
        time: "35 دقيقة",
        rating: 4.7,
        reviews: 156,
        badges: ["popular"],
        img: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=600&h=400&fit=crop",
        cookImg: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop"
    },
    {
        id: 5,
        name: "فول وفلافل",
        cook: "أم نور",
        category: "healthy",
        price: 40,
        time: "20 دقيقة",
        rating: 4.8,
        reviews: 312,
        badges: ["ai", "popular"],
        img: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=600&h=400&fit=crop",
        cookImg: "https://images.unsplash.com/photo-1554151228-14d9def656ec?w=100&h=100&fit=crop"
    },
    {
        id: 6,
        name: "بسبوسة بالمكسرات",
        cook: "أم سلمى",
        category: "desserts",
        price: 65,
        time: "60 دقيقة",
        rating: 4.9,
        reviews: 78,
        badges: ["trust"],
        img: "https://images.unsplash.com/photo-1519676867240-fb8a883dc6d8?w=600&h=400&fit=crop",
        cookImg: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
    }
];

// Onboarding Functions
let currentStep = 1;
const totalSteps = 4;

function showOnboarding() {
    document.getElementById('onboardingOverlay').classList.add('active');
    currentStep = 1;
    updateStep();
}

function nextStep() {
    if (currentStep < totalSteps) {
        currentStep++;
        updateStep();
    }
}

function prevStep() {
    if (currentStep > 1) {
        currentStep--;
        updateStep();
    }
}

function updateStep() {
    document.querySelectorAll('.onboarding-step').forEach(step => {
        step.classList.remove('active');
    });
    document.querySelector(`.onboarding-step[data-step="${currentStep}"]`).classList.add('active');
    
    document.querySelectorAll('.progress-dot').forEach((dot, index) => {
        if (index < currentStep) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

function completeOnboarding() {
    document.getElementById('onboardingOverlay').classList.remove('active');
    localStorage.setItem('onboardingCompleted', 'true');
}

// Theme Toggle
function toggleTheme() {
    const html = document.documentElement;
    const icon = document.getElementById('themeIcon');
    
    if (html.getAttribute('data-theme') === 'dark') {
        html.removeAttribute('data-theme');
        icon.className = 'bx bx-moon';
        localStorage.setItem('theme', 'light');
    } else {
        html.setAttribute('data-theme', 'dark');
        icon.className = 'bx bx-sun';
        localStorage.setItem('theme', 'dark');
    }
}

// Load saved theme
if (localStorage.getItem('theme') === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    document.getElementById('themeIcon').className = 'bx bx-sun';
}

// Check if onboarding was completed
window.addEventListener('load', () => {
    if (!localStorage.getItem('onboardingCompleted')) {
        setTimeout(() => {
            showOnboarding();
        }, 1000);
    }
});

// Render Food Cards
function renderFoodCards(filter = 'all') {
    const grid = document.getElementById('foodGrid');
    const filtered = filter === 'all' ? foodItems : foodItems.filter(item => item.category === filter);

    grid.innerHTML = filtered.map(item => `
        <div class="food-card" data-category="${item.category}">
            <div class="food-card-image">
                <img src="${item.img}" alt="${item.name}">
                <div class="food-card-badges">
                    ${item.badges.map(badge => {
                        if (badge === 'ai') return '<span class="food-badge ai"><i class="bx bx-ai"></i> مطابق AI</span>';
                        if (badge === 'trust') return '<span class="food-badge trust"><i class="bx bx-shield-check"></i> معتمد</span>';
                        if (badge === 'popular') return '<span class="food-badge popular"><i class="bx bx-fire"></i> شائع</span>';
                    }).join('')}
                </div>
                <button class="food-card-fav" onclick="toggleFav(this)">
                    <i class='bx bx-heart'></i>
                </button>
            </div>
            <div class="food-card-body">
                <div class="food-card-cook">
                    <img src="${item.cookImg}" alt="${item.cook}" class="cook-avatar">
                    <span class="cook-name">${item.cook}</span>
                    <i class='bx bxs-check-circle cook-verified'></i>
                </div>
                <h3 class="food-card-title">${item.name}</h3>
                <div class="food-card-meta">
                    <span><i class='bx bx-time'></i> ${item.time}</span>
                    <span><i class='bx bx-star' style="color: var(--gold);"></i> ${item.rating} (${item.reviews})</span>
                </div>
                <div class="food-card-footer">
                    <div class="food-price">${item.price} جنيه <span>/ حصة</span></div>
                    <button class="btn btn-primary btn-sm" onclick="addToCart('${item.name}')">
                        <i class='bx bx-cart-add'></i> اطلب
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Filter Food
function filterFood(category, btn) {
    document.querySelectorAll('.food-tab').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');
    renderFoodCards(category);
}

// Toggle Favorite
function toggleFav(btn) {
    btn.classList.toggle('liked');
    const icon = btn.querySelector('i');
    if (btn.classList.contains('liked')) {
        icon.className = 'bx bxs-heart';
    } else {
        icon.className = 'bx bx-heart';
    }
}

// Add to Cart
function addToCart(name) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 90px;
        left: 24px;
        background: var(--secondary);
        color: white;
        padding: 16px 24px;
        border-radius: 12px;
        box-shadow: 0 8px 24px rgba(0,0,0,0.2);
        z-index: 10000;
        font-weight: 600;
        font-size: 14px;
        display: flex;
        align-items: center;
        gap: 10px;
        animation: fadeInLeft 0.3s ease;
    `;
    notification.innerHTML = `<i class='bx bx-check-circle'></i> ${name} أضيف إلى السلة!`;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(-100px)';
        notification.style.transition = 'all 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 2500);
}

// Page Navigation
function showPage(page) {
    document.querySelectorAll('.page-section').forEach(p => p.classList.remove('active'));
    const targetPage = document.getElementById(`page-${page}`);
    if (targetPage) {
        targetPage.classList.add('active');
    }

    document.querySelectorAll('.nav-links a').forEach(a => {
        a.classList.remove('active');
        if (a.dataset.page === page) {
            a.classList.add('active');
        }
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Mobile Menu Toggle
function toggleMobile() {
    const menu = document.getElementById('mobileMenu');
    menu.classList.toggle('open');
}

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderFoodCards();
});
