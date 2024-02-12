window.gLocalAssetContainer["button"] = function(g) { (function(exports, require, module, __filename, __dirname) {
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Button = void 0;
/**
 * ボタンクラス
 */
var Button = /** @class */ (function (_super) {
    __extends(Button, _super);
    /**
     * コンストラクタ
     * @param scene シーン
     * @param s 表示文字列
     * @param x 表示X位置
     * @param y 表示Y位置
     * @param w 表示幅
     * @param h 表示高さ
     */
    function Button(scene, s, x, y, w, h) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (w === void 0) { w = 200; }
        if (h === void 0) { h = 100; }
        var _this = 
        // -----------------------------
        // 親クラス(ボタン周りの線の色：黒)
        // -----------------------------
        _super.call(this, {
            scene: scene,
            cssColor: "black",
            width: w,
            height: h,
            x: x,
            y: y,
            touchable: true,
        }) || this;
        _this.num = 0;
        //
        _this.chkEnable = function (ev) { return true; };
        // -----------------------------
        // フォントの設定
        // -----------------------------
        if (Button.font == null) {
            Button.font = new g.DynamicFont({
                game: g.game,
                fontFamily: "monospace",
                size: 48,
            });
        }
        // -----------------------------
        // ベースの色(白)
        // -----------------------------
        var base = new g.FilledRect({
            scene: scene,
            x: 2, y: 2,
            width: w - 4, height: h - 4,
            cssColor: "white",
        });
        _this.append(base);
        // -----------------------------
        // ラベル実体
        // -----------------------------
        _this.label = new g.Label({
            scene: scene,
            font: Button.font,
            text: s[0],
            fontSize: 48,
            textColor: "black",
            widthAutoAdjust: false,
            textAlign: "center",
            width: w - 4,
        });
        _this.label.y = (h - 4 - _this.label.height) / 2;
        _this.label.modified();
        base.append(_this.label);
        // =============================
        // ポイントダウンイベント
        // =============================
        _this.onPointDown.add(function (ev) {
            if (!_this.chkEnable(ev))
                return;
            // 灰色にする
            base.cssColor = "gray";
            base.modified();
            // 文字列が2つ以上の場合それに変更
            if (s.length !== 1) {
                _this.num = (_this.num + 1) % s.length;
                _this.label.text = s[_this.num];
                _this.label.invalidate();
            }
        });
        // =============================
        // ポイントアップイベント
        // =============================
        _this.onPointUp.add(function (ev) {
            // 白色にする
            base.cssColor = "white";
            base.modified();
            // プッシュイベントを実行
            _this.pushEvent(ev);
        });
        return _this;
    }
    return Button;
}(g.FilledRect));
exports.Button = Button;

})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}