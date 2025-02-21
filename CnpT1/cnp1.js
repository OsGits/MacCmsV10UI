// 将函数定义移到全局作用域
window.scrollToTop = function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
};

document.addEventListener('DOMContentLoaded', function() {
    // 图片懒加载功能
    const lazyLoadImages = () => {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const actualSrc = img.getAttribute('data-src');
                    if (actualSrc) {
                        img.onload = () => {
                            img.classList.add('loaded');
                        };
                        img.src = actualSrc;
                        img.removeAttribute('data-src');
                        observer.unobserve(img);
                    }
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.01
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    };

    lazyLoadImages();

    // 弹窗控制函数
    window.togglePopup = function() {
        const popup = document.getElementById('popupWindow');
        const overlay = document.getElementById('popupOverlay');
        
        if (popup && overlay) {
            popup.classList.toggle('show');
            overlay.classList.toggle('show');
            
            // 当弹窗打开时禁止背景滚动
            document.body.style.overflow = popup.classList.contains('show') ? 'hidden' : '';
        }
    };

    // 点击其他地方关闭弹窗
    document.addEventListener('click', function(e) {
        const popup = document.getElementById('popupWindow');
        const floatButton = document.querySelector('.float-button');
        const overlay = document.getElementById('popupOverlay');
        
        if (popup && floatButton && overlay && 
            !popup.contains(e.target) && 
            !floatButton.contains(e.target)) {
            popup.classList.remove('show');
            overlay.classList.remove('show');
            document.body.style.overflow = '';
        }
    });
});