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
      header2SelectorName: ".cb-header2",
      headerClone: false,
      fullscreenView: false,
      width: "100%",
      zIndex: 0,
      boxShadow: "none",
      opacity: 1,
      slidePoint: 0,
      slideDownSpeed: "slow",
      slideUpSpeed: "normal"
    };

  };

  Plugin.prototype.slideHeader = function () {

    var self = this;
    var w = $(window);

    w.on("scroll", function () {
      if (w.scrollTop() > self.config.slidePoint) {
        self.$element.slideDown(self.config.slideDownSpeed).css({
          "box-shadow": self.config.boxShadow,
          "transition": "box-shadow .9s linear"
        });
      } else {
        self.$element.slideUp(self.config.slideUpSpeed).css({
          "box-shadow": "none"
        });
      }
    });
  };

  Plugin.prototype.cloneHeader = function () {
    var self = this;
    var clone = self.$element.clone(true);
    clone.insertAfter(self.$element).removeClass("cb-header");
  }

  Plugin.prototype.setStyle = function () {
    var self = this;
    self.$element.css({
      "opacity": self.config.opacity,
      "width": self.config.width,
      "z-index": self.config.zIndex
    });
  };

  Plugin.prototype.changeHeaderHeight = function () {

    var self = this;
    var headerBarHeight = self.$element.height();
    var header2 = $(self.config.header2SelectorName);
    var headerHeight = headerBarHeight + header2.height();
    var windowHeight = $(window).height();
    var padding = "";

    if (headerHeight < windowHeight) {

      if (self.config.headerClone === true) {
        padding = (windowHeight - headerHeight) / 2;
        self.config.slidePoint = windowHeight + headerBarHeight;
      } else {
        padding = (windowHeight - headerHeight + headerBarHeight) / 2;
        self.config.slidePoint = windowHeight;
      }
      header2.css({
        "padding-top": padding + "px",
        "padding-bottom": padding + "px"
      });

    }

  };

  Plugin.prototype.init = function () {

    this.config = $.extend({}, this.defaults, this.options);
    if (this.config.headerClone === true) {
      this.cloneHeader();
    }
    this.setStyle();
    if (this.config.fullscreenView === true) {
      this.changeHeaderHeight();
    }
    this.slideHeader();

    return this;

  };

  $.fn.cbSlideDownHeader = function (options) {

    return this.each(function () {
      new Plugin(this, options).init();
    });

  };

}));
