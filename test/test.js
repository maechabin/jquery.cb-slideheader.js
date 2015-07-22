(function ($, QUnit, window, document, undefined) {

  "use strict";

  QUnit.module("slide_down", {
    beforeEach: function () {
      this.header1 = $(".header1");
      this.header1.cbSlideDownHeader();
      this.header2 = $(".header2");
      this.header2.cbSlideUpHeader();
      window.scrollTo(0, 0);
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

    var self = this;
    console.log(self.header1.css("top"));
    console.log(self.header1.offset().top);
    assert.ok(self.header1.offset().top === -56, "Passed!!");
              window.scrollTo(100, 0);

    window.setTimeout(function () {
      console.log(self.header1.css("top"));
      console.log(self.header1.offset().top);
      assert.ok(self.header1.offset().top === 0, "Passed!!");

    }, 1000);
window.scrollTo(0, 0);
      console.log(self.header2.css("top"));
      console.log(self.header2.offset().top);
      assert.ok(self.header2.css("top") === "0px", "Passed!!");
            window.scrollTo(100, 0);
      window.setTimeout(function () {
        console.log(self.header2.css("top"));
        console.log(self.header2.offset().top);
        assert.ok(self.header2.css("top") === "-56px", "Passed!!");
      }, 3000);


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
    assert.strictEqual(this.header2.css("top"), "0px", "Passed!!");
  });
  QUnit.test("1000pxスクロールした時のヘッダバーのTOPの値は0以上", function (assert) {

    var self = this;



  });


} (jQuery, QUnit, window, document));
