document.getElementById("contactForm").addEventListener("submit", function(event) {
  event.preventDefault();

  let isValid = true;

  // Clear previous error messages
  document.querySelectorAll(".error-message").forEach(function(msg) {
    msg.textContent = '';
  });

  // Validate First Name
  const firstName = document.getElementById("firstName");
  if (firstName.value.trim() === '') {
    isValid = false;
    document.getElementById("firstNameError").textContent = "First name is required.";
  }

  // Validate Last Name
  const lastName = document.getElementById("lastName");
  if (lastName.value.trim() === '') {
    isValid = false;
    document.getElementById("lastNameError").textContent = "Last name is required.";
  }

  // Validate Email
  const email = document.getElementById("email");
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email.value.trim() === '') {
    isValid = false;
    document.getElementById("emailError").textContent = "Email is required.";
  } else if (!emailPattern.test(email.value)) {
    isValid = false;
    document.getElementById("emailError").textContent = "Please enter a valid email address.";
  }

  // Validate Phone Number
  const phoneNumber = document.getElementById("phoneNumber");
  const phonePattern = /^[0-9]{10}$/;
  if (phoneNumber.value.trim() === '') {
    isValid = false;
    document.getElementById("phoneNumberError").textContent = "Phone number is required.";
  } else if (!phonePattern.test(phoneNumber.value)) {
    isValid = false;
    document.getElementById("phoneNumberError").textContent = "Please enter a valid 10-digit phone number.";
  }

  if (isValid) {
    // If validation is successful, send email
    sendEmail(firstName.value, lastName.value, email.value, phoneNumber.value);
  }
});

function sendEmail(firstName, lastName, email, phoneNumber) {
  // Create message content
  const bodyMessage = `
    First Name: ${firstName}<br>
    Last Name: ${lastName}<br>
    Email: ${email}<br>
    Phone Number: ${phoneNumber}
  `;

  // Make sure EmailJS is properly loaded
  if (typeof emailjs === 'undefined') {
    console.error("EmailJS is not loaded. Please check your EmailJS script inclusion.");
    Swal.fire({
      title: "Error",
      text: "There was an issue with the email service. Please try again later.",
      icon: "error"
    });
    return;
  }

  // Initialize EmailJS
  emailjs.init("2bX50AkPDqhRU8t0j");

  // Send email using EmailJS
  emailjs.send("service_azjvst3", "template_wfe993d", {
    from_name: firstName + " " + lastName,
    from_email: email,
    phone_number: phoneNumber,
    message: bodyMessage
  }).then(function(response) {
    console.log("Success:", response);
    Swal.fire({
      title: "Success!",
      text: "Message sent successfully!",
      icon: "success"
    });
    document.getElementById("contactForm").reset(); // Reset form after success
  }).catch(function(error) {
    console.error("Email send error:", error); 
    Swal.fire({
      title: "Error",
      text: "There was an issue sending your message. Please try again later.",
      icon: "error"
    });
  });
}