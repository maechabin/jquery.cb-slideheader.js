;(function (factory) {

  "use strict";

  if (typeof module === "object" && typeof module.exports === "object") {

    module.exports = factory(require("jquery"), window, document);

  } else {

    factory(jQuery, window, document);

  }

} (function ($, window, document, undefined) {

  "use strict";

  var Plugin = function (element, options, i) {

    this.element = element;
    this.$element = $(element);
    this.config = {};
    this.options = options;
    this.defaults = {
      headerBarHeight: this.$element.height(),
      header2SelectorName: ".cb-header2",
      headerClone: false,
      fullscreenView: false,
      width: "100%",
      zIndex: 0,
      boxShadow: "none",
      opacity: 1,
      slidePoint: 0,
      slideDownSpeed: "normal",
      slideUpSpeed: "normal",
      slideDownEasing: "swing",
      slideUpEasing: "swing"
    };

  };

  Plugin.prototype.slideHeader = function () {

    var self = this;
    var w = $(window);
    var flag = "up";

    w.on("scroll", function () {
      if (w.scrollTop() > self.config.slidePoint) {

        if (flag === "up") {
          self.$element.stop().animate({
            top: 0
          }, self.config.slideDownSpeed, self.config.slideDownEasing).css({
            "box-shadow": self.config.boxShadow,
            "transition": "box-shadow .9s linear"
          });
          flag = "down";
        }

        //self.$element.removeClass("slide-up");
        //self.$element.addClass("slide-down");

        //self.$element.slideDown(self.config.slideDownSpeed);
      } else {

        if (flag === "down") {
          self.$element.stop().animate({
            top: "-" + self.config.headerBarHeight + "px"
          }, self.config.slideUpSpeed, self.config.slideDownEasing).css({
            "box-shadow": "none",
          });
          flag = "up";
        }

        //self.$element.removeClass("slide-down");
        //self.$element.addClass("slide-up");

        //self.$element.slideUp(self.config.slideUpSpeed);
      }
    });

  };

  Plugin.prototype.cloneHeader = function () {
    var self = this;
    var clone = self.$element.clone(true);
    clone.insertAfter(self.$element)
      .removeClass("cb-header")
      .css({
        "z-index": 9999
      });
  };

  Plugin.prototype.setStyle = function () {
    var self = this;
    self.$element.css({
      "top": "-" + self.config.headerBarHeight + "px",
      "visibility": "visible",
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
      } else {
        padding = (windowHeight - headerHeight + headerBarHeight) / 2;
      }
      self.config.slidePoint = windowHeight;
      header2.css({
        "padding-top": padding + "px",
        "padding-bottom": padding + "px"
      });

    } else {

      if (self.config.headerClone === true) {
        self.config.slidePoint = headerHeight;
      } else {
        self.config.slidePoint = headerHeight - headerBarHeight;
      }

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

    return this.each(function (i) {
      new Plugin(this, options, i).init();
    });

  };

}));
