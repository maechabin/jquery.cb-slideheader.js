/**
 * jQuery.cb-slideheader.jp - A jQuery plugin to display or hide headerbar with a sliding motion
 * @version v0.2.2
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
      slideUpEasing: "swing",
      slideDownCallback: function () {},
      slideUpCallback: function () {}
    };

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
    var slideFlag = "up";

    w.on("scroll", function () {
      if (w.scrollTop() > self.config.slidePoint) {

        if (slideFlag === "up") {
          self.$element.stop().animate({
            "top": top1
          },
            self.config["slide" + arg1 + "Speed"],
            self.config["slide" + arg1 + "Easing"],
            self.config["slide" + arg1 + "Callback"]
          ).css(css1);
          slideFlag = "down";
        }

      } else {

        if (slideFlag === "down") {
          self.$element.stop().animate({
            "top": top2
          },
            self.config["slide" + arg2 + "Speed"],
            self.config["slide" + arg2 + "Easing"],
            self.config["slide" + arg2 + "Callback"]
          ).css(css2);
          slideFlag = "up";
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
        "z-index": 9999
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
