window.gLocalAssetContainer["cardArea"] = function(g) { (function(exports, require, module, __filename, __dirname) {
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
exports.CardArea = void 0;
/**
 * カードエリア抽象クラス
 */
var CardArea = /** @class */ (function (_super) {
    __extends(CardArea, _super);
    /**
     * コンストラクタ
     * @param gameMain ゲーム画面
     * @param x 表示X位置
     * @param y 表示Y位置
     */
    function CardArea(gameMain, x, y) {
        var _this = this;
        // 初期化
        var scene = g.game.scene();
        _this = _super.call(this, {
            scene: scene,
            src: scene.asset.getImageById("nc276103"),
            x: x,
            y: y,
            width: 110,
            height: 165,
            srcX: 110 * 13,
            srcY: 165 * 3,
            parent: gameMain,
        }) || this;
        _this.list = [];
        // =============================
        // カードを重ねる
        // =============================
        _this.addCards = function (cards) {
            _this.list = _this.list.concat(cards);
        };
        // =============================
        // カードを取得する
        // =============================
        _this.cutCards = function (num) {
            _this.list = _this.list.slice(0, num);
        };
        // =============================
        // スコアを算出
        // =============================
        _this.getScore = function () {
            return 0;
        };
        return _this;
    }
    return CardArea;
}(g.Sprite));
exports.CardArea = CardArea;

})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}