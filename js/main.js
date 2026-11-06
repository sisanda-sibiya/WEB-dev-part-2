/**
 * main.js
 * Central initialiser and shared utilities for Sibiya's Chicken Farming.
 *
 * Script order on each page: page scripts first (contact.js / enquiry.js),
 * then main.js last. Page scripts only DEFINE an init function;
 * this file decides which ones to RUN.
 */

document.addEventListener('DOMContentLoaded', function () {

  // Forms (each init quietly does nothing if its form is not on the page)
  if (typeof initEnquiryForm === 'function') initEnquiryForm();
  if (typeof initContactForm === 'function') initContactForm();

  // Add new features here using the same pattern, e.g.
  // if (typeof initGallery === 'function') initGallery();
});

/* ---------------- Shared utilities ---------------- */

/** Show an error message directly under the field matched by `selector`. */
function showError(selector, message) {
  var field = document.querySelector(selector);
  if (!field) return;

  clearFieldError(field); // never stack two messages on one field

  var span = document.createElement('span');
  span.className = 'error-message';
  span.id = field.id + '-error';
  span.setAttribute('role', 'alert');
  span.textContent = message;

  field.insertAdjacentElement('afterend', span);
  field.classList.add('error');
  field.setAttribute('aria-invalid', 'true');
  field.setAttribute('aria-describedby', span.id);
}

/** Remove the error state from a single field. */
function clearFieldError(field) {
  if (!field) return;
  var next = field.nextElementSibling;
  if (next && next.classList.contains('error-message')) next.remove();
  field.classList.remove('error');
  field.classList.remove('valid');
  field.removeAttribute('aria-invalid');
  field.removeAttribute('aria-describedby');
}

/** Remove every error message and error/valid state inside a form. */
function clearErrors(form) {
  if (!form) return;
  form.querySelectorAll('.error-message').forEach(function (el) { el.remove(); });
  form.querySelectorAll('.error, .valid').forEach(function (el) {
    el.classList.remove('error');
    el.classList.remove('valid');
    el.removeAttribute('aria-invalid');
    el.removeAttribute('aria-describedby');
  });
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * South African numbers: +27 or 0, then 9 digits.
 * Spaces, hyphens and brackets are ignored, and landline area codes
 * (e.g. 031 for Durban) are accepted as well as mobile numbers.
 */
function isValidSAPhone(phone) {
  var cleaned = String(phone).replace(/[\s\-()]/g, '');
  return /^(\+27|0)[1-8][0-9]{8}$/.test(cleaned);
}

/** Letters (including accented), spaces, hyphens and apostrophes only. */
function isValidName(name) {
  return /^[\p{L}][\p{L}\s'’-]*$/u.test(name);
}

function escapeHTML(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/* ---------------- Shared form helpers ---------------- */

/**
 * Validate one field using a rules map:
 *   { fieldId: function (trimmedValue, form) { return 'error text' or ''; } }
 * Returns true when the field is valid.
 */
function validateField(form, id, rules) {
  var field = form.querySelector('#' + id);
  if (!field) return true;
  var message = rules[id](field.value.trim(), form);
  if (message) {
    showError('#' + id, message);
    return false;
  }
  clearFieldError(field);
  field.classList.add('valid'); // green state: every field is required, so valid means filled in correctly
  return true;
}

/** Validate every field in the rules map and focus the first invalid one. */
function validateForm(form, rules) {
  clearErrors(form);
  var firstInvalid = null;
  Object.keys(rules).forEach(function (id) {
    if (!validateField(form, id, rules) && !firstInvalid) {
      firstInvalid = form.querySelector('#' + id);
    }
  });
  if (firstInvalid) firstInvalid.focus();
  return !firstInvalid;
}

/** Validate each field when the user leaves it, then keep checking as they fix it. */
function attachLiveValidation(form, rules) {
  Object.keys(rules).forEach(function (id) {
    var field = form.querySelector('#' + id);
    if (!field) return;
    field.addEventListener('blur', function () { validateField(form, id, rules); });
    field.addEventListener('input', function () {
      if (field.classList.contains('error')) validateField(form, id, rules);
    });
  });
}

/** Add a "0 / 500" counter under a textarea and enforce the limit. Returns its update function. */
function addCharCounter(field, max) {
  field.setAttribute('maxlength', max);

  var counter = document.createElement('span');
  counter.className = 'char-counter';
  field.insertAdjacentElement('afterend', counter);

  function update() {
    counter.textContent = field.value.length + ' / ' + max;
    counter.classList.toggle('limit', field.value.length >= max);
  }

  field.addEventListener('input', update);
  update();
  return update;
}

/** Show a success box above the form. Callers must escapeHTML() any user input. */
function showFormMessage(form, html) {
  removeFormMessage(form);
  var box = document.createElement('div');
  box.className = 'form-success';
  box.setAttribute('role', 'status');
  box.innerHTML = html;
  form.insertAdjacentElement('beforebegin', box);
  box.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function removeFormMessage(form) {
  var prev = form.previousElementSibling;
  if (prev && prev.classList.contains('form-success')) prev.remove();
}
