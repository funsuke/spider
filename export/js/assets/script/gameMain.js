window.gLocalAssetContainer["gameMain"] = function(g) { (function(exports, require, module, __filename, __dirname) {
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
exports.GameMain = void 0;
var tl = require("@akashic-extension/akashic-timeline");
var card_1 = require("./card");
var cardDeck_1 = require("./cardDeck");
var cardField_1 = require("./cardField");
var cardFound_1 = require("./cardFound");
var GameMain = /** @class */ (function (_super) {
    __extends(GameMain, _super);
    /**
     * コンストラクタ
     */
    function GameMain(param) {
        var _this = this;
        // 初期化
        var scene = g.game.scene();
        _this = _super.call(this, { scene: scene, width: g.game.width, height: g.game.height, touchable: true }) || this;
        _this.mateState = 0;
        var timeline = new tl.Timeline(scene);
        // 山札置き場
        var deckArea = new cardDeck_1.CardDeck(_this, 1170, 550);
        // 組札置き場
        var foundAreas = [];
        for (var i = 0; i < 8; i++) {
            // const foundArea = new ClsFound(this, 1170, 40 * i + 100);
            var foundArea = new cardFound_1.CardFound(_this, g.game.width - 20 - card_1.Card.width / 2, 40 * i + 100);
            foundAreas.push(foundArea);
        }
        // 場札置き場
        var fieldAreas = [];
        for (var i = 0; i < 10; i++) {
            var fieldArea = new cardField_1.CardField(_this, 115 * i + 20, 10);
            _this.append(fieldArea);
            fieldAreas.push(fieldArea);
        }
        // =============================
        // ゲームの状態(詰み判定)
        // =============================
        _this.getMateState = function () {
            console.log("********gameMain::getMateState_in");
            var canMove = false;
            for (var i = 0; i < fieldAreas.length; i++) {
                console.log("fieldAreas.index = " + i);
                console.log("fieldAreas[i].list.length = " + fieldAreas[i].list.length);
                if (fieldAreas[i].list.length === 0)
                    continue;
                var lower = fieldAreas[i].getTopCardBlocLower();
                console.log("lower = " + lower);
                if (lower === 0)
                    return 0;
                for (var j = 1; j < fieldAreas.length; j++) {
                    console.log("----------------");
                    var dst = fieldAreas[(i + j) % fieldAreas.length];
                    var dstLen = dst.list.length;
                    var card = dst.list[dstLen - 1];
                    console.log("    dst.index = " + ((i + j) % fieldAreas.length));
                    console.log("    dst.list.length = " + dst.list.length);
                    if (dstLen === 0 || (card.isOpen && card.num === lower + 1)) {
                        if (dst.list.length > 0) {
                            console.log("    dst.list[dst.list.length - 1].num = " + dst.list[dst.list.length - 1].num);
                        }
                        canMove = true;
                        break;
                    }
                }
                if (canMove)
                    break;
            }
            // 一番上のカード束が全部場に付いた状態のとき詰み(山札を取らせる)
            var isNotPluralAll = true;
            var blocks = new Array(fieldAreas.length);
            for (var i = 0; i < fieldAreas.length; i++) {
                var src = fieldAreas[i];
                if (src.list.length === 0) {
                    blocks[i] = { upper: 0, lower: 0 };
                    continue;
                }
                blocks[i] = {
                    upper: src.list[src.list.length - 1].num,
                    lower: src.getTopCardBlocLower(),
                };
                if (src.list.length > blocks[i].lower - blocks[i].upper + 1) {
                    isNotPluralAll = false;
                }
            }
            // A～Kが消せるとき
            var blockExists = function (srcB, idx) {
                console.log("srcIdx = " + idx);
                console.log("srcU = " + srcB.upper);
                console.log("srcL = " + srcB.lower);
                var retIdx = -1;
                for (var i = 1; i < fieldAreas.length; i++) {
                    console.log("--------");
                    var dstIdx = (idx + i) % fieldAreas.length;
                    var dstB = blocks[dstIdx];
                    console.log("    dstIdx = " + dstIdx);
                    console.log("    dstU   = " + dstB.upper);
                    console.log("    dstL   = " + dstB.lower);
                    if (srcB.upper < dstB.upper && dstB.upper <= srcB.lower + 1 && dstB.lower > srcB.lower) {
                        retIdx = dstIdx;
                        break;
                    }
                }
                return retIdx;
            };
            var idx = -1;
            for (var i = 0; i < fieldAreas.length; i++) {
                if (blocks[i].upper !== 1)
                    continue;
                idx = i;
                while (idx >= 0) {
                    if (blocks[idx].lower === 13)
                        break;
                    idx = blockExists(blocks[idx], idx);
                }
                if (idx >= 0 && blocks[idx].lower === 13)
                    break;
            }
            // 動かせない場合
            console.log("canMove = " + canMove);
            console.log("isNotPluralAll = " + isNotPluralAll);
            console.log("idx = " + idx);
            if ((!canMove || isNotPluralAll) && idx < 0) {
                // 山札がない場合、完全詰み(GameOver)
                if (deckArea.list.length === 0)
                    return 2;
                // 山札がある場合、詰み
                return 1;
            }
            // まだ動かせる場合
            return 0;
        };
        // =============================================================
        // ここから実際の処理開始
        // =============================================================
        // カード作成
        var cards = [];
        // for (let i = 0; i < 8; i++) {
        // 	for (let j = 1; j <= 13; j++) {
        // 		const c = new Card(this, 3, j, 0, 0);
        // 		cards.push(c);
        // 	}
        // }
        // シャッフル edit by funsuke 2023.4.16
        // for (let i = cards.length - 1; i >= 0; i--) {
        // 	const j = Math.floor(g.game.random.generate() * (i + 1));
        // 	[cards[i], cards[j]] = [cards[j], cards[i]];
        // }
        var cardNum = card_1.Card.getNumbers(param);
        //
        console.log("cardNum-----------------");
        for (var i = 0; i < 10; i++) {
            console.log.apply(console, cardNum.slice(10 * i, 10 * i + 10));
        }
        console.log.apply(console, cardNum.slice(100));
        //
        for (var i = 0; cardNum.length; i++) {
            var c = new card_1.Card(_this, cardNum.pop(), 0, 0);
            cards.push(c);
        }
        // 山札にセット
        deckArea.addCards(cards);
        deckArea.sortCards();
        // 移動(表示は更新しない)定義
        var stack = [];
        var move = function (srcArea, dstArea, num) {
            var p = dstArea.list.length;
            dstArea.addCards(srcArea.list.slice(num));
            srcArea.cutCards(num);
            stack.push({ srcArea: dstArea, dstArea: srcArea, num: p });
        };
        // 場札に配る（最初の処理)
        while (deckArea.list.length > 104 - 54) {
            fieldAreas.forEach(function (area, i) {
                if (!(deckArea.list.length > 104 - 54))
                    return;
                move(deckArea, area, deckArea.list.length - 1);
            });
        }
        // 積んでるか確認
        _this.mateState = _this.getMateState();
        // 場札ソート
        fieldAreas.forEach(function (area, i) {
            area.sortCards();
            area.list.slice(-1)[0].open(true);
        });
        // =============================
        // 場札に配るイベント
        // =============================
        deckArea.onPointDown.add(function () {
            if (!scene.isStart)
                return;
            // 空白の列を避ける del by funsuke 2023.04.16
            // if (fieldAreas.some((area) => area.list.length === 0)) {
            // 	scene.playSound("se_miss");
            // 	return;
            // }
            // 各列に配る
            fieldAreas.forEach(function (area) {
                if (!deckArea.list.length)
                    return;
                move(deckArea, area, deckArea.list.length - 1);
                area.list.slice(-1)[0].open(true);
                area.sortCards();
            });
            // 動かすのに成功
            scene.playSound("se_move");
            setScore();
            gameClear();
            // アニメーション
            timeline.create(_this).wait(200).call(function () {
                if (autoMove()) {
                    setScore();
                    gameClear();
                }
            });
            // 積んでるかどうか
            _this.mateState = _this.getMateState();
            console.log("deckArea::onPointDown mateState=" + _this.mateState);
        });
        // =============================
        // 揃っているかどうかの確認と移動
        // =============================
        var compCnt = 0;
        var autoMove = function () {
            var retFlg = false;
            var _loop_1 = function (i) {
                var area = fieldAreas[i];
                var num = area.getCompCardPos();
                if (num !== -1) {
                    move(area, foundAreas[compCnt], num);
                    if (area.list.length) {
                        timeline.create(_this).wait(1300).call(function () {
                            area.sortCards();
                            // ここでエラー何もないのにopenしようとした
                            if (area.list.length) {
                                area.list.slice(-1)[0].open(true);
                            }
                        });
                    }
                    foundAreas[compCnt].sortCards();
                    compCnt++;
                    retFlg = true;
                }
            };
            for (var i = 0; i < fieldAreas.length; i++) {
                _loop_1(i);
            }
            // 詰んでるか確認
            _this.mateState = _this.getMateState();
            console.log("gameMain::autoMove mateState=" + _this.mateState);
            return retFlg;
        };
        // =============================
        // スコア集計
        // =============================
        var setScore = function () {
            var score = 0;
            fieldAreas.forEach(function (area) {
                score += area.getScore();
            });
            score += Math.pow(13, 2) * compCnt * 100;
            scene.addScore(score - g.game.vars.gameState.score);
        };
        // =============================
        // クリア判定とクリア処理
        // =============================
        var gameClear = function () {
            if (compCnt < 8)
                return;
            // クリア処理
            scene.playSound("se_clear");
            scene.isClear = true;
        };
        // =============================
        // 移動処理まとめ(場札間移動)
        // =============================
        var moveSub = function (srcArea, dstArea, cardsNum) {
            move(srcArea, dstArea, cardsNum);
            srcArea.sortCards();
            dstArea.sortCards();
            if (srcArea.list.length)
                srcArea.list.slice(-1)[0].open(true);
            setScore();
            gameClear();
            // アニメーション
            timeline.create(_this).wait(200).call(function () {
                if (autoMove()) {
                    setScore();
                    gameClear();
                }
            });
            scene.playSound("se_move");
        };
        // =============================
        // 場札のカードのタッチ処理
        // =============================
        // let bkCards: { num: number; cards: ClsCard[] } = null;
        // let bkArea: ClsField = null;
        _this.onPointDown.add(function (ev) {
            if (!scene.isStart)
                return;
            // bkCards = null;
            // bkArea = null;
            var isMoved = false;
            // 元ダブルクリック時処理
            for (var i = 0; i < fieldAreas.length; i++) {
                var srcArea = fieldAreas[i];
                // 動かそうとしているカード(複数)の取得
                var cards_1 = srcArea.getCards(ev.point.x, ev.point.y);
                if (!cards_1)
                    continue;
                var moveArea = null;
                var moveSpaceArea = null;
                for (var j = 1; j < fieldAreas.length; j++) {
                    var dstArea = fieldAreas[(i + j) % fieldAreas.length];
                    var isAddPattern = dstArea.isAddCards(cards_1.cards);
                    if (isAddPattern === 1) { // カードの上に乗せられる場合
                        if (cards_1.cards.length + dstArea.getCompCardNum() === 13) {
                            moveSub(srcArea, dstArea, cards_1.num);
                            isMoved = true;
                            break;
                        }
                        if (moveArea === null) {
                            moveArea = dstArea;
                        }
                    }
                    else if (isAddPattern === 2 && moveSpaceArea === null) { // 空き場
                        moveSpaceArea = dstArea;
                    }
                }
                // まだ動かしていない場合
                if (!isMoved) {
                    // 場札カードの上に置ける場合
                    if (moveArea !== null) {
                        moveSub(srcArea, moveArea, cards_1.num);
                        _this.mateState = _this.getMateState();
                    }
                    else if (moveSpaceArea !== null) {
                        // 場札空白に置ける場合
                        moveSub(srcArea, moveSpaceArea, cards_1.num);
                        _this.mateState = _this.getMateState();
                    }
                    else {
                        // ミス
                        scene.playSound("se_miss");
                    }
                }
                break;
            }
            // ドラッグしようとする処理 del by funsuke 2023.4.16
        });
        // マウス移動処理 del by funsuke 2023.4.16
        // 離す処理 del by funsuke 2023.4.16
        // スコア処理
        scene.setTimeout(function () {
            setScore();
        }, 200);
        return _this;
    }
    return GameMain;
}(g.E));
exports.GameMain = GameMain;

})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}