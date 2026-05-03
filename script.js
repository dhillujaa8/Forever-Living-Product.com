/* ══════════════════════════════════════════════
   FLP Network Marketing — JavaScript Logic
   File: script.js
   Forever Living Products International
══════════════════════════════════════════════ */

/**
 * showPage()
 * Switches between Page 1 (Registration) and Page 2 (Company Info)
 * @param {string} id   - The page element ID to activate
 * @param {Element} btn - The nav tab button that was clicked
 */
function showPage(id, btn) {
  /* Hide all pages */
  document.querySelectorAll('.page').forEach(function (p) {
    p.classList.remove('active');
  });

  /* Deactivate all nav tabs */
  document.querySelectorAll('.nav-tab').forEach(function (t) {
    t.classList.remove('active');
  });

  /* Show selected page */
  document.getElementById(id).classList.add('active');

  /* Mark selected tab as active */
  if (btn && btn.classList) {
    btn.classList.add('active');
  }

  /* Scroll to top smoothly */
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * sendToWhatsApp()
 * Validates the registration form, builds a formatted WhatsApp message,
 * and opens WhatsApp with the pre-filled message.
 */
function sendToWhatsApp() {
  /* ── Collect form values ── */
  var name       = document.getElementById('name').value.trim();
  var age        = document.getElementById('age').value.trim();
  var mobile     = document.getElementById('mobile').value.trim();
  var email      = document.getElementById('email').value.trim();
  var address    = document.getElementById('address').value.trim();
  var occupation = document.getElementById('occupation').value;
  var referral   = document.getElementById('referral').value.trim();
  var interest   = document.getElementById('interest').value.trim();
  var genderEl   = document.querySelector('input[name="gender"]:checked');
  var gender     = genderEl ? genderEl.value : '';

  /* ── Validation ── */
  if (!name) {
    alert('Please enter your full name.');
    return;
  }
  if (!mobile) {
    alert('Please enter your mobile number.');
    return;
  }
  if (!age) {
    alert('Please enter your age.');
    return;
  }
  if (!gender) {
    alert('Please select your gender.');
    return;
  }
  if (!address) {
    alert('Please enter your address.');
    return;
  }

  /* ── Build date string ── */
  var now     = new Date();
  var dateStr = now.toLocaleString('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short'
  });

  /* ── Compose WhatsApp message ── */
  var msg =
    '🌿 *FLP Network Marketing — New Member Registration*\n' +
    '━━━━━━━━━━━━━━━━━━━━━━\n' +
    '👤 *Name:* '        + name                              + '\n' +
    '📞 *Mobile:* '      + mobile                            + '\n' +
    '📧 *Email:* '       + (email      || 'Not provided')    + '\n' +
    '🎂 *Age:* '         + age                               + '\n' +
    '⚧ *Gender:* '       + gender                            + '\n' +
    '🏠 *Address:* '     + address                           + '\n' +
    '💼 *Occupation:* '  + (occupation || 'Not specified')   + '\n' +
    '🤝 *Referred By:* ' + (referral   || 'Self')            + '\n' +
    '💬 *Message:* '     + (interest   || 'Interested in FLP opportunity') + '\n' +
    '📅 *Submitted:* '   + dateStr                           + '\n' +
    '━━━━━━━━━━━━━━━━━━━━━━\n' +
    '🌿 _Forever Living Products International (FLP)_';

  /* ── Build URL and open WhatsApp ── */
  var encoded = encodeURIComponent(msg);
     var phoneNumber = "917977480020";
    var waURL   = 'https://wa.me/' + phoneNumber + '?text=' + encoded;

  showToast('✅ Opening WhatsApp…');
  setTimeout(function () {
    window.open(waURL, '_blank');
  }, 600);
}

/**
 * showToast()
 * Displays a temporary bottom notification toast.
 * @param {string} msg - The text to display in the toast
 */
function showToast(msg) {
  var toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');

  setTimeout(function () {
    toast.classList.remove('show');
  }, 3000);
}

/* ══════════════════════════════════════════════
   DOM READY — Event Listeners
══════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', function () {

  /* "Register as Member" button on Company page — navigate to Page 1 */
  document.querySelectorAll('.join-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      showPage('page1', document.querySelectorAll('.nav-tab')[0]);
    });
  });

});
