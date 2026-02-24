/* ============================================================
   Ground Truth Demo - Main JavaScript
   Handles: splash screen, overlay positioning, fallback messages
   ============================================================ */

(function () {
  'use strict';

  // --- Splash Screen ---
  var splash = document.getElementById('splash');
  var splashBtn = document.getElementById('splash-enter');

  if (splash && splashBtn) {
    // Check if already dismissed this session
    if (sessionStorage.getItem('gt-splash-dismissed') === 'true') {
      splash.style.display = 'none';
    } else {
      splashBtn.addEventListener('click', function () {
        splash.classList.add('hidden');
        sessionStorage.setItem('gt-splash-dismissed', 'true');
        // Remove from DOM after fade-out
        setTimeout(function () {
          splash.style.display = 'none';
        }, 400);
      });
    }
  }

  // --- Dynamic overlay positioning ---
  var gtOverlay = document.getElementById('gtOverlay');

  if (gtOverlay) {
    gtOverlay.addEventListener('mouseenter', function () {
      this.style.boxShadow = '0 0 0 3px rgba(59, 139, 186, 0.4)';
    });
    gtOverlay.addEventListener('mouseleave', function () {
      this.style.boxShadow = 'none';
    });
  }

  // --- Handle missing screenshots gracefully ---
  var screenshots = document.querySelectorAll('.screenshot-bg-header, .screenshot-bg, .screenshot-bg-bottom');
  screenshots.forEach(function (img) {
    img.addEventListener('error', function () {
      var parent = this.parentElement;
      // If parent is an <a> tag, go up one more level
      if (parent.tagName === 'A') {
        parent = parent.parentElement;
      }
      if (parent && !parent.querySelector('.screenshot-fallback')) {
        var fallback = document.createElement('div');
        fallback.className = 'screenshot-fallback';
        fallback.style.cssText = 'padding: 40px 40px; text-align: center; background: #f5f5f5; color: #999; font-size: 14px; line-height: 1.6;';
        fallback.innerHTML = '<p style="margin-bottom: 8px; font-weight: 600; color: #666;">Screenshot not found</p>' +
          '<p>Save the ERPEC News homepage screenshot to:<br>' +
          '<code style="background: #e8e8e8; padding: 2px 8px; border-radius: 3px; font-size: 13px;">' +
          this.getAttribute('src') + '</code></p>';
        parent.appendChild(fallback);
        this.style.display = 'none';
      }
    });
  });
})();
