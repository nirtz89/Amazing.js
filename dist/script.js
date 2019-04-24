"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Amazing =
/*#__PURE__*/
function () {
  function Amazing() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var debug = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    _classCallCheck(this, Amazing);

    this.config = config;
    this.config.useClass = this.config.useClass || "amazing";
    this.config.defaultAnimation = this.config.defaultAnimation || "fadeIn";
    this.config.defaultSpeed = this.config.defaultSpeed || 0.25;
    this.config.defaultDelay = this.config.defaultDelay || 0;
    this.config.allowMobile = this.config.allowMobile == false ? false : true;
    this.config.callback = this.config.callback || false;
    this.debug = debug;
    this.objectPool = [];
  }

  _createClass(Amazing, [{
    key: "isMobile",
    value: function isMobile() {
      if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i)) {
        return true;
      } else {
        return false;
      }
    }
  }, {
    key: "init",
    value: function init() {
      var self = this;
      if (self.debug) // If in debug mode, state the library has initiated and the object has been created
        console.log("Amazing initiated");
      scroll();

      function isScrolledIntoView(el) {
        // If elements is scrolled into view
        var rect = el.getBoundingClientRect();
        var elemTop = rect.top;
        var elemBottom = rect.bottom;
        var isVisible = elemTop < window.innerHeight && elemBottom >= 0;
        return isVisible;
      }

      function setAnimation(el) {
        self.objectPool.push(el);
        var animation = el.dataset.animation || self.config.defaultAnimation;
        var delay = parseFloat(el.dataset.delay) || self.config.defaultDelay;
        var speed = parseFloat(el.dataset.speed) || self.config.defaultSpeed;
        var mobile = el.dataset.mobile || self.config.allowMobile;
        var callback = el.dataset.callback || self.config.callback;
        if (mobile == "false" && self.isMobile()) return;
        setTimeout(function () {
          // Turn animation element to "finished" state
          el.classList.add("finished");
          if (callback) callback(); // Find elements waiting for this to finish and activate animation on them

          if (el.className.indexOf("".concat(self.config.useClass, "-")) > -1) {
            var amazingClass = el.className.split(" ").filter(function (v) {
              return v.indexOf("".concat(self.config.useClass, "-")) > -1;
            })[0].replace("".concat(self.config.useClass, "-"), "");
            var allAfter = document.querySelectorAll("[data-after=\"".concat(amazingClass, "\"]"));
            allAfter.forEach(function (after_element) {
              return setAnimation(after_element);
            });
          }
        }, parseFloat(speed + delay) * 1000);
        setTimeout(function () {
          // Activate animation
          el.classList.add("animation-".concat(speed, "s"));
          el.classList.add("animated");
          el.classList.add(animation);
          el.style.visibility = "visible";
        }, delay * 1000);
      }

      function scroll() {
        // Everytime the page is scrolled
        var all_elements = document.querySelectorAll(".".concat(self.config.useClass, ":not(.finished)")); // Catch all elements with the chosen class

        all_elements.forEach(function (el) {
          if (isScrolledIntoView(el)) {
            var after = el.dataset.after || false;
            if (!after && !self.objectPool.includes(el)) setAnimation(el);
          }
        });
      }

      window.addEventListener("scroll", scroll);
    }
  }]);

  return Amazing;
}();