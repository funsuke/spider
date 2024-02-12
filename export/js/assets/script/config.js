window.gLocalAssetContainer["config"] = function(g) { (function(exports, require, module, __filename, __dirname) {
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
exports.Config = void 0;
var Config = /** @class */ (function (_super) {
    __extends(Config, _super);
    /**
     * コンストラクタ
     * @param scene シーン
     */
    function Config(scene) {
        var _this = 
        // 初期化
        _super.call(this, {
            scene: scene,
            src: scene.asset.getImageById("volume"),
            width: 64,
            height: 64,
            x: g.game.width - 20 - 64,
            y: 10,
            frames: [0, 1],
            frameNumber: 0,
            touchable: true,
            parent: scene,
        }) || this;
        // =============================
        // 画像押下時処理
        // =============================
        _this.onPointDown.add(function (ev) {
            _this.frameNumber = 1 - _this.frameNumber;
            _this.modified();
            _this.bgmEvent();
        });
        _this.bgmEvent = function () { return; };
        return _this;
    }
    return Config;
}(g.FrameSprite));
exports.Config = Config;

})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}