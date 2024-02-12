window.gLocalAssetContainer["sceneGame"] = function(g) { (function(exports, require, module, __filename, __dirname) {
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
exports.SceneGame = void 0;
var tl = require("@akashic-extension/akashic-timeline");
var button_1 = require("./button");
var config_1 = require("./config");
var gameMain_1 = require("./gameMain");
var saveData_1 = require("./saveData");
/**
 * シーン
 */
var SceneGame = /** @class */ (function (_super) {
    __extends(SceneGame, _super);
    /**
     * コンストラクタ
     * @param param ゲームパラメータ
     */
    function SceneGame(param) {
        var _this = 
        // 初期化
        _super.call(this, {
            game: g.game,
            assetIds: [
                "title", "nc298326",
                "nc276103", "imgCard",
                "number", "number_red", "glyph",
                "score", "time", "start", "undo",
                "result",
                "se_start", "se_timeUp",
                "se_move", "se_miss", "se_clear",
                "nc169036",
                "volume",
                "cheat", "attention",
            ],
        }) || this;
        _this.isDebug = false;
        _this.isStart = false;
        _this.font = null;
        _this.timeLimit = 180; // 制限時間(180秒)
        _this.time = _this.timeLimit;
        _this.boardId = 1;
        _this.saveData = null;
        _this.layer0 = null;
        _this.bgmPlayer = null;
        _this.isCheat = false;
        _this.timeLine = new tl.Timeline(_this);
        var version = "ver. 1.00";
        _this.isClear = false;
        // 市場コンテンツのランキングモードでは、g.game.vars.gameState.score の値をスコアとして扱います
        g.game.vars.gameState = { score: 0 };
        /**
         * シーン読み込み時処理
         */
        _this.onLoad.add(function () {
            // -----------------------------
            // ビットマップフォント
            // -----------------------------
            // ビットマップフォント(黒)を生成
            _this.font = new g.BitmapFont({
                src: _this.asset.getImageById("number"),
                glyphInfo: JSON.parse(_this.asset.getTextById("glyph").data),
            });
            // -----------------------------
            // BGM再生
            // -----------------------------
            var bgm = _this.asset.getAudioById("nc298326");
            _this.bgmPlayer = bgm.play();
            _this.bgmPlayer.changeVolume(_this.isDebug ? 0.0 : 0.2);
            // -----------------------------
            // 背景
            // -----------------------------
            new g.FilledRect({
                scene: _this,
                width: g.game.width,
                height: g.game.height,
                cssColor: "#600000",
                parent: _this,
                opacity: _this.isDebug ? 1.0 : 0.9,
            });
            // レイヤー0
            _this.layer0 = new g.E({ scene: _this, parent: _this, });
            // -----------------------------
            // タイトル
            // -----------------------------
            var title = new g.Sprite({ scene: _this, src: _this.asset.getImageById("title") });
            _this.append(title);
            // タイトルアニメーション
            _this.timeLine
                .create(title)
                .wait(_this.isDebug ? 1000 : 3000)
                .moveBy(-1280, 0, 200)
                .call(function () {
                _this.sceneMain(param);
            });
            // -----------------------------
            // バージョン情報
            // -----------------------------
            // フォント
            var font = new g.DynamicFont({
                game: g.game,
                fontFamily: "monospace",
                size: 24,
            });
            new g.Label({
                scene: _this,
                font: font,
                fontSize: 24,
                text: version,
                textColor: "white",
                parent: title,
            });
            // -----------------------------
            // コンフィグ
            // -----------------------------
            var config = new config_1.Config(_this);
            config.bgmEvent = function () {
                if (!_this.isDebug) {
                    if (config.frameNumber === 0) {
                        _this.bgmPlayer.changeVolume(0.2);
                    }
                    else {
                        _this.bgmPlayer.changeVolume(0.0);
                    }
                }
            };
            // -----------------------------
            // セーブデータ表示用ラベル
            // -----------------------------
            _this.saveData = new saveData_1.SaveData(_this, 0, g.game.height - 500);
            title.append(_this.saveData);
            _this.saveData.updateSaveData();
        });
        _this.addScore = function (score) { return; };
        _this.reset = function () { return; };
        return _this;
    }
    /**
     * 効果音を先生する
     * @param name 再生するアセットID
     */
    SceneGame.prototype.playSound = function (name) {
        this.asset.getAudioById(name).play().changeVolume(0.8);
    };
    /**
     * メインシーン
     * @param param ゲームメインパラメータ
     */
    SceneGame.prototype.sceneMain = function (param) {
        var _this = this;
        // メインゲーム
        var gameMain = new gameMain_1.GameMain(param);
        // -----------------------------
        // ビットマップフォント(赤)を生成
        // -----------------------------
        var fontRed = new g.BitmapFont({
            src: this.asset.getImageById("number_red"),
            glyphInfo: JSON.parse(this.asset.getTextById("glyph").data),
        });
        // -----------------------------
        // スコア
        // -----------------------------
        new g.Sprite({
            scene: this,
            src: this.asset.getImageById("score"),
            width: 192,
            height: 64,
            x: 340,
            y: 650,
            parent: this,
        });
        // スコア表示用ラベル
        var lblScore = new g.Label({
            scene: this,
            text: "0p",
            font: this.font,
            fontSize: 32,
            x: 450,
            y: 650,
            width: 450,
            widthAutoAdjust: false,
            textAlign: "right",
            parent: this
        });
        // -----------------------------
        // 残り時間
        // -----------------------------
        new g.Sprite({
            scene: this,
            src: this.asset.getImageById("time"),
            x: 1020,
            y: 645,
            parent: this,
        });
        // 残り時間表示用ラベル
        var lblTime = new g.Label({
            scene: this,
            text: "0",
            font: this.font,
            fontSize: 32,
            x: 1100,
            y: 650,
            parent: this,
        });
        // -----------------------------
        // UNDO
        // -----------------------------
        // scene.sprUndo = new g.FrameSprite({
        // 	scene: scene,
        // 	src: scene.asset.getImageById("undo"),
        // 	width: 200,
        // 	height: 70,
        // 	x: 20,
        // 	y: 640,
        // 	frames: [0, 1],
        // 	touchable: true,
        // 	parent: scene,
        // });
        // -----------------------------
        // 赤点滅用
        // -----------------------------
        var rctFg = new g.FilledRect({
            scene: this,
            width: g.game.width,
            height: g.game.height,
            cssColor: "red",
            opacity: 0,
            parent: this,
        });
        // -----------------------------
        // スタート・終了表示用
        // -----------------------------
        var sprState = new g.FrameSprite({
            scene: this,
            src: this.asset.getImageById("start"),
            width: 800,
            height: 250,
            anchorX: 0.5,
            anchorY: 0.5,
            x: g.game.width / 2,
            y: g.game.height / 2,
            frames: [0, 1],
            frameNumber: 0,
            parent: this,
        });
        var fontClear = new g.DynamicFont({
            game: g.game,
            fontFamily: "monospace",
            size: 50,
            fontWeight: "bold",
            fontColor: "white",
        });
        var lblClear = new g.Label({
            scene: this,
            text: "",
            font: fontClear,
            fontSize: 50,
            y: 270,
            width: 800,
            textAlign: "center",
            widthAutoAdjust: false,
            parent: sprState,
        });
        // -----------------------------
        // 山札をクリック！アニメーション
        // -----------------------------
        var sprAttention = new g.FrameSprite({
            scene: this,
            src: this.asset.getImageById("attention"),
            x: 1175,
            y: g.game.height - 200,
            width: 100,
            height: 100,
            srcWidth: 100,
            srcHeight: 100,
            frames: [0, 1, 2, 3, 4],
            interval: 1000 / g.game.fps * 5,
            loop: true,
            parent: this,
        });
        sprAttention.hide();
        sprAttention.start();
        // -----------------------------
        // アツマール処理
        // -----------------------------
        var btnExtend = new button_1.Button(this, ["継続"], 1000, 280, 260);
        var btnReset = new button_1.Button(this, ["リセット"], 1000, 520, 260);
        var btnRanking = new button_1.Button(this, ["ランキング"], 1000, 400, 260);
        if (this.isDebug) {
            // 継続ボタン
            btnExtend.modified();
            this.append(btnExtend);
            btnExtend.pushEvent = function () {
                _this.saveData.hide();
                _this.isStart = true;
                sprState.hide();
                rctFg.opacity = 0;
                btnReset.hide();
                btnRanking.hide();
                btnExtend.hide();
            };
            // リセットボタン
            btnReset.modified();
            this.append(btnReset);
            btnReset.pushEvent = function () {
                _this.reset();
            };
            // ランキングボタン
            btnRanking.modified();
            this.append(btnRanking);
            btnRanking.pushEvent = function () {
                window.RPGAtsumaru.scoreboards.display(_this.boardId);
            };
        }
        ;
        // =============================
        // updateHandler
        // =============================
        var isSoundPlayed = true;
        var updateHandler = function () {
            // -----------------------------
            // 詰み状態の判定
            // -----------------------------
            if (gameMain.mateState !== 0) {
                // 完全詰みの場合
                if (gameMain.mateState === 2) {
                    ;
                }
                else {
                    // 詰みの場合
                    sprAttention.show();
                }
                if (!isSoundPlayed && !_this.isClear) {
                    _this.playSound("nc169036");
                    isSoundPlayed = true;
                }
            }
            else {
                // 隠す
                sprAttention.hide();
                isSoundPlayed = false;
            }
            // -----------------------------
            // ゲームエンド確定状態
            // -----------------------------
            if ((_this.time < 0 || _this.isClear) && _this.isStart) {
                // ボタン表示メソッド
                var showButton = function () {
                    btnReset.show();
                    btnRanking.show();
                    if (!_this.isClear) {
                        btnExtend.show();
                    }
                };
                // スコアに残り秒を足す
                if (_this.isClear) {
                    _this.addScore(Math.ceil(_this.time));
                }
                // セーブデータ表示
                _this.append(_this.saveData);
                if (g.game.vars.gameState.score !== 0) {
                    _this.saveData.calcSaveData(_this.isClear ? true : false);
                }
                if (!_this.isCheat) {
                    _this.saveData.show();
                }
                // アツマール避難所対応
                window.RPGAtsumaru.scoreboards
                    .setRecord(1, g.game.vars.gameState.score).
                    then(function () { window.RPGAtsumaru.scoreboards.display(1); });
                // アツマール処理
                // this.setTimeout(() => {
                // 	if (param.isAtsumaru) {
                // 		window.RPGAtsumaru.scoreboards.setRecord(this.boardId, g.game.vars.gameState.score).then(() => {
                // 			showButton();
                // 		});
                // 	}
                // 	if (this.isDebug) {
                // 		showButton();
                // 	}
                // }, 500);
                // 終了表示
                sprState.frameNumber = 1;
                sprState.x = g.game.width / 2;
                sprState.modified();
                sprState.show();
                // クリア
                lblClear.text = _this.isClear ? "クリア! 残り" + Math.ceil(_this.time) + "秒" : "";
                lblClear.invalidate();
                // FrontGround
                rctFg.cssColor = "black";
                rctFg.opacity = 0.3;
                rctFg.modified();
                //
                _this.isStart = false;
            }
            // 更新の停止
            if (_this.time < 0) {
                _this.onUpdate.remove(updateHandler);
                _this.playSound("se_timeUp");
            }
            // カウントダウン処理
            _this.time -= 1 / g.game.fps;
            lblTime.text = "" + Math.ceil(_this.time);
            lblTime.invalidate();
            // ラスト5秒の点滅
            if (_this.time <= 5 && !_this.isClear) {
                rctFg.opacity = (_this.time - Math.floor(_this.time)) / 3;
                rctFg.modified();
            }
        };
        // =============================
        // スコア追加
        // =============================
        this.addScore = function (score) {
            if (score === 0)
                return;
            if (!_this.isStart)
                return;
            var s = g.game.vars.gameState.score - Math.pow(13, 2) * 8 * 100;
            // if (s > 180 || (s > 0 && s <= 180 && score >= 100)) {
            // 	this.isCheat = true;
            // 	g.game.vars.gameState.score = 0;
            // 	new g.Sprite({
            // 		scene: this,
            // 		src: this.asset.getImageById("cheat"),
            // 		parent: this,
            // 	});
            // 	return;
            // }
            g.game.vars.gameState.score += score;
            // スコアアップアニメーション
            _this.timeLine.create(_this).every(function (e, p) {
                lblScore.text = "" + (g.game.vars.gameState.score - Math.floor(score * (1 - p))) + "P";
                lblScore.invalidate();
            }, 500);
            // 追加スコア表示用ラベル
            var label = new g.Label({
                scene: _this,
                text: (score >= 0 ? "+" : "") + score,
                font: fontRed,
                fontSize: 32,
                x: 200,
                y: 580,
                width: 610,
                widthAutoAdjust: false,
                textAlign: "right",
                opacity: 0.0,
                parent: _this,
            });
            // 追加スコアアニメーション
            _this.timeLine
                .create(label).every(function (e, p) {
                label.opacity = p;
            }, 100)
                .wait(500)
                .call(function () {
                label.destroy();
            });
        };
        // =============================
        // リセット処理
        // =============================
        this.reset = function () {
            // うんこ
            sprAttention.hide();
            // チートフラグ
            _this.isCheat = false;
            // クリアフラグ
            _this.isClear = false;
            // 個人成績
            _this.saveData.hide();
            // ゲーム画面1
            gameMain.destroy();
            gameMain = new gameMain_1.GameMain(param);
            _this.layer0.append(gameMain);
            // タイマー
            _this.time = _this.timeLimit;
            lblTime.text = "" + _this.time;
            lblTime.invalidate();
            // クリア
            lblClear.text = "";
            lblClear.invalidate();
            // スコア
            g.game.vars.gameState.score = 0;
            lblScore.text = "0";
            lblScore.invalidate();
            // スタートエンド
            sprState.frameNumber = 0;
            sprState.x = g.game.width / 2;
            sprState.modified();
            sprState.show();
            _this.setTimeout(function () {
                sprState.hide();
            }, 1000);
            _this.playSound("se_start");
            // 各種ボタン
            btnExtend.hide();
            btnReset.hide();
            btnRanking.hide();
            // FrontGround
            rctFg.opacity = 0;
            rctFg.cssColor = "red";
            rctFg.modified();
            // 更新イベント
            _this.onUpdate.remove(updateHandler);
            _this.onUpdate.add(updateHandler);
            //
            _this.isStart = true;
        };
        // 初回リセット
        this.reset();
    };
    return SceneGame;
}(g.Scene));
exports.SceneGame = SceneGame;

})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}