(function ($, QUnit, window, document, undefined) {

  "use strict";

  QUnit.module("slide_down", {
    beforeEach: function () {
      this.header1 = $(".header1");
      this.header1.cbSlideDownHeader();
    }
  });
  QUnit.test("$.fn.cbSlideDownHeader()が読み込まれているか", function (assert) {
    assert.ok($.fn.cbSlideDownHeader, "Passed!!")
  });
  QUnit.test("メソッドを実行する要素のTOPのデフォルト値は、要素の高さの負の値になっているか", function (assert) {
    var headerHeight = this.header1.height();
    assert.equal(this.header1.css("top"), "-" + headerHeight + "px", "Passed!!");
  });
  QUnit.test("1000pxスクロールした時のヘッダバーのTOPの値は0以上", function (assert) {
    window.scroll(0, 1000);
    console.log(this.header1.offset().top);
    assert.ok(this.header1.offset().top > 0, "Passed!!");
  });


  QUnit.module("slide_up", {
    beforeEach: function () {
      this.header2 = $(".header2");
      this.header2.cbSlideUpHeader();
    }
  });
  QUnit.test("$.fn.cbSlideUpHeader()が読み込まれているか", function (assert) {
    assert.ok($.fn.cbSlideUpHeader, "Passed!!");
  });
  QUnit.test("メソッドを実行する要素のTOPのデフォルト値は、0pxになっているか", function (assert) {
    assert.equal(this.header2.css("top"), "0px", "Passed!!");
  });
  QUnit.test("1000pxスクロールした時のヘッダバーのTOPの値は0以下", function (assert) {
    window.scroll(0, 1000);
    console.log(this.header2.css("top"));
    assert.ok(this.header2.offset().top < 0, "Passed!!");
  });

} (jQuery, QUnit, window, document));
