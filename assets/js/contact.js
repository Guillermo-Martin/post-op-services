console.log("connected to contact.js!");

const contactForm = document.getElementById("contact-us-form");
const formContainer = document.querySelector(".form-container");
// const submitButton = document.getElementById("submit-button");

// submitButton.addEventListener("click", function(){
//   event.preventDefault();
//   // alert("connected!!");

//   // hide the form
//   // const contactForm = document.getElementById("contact-us-form");
//   // contactForm.classList.add("hide");

//   // in the div, add a message that says the message was sent.
//   // get the form container
//   const formContainer = document.querySelector(".form-container");
//   const submitMessage = document.createElement("p");
//   submitMessage.classList.add("submit-message", "active")
//   submitMessage.textContent = "Thank you!  Your message has been sent.  A member our team will contact you soon.";
//   formContainer.appendChild(submitMessage);
// })


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
            console.log('SUCCESS!');
            
            // hide the contact form
            contactForm.classList.add("hide");

            // create a "p" tag, give it some classes for styling, give it a success message, and append the "p" tag
            // to the "formContainer" element
            const submitMessage = document.createElement("p");
            submitMessage.classList.add("submit-message", "active")
            submitMessage.textContent = "Thank you!  Your message has been sent.  A member our team will contact you soon.";
            formContainer.appendChild(submitMessage);
        }, (error) => {
            console.log('FAILED...', error);
            // alert("something went wrong.  try again later.")
        });
  });
};
