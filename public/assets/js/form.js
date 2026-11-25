/**
 * Arora Tech Solutions - Hiring & Contact Form Scripts
 * Real-time validation, AJAX dispatch, loading states, success transitions.
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  const hireForm = document.getElementById('hiring-enquiry-form');
  if (!hireForm) return;

  const submitBtn = document.getElementById('form-submit-btn');
  const btnText = submitBtn ? submitBtn.querySelector('.btn-text') : null;
  const btnSpinner = submitBtn ? submitBtn.querySelector('.btn-spinner') : null;
  const btnIcon = submitBtn ? submitBtn.querySelector('.btn-icon') : null;
  const errorBanner = document.getElementById('form-error-banner');
  const successCard = document.getElementById('form-success-card');
  const summaryBox = document.getElementById('success-summary-box');
  const resetBtn = document.getElementById('reset-form-btn');

  // 1. Toggle "+ Other" technology input
  const otherToggle = document.getElementById('tech_other_toggle');
  const otherWrap = document.getElementById('other-tech-wrap');
  const otherInput = document.getElementById('technologies_other');

  if (otherToggle && otherWrap) {
    otherToggle.addEventListener('change', () => {
      if (otherToggle.checked) {
        otherWrap.style.display = 'block';
        if (otherInput) otherInput.focus();
      } else {
        otherWrap.style.display = 'none';
        if (otherInput) otherInput.value = '';
      }
    });
  }

  // 2. Clear field error on input
  hireForm.querySelectorAll('input, textarea, select').forEach(field => {
    field.addEventListener('input', () => {
      const group = field.closest('.form-group');
      if (group) {
        group.classList.remove('has-error');
        const errSpan = group.querySelector('.field-error');
        if (errSpan) errSpan.textContent = '';
      }
      if (errorBanner) {
        errorBanner.style.display = 'none';
      }
    });
  });

  // 3. Validation helper
  const validateField = (field) => {
    const group = field.closest('.form-group');
    const errSpan = group ? group.querySelector('.field-error') : null;
    let valid = true;
    let message = '';

    if (field.hasAttribute('required')) {
      if (field.type === 'checkbox' && !field.checked) {
        valid = false;
        message = 'This checkbox is required.';
      } else if (!field.value.trim()) {
        valid = false;
        message = 'This field is required.';
      }
    }

    if (valid && field.type === 'email' && field.value.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(field.value.trim())) {
        valid = false;
        message = 'Please provide a valid email address.';
      }
    }

    if (valid && field.type === 'tel' && field.value.trim()) {
      if (field.value.trim().length < 6) {
        valid = false;
        message = 'Please include country code and valid digits.';
      }
    }

    if (group && errSpan) {
      if (!valid) {
        group.classList.add('has-error');
        errSpan.textContent = message;
      } else {
        group.classList.remove('has-error');
        errSpan.textContent = '';
      }
    }

    return valid;
  };

  // 4. Validate on Blur
  hireForm.querySelectorAll('input[required], textarea[required]').forEach(field => {
    field.addEventListener('blur', () => validateField(field));
  });

  // 5. Submit Handler
  hireForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Client-side full sweep
    let isFormValid = true;
    hireForm.querySelectorAll('input[required], textarea[required], select[required]').forEach(field => {
      if (!validateField(field)) {
        isFormValid = false;
      }
    });

    if (!isFormValid) {
      const firstInvalid = hireForm.querySelector('.has-error input, .has-error textarea, .has-error select');
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    // Enter Loading State
    if (submitBtn) {
      submitBtn.disabled = true;
      if (btnText) btnText.textContent = 'Submitting Request...';
      if (btnSpinner) btnSpinner.style.display = 'inline-block';
      if (btnIcon) btnIcon.style.display = 'none';
    }
    if (errorBanner) errorBanner.style.display = 'none';

    const formData = new FormData(hireForm);

    try {
      const response = await fetch(hireForm.action, {
        method: 'POST',
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'Accept': 'application/json'
        },
        body: formData
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Success transition
        hireForm.style.display = 'none';
        if (successCard) {
          successCard.style.display = 'block';
          if (summaryBox) {
            summaryBox.innerHTML = `
              <strong>Enquiry Reference:</strong> #${data.lead_id || 'ATS-' + Date.now().toString().slice(-6)}<br>
              <strong>Role Requested:</strong> ${data.role || 'Dedicated Developer'}<br>
              <strong>Engagement Model:</strong> ${data.model || 'Quote-based'}<br>
              <strong>Contact:</strong> ${data.name || ''}
            `;
          }
          successCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      } else {
        // Handle Server Validation / Rate Limit Errors
        if (data.errors) {
          for (const [key, msg] of Object.entries(data.errors)) {
            const field = hireForm.querySelector(`[name="${key}"], [name="${key}[]"]`);
            if (field) {
              const group = field.closest('.form-group');
              if (group) {
                group.classList.add('has-error');
                const errSpan = group.querySelector('.field-error');
                if (errSpan) errSpan.textContent = msg;
              }
            }
          }
        }
        if (errorBanner) {
          errorBanner.textContent = data.message || 'An error occurred while submitting your enquiry. Please check the fields above.';
          errorBanner.style.display = 'block';
          errorBanner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }
    } catch (err) {
      if (errorBanner) {
        errorBanner.textContent = 'A network or server error occurred. Please try again or email us directly at hire@aroratechsolutions.com.';
        errorBanner.style.display = 'block';
      }
    } finally {
      // Revert loading state
      if (submitBtn) {
        submitBtn.disabled = false;
        if (btnText) btnText.textContent = 'Request Developer Quote';
        if (btnSpinner) btnSpinner.style.display = 'none';
        if (btnIcon) btnIcon.style.display = 'inline-block';
      }
    }
  });

  // 6. Reset Button Handler
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      hireForm.reset();
      hireForm.style.display = 'block';
      if (successCard) successCard.style.display = 'none';
      if (otherWrap) otherWrap.style.display = 'none';
      hireForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }
});
