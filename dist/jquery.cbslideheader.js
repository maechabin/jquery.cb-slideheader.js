(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jquery = (typeof window !== "undefined" ? window['$'] : typeof global !== "undefined" ? global['$'] : null);

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SlideHeader = function () {
  function SlideHeader(element, options) {
    _classCallCheck(this, SlideHeader);

    this.element = element;
    this.$element = (0, _jquery2.default)(element);
    this.methodType = '';
    this.config = {};
    this.options = options;
    this.slideFlag = 'up';
    this.defaults = {
      headerBarHeight: this.$element.height(),
      headerBarWidth: '100%',
      header2SelectorName: '.cb-header2',
      headerClone: false,
      fullscreenView: false,
      zIndex: 9999,
      boxShadow: 'none',
      opacity: 1,
      slidePoint: 0,
      slideDownDuration: 'normal',
      slideUpDuration: 'normal',
      slideDownEasing: 'swing',
      slideUpEasing: 'swing',
      slideDownCallback: function slideDownCallback() {},
      slideUpCallback: function slideUpCallback() {},
      headroom: false
    };
  }

  _createClass(SlideHeader, [{
    key: 'slide',
    value: function slide(slideFlag, top, arg, css) {
      var _this = this;

      this.slideFlag = slideFlag === 'up' ? 'down' : 'up';

      window.setTimeout(function () {
        _this.$element.stop().animate({
          top: top
        }, _this.config['slide' + arg + 'Speed'], _this.config['slide' + arg + 'Easing'], _this.config['slide' + arg + 'Callback']).css(css);
      }, 200);
    }
  }, {
    key: 'slideHeader',
    value: function slideHeader() {
      var _this2 = this;

      var w = (0, _jquery2.default)(window);
      var top1 = this.methodType === 'slideDown' ? 0 : '-' + this.config.headerBarHeight + 'px';
      var top2 = this.methodType === 'slideDown' ? '-' + this.config.headerBarHeight + 'px' : 0;
      var arg1 = this.methodType === 'slideDown' ? 'Down' : 'Up';
      var arg2 = this.methodType === 'slideDown' ? 'Up' : 'Down';
      var style1 = {
        'box-shadow': this.config.boxShadow,
        transition: 'box-shadow .9s linear'
      };
      var style2 = {
        'box-shadow': 'none'
      };
      var css1 = this.methodType === 'slideDown' ? style1 : style2;
      var css2 = this.methodType === 'slideDown' ? style2 : style1;
      var scrollStartPosition = 0;
      var scrollCurrentPosition = 0;

      w.on('scroll', function () {
        if (_this2.methodType === 'slideUp' && _this2.config.headroom === true) {
          scrollCurrentPosition = w.scrollTop();
          if (scrollCurrentPosition > scrollStartPosition && scrollCurrentPosition > _this2.config.slidePoint) {
            if (_this2.slideFlag === 'up') {
              return _this2.slide(_this2.slideFlag, top1, arg1, css1);
            }
          } else {
            if (_this2.slideFlag === 'down') {
              return _this2.slide(_this2.slideFlag, top2, arg2, css2);
            }
          }
          scrollStartPosition = scrollCurrentPosition;
        } else {
          if (w.scrollTop() > _this2.config.slidePoint) {
            if (_this2.slideFlag === 'up') {
              return _this2.slide(_this2.slideFlag, top1, arg1, css1);
            }
          } else {
            if (_this2.slideFlag === 'down') {
              return _this2.slide(_this2.slideFlag, top2, arg2, css2);
            }
          }
        }
        return false;
      });
    }
  }, {
    key: 'setStyle',
    value: function setStyle() {
      var top = this.methodType === 'slideDown' ? '-' + this.config.headerBarHeight + 'px' : 0;
      this.$element.css({
        top: top,
        visibility: 'visible',
        opacity: this.config.opacity,
        width: this.config.width,
        zIndex: this.config.zIndex
      });
    }
  }, {
    key: 'cloneHeader',
    value: function cloneHeader() {
      var clone = this.$element.clone(true);
      clone.insertAfter(this.$element).removeClass('cb-header').addClass('cb-header1').css({
        'z-index': 10000
      });
    }
  }, {
    key: 'changeHeaderHeight',
    value: function changeHeaderHeight() {
      var headerBarHeight = this.$element.height();
      var header2 = (0, _jquery2.default)(this.config.header2SelectorName);
      var headerHeight = headerBarHeight + header2.height();
      var windowHeight = (0, _jquery2.default)(window).height();
      var padding = '';

      if (headerHeight < windowHeight) {
        if (this.config.headerClone === true) {
          padding = (windowHeight - headerHeight) / 2;
        } else {
          padding = (windowHeight - headerHeight + headerBarHeight) / 2;
        }
        this.config.slidePoint = windowHeight;
        header2.css({
          'padding-top': padding + 'px',
          'padding-bottom': padding + 'px'
        });
      } else {
        if (this.config.headerClone === true) {
          this.config.slidePoint = headerHeight;
        } else {
          this.config.slidePoint = headerHeight - headerBarHeight;
        }
      }
    }
  }, {
    key: 'init',
    value: function init() {
      var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

      this.methodType = type;
      this.config = _jquery2.default.extend({}, this.defaults, this.options);
      if (this.config.headerClone === true) {
        this.cloneHeader();
      }
      this.setStyle();
      if (this.config.fullscreenView === true) {
        this.changeHeaderHeight();
      }
      this.slideHeader();

      return this;
    }
  }]);

  return SlideHeader;
}();

exports.default = SlideHeader;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],2:[function(require,module,exports){
(function (global){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _jquery = (typeof window !== "undefined" ? window['$'] : typeof global !== "undefined" ? global['$'] : null);

var _jquery2 = _interopRequireDefault(_jquery);

var _SlideHeader = require('SlideHeader');

var _SlideHeader2 = _interopRequireDefault(_SlideHeader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*!
 * jquery.cbslideheader.js v0.4.0
 * Auther @maechabin
 * Licensed under mit license
 */
(function (factory) {
  if ((typeof module === 'undefined' ? 'undefined' : _typeof(module)) === 'object' && _typeof(module.exports) === 'object') {
    module.exports = factory((typeof window !== "undefined" ? window['$'] : typeof global !== "undefined" ? global['$'] : null));
  } else {
    factory(_jquery2.default);
  }
})(function ($) {
  $.extend($.fn, {
    cbSlideDownHeader: function cbSlideDownHeader(options) {
      var _this = this;

      return this.each(function () {
        return new _SlideHeader2.default(_this, options).init('slideDown');
      });
    },
    cbSlideUpHeader: function cbSlideUpHeader(options) {
      var _this2 = this;

      return this.each(function () {
        return new _SlideHeader2.default(_this2, options).init('slideUp');
      });
    }
  });
});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"SlideHeader":1}]},{},[2]);
