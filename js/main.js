// 导航栏滚动效果控制
const navbar = document.querySelector('.navbar');
const navbarHeight = navbar.offsetHeight;
const scrollThreshold = 10;

// 平滑滚动到锚点
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        // 为特定section添加偏移
        const offset = (targetId === '#about-section' || 
                       targetId === '#focus-areas-section' || 
                       targetId === '#latest-news-section') ? -156 : 0;
        
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset + offset;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    });
});

// 数字动画效果
function animateNumbers() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(number => {
        const target = parseInt(number.getAttribute('data-target'));
        const increment = target / 100;
        let current = 0;

        const updateNumber = () => {
            if(current < target) {
                current += increment;
                number.textContent = Math.round(current);
                requestAnimationFrame(updateNumber);
            } else {
                number.textContent = target;
            }
        };

        updateNumber();
    });
}

// 监听滚动，当年度回顾部分进入视图时触发动画
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            animateNumbers();
            observer.unobserve(entry.target);
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const yearReview = document.querySelector('.year-review');
    if(yearReview) {
        observer.observe(yearReview);
    }
});

// 动态加载新闻
function loadNews() {
    const newsGrid = document.querySelector('.news-grid');
    const newsData = [
        {
            title: '2024 Agricultural Development Program Launched',
            date: 'January 15, 2024',
            image: 'https://images.unsplash.com/photo-1592982537447-6f2a6a0c7c18?w=600&h=400&fit=crop',
            summary: 'We have launched our new agricultural development program...'
        },
        {
            title: 'Partnership Announcement with Global Agri-Tech',
            date: 'January 10, 2024',
            image: 'https://images.unsplash.com/photo-1595974482622-a7f618a57eb7?w=600&h=400&fit=crop',
            summary: 'Exciting new partnership to bring innovative agricultural solutions...'
        },
        {
            title: 'Success Story: Community Farming Initiative',
            date: 'January 5, 2024',
            image: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?w=600&h=400&fit=crop',
            summary: 'How our community farming initiative is transforming local agriculture...'
        }
    ];

    newsData.forEach(news => {
        const newsCard = `
            <div class="news-card">
                <img src="${news.image}" alt="${news.title}">
                <div class="news-content">
                    <h3>${news.title}</h3>
                    <p class="date">${news.date}</p>
                    <p>${news.summary}</p>
                </div>
            </div>
        `;
        newsGrid.innerHTML += newsCard;
    });
}

// 语言切换功能
function changeLanguage(lang) {
    console.log(`Switching to ${lang}`);
    // Here you would implement the actual language switching logic
    // This would typically involve loading different language files
    // and updating the content throughout the site
}

// 图片轮播功能
function startImageSliders() {
    const sliders = document.querySelectorAll('.image-slider');
    
    sliders.forEach(slider => {
        const images = slider.querySelectorAll('img');
        let currentIndex = 0;
        
        setInterval(() => {
            // 淡出当前图片
            images[currentIndex].style.opacity = '0';
            
            // 更新索引
            currentIndex = (currentIndex + 1) % images.length;
            
            // 淡入下一张图片
            images[currentIndex].style.opacity = '1';
        }, 5000); // 每5秒切换一次
    });
}

// 在页面加载完成后启动轮播
document.addEventListener('DOMContentLoaded', () => {
    startImageSliders();
});

// 移除所有 YouTube 相关代码
function startHeroSlider() {
    const slider = document.querySelector('.hero-slider');
    if (!slider) return;

    const images = slider.querySelectorAll('img');
    let currentIndex = 0;
    
    setInterval(() => {
        // 淡出当前图片
        images[currentIndex].style.opacity = '0';
        
        // 更新索引
        currentIndex = (currentIndex + 1) % images.length;
        
        // 淡入下一张图片
        images[currentIndex].style.opacity = '1';
    }, 6000); // 每6秒切换一次
}

// 在页面加载完成后启动轮播
document.addEventListener('DOMContentLoaded', () => {
    startHeroSlider();
    startImageSliders(); // 保留项目卡片的图片轮播
});

// 动态加载各个部分
async function loadSections() {
    const sections = {
        'navbar': '/components/navbar/index.html',
        'hero': '/sections/hero/index.html',
        'partners': '/sections/partners/index.html',
        'focus-areas': '/sections/focus-areas/index.html',
        'about': '/sections/about/index.html',
        'footer': '/sections/footer/index.html'
    };
    
    for (const [id, path] of Object.entries(sections)) {
        try {
            const response = await fetch(path);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const html = await response.text();
            document.getElementById(id).innerHTML = html;
        } catch (error) {
            console.error(`Error loading section ${id}:`, error);
        }
    }
}

// 页面加载完成后加载所有部分
document.addEventListener('DOMContentLoaded', () => {
    loadSections().then(() => {
        // 初始化其他功能
        initNavbar();
        startHeroSlider();
        startImageSliders();
    });
});

// 图片预加载函数
function preloadImages(images) {
    images.forEach(image => {
        const img = new Image();
        img.src = image;
    });
}

// Hero部分的图片轮播
function initHeroSlider() {
    const heroImages = [
        'images/hero/slide1.jpg',
        'images/hero/slide2.jpg',
        'images/hero/slide3.jpg',
        'images/hero/slide4.jpg'
    ];
    
    // 预加载hero图片
    preloadImages(heroImages);
    
    const sliderTrack = document.querySelector('.hero__slider-track');
    if (!sliderTrack) return;

    let currentIndex = 0;
    
    function updateSlide() {
        const translateX = -currentIndex * 25; // 25%是每张图片的宽度
        sliderTrack.style.transform = `translateX(${translateX}%)`;
        currentIndex = (currentIndex + 1) % 4;
    }

    setInterval(updateSlide, 5000); // 每5秒切换一次
}

// Focus Areas 图片处理
function initFocusAreasImages() {
    // 图片灰度效果
    const focusImages = document.querySelectorAll('.focus-card__image img');
    
    focusImages.forEach(img => {
        img.addEventListener('load', () => {
            img.style.filter = 'grayscale(100%)';
        });
    });
}

// 图片懒加载
function initLazyLoading() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));
}

// 图片错误处理
function handleImageErrors() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.onerror = () => {
            img.src = 'images/placeholder.jpg';
            img.alt = 'Image not available';
        };
    });
}

// 初始化所有图片相关功能
document.addEventListener('DOMContentLoaded', () => {
    initHeroSlider();
    initFocusAreasImages();
    initLazyLoading();
    handleImageErrors();
});

let lastScrollTop = 0;
const logoFrame = document.getElementById('logoFrame');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop) {
        // 向下滚动
        logoFrame.classList.add('hide');
    } else {
        // 向上滚动
        logoFrame.classList.remove('hide');
    }
    
    lastScrollTop = scrollTop;
});

// 添加图片加载错误处理
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('.hero__slider-img');
    images.forEach(img => {
        img.onerror = () => {
            console.error(`Failed to load image: ${img.src}`);
            img.style.background = '#ddd';  // 加载失败时显示灰色背景
        };
    });
}); 