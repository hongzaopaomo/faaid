document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('newsModal');
    const modalTitle = modal.querySelector('.news-modal__title');
    const modalDate = modal.querySelector('.news-modal__date');
    const modalArticle = modal.querySelector('.news-modal__article');
    const modalImage = modal.querySelector('.news-modal__img');
    const newsModalOverlay = document.querySelector('.news-modal__overlay');
    const newsModalContent = document.querySelector('.news-modal__content');
    const closeButton = document.querySelector('.news-modal__close');

    // 更新弹出框位置
    function updateModalPosition() {
        const newsLink = document.querySelector('a[href="#latest-news-section"]');
        const buttonRect = newsLink.getBoundingClientRect();
        newsModalContent.style.top = `${buttonRect.bottom}px`;
    }

    // 打开模态框
    function openModal(title, date, content, imageUrl) {
        updateModalPosition();
        modal.classList.add('active');
        newsModalOverlay.classList.add('active');
        document.documentElement.classList.add('no-scroll');
        
        requestAnimationFrame(() => {
            newsModalContent.classList.add('active');
        });
        
        modalTitle.textContent = title;
        modalDate.textContent = date;
        modalArticle.innerHTML = content;
        modalImage.src = imageUrl;
    }

    // 关闭模态框
    function closeModal() {
        modal.classList.remove('active');
        newsModalOverlay.classList.remove('active');
        newsModalContent.classList.remove('active');
        document.documentElement.classList.remove('no-scroll');
    }

    // 点击新闻卡片打开模态框
    document.querySelectorAll('.news-card__link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const card = this.closest('.news-card');
            const title = card.querySelector('.news-card__title').textContent;
            const date = card.querySelector('.news-card__date').textContent;
            const imageUrl = card.querySelector('.news-card__img').src;
            // 这里可以通过 AJAX 请求获取完整的新闻内容
            const content = `
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
            `;
            
            openModal(title, date, content, imageUrl);
        });
    });

    // 点击关闭按钮关闭模态框
    closeButton.addEventListener('click', closeModal);

    // 点击遮罩层关闭模态框
    newsModalOverlay.addEventListener('click', (e) => {
        if (e.target === newsModalOverlay) {
            closeModal();
        }
    });

    // ESC键关闭模态框
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // 窗口大小改变时更新位置
    window.addEventListener('resize', () => {
        if (modal.classList.contains('active')) {
            updateModalPosition();
        }
    });
}); 