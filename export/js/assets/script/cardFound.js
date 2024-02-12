window.gLocalAssetContainer["cardFound"] = function(g) { (function(exports, require, module, __filename, __dirname) {
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
exports.CardFound = void 0;
var tl = require("@akashic-extension/akashic-timeline");
var cardArea_1 = require("./cardArea");
/**
 * カード置き場クラス(組札)
 */
var CardFound = /** @class */ (function (_super) {
    __extends(CardFound, _super);
    /**
     * コンストラクタ
     * @param gameMain ゲーム画面
     * @param x 表示X座標
     * @param y 表示Y座標
     */
    function CardFound(gameMain, x, y) {
        var _this = 
        // 初期化
        _super.call(this, gameMain, x, y) || this;
        _this.isAddCards = function (cards) { return 0; };
        _this.getCards = function (x, y) { return null; };
        _this.collisionArea = null;
        var scene = g.game.scene();
        var timeline = new tl.Timeline(scene);
        _this.hide();
        // =============================
        // 位置を並べなおす
        // =============================
        _this.sortCards = function () {
            var _loop_1 = function (i) {
                var c = _this.list[i];
                // 組札アニメーション
                timeline
                    .create(c)
                    .wait(100 * (_this.list.length - i))
                    .call(function () {
                    gameMain.append(c);
                })
                    .moveTo(_this.x, _this.y, 200);
            };
            for (var i = 0; i < _this.list.length; i++) {
                _loop_1(i);
            }
        };
        return _this;
    }
    return CardFound;
}(cardArea_1.CardArea));
exports.CardFound = CardFound;

})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}