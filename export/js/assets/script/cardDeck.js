window.gLocalAssetContainer["cardDeck"] = function(g) { (function(exports, require, module, __filename, __dirname) {
"use strict";
// import { ClsCard } from "./clsCard";
// import { ClsFields } from "./clsField";
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
exports.CardDeck = void 0;
var cardArea_1 = require("./cardArea");
/**
 * カード置き場クラス(山札)
 */
var CardDeck = /** @class */ (function (_super) {
    __extends(CardDeck, _super);
    /**
     * コンストラクタ
     * @param gameMain ゲーム画面
     * @param x 表示X位置
     * @param y 表示Y位置
     */
    function CardDeck(gameMain, x, y) {
        var _this = 
        // 初期化
        _super.call(this, gameMain, x, y) || this;
        _this.collisionArea = null;
        _this.isAddCards = function (cards) { return 0; };
        _this.getCards = function (x, y) { return null; };
        _this.touchable = true;
        // =============================
        // 位置を並べなおす
        // =============================
        _this.sortCards = function () {
            for (var i = 0; i < _this.list.length; i++) {
                var c = _this.list[i];
                c.x = _this.x;
                c.y = _this.y - (Math.floor(i / 10)) * 10;
                c.modified();
                gameMain.append(c);
            }
        };
        return _this;
    }
    return CardDeck;
}(cardArea_1.CardArea));
exports.CardDeck = CardDeck;

})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}