document.addEventListener('DOMContentLoaded', function() {
    // 获取所有需要平滑滚动的链接
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // 获取导航栏高度（如果有固定导航栏）
                const navHeight = document.querySelector('.navbar-section')?.offsetHeight || 0;
                
                // 计算目标位置，考虑导航栏高度
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
                
                // 平滑滚动
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}); 