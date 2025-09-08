console.log("connected to contact.js!");



(function() {
    // https://dashboard.emailjs.com/admin/account
    emailjs.init({
      publicKey: "jgcwgJAymXVkFay9x",
    });
})();

window.onload = function() {
  document.getElementById('contact-us-form').addEventListener('submit', function(event){
      // prevent default form submission behavior
      event.preventDefault();

      // get the current date and time, and format it
      const sentTime = new Date();
      const formattedTime = sentTime.toLocaleString();

      // set the hidden time input's time value
      document.getElementById("sent-time").value = formattedTime;

      // these IDs from the previous steps: form to use and auto-reply template, respectively
      emailjs.sendForm('contact_service', 'contact_form', this)
        .then(() => {
            console.log('SUCCESS!');
            alert("your message has been sent!")
        }, (error) => {
            console.log('FAILED...', error);
            alert("something went wrong.  try again later.")
        });
  });
};
