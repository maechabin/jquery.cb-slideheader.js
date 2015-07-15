;(function (factory) {

  "use strict";

  if (typeof module === "object" && typeof module.exports === "object") {
    module.exports = factory(require("jquery"), window, document);
  } else {
    factory(jQuery, window, document);
  }

} (function ($, window, document, undefined) {

  "use strict";

  var Plugin = function (element, options) {
    this.element = element;
    this.$element = $(element);
    this.config = {};
    this.options = options;
    this.defaults = {
      slidePoint: 356,
      slideDownSpeed: "500ms",
      slideUpSpeed: "slow"
    };
  };

  Plugin.prototype.slideHeader = function () {

    var self = this;
    var w = $(window);

    w.on("scroll", function () {

      if (w.scrollTop() > self.config.slidePoint) {
        if (self.$element.css("display") === "block") {
          self.$element.css({"display": "none"});
        }
        self.$element.css({
          "position": "fixed",
          "top": 0,
          "left": 0,
          "opacity": .9
        });
        self.$element.slideDown(self.config.slideDownSpeed);
      } else {
        self.$element.slideUp(self.config.slideUpSpeed);
        self.$element.css({
          "position": "static"
        });
      }
    });
  };

  Plugin.prototype.init = function () {
    this.config = $.extend({}, this.defaults, this.options);
    this.slideHeader();
    return this;
  };

  $.fn.cbSlideDownHeader = function (options) {

    return this.each(function () {
      new Plugin(this, options).init();
    });

  };

}));
