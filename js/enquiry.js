/**
 * enquiry.js
 * Validation for the Enquiry page form (#enquiry-form).
 * Every field is required.
 * Defines initEnquiryForm(); main.js calls it on page load.
 */

function initEnquiryForm() {
  var form = document.getElementById('enquiry-form');
  if (!form) return;

  var MESSAGE_MIN = 10;
  var MESSAGE_MAX = 500;
  var QUANTITY_MAX = 60;

  var enquiryType = form.querySelector('#enquiry-type');

  var rules = {
    name: function (value) {
      if (!value) return 'Please enter your full name.';
      if (value.length < 2) return 'Your name must be at least 2 characters.';
      if (value.length > 60) return 'Your name must be 60 characters or fewer.';
      if (!isValidName(value)) return 'Your name can only contain letters, spaces, hyphens and apostrophes.';
      return '';
    },
    phone: function (value) {
      if (!value) return 'Please enter your phone number.';
      if (!isValidSAPhone(value)) {
        return 'Please enter a valid South African number, e.g. 071 234 5678 or +27 71 234 5678.';
      }
      return '';
    },
    email: function (value) {
      if (!value) return 'Please enter your email address.';
      if (!isValidEmail(value)) return 'Please enter a valid email address, e.g. name@example.com.';
      return '';
    },
    'customer-type': function (value) {
      return value ? '' : 'Please tell us who you are.';
    },
    'enquiry-type': function (value) {
      return value ? '' : 'Please choose an enquiry type.';
    },
    quantity: function (value) {
      if (!value) return 'Please tell us how much you need.';
      if (value.length > QUANTITY_MAX) return 'Please keep this under ' + QUANTITY_MAX + ' characters.';
      if (!/\d/.test(value)) return 'Please include a number, e.g. "10 chickens per week".';
      return '';
    },
    message: function (value) {
      if (!value) return 'Please tell us a little about your enquiry.';
      if (value.length < MESSAGE_MIN) {
        return 'Please give us a little more detail (at least ' + MESSAGE_MIN + ' characters).';
      }
      return '';
    }
  };

  var updateCounter = addCharCounter(form.querySelector('#message'), MESSAGE_MAX);
  attachLiveValidation(form, rules);

  // Dropdowns report a change (not a blur) when the user picks an option.
  ['customer-type', 'enquiry-type'].forEach(function (id) {
    form.querySelector('#' + id).addEventListener('change', function () {
      validateField(form, id, rules);
    });
  });

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    removeFormMessage(form);

    if (!validateForm(form, rules)) return;

    var name = form.querySelector('#name').value.trim();
    var email = form.querySelector('#email').value.trim();
    var typeText = enquiryType.options[enquiryType.selectedIndex].textContent.toLowerCase();

    // TODO: send the form data to a real service here (e.g. Formspree via fetch).
    // Until then, this only confirms on screen - nothing is emailed.
    showFormMessage(
      form,
      '<strong>Thank you, ' + escapeHTML(name) + '!</strong> ' +
      'We have noted your enquiry (' + escapeHTML(typeText) + ') ' +
      'and will reply to ' + escapeHTML(email) + '.'
    );

    form.reset();
    clearErrors(form);
    updateCounter();
  });
}
