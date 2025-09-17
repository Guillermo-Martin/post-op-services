const contactForm = document.getElementById("contact-us-form");

const giveMessageFeedback = (str) => {
  // target the form container
  const formContainer = document.querySelector(".form-container");

  // create a "p" tag, give it some classes for styling, give it a success message, and append the "p" tag
  // to the "formContainer" element
  const submitMessage = document.createElement("p");
  submitMessage.classList.add("submit-message", "active")
  submitMessage.textContent = str;
  formContainer.appendChild(submitMessage);
};

// ---------- Email JS ----------
(function() {
    // https://dashboard.emailjs.com/admin/account
    emailjs.init({
      publicKey: "jgcwgJAymXVkFay9x",
    });
})();

window.onload = function() {
  contactForm.addEventListener('submit', function(event){
    // prevent default form submission behavior
    event.preventDefault();

    // get the current date and time, and format it
    const sentTime = new Date();
    const formattedTime = sentTime.toLocaleString();

    // set the hidden time input's time value
    document.getElementById("sent-time").value = formattedTime;

    // "seviceId" is found in the EmailJS dashboard under "Email Services" and under the email service you want to use.
    // "templateId" is found in the EmailJS dashboard under "Email Templates" and under the email template you want to use.
    const serviceId = 'default_service';
    const templateId = 'contact_service';

    // send the info to EmailJS, who will then forward the info via email
    emailjs.sendForm(serviceId, templateId, this)
      .then(() => {
          // hide the contact form
          contactForm.classList.add("hide");

          // give success message feedback
          giveMessageFeedback("Thank you!  Your message has been sent.  A member our team will contact you soon.");
      }, (error) => {
          console.error('FAILED...', error);

          const errorMessage = document.querySelector(".error-message");
          errorMessage.classList.remove("hide");
      });
  });
};
