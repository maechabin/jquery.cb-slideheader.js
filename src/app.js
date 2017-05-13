import jQuery from 'jquery';
import SlideHeader from 'SlideHeader';
/*!
 * jquery.cbslideheader.js v0.4.0
 * Auther @maechabin
 * Licensed under mit license
 */
((factory) => {
  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = factory(require('jquery'));
  } else {
    factory(jQuery);
  }
})(($) => {
  $.extend($.fn, {
    cbSlideDownHeader(options) {
      return this.each(
        () => new SlideHeader(this, options).init('slideDown')
      );
    },
    cbSlideUpHeader(options) {
      return this.each(
        () => new SlideHeader(this, options).init('slideUp')
      );
    },
  });
});
