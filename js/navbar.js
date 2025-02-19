document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar-section');
    const navLinks = document.querySelectorAll('.navbar__link');
    const sections = {};
    let lastScrollY = window.scrollY;

    // 收集所有section的位置信息
    navLinks.forEach(link => {
        const sectionId = link.getAttribute('href').substring(1);
        const section = document.getElementById(sectionId);
        if (section) {
            sections[sectionId] = section;
        }
    });

    // 检查当前滚动位置，激活对应的导航按钮
    function setActiveNavLink() {
        const scrollPosition = window.scrollY + 56; // 导航栏高度

        Object.entries(sections).forEach(([sectionId, section]) => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            const link = document.querySelector(`a[href="#${sectionId}"]`);

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    // 监听滚动事件
    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        
        // 根据滚动方向控制顶部区域的显示/隐藏
        if (currentScrollY > lastScrollY) {
            // 向下滚动
            navbar.classList.add('header-hidden');
        } else {
            // 向上滚动
            navbar.classList.remove('header-hidden');
        }
        
        lastScrollY = currentScrollY;
        setActiveNavLink();
    });

    // 初始检查激活状态
    setActiveNavLink();
}); 