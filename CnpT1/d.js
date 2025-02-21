document.addEventListener('DOMContentLoaded', function() {
    // 图片懒加载
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const lazyLoad = function() {
        lazyImages.forEach(img => {
            if (img.getBoundingClientRect().top <= window.innerHeight && img.getBoundingClientRect().bottom >= 0) {
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
            }
        });
    };

    // 初始加载
    lazyLoad();
    
    // 滚动时加载
    window.addEventListener('scroll', lazyLoad);
    window.addEventListener('resize', lazyLoad);
}); 