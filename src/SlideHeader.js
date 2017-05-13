import $ from 'jquery';

export default class SlideHeader {
  constructor(element, options) {
    this.element = element;
    this.$element = $(element);
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
      slideDownCallback: () => {},
      slideUpCallback: () => {},
      headroom: false,
    };
  }

  slide(slideFlag, top, arg, css) {
    this.slideFlag = (slideFlag === 'up') ? 'down' : 'up';

    window.setTimeout(() => {
      this.$element.stop().animate({
        top,
      },
        this.config[`slide${arg}Speed`],
        this.config[`slide${arg}Easing`],
        this.config[`slide${arg}Callback`]
      ).css(css);
    }, 200);
  }

  slideHeader() {
    const w = $(window);
    const top1 = (this.methodType === 'slideDown') ? 0 : `-${this.config.headerBarHeight}px`;
    const top2 = (this.methodType === 'slideDown') ? `-${this.config.headerBarHeight}px` : 0;
    const arg1 = (this.methodType === 'slideDown') ? 'Down' : 'Up';
    const arg2 = (this.methodType === 'slideDown') ? 'Up' : 'Down';
    const style1 = {
      'box-shadow': this.config.boxShadow,
      transition: 'box-shadow .9s linear',
    };
    const style2 = {
      'box-shadow': 'none',
    };
    const css1 = (this.methodType === 'slideDown') ? style1 : style2;
    const css2 = (this.methodType === 'slideDown') ? style2 : style1;
    let scrollStartPosition = 0;
    let scrollCurrentPosition = 0;

    w.on('scroll', () => {
      if (this.methodType === 'slideUp' && this.config.headroom === true) {
        scrollCurrentPosition = w.scrollTop();
        if (scrollCurrentPosition > scrollStartPosition
          && scrollCurrentPosition > this.config.slidePoint) {
          if (this.slideFlag === 'up') {
            return this.slide(this.slideFlag, top1, arg1, css1);
          }
        } else {
          if (this.slideFlag === 'down') {
            return this.slide(this.slideFlag, top2, arg2, css2);
          }
        }
        scrollStartPosition = scrollCurrentPosition;
      } else {
        if (w.scrollTop() > this.config.slidePoint) {
          if (this.slideFlag === 'up') {
            return this.slide(this.slideFlag, top1, arg1, css1);
          }
        } else {
          if (this.slideFlag === 'down') {
            return this.slide(this.slideFlag, top2, arg2, css2);
          }
        }
      }
      return false;
    });
  }

  setStyle() {
    const top = (this.methodType === 'slideDown') ? `-${this.config.headerBarHeight}px` : 0;
    this.$element.css({
      top,
      visibility: 'visible',
      opacity: this.config.opacity,
      width: this.config.width,
      zIndex: this.config.zIndex,
    });
  }

  cloneHeader() {
    const clone = this.$element.clone(true);
    clone.insertAfter(this.$element)
      .removeClass('cb-header')
      .addClass('cb-header1')
      .css({
        'z-index': 10000,
      });
  }

  changeHeaderHeight() {
    const headerBarHeight = this.$element.height();
    const header2 = $(this.config.header2SelectorName);
    const headerHeight = headerBarHeight + header2.height();
    const windowHeight = $(window).height();
    let padding = '';

    if (headerHeight < windowHeight) {
      if (this.config.headerClone === true) {
        padding = (windowHeight - headerHeight) / 2;
      } else {
        padding = (windowHeight - headerHeight + headerBarHeight) / 2;
      }
      this.config.slidePoint = windowHeight;
      header2.css({
        'padding-top': `${padding}px`,
        'padding-bottom': `${padding}px`,
      });
    } else {
      if (this.config.headerClone === true) {
        this.config.slidePoint = headerHeight;
      } else {
        this.config.slidePoint = headerHeight - headerBarHeight;
      }
    }
  }

  init(type = '') {
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
  }
}
