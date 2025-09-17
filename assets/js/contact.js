const contactForm = document.getElementById("contact-us-form");
const phoneInput = document.querySelector("input[name='phone']");

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

// ---------- live phone number formatting ----------
// * Formatting a phone number:  https://stackoverflow.com/questions/30058927/format-a-phone-number-as-a-user-types-using-pure-javascript
// * ".replace()":  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace
// * ".substring()":  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/substring
// add eventListener to the phone input
phoneInput.addEventListener("input", function(event){
  // get only numbers (digits)
  let phoneNum = event.target.value.replace(/\D/g, "");

  // limit the phone number to only 10 digits (without any other spacing or characters)
  phoneNum = phoneNum.substring(0, 10);

  // ----- apply formatting -----
  // if the phone number is greater than 6 numbers...
  if(phoneNum.length > 6){
    // ...group the first 3 digits (area code), group the next 3 digits, and group the final digits
    // then, put the groups ($1, $2, $3) together, separated by a dash, to form the phone number
    phoneNum = phoneNum.replace(/(\d{3})(\d{3})(\d{1,4})/, "$1-$2-$3");
  // if the phone number is greater than 3...
  } else if(phoneNum.length > 3){
    // ...group the first 3 digits (area code), then group the next group of digits
    // then, put a dash between the first group and second group of digits to form the "start" of the phone number
    phoneNum = phoneNum.replace(/(\d{3})(\d{1,3})/, "$1-$2");
  };

  // replace the "phoneInput"'s value to be the formatted number
  event.target.value = phoneNum;
});

// ---------- Email JS ----------
// (function() {
//     // https://dashboard.emailjs.com/admin/account
//     emailjs.init({
//       publicKey: "jgcwgJAymXVkFay9x",
//     });
// })();

// window.onload = function() {
//   contactForm.addEventListener('submit', function(event){
//     // prevent default form submission behavior
//     event.preventDefault();

//     // get the current date and time, and format it
//     const sentTime = new Date();
//     const formattedTime = sentTime.toLocaleString();

//     // set the hidden time input's time value
//     document.getElementById("sent-time").value = formattedTime;

//     // "seviceId" is found in the EmailJS dashboard under "Email Services" and under the email service you want to use.
//     // "templateId" is found in the EmailJS dashboard under "Email Templates" and under the email template you want to use.
//     const serviceId = 'default_service';
//     const templateId = 'contact_service';

//     // send the info to EmailJS, who will then forward the info via email
//     emailjs.sendForm(serviceId, templateId, this)
//       .then(() => {
//           // hide the contact form
//           contactForm.classList.add("hide");

//           // give success message feedback
//           giveMessageFeedback("Thank you!  Your message has been sent.  A member our team will contact you soon.");
//       }, (error) => {
//           console.error('FAILED...', error);

//           const errorMessage = document.querySelector(".error-message");
//           errorMessage.classList.remove("hide");
//       });
//   });
// };
