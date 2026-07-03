/**
 * PartnerAwesome Dashboard — Embed Loader for pa-erp-scorecard
 *
 * Usage:
 *   <div id="pa-erp-scorecard"></div>
 *   <script src="https://partnerawesome-llc.github.io/erp-partner-scorecard/embed.js" async></script>
 */
(function () {
  var TARGET_ID = 'pa-erp-scorecard';
  var LOADER_TAG = document.currentScript;

  var base = '';
  if (LOADER_TAG && LOADER_TAG.src) {
    base = LOADER_TAG.src.replace(/[^/]+$/, '');
  } else {
    base = 'https://partnerawesome-llc.github.io/erp-partner-scorecard/';
  }

  function inject(html) {
    var target = document.getElementById(TARGET_ID);
    if (!target) {
      console.warn('[' + TARGET_ID + '] Target element not found; creating one.');
      target = document.createElement('div');
      target.id = TARGET_ID;
      LOADER_TAG.parentNode.insertBefore(target, LOADER_TAG);
    }
    target.innerHTML = html;
    var scripts = target.querySelectorAll('script');
    scripts.forEach(function (oldScript) {
      var newScript = document.createElement('script');
      for (var i = 0; i < oldScript.attributes.length; i++) {
        var attr = oldScript.attributes[i];
        newScript.setAttribute(attr.name, attr.value);
      }
      newScript.textContent = oldScript.textContent;
      oldScript.parentNode.replaceChild(newScript, oldScript);
    });
  }

  function showError(msg) {
    var target = document.getElementById(TARGET_ID);
    if (!target) return;
    target.innerHTML = '<div style="padding:24px;font-family:system-ui,sans-serif;color:#666;text-align:center;border:1px solid #ddd;border-radius:8px;">' +
      '<div style="font-size:14px;margin-bottom:8px;">Dashboard temporarily unavailable</div>' +
      '<div style="font-size:12px;">' + msg + '</div>' +
      '<div style="font-size:12px;margin-top:8px;"><a href="' + base + '" target="_blank" rel="noopener">Open dashboard directly \u2192</a></div>' +
      '</div>';
  }

  var cacheBuster = Math.floor(Date.now() / (60 * 60 * 1000));
  var url = base + 'embed.html?v=' + cacheBuster;

  fetch(url, { credentials: 'omit', mode: 'cors' })
    .then(function (r) {
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return r.text();
    })
    .then(inject)
    .catch(function (err) {
      console.error('[' + TARGET_ID + '] Load failed:', err);
      showError('Loader could not fetch dashboard content.');
    });
})();
