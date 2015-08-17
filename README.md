#jquery.cb-slideheader.js

## #概要
「jquery.cb-slideheader.js」は、**ページのスクロールに合わせてヘッダーバーをスライドさせて表示/非表示させる機能を実装するためのjQueryプラグイン**です。

以下の2つのメソッドを提供します。
- **.cbSlideDownHeader()メソッド**: ページを下にスクロールすると非表示になっていたヘッダーバーを表示させるメソッド
- **.cbSlideUpHeader()メソッド**: ページを下にスクロールすると表示されているヘッダーバーを非表示にするメソッド

参考<br>
http://mae.chab.in/archives/2703

## #デモ

スクロールするとヘッダーバーが表示されるサンプル<br>
http://jsrun.it/maechabin/1Odt

スクロールするとヘッダーバーが非表示となるサンプル<br>
http://jsrun.it/maechabin/zFoe


## #実装方法

### 1. プラグインをダウンロードする

こちらのページから[ダウンロード](https://github.com/maechabin/jquery.cb-slideheader.js/archive/master.zip)するか、`[git clone]`コマンドでローカルにコピーします。

```
$ git clone git@github.com:maechabin/jquery.cb-slideheader.js.git 任意のディレクトリ名
```

npm経由でも入手可能です。
```
$ npm install --save-dev jquery.cb-slideheader.js
```

機能の実装に使用するファイルは以下のjsファイルとなります。
- dist/jquery.cbslideheader.min.js


### 2. プラグイン & 外部ファイルを読み込む

```html
<script src="//code.jquery.com/jquery-2.1.4.min.js"></script>
<script src="jquery.cbslideheader.min.js"></script>
```

※当プラグインはCommonJSに対応しています。require()メソッドで読み込んでもOKです。

### 3. ヘッダーバーを準備する

プラグインを適用するヘッダーバーを準備します。ヘッダーバーの要素に対して`「cb-header」`というclass名をつけます。

```html
<header class="cb-header header1">header1</header>
```
### 4. CSSを指定する

ヘッダーバーに付与したclass属性`「cb-header」`に対して、以下を指定します。ページを読み込んだ初期表示でヘッダーバーを非表示にしておきたい場合は`visibility: hidden;`を指定しておきます。

```css
.cb-header {
  position: fixed;
  left: 0;
  /*
    ページを読み込んだ初期表示でヘッダーバーを
    非表示にしておきたい場合は以下を指定
  */
  visibility: hidden;
}
```

### 5. プラグインを実行する

準備したヘッダーバーに対して、プラグインのメソッドを（ヘッダーバーより下の位置で）実行させます。

```JavaScript
// スクロールしてヘッダーバーを表示させる場合
$(".header1").cbSlideDownHeader();
```

```JavaScript
// スクロールしてヘッダーバーを隠す場合
$(".header1").cbSlideUpHeader();
```

## ＃プラグインのオプション


### ヘッダーバーの表示/非表示に関するオプション


<dl>
<dt>slidePoint {Number}</dt>
<dd>ヘッダーバーが表示/非表示のトリガーとなるスクロールの位置を指定します。この値を境にヘッダバーが現れたり、隠れたりするようになります。0以上の数値（ただしページの高さより小さい値）で指定します。デフォルト値は`0`。</dd>

<dt>headerClone {Boolean}</dt>
<dd>slideDownHeader()メソッドを適用させると、ヘッダーバーは初期状態では非表示となります。初期状態でも表示させておきたい場合は、このオプションをtureにします。ヘッダーバーを複製して、常に表示されるヘッダーバーを生成します。デフォルト値は`false`。</dd>

<dt>headroom {Boolean}</dt>
<dd>slideUpHeader()メソッド専用のオプションです。trueにした場合、ページを下にスクールするとヘッダバーが隠れ、上にスクロールすると現れるようになります。headroom.jsというプラグインと同じような動きを実現します。デフォルト値は`false`。</dd>
</dl>

### ヘッダーバーのスタイルに関するオプション

<dl>
<dt>headerBarHeight {Number}</dt>
<dd>表示/非表示の対象となるヘッダーバーの高さを指定します。指定した高さ分だけ隠れるようになります。0以上の数値（単位はpx)で指定します。デフォルト値は`ヘッダーバーの高さthis.$element.height()`。</dd>

<dt>headerBarWidth {String}</dt>
<dd>表示/非表示の対象となるヘッダーバーの幅を指定します。デフォルト値は`“100%”`となっており、基本はこのままでよいですが、念のため幅を変更できるようにしてあります。CSSのwidthプロパティに指定できる値で指定します。</dd>

<dt>zIndex {Number}</dt>
<dd>表示/非表示の対象となるヘッダーバーの重なり順を指定します。値が大きいほど上になります。CSSのz-indexプロパティに指定できる値で指定します。デフォルト値は`0`。</dd>

<dt>boxShadow {String}</dt>
<dd>表示/非表示の対象となるヘッダーバーに影をつけます。CSSのbox-shadowプロパティに指定できる値で指定します。デフォルト値は`“none”`。</dd>

<dt>opacity {Number or String}</dt>
<dd>表示/非表示の対象となるヘッダーバーの透明度を指定します。CSSのopacityプロパティに指定できる値で指定します。デフォルト値は`1`。</dd>
</dl>

### ヘッダーバーのアニメーションに関するオプション

<dl>
<dt>slideDownDuration {Number or String}</dt>
<dd>ヘッダーバーが現れるスピード（duration）を指定します。「”slow”」、「”normal”」、「”fast”」または数値（単位はミリ秒)で指定します。デフォルト値は`“noraml”`。</dd>

<dt>slideUpDuration {Number or String}</dt>
<dd>ヘッダーバーが隠れるスピード（duration）を指定します。「”slow”」、「”normal”」、「”fast”」または数値（単位はミリ秒)で指定します。デフォルト値は`“noraml”`。</dd>

<dt>slideDownEasing {String}</dt>
<dd>ヘッダーバーが現れる際のアニメーションの動作パターン（easing）を指定します。指定できる値は、「”swing”」か「”linear”」の2種類のみとなります。デフォルト値は`“swing”`。</dd>

<dt>slideUpEasing {String}</dt>
<dd>ヘッダーバーが隠れる際のアニメーションの動作パターン（easing）を指定します。指定できる値は、「”swing”」か「”linear”」の2種類のみとなります。デフォルト値は`“swing”`。</dd>
</dl>

### コールバック関数に関するオプション

<dl>
<dt>slideDownCallback {Function}</dt>
<dd>ヘッダーバーが現れた後に実行されるコールバック関数を指定します。デフォルト値は`function () {}`。</dd>

<dt>slideUpCallback {Function}
<dd>ヘッダーバーが隠れた後に実行されるコールバック関数を指定します。デフォルト値は`function () {}`。</dd>
</dl>

### 全画面表示に関するオプション

<dl>
<dt>fullscreenView {Boolean}</dt>
<dd>trueにすることで、ヘッダーバーともう一つの要素を利用して、全画面表示を実現します。デフォルト値は`false`。</dd>

<dt>header2SelectorName {String}</dt>
<dd>fullscreenViewをtrueにした場合、全画面表示に使われる要素のセレクター名を指定します。デフォルト値は`.cb-header2`。</dd>
</dl>


## #実装事例

ヘッダーバーを2つ用意し、cbSlideDownHeader()メソッドとcbSlideDownHeader()メソッドで相互に見え隠れさせる<br>
http://jsrun.it/maechabin/kyhg

ページを下にスクールすると隠れ、上にスクロールすると現れるヘッダバー<br>
http://jsrun.it/maechabin/3EnZ

全画面表示（その1）<br>
http://jsrun.it/maechabin/kGYH

ヘッダーバーを複製し、全画面表示（その2）<br>
http://jsrun.it/maechabin/sgJz

コールバック関数を指定<br>
http://jsrun.it/maechabin/4Sh1


## #ライセンス
MIT license

## #アップデート情報

### ver. 0.3.0
- headroomオプション追加
