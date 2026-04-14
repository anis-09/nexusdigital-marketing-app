document.addEventListener('DOMContentLoaded', () => {
    
    // Sidebar Toggle
    const sidebar = document.getElementById('sidebar');
    const collapseBtn = document.getElementById('collapse-btn');
    
    if (collapseBtn) {
        collapseBtn.addEventListener('click', () => {
            sidebar.classList.toggle('collapsed');
        });
    }

    // OS Dropdown Menu Logic for Action Zone
    const dropdownBtn = document.getElementById('os-dropdown-btn');
    const dropdownMenu = document.getElementById('os-dropdown-menu');

    if (dropdownBtn && dropdownMenu) {
        dropdownBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdownMenu.classList.toggle('show');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', () => {
            if (dropdownMenu.classList.contains('show')) {
                dropdownMenu.classList.remove('show');
            }
        });
    }

    // Simple interaction for filters
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });
});

// View Navigation Logic
function openProductPage() {
    const storeView = document.getElementById('store-view');
    const productView = document.getElementById('product-view');
    
    if (storeView && productView) {
        storeView.classList.remove('active');
        productView.classList.add('active');
        window.scrollTo(0, 0); // scroll to top when opening product page
    }
}

function backToStore() {
    const storeView = document.getElementById('store-view');
    const productView = document.getElementById('product-view');
    
    if (storeView && productView) {
        productView.classList.remove('active');
        storeView.classList.add('active');
        window.scrollTo(0, 0);
    }
}

// Media Gallery Image Changer
function changeImage(src) {
    const mainImg = document.getElementById('main-screenshot');
    if (mainImg) {
        // Simple fade out/in effect
        mainImg.style.opacity = '0';
        setTimeout(() => {
            mainImg.src = src;
            mainImg.style.opacity = '1';
        }, 200);
    }

    // Update active state of thumbnails
    const thumbnails = document.querySelectorAll('.thumb');
    thumbnails.forEach(t => t.classList.remove('active'));
    
    // Find the clicked thumb and give it active class
    const clickedThumb = event.currentTarget;
    if (clickedThumb) {
        clickedThumb.classList.add('active');
    }
}
