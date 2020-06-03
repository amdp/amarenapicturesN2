var _iub = _iub || []
_iub.csConfiguration = { "consentOnContinuedBrowsing": false, "whitelabel": false, "lang": "it", "siteId": 1907487, "cookiePolicyId": 29600831, "banner": { "acceptButtonDisplay": true, "customizeButtonDisplay": false, "position": "float-bottom-center", "acceptButtonColor": "#ff0033", "acceptButtonCaptionColor": "white", "customizeButtonColor": "#212121", "customizeButtonCaptionColor": "white", "rejectButtonColor": "#010101", "rejectButtonCaptionColor": "white", "textColor": "#010101", "backgroundColor": "#ffffff", "rejectButtonDisplay": true } };
(function (w, d) {
  var loader = function () {
    var s = d.createElement("script")
    var tag = d.getElementsByTagName("script")[0]
    s.src = "https://cdn.iubenda.com/iubenda.js"
    tag.parentNode.insertBefore(s, tag)
  }
  if (w.addEventListener) {
    w.addEventListener("load", loader, false)
  } else if (w.attachEvent) {
    w.attachEvent("onload", loader)
  } else {
    w.onload = loader
  }
})(window, document)