/**
 * jquery.cb-slideheader.js - A jQuery plugin to display or hide headerbar with a sliding motion
 * @version v0.3.2
 * @author maechabin <mail@chab.in> http://mae.chab.in/
 * @license MIT license
 */
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
    this.methodType = "";
    this.config = {};
    this.options = options;
    this.slideFlag = "up";
    this.defaults = {
      headerBarHeight: this.$element.height(),
      headerBarWidth: "100%",
      header2SelectorName: ".cb-header2",
      headerClone: false,
      fullscreenView: false,
      zIndex: 9999,
      boxShadow: "none",
      opacity: 1,
      slidePoint: 0,
      slideDownDuration: "normal",
      slideUpDuration: "normal",
      slideDownEasing: "swing",
      slideUpEasing: "swing",
      slideDownCallback: function () {},
      slideUpCallback: function () {},
      headroom: false
    };

  };

  Plugin.prototype.slide = function (slideFlag, top, arg, css) {

    this.slideFlag = (slideFlag === "up") ? "down" : "up";
    this.$element.stop().animate({
      "top": top
    },
      this.config["slide" + arg + "Speed"],
      this.config["slide" + arg + "Easing"],
      this.config["slide" + arg + "Callback"]
    ).css(css);

  };

  Plugin.prototype.slideHeader = function () {

    var self = this;
    var w = $(window);
    var top1 = (self.methodType === "slideDown") ? 0 : "-" + self.config.headerBarHeight + "px";
    var top2 = (self.methodType === "slideDown") ? "-" + self.config.headerBarHeight + "px" : 0;
    var arg1 = (self.methodType === "slideDown") ? "Down" : "Up";
    var arg2 = (self.methodType === "slideDown") ? "Up" : "Down";
    var style1 = {
      "box-shadow": self.config.boxShadow,
      "transition": "box-shadow .9s linear"
    };
    var style2 = {
      "box-shadow": "none"
    };
    var css1 = (self.methodType === "slideDown") ? style1 : style2;
    var css2 = (self.methodType === "slideDown") ? style2 : style1;
    var scrollStartPosition = 0;
    var scrollCurrentPosition = 0;

    w.on("scroll", function () {

      if (self.methodType === "slideUp" && self.config.headroom === true) {

        scrollCurrentPosition = w.scrollTop();
        if (scrollCurrentPosition > scrollStartPosition && scrollCurrentPosition > 0) {

          if (self.slideFlag === "up") {
            self.slide.call(self, self.slideFlag, top1, arg1, css1);
          }

        } else {

          if (self.slideFlag === "down") {
            self.slide.call(self, self.slideFlag, top2, arg2, css2);
          }

        }
        scrollStartPosition = scrollCurrentPosition;

      } else {

        if (w.scrollTop() > self.config.slidePoint) {

          if (self.slideFlag === "up") {
            self.slide.call(self, self.slideFlag, top1, arg1, css1);
          }

        } else {

          if (self.slideFlag === "down") {
            self.slide.call(self, self.slideFlag, top2, arg2, css2);
          }

        }

      }
    });

  };

  Plugin.prototype.setStyle = function () {
    var self = this;
    var top = (self.methodType === "slideDown") ? "-" + self.config.headerBarHeight + "px" : 0;
    self.$element.css({
      "top": top,
      "visibility": "visible",
      "opacity": self.config.opacity,
      "width": self.config.width,
      "z-index": self.config.zIndex
    });
  };

  Plugin.prototype.cloneHeader = function () {
    var self = this;
    var clone = self.$element.clone(true);
    clone.insertAfter(self.$element)
      .removeClass("cb-header")
      .css({
        "z-index": 10000
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

  Plugin.prototype.init = function (type) {

    this.methodType = type;
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

  $.extend($.fn, {

    cbSlideDownHeader: function (options) {
      return this.each(function () {
        new Plugin(this, options).init("slideDown");
      });
    },

    cbSlideUpHeader: function (options) {
      return this.each(function () {
        new Plugin(this, options).init("slideUp");
      });
    }

  });

}));
