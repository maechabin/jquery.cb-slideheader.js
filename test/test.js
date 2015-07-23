;(function ($, QUnit, window, document, undefined) {

  "use strict";

  QUnit.module("slide_down", {
    beforeEach: function () {
      window.scroll(0, 0);
      this.header1 = $(".header1");
      this.headerHeight = this.header1.height();
      this.header1.cbSlideDownHeader();
    },
    afterEach: function () {
      window.scroll(0, 0);
    }
  });

  QUnit.test("$.fn.cbSlideDownHeader()が読み込まれているか", function (assert) {
    assert.ok($.fn.cbSlideDownHeader, "Passed!!")
  });

  QUnit.test("メソッドを実行する要素のTOPのデフォルト値は、要素の高さの負の値になっているか", function (assert) {
    assert.equal(this.header1.css("top"), "-" + this.headerHeight + "px", "Passed!!");
  });

  QUnit.test("スクロールした時のヘッダバーのTOPの値", function (assert) {

    var self = this;
    var done = assert.async();

    console.log(self.header1.css("top"));
    console.log(self.header1.offset().top);
    assert.equal(self.header1.css("top"), "-" + self.headerHeight + "px", "Passed!!");

    window.scroll(0, 10);

    setTimeout(function () {
      console.log(self.header1.css("top"));
      console.log(self.header1.offset().top);
      assert.equal(self.header1.css("top"), "0px", "Passed!!");
      done();
    }, 500);
  });


  QUnit.module("slide_up", {
    beforeEach: function () {
      window.scroll(0, 0);
      this.header2 = $(".header2");
      this.headerHeight = this.header2.height();
      this.header2.cbSlideUpHeader();
    },
    afterEach: function () {
      window.scroll(0, 0);
    }
  });

  QUnit.test("$.fn.cbSlideUpHeader()が読み込まれているか", function (assert) {
    assert.ok($.fn.cbSlideUpHeader, "Passed!!");
  });

  QUnit.test("メソッドを実行する要素のTOPのデフォルト値は、0pxになっているか", function (assert) {
    assert.strictEqual(this.header2.css("top"), "0px", "Passed!!");
  });

  QUnit.test("スクロールした時のヘッダバーのTOPの値", function (assert) {

    var self = this;
    var done = assert.async();

    console.log(self.header2.css("top"));
    console.log(self.header2.offset());
    assert.equal(self.header2.css("top"), "0px", "Passed!!");

    window.scroll(0, 1000);

    setTimeout(function () {
      console.log(self.header2.css("top"));
      console.log(self.header2.offset());
      assert.equal(self.header2.css("top"), "-" + self.headerHeight + "px", "Passed!!");
      done();
    }, 500);
});

} (jQuery, QUnit, window, document));
