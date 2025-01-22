import { getDatabase, ref, get } from 'https://www.gstatic.com/firebasejs/9.19.0/firebase-database.js';
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.19.0/firebase-app.js';

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBMqZ8anVRCeAukrYV6Og75TVcy2YQieV4",
    authDomain: "myplantfactory-dde8a.firebaseapp.com",
    projectId: "myplantfactory-dde8a",
    storageBucket: "myplantfactory-dde8a.appspot.com",
    messagingSenderId: "65045588499",
    appId: "1:65045588499:web:b9cb8c5cbd138f19ae6de6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Get the product ID from the URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

// Fetch product data from Firebase
const productRef = ref(db, 'Manure & Fertilizer/' + productId);
get(productRef).then((snapshot) => {
    if (snapshot.exists()) {
        const productData = snapshot.val();

        // Check product data in console
        console.log('Product Data:', productData);

        // Handle product details
        document.getElementById('product-name').textContent = productData.name || 'No name available';
        document.getElementById('product-category').textContent = `Category: ${productData.category || 'No category available'}`;
        document.getElementById('product-description').textContent = productData.description || 'No description available';
        
        // Handle quantity display
        const quantityElement = document.getElementById('product-quantity');
        if (quantityElement && productData.quantity) {
            quantityElement.textContent = `${productData.quantity}`;
        }

        // Handle price display
        const priceElement = document.getElementById('product-price');
        const cutPriceElement = document.getElementById('product-pricetwo');
        const discountBadge = document.getElementById('discount-badge');
        
        if (priceElement && cutPriceElement && productData.price && productData.cutprice) {
            const currentPrice = parseFloat(productData.price);
            const originalPrice = parseFloat(productData.cutprice);
            
            // Calculate discount percentage
            const discount = Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
            
            // Display prices
            priceElement.textContent = `₹${currentPrice.toFixed(2)}`;
            cutPriceElement.textContent = `₹${originalPrice.toFixed(2)}`;
            
            // Show discount badge if there is a discount
            if (discount > 0 && discountBadge) {
                discountBadge.textContent = `${discount}% OFF`;
                discountBadge.style.display = 'inline-block';
            }
        }

        // Handle dosage and application display
        const dosageList = document.getElementById('dosageandapplication');
        if (dosageList && Array.isArray(productData.dosageandapplication)) {
            dosageList.innerHTML = productData.dosageandapplication
                .map(item => `<li>${item}</li>`)
                .join('');
        }

        // Generate carousel items
        const carouselInner = document.getElementById('carousel-inner');
        carouselInner.innerHTML = ''; // Clear any existing items

        // Generate Swiper slides
        const swiperWrapper = document.getElementById('swiper-wrapper');
        swiperWrapper.innerHTML = ''; // Clear any existing slides

        // Combine mainImageURL and galleryImages for all images
        const allImages = [productData.mainImageURL];
        if (Array.isArray(productData.galleryImages)) {
            allImages.push(...productData.galleryImages);
        }

        if (allImages.length > 0) {
            allImages.forEach((url, index) => {
                if (!url) return; // Skip if URL is null or undefined
                
                console.log('Processing image URL:', url);
                
                // Create carousel item
                const isActive = index === 0 ? 'active' : '';
                const carouselItem = document.createElement('div');
                carouselItem.className = `carousel-item ${isActive}`;
                carouselItem.innerHTML = `
                    <a href="${url}" class="item popup-gallery">
                        <img src="${url}" alt="Product Image" style="width: 80%; height: auto;">
                    </a>
                `;
                carouselInner.appendChild(carouselItem);

                // Create Swiper slide
                const swiperSlide = document.createElement('div');
                swiperSlide.className = `swiper-slide ${isActive}`;
                swiperSlide.innerHTML = `
                    <div class="item" data-bs-target="#timeline-carousel" data-bs-slide-to="${index}" aria-current="${index === 0 ? 'true' : 'false'}">
                        <img src="${url}" alt="Product Image" class="d-block w-100">
                    </div>
                `;
                swiperWrapper.appendChild(swiperSlide);
            });
        } else {
            console.log("No images available");
            carouselInner.innerHTML = '<div class="carousel-item active"><div class="text-center p-4">No image available</div></div>';
            swiperWrapper.innerHTML = '<div class="swiper-slide"><div class="text-center p-4">No image available</div></div>';
        }

        // Display short descriptions as list items with custom bullet
        const shortDescriptionList = document.getElementById('short-description-list');
        if (shortDescriptionList) {
            shortDescriptionList.innerHTML = ''; // Clear any existing items
            if (Array.isArray(productData.shortDescription)) {
                productData.shortDescription.forEach(desc => {
                    const listItem = document.createElement('li');
                    listItem.textContent = desc;
                    listItem.style.listStyleType = 'circle';
                    shortDescriptionList.appendChild(listItem);
                });
            }
        }

        // Display botanical name
        document.getElementById('botanicalname').textContent = `Botanical name: ${productData.botanicalName || 'No botanical name available'}`;
    } else {
        console.log("No product data available");
    }
}).catch((error) => {
    console.error('Error fetching product data:', error);
});

///////////////////////////////////

///////////////////////////////////

// 1. Ensure the element exists
document.addEventListener('DOMContentLoaded', function() {
    if (!document.querySelector('.animation-shape')) {
      console.warn('Element .animation-shape not found in the DOM');
    }
  });
  
  // 2. Delay GSAP initialization
  window.addEventListener('load', function() {
    // GSAP and ScrollTrigger initialization code here
    gsap.registerPlugin(ScrollTrigger);
    
    gsap.to('.animation-shape', {
      scrollTrigger: {
        trigger: '.animation-shape',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
      // Your animation properties here
      x: 100,
      rotation: 360,
      duration: 2
    });
  });
  
  // 3. Check if element exists before animating
  function animateShape() {
    const shape = document.querySelector('.animation-shape');
    if (shape) {
      gsap.to(shape, {
        // Your animation properties here
      });
    } else {
      console.warn('Element .animation-shape not found, animation skipped');
    }
  }
  
 
  
  // 5. Create the element dynamically if it's missing
  if (!document.querySelector('.animation-shape')) {
    const shape = document.createElement('div');
    shape.classList.add('animation-shape');
    document.body.appendChild(shape);
  }
  ///////////////////////////////////

///////////////////////////////////


  ///////////////////////////////////

///////////////////////////////////


  







// Function to load products
function loadProducts() {
    const productsRef = ref(db, 'products');
    get(productsRef).then((snapshot) => {
        if (snapshot.exists()) {
            const products = snapshot.val();
            const productContainer = document.getElementById('product-container');
            productContainer.innerHTML = ''; // Clear existing content

            Object.keys(products).forEach((key) => {
                const product = products[key];
                const productHTML = `
                    <div class="swiper-slide">
                        <div class="product">
                            <div class="product-contents">
                                <div class="product-image">
                                    <a href="shop-single.html?id=${key}">
                                        <img src="${product.mainImageURL}" alt="Product">
                                    </a>
                                    <div class="shop-action">
                                        <!-- <ul>
                                            <li class="cart">
                                                <a href="#"><span>Add to cart</span></a>
                                            </li>
                                            <li class="wishlist">
                                                <a href="#"><span>Add to wishlist</span></a>
                                            </li>
                                            <li class="quick-view">
                                                <a href="#"><span>Quick view</span></a>
                                            </li>
                                        </ul> -->
                                    </div>
                                </div>
                                <div class="product-caption">
                                    <div class="product-tags">
                                        <a href="#">${product.category}</a>
                                    </div>
                                    <h4 class="product-title">
                                        <a href="shop-single.html?id=${key}">${product.name}</a>
                                    </h4>
                                    <div class="price">
                                        <span hidden>${product.price}</span>
                                    </div>
                                    <a href="shop-single.html?id=${key}" class="cart-btn"><i class="fas fa-shopping-bag"></i> View Product</a>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                productContainer.innerHTML += productHTML;
            });
        } else {
            console.log("No products found");
        }
    }).catch((error) => {
        console.error(error);
    });
}

// Call the function to load products when the page loads
document.addEventListener('DOMContentLoaded', loadProducts);
