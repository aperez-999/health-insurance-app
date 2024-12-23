// Initialize EmailJS 
emailjs.init('2bX50AkPDqhRU8t0j');

const steps = document.querySelectorAll('.form-step');
const continueBtn = document.getElementById('continue-btn');
let currentStep = 0;

// Function to validate each step of the form
function validateStep(step) {
  const currentInputs = steps[step].querySelectorAll('input, select, textarea');
  let isValid = true;

  currentInputs.forEach((input) => {
    const errorMessage = input.nextElementSibling; 

    // Special case for unit field: make it optional
    if (input.id === 'unit' && input.value.trim() === '') {
      return; 
    }

    // General validation for other fields
    if (!input.value.trim()) {
      isValid = false;
      errorMessage.textContent = 'This field is required.';
    } else {
      errorMessage.textContent = ''; 
    }
  });

  return isValid;
}

// Function to show the next step
function showNextStep() {
  if (!validateStep(currentStep)) {
    return; 
  }

  if (currentStep < steps.length - 1) {
    // Hide current step
    steps[currentStep].classList.remove('active');
    // Show next step
    currentStep++;
    steps[currentStep].classList.add('active');
  } else {
    // Submit the form
    submitForm();
  }
}

// Function to handle form submission (using EmailJS)
function submitForm() {
  const formData = {};
  steps.forEach((step) => {
    const inputs = step.querySelectorAll('input, select, textarea');
    inputs.forEach((input) => {
      formData[input.name] = input.value.trim();
    });
  });

  // Send the form data using EmailJS
  emailjs.send("service_6upxh74", "template_8spow6x", formData)
      .then(() => {
          Swal.fire({
              title: 'Success!',
              text: 'Form submitted successfully! Redirecting to your quotes...',
              icon: 'success',
              confirmButtonText: 'OK'
          }).then(() => {
            // After submission, redirect to the insurance quotes page with form data
            sessionStorage.setItem("formData", JSON.stringify(formData)); // Store form data in sessionStorage
            window.location.href = "insurance-quotes.html"; // Redirect to quotes page
          });
      })
      .catch((error) => {
          Swal.fire({
            title: 'Oops!',
            text: 'Something went wrong while submitting the form. Please try again.',
            icon: 'error',
            confirmButtonText: 'Retry',
            footer: '<a href="mailto:alexperezr456@gmail.com">Contact Support</a>'
          });
          console.error("Error:", error);
      });
}

// Function to handle the form step transitions and submission
continueBtn.addEventListener('click', () => {
  console.log('Button clicked, current step:', currentStep); // Debug line
  const currentInputs = steps[currentStep].querySelectorAll('input, select, textarea');
  let allValid = true;

  currentInputs.forEach((input) => {
    if (!input.checkValidity() || input.value.trim() === "") {
      allValid = false;
      input.classList.add("error");
    } else {
      input.classList.remove("error");
    }
  });

  if (!allValid) {
    alert("Please fill out all required fields.");
    return;
  }

  if (currentStep === steps.length - 1) {
    console.log("Submitting form..."); 
    submitForm();
  } else {
    steps[currentStep].classList.remove('active');
    currentStep++;
    steps[currentStep].classList.add('active');
  }
});

// Ensure the first step is visible and active initially
document.addEventListener('DOMContentLoaded', () => {
  steps[currentStep].classList.add('active'); // Make the first step visible
});


document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('insurance-form');
  form.addEventListener('submit', function (e) {
      e.preventDefault(); // Prevent form from submitting normally

      const formData = {
          'firstName': document.getElementById('first-name').value.trim(),
          'lastName': document.getElementById('last-name').value.trim(),
          'phoneNumber': document.getElementById('phone').value.trim(),
          'email': document.getElementById('email').value.trim(),
          'dob': document.getElementById('dob').value.trim(),
          'address': document.getElementById('address').value.trim(),
          'income': document.getElementById('income').value.trim(),
          'health-conditions': document.querySelector('input[name="health-conditions"]:checked')?.value,
          'health-plan': document.getElementById('health-plan').value.trim(),
          'coverage': document.getElementById('coverage').value.trim()
      };

      // Save form data to sessionStorage
      sessionStorage.setItem('formData', JSON.stringify(formData));
  });
});
