window.gLocalAssetContainer["saveData"] = function(g) { (function(exports, require, module, __filename, __dirname) {
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
exports.SaveData = void 0;
/**
 * セーブデータ
 */
var SaveData = /** @class */ (function (_super) {
    __extends(SaveData, _super);
    /**
     * コンストラクタ
     * @param scene シーン
     */
    function SaveData(scene, x, y) {
        var _this = 
        // 初期化
        _super.call(this, {
            scene: scene,
            src: scene.asset.getImageById("result"),
            width: 365,
            height: 500,
            x: x,
            y: y,
        }) || this;
        scene.append(_this);
        // ラベルパラメータ
        var paraLabel = {
            scene: scene,
            text: "0",
            font: scene.font,
            fontSize: 20,
            width: 320,
            textAlign: "right",
            widthAutoAdjust: false,
            parent: _this,
        };
        // ラベル 360 => 720-500 => 140
        paraLabel.y = 140;
        _this.lblPly = new g.Label(paraLabel);
        paraLabel.y += 90;
        _this.lblWin = new g.Label(paraLabel);
        paraLabel.y += 90;
        _this.lblMax = new g.Label(paraLabel);
        paraLabel.y += 90;
        _this.lblAve = new g.Label(paraLabel);
        return _this;
    }
    /**
     * セーブデータを計算して、ローカルストレージに保存する
     * @param flgClear クリアしたかどうか
     * @returns TypeSaveData セーブデータ
     */
    SaveData.prototype.calcSaveData = function (flgClear) {
        var saveData = { ply: 0, win: 0, max: 0, ave: 0 };
        var score = g.game.vars.gameState.score;
        // 取得
        saveData = this.getSaveData();
        if (saveData === null)
            return;
        // 計算
        saveData.ply += 1;
        if (flgClear) {
            saveData.win += 1;
            saveData.ave += (score - saveData.ave) / saveData.win;
        }
        if (score > saveData.max)
            saveData.max = score;
        // console.log("calcSaveData");
        // console.log(saveData);
        // 更新
        this.updateSaveData(saveData);
        // 保存
        this.setSaveData(saveData);
    };
    /**
     * 表示データの更新
     * @param saveData セーブデータ
     */
    SaveData.prototype.updateSaveData = function (saveData) {
        if (saveData === void 0) { saveData = null; }
        if (saveData === null) {
            saveData = this.getSaveData();
            if (saveData === null)
                return;
        }
        // セーブデータ
        this.lblPly.text = saveData.ply.toString() + "K";
        this.lblPly.invalidate();
        this.lblWin.text = "0%";
        if (saveData.ply !== 0) {
            this.lblWin.text = (Math.floor(saveData.win / saveData.ply * 10000) / 100).toString() + "%";
        }
        this.lblWin.invalidate();
        this.lblMax.text = saveData.max.toString() + "P";
        this.lblMax.invalidate();
        this.lblAve.text = Math.floor(saveData.ave).toString() + "P";
        this.lblAve.invalidate();
    };
    /**
     * セーブデータの取得
     * @returns TypeSaveData セーブデータ
     */
    SaveData.prototype.getSaveData = function () {
        var saveData = {
            ply: 0,
            win: 0,
            max: 0,
            ave: 0,
        };
        if (window.localStorage) {
            // console.log("getSaveDataでlocalStorageは使えます");
            var data = JSON.parse(localStorage.getItem("gm28806_saveData"));
            // console.log(data);
            if (data !== null)
                saveData = data;
        }
        else {
            // console.log("getSaveDataでlocalStorageは使えませんでした");
        }
        return saveData;
    };
    /**
     * セーブデータを保存する
     * @param saveData TypeSaveData セーブデータ
     */
    SaveData.prototype.setSaveData = function (saveData) {
        if (window.localStorage) {
            // console.log("setSaveDataでlocalStorageは使えます");
            var json = JSON.stringify(saveData, undefined, 1);
            // console.log(json);
            localStorage.setItem("gm28806_saveData", json);
        }
        else {
            // console.log("setSaveDataでlocalStorageは使えませんでした");
        }
    };
    return SaveData;
}(g.Sprite));
exports.SaveData = SaveData;

})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}