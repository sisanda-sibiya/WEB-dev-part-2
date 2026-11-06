/**
 * contact.js
 * Validation for the Contact page form (#contact-form).
 * Defines initContactForm(); main.js calls it on page load.
 */

function initContactForm() {
  var form = document.getElementById('contact-form');
  if (!form) return;

  var MESSAGE_MIN = 10;
  var MESSAGE_MAX = 500;

  var rules = {
    name: function (value) {
      if (!value) return 'Please enter your name.';
      if (value.length < 2) return 'Your name must be at least 2 characters.';
      if (value.length > 60) return 'Your name must be 60 characters or fewer.';
      if (!isValidName(value)) return 'Your name can only contain letters, spaces, hyphens and apostrophes.';
      return '';
    },
    email: function (value) {
      if (!value) return 'Please enter your email address.';
      if (!isValidEmail(value)) return 'Please enter a valid email address, e.g. name@example.com.';
      return '';
    },
    message: function (value) {
      if (!value) return 'Please write a message.';
      if (value.length < MESSAGE_MIN) {
        return 'Please give us a little more detail (at least ' + MESSAGE_MIN + ' characters).';
      }
      return '';
    }
  };

  var updateCounter = addCharCounter(form.querySelector('#message'), MESSAGE_MAX);
  attachLiveValidation(form, rules);

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    removeFormMessage(form);

    if (!validateForm(form, rules)) return;

    var name = form.querySelector('#name').value.trim();
    var email = form.querySelector('#email').value.trim();

    // TODO: send the form data to a real service here (e.g. Formspree via fetch).
    // Until then, this only confirms on screen - nothing is emailed.
    showFormMessage(
      form,
      '<strong>Thank you, ' + escapeHTML(name) + '!</strong> ' +
      'We will reply to ' + escapeHTML(email) + ' as soon as we can.'
    );

    form.reset();
    clearErrors(form);
    updateCounter();
  });
}
