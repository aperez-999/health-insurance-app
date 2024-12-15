
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


