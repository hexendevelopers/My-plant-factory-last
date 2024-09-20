import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.19.0/firebase-app.js';
import { getDatabase, ref, get } from 'https://www.gstatic.com/firebasejs/9.19.0/firebase-database.js';

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

let allProducts = [];

// Function to fetch products
async function fetchProducts() {
    try {
        const snapshot = await get(ref(db, 'products/'));
        if (snapshot.exists()) {
            allProducts = Object.entries(snapshot.val()).map(([key, value]) => ({
                key,
                ...value
            }));
            console.log('Fetched Products:', allProducts);
        }
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

// Function to filter products based on the first letter of the search input
function filterProducts(searchTerm) {
    const firstLetter = searchTerm.charAt(0).toLowerCase();
    return allProducts.filter(product => 
        product.name.toLowerCase().startsWith(firstLetter)
    );
}

// Function to display search results
function displaySearchResults(results) {
    const searchResults = document.getElementById('search-results');
    searchResults.innerHTML = '';

    results.forEach(product => {
        const div = document.createElement('div');
        div.classList.add('search-result-item');
        
        const link = document.createElement('a');
        link.href = `shop-single.html?id=${product.key}`;
        link.classList.add('cart-btn');
        link.innerHTML = `<i class=" "></i> ${product.name}`;
        
        link.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = link.href;
        });
        
        div.appendChild(link);
        searchResults.appendChild(div);
    });

    searchResults.style.display = results.length > 0 ? 'block' : 'none';
}

// Event listener for search input
document.getElementById('search-input').addEventListener('input', (e) => {
    const searchTerm = e.target.value;
    if (searchTerm.length > 0) {
        const filteredProducts = filterProducts(searchTerm);
        displaySearchResults(filteredProducts);
    } else {
        document.getElementById('search-results').style.display = 'none';
    }
});

// Fetch products when the page loads
document.addEventListener('DOMContentLoaded', fetchProducts);
