document.addEventListener('DOMContentLoaded', function() {
    const boardLink = document.querySelector('a[href="#board"]');
    const boardDropdown = document.getElementById('boardDropdown');
    const boardOverlay = document.getElementById('boardOverlay');
    let isDropdownOpen = false;

    // 更新弹出框位置
    function updateDropdownPosition() {
        const buttonRect = boardLink.getBoundingClientRect();
        const navbarHeight = document.querySelector('.navbar-section').offsetHeight;
        boardDropdown.style.top = `${buttonRect.bottom}px`;
    }

    // 点击导航链接时切换弹出框
    boardLink.addEventListener('click', (e) => {
        e.preventDefault();
        isDropdownOpen = !isDropdownOpen;
        
        if (isDropdownOpen) {
            updateDropdownPosition();
            boardDropdown.classList.add('active');
            boardOverlay.classList.add('active');
            document.documentElement.classList.add('no-scroll');
            document.addEventListener('click', handleOutsideClick);
        } else {
            closeDropdown();
        }
    });

    // 处理点击外部区域
    function handleOutsideClick(e) {
        if (!boardDropdown.contains(e.target) && !boardLink.contains(e.target)) {
            closeDropdown();
        }
    }

    // 关闭弹出框
    function closeDropdown() {
        isDropdownOpen = false;
        boardDropdown.classList.remove('active');
        boardOverlay.classList.remove('active');
        document.documentElement.classList.remove('no-scroll');
        document.removeEventListener('click', handleOutsideClick);
    }

    // 滚动时关闭弹出框
    window.addEventListener('scroll', () => {
        if (isDropdownOpen) {
            closeDropdown();
        }
    });

    // 窗口大小改变时更新位置
    window.addEventListener('resize', () => {
        if (isDropdownOpen) {
            updateDropdownPosition();
        }
    });
}); 