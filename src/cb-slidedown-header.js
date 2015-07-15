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
      slidePoint: 0,
      slideDownSpeed: "slow",
      slideUpSpeed: "slow"
    };
  };

  Plugin.prototype.slideHeader = function () {

    var self = this;
    var w = $(window);

    w.on("scroll", function () {
      var $this = $(this);
      if ($this.scrollTop() > self.config.slidePoint) {
        self.$element.slideDown(self.config.slideDownSpeed);
      } else {
        self.$element.slideUp(self.config.slideUpSpeed);
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
