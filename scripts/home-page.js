
const zipInput = document.getElementById('zip-input');
const errorMsg = document.getElementById('error-msg');
const getQuoteBtn = document.getElementById('getQuoteBtn');


getQuoteBtn.addEventListener('click', function(event) {

  const zipCode = zipInput.value;

  errorMsg.textContent = '';


  if (zipCode === '') {
    errorMsg.textContent = 'Please enter a valid ZIP code.';
    errorMsg.style.color = 'red';
    event.preventDefault(); 
    return; 
  }

  // Check if the ZIP code is invalid (not exactly 5 digits)
  if (!/^\d{5}$/.test(zipCode)) {
    errorMsg.textContent = 'Please enter a valid 5-digit ZIP code.';
    errorMsg.style.color = 'red';
    event.preventDefault(); 
    return; 
  }
});

document.addEventListener('DOMContentLoaded', function() {
  // Get necessary elements
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenuContainer = document.getElementById('mobile-menu');
  const mobileMenu = mobileMenuContainer.firstElementChild;
  const menuIcon = document.getElementById('menu-icon');
  const closeIcon = document.getElementById('close-icon');
  const mobileDropdownButton = document.getElementById('mobile-dropdown-button');
  const mobileDropdownMenu = document.getElementById('mobile-dropdown-menu');

  let isMenuOpen = false;
  let isDropdownOpen = false;

  // Toggle mobile menu
  mobileMenuButton.addEventListener('click', () => {
    isMenuOpen = !isMenuOpen;
    
    // Toggle menu visibility with animation
    if (isMenuOpen) {
      mobileMenu.classList.remove('hidden');
      menuIcon.classList.add('hidden');
      closeIcon.classList.remove('hidden');
      
      // Add animation class after removing hidden
      setTimeout(() => {
        mobileMenu.classList.add('animate-fade-in-up');
      }, 0);
    } else {
      mobileMenu.classList.remove('animate-fade-in-up');
      menuIcon.classList.remove('hidden');
      closeIcon.classList.add('hidden');
      
      // Add hidden class after animation completes
      setTimeout(() => {
        mobileMenu.classList.add('hidden');
      }, 300);

      // Close dropdown if open
      if (isDropdownOpen) {
        mobileDropdownMenu.classList.add('hidden');
        isDropdownOpen = false;
      }
    }
  });

  // Toggle mobile dropdown
  mobileDropdownButton.addEventListener('click', () => {
    isDropdownOpen = !isDropdownOpen;
    
    // Toggle dropdown visibility
    if (isDropdownOpen) {
      mobileDropdownMenu.classList.remove('hidden');
      
      // Rotate arrow icon
      const arrow = mobileDropdownButton.querySelector('svg');
      arrow.style.transform = 'rotate(180deg)';
    } else {
      mobileDropdownMenu.classList.add('hidden');
      
      // Reset arrow icon
      const arrow = mobileDropdownButton.querySelector('svg');
      arrow.style.transform = 'rotate(0deg)';
    }
  });

  // Handle window resize
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 1024) { // 1024px is the 'lg' breakpoint
      // Reset mobile menu state
      if (isMenuOpen) {
        mobileMenu.classList.add('hidden');
        menuIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
        isMenuOpen = false;
      }
      
      // Reset dropdown state
      if (isDropdownOpen) {
        mobileDropdownMenu.classList.add('hidden');
        const arrow = mobileDropdownButton.querySelector('svg');
        arrow.style.transform = 'rotate(0deg)';
        isDropdownOpen = false;
      }
    }
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', (event) => {
    const isClickInsideMenu = mobileMenuContainer.contains(event.target);
    const isClickOnButton = mobileMenuButton.contains(event.target);
    
    if (!isClickInsideMenu && !isClickOnButton && isMenuOpen) {
      mobileMenu.classList.add('hidden');
      menuIcon.classList.remove('hidden');
      closeIcon.classList.add('hidden');
      isMenuOpen = false;
      
      if (isDropdownOpen) {
        mobileDropdownMenu.classList.add('hidden');
        const arrow = mobileDropdownButton.querySelector('svg');
        arrow.style.transform = 'rotate(0deg)';
        isDropdownOpen = false;
      }
    }
  });
});

// Optional: Add scroll behavior for navbar
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 0) {
    navbar.classList.add('shadow-lg');
  } else {
    navbar.classList.remove('shadow-lg');
  }
});


