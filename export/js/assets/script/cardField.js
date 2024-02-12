window.gLocalAssetContainer["cardField"] = function(g) { (function(exports, require, module, __filename, __dirname) {
"use strict";
// import { Timeline } from "@akashic-extension/akashic-timeline";
// import { ClsCard } from "./clsCard";
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
exports.CardField = void 0;
// /**
//  * 場札クラス
//  */
// export class ClsField {
// 	/**
// 	 * プロパティ
// 	 */
// 	private static _left: number = 20;
// 	private static _top: number = 10;
// 	private static _marginY: number = 10;
// 	private static _fMarginY: number = 40;
// 	private idx: number;
// 	private left: number;
// 	private top: number;
// 	private cards: ClsCard[];
// 	private tl: Timeline;
// 	/**
// 	 * コンストラクタ
// 	 * @param scene g.Scene シーン
// 	 * @param idx number インデックス
// 	 */
// 	constructor(scene: g.Scene, idx: number) {
// 		// 初期化
// 		this.idx = idx;
// 		this.left = ClsField._left + (ClsCard.width / 2) + ClsCard.width * idx;
// 		this.top = ClsField._top;
// 		this.cards = new Array<ClsCard>();
// 		this.tl = new Timeline(scene);
// 	}
// 	/**
// 	 * カードを積む
// 	 * @param clsCard ClsCard
// 	 */
// 	stackCard(card: ClsCard): void {
// 		console.log("ClsField::stackCard_in");
// 		// カードを積む
// 		this.cards.push(card);
// 		card.x = this.left;
// 		card.y = this.top;
// 		card.idxInField = this.cards.length - 1;
// 		if (this.cards.length > 1) {
// 			if (this.cards[this.cards.length - 2].isFront) {
// 				card.setXY(ClsCard.width / 2, ClsField._fMarginY);
// 			} else {
// 				card.setXY(ClsCard.width / 2, ClsField._marginY);
// 			}
// 			this.cards[this.cards.length - 2].appendClass(card);
// 		} else {
// 			card.setSceneXY(this.left, this.top);
// 		}
// 		// 裏表の処理
// 		if (card.isFront) {
// 			this.top += ClsField._fMarginY;
// 		} else {
// 			this.top += ClsField._marginY;
// 		}
// 		// 指定値を超えた場合カードを詰める
// 		if (this.top + ClsCard.height > g.game.height - 10) {
// 			// カードアニメーション
// 			this.makeMinifyAnim();
// 		}
// 		console.log("ClsField::stackCard_out");
// 	}
// 	/**
// 	 * カードを表示する
// 	 */
// 	show(): void {
// 		this.cards.forEach(ele => {
// 			ele.show();
// 		});
// 	}
// 	/**
// 	 * x,y取得
// 	 */
// 	get x(): number {
// 		return this.left;
// 	}
// 	get y(): number {
// 		return this.top;
// 	}
// 	/**
// 	 * 一番上のカードを開く
// 	 * @returns ClsCard | null 開いたカード(無し:null)
// 	 */
// 	openFrontCard(): ClsCard | null {
// 		console.log("ClsField::openFrontCard_in");
// 		const l: number = this.cards.length;
// 		console.log("length = " + l);
// 		if (l <= 0) return null;
// 		console.log("card = " + this.cards[l - 1]);
// 		if (this.cards[l - 1].isFront) return null;
// 		this.cards[l - 1].open();
// 		console.log("ClsField::openFrontCard_out");
// 		return this.cards[l - 1];
// 	}
// 	/**
// 	 * 配列から削除
// 	 * @param idx カードのインデックス
// 	 */
// 	removeCards(idx: number): void {
// 		console.log("ClsField::removeCards_in");
// 		console.log("idx=" + idx);
// 		console.log("length=" + this.cards.length);
// 		const num: number = this.cards.length - idx;
// 		this.cards.splice(idx, num);
// 		this.top -= ClsField._fMarginY * num;
// 		console.log("num=" + num);
// 		console.log("top=" + this.top);
// 		console.log("ClsField::removeCards_in");
// 	}
// 	// =============================
// 	// カードを詰めるアニメーション
// 	// =============================
// 	makeMinifyAnim(): void {
// 		// 表のカードの数を取得
// 		let firstTop: number = 0;
// 		let firstIdx: number = 0;
// 		let frontNum: number = 0;
// 		this.cards.forEach((ele, idx) => {
// 			if (ele.isFront) {
// 				if (firstTop === 0) {
// 					firstIdx = idx;
// 					firstTop = ele.y;
// 				}
// 				++frontNum;
// 			}
// 		});
// 		// マージンの計算
// 		const mY: number = ((g.game.width - 10 - ClsCard.height) - firstTop) / (frontNum - 1);
// 		// アニメーション
// 		for (let i = firstIdx + 1; i < this.cards.length; i++) {
// 			const y: number = firstTop + mY * (i - firstIdx);
// 			this.tl.create(this.cards[i]).moveY(y, 1000);
// 		}
// 	}
// 	/**
// 	 * 最初のカードの数
// 	 */
// 	get frontNum(): number {
// 		if (this.cards.length) return this.cards[this.cards.length - 1].num;
// 		return 13;	// 場札がない場合はKを置くのに都合良し
// 	}
// 	/**
// 	 * カード枚数
// 	 */
// 	get length(): number {
// 		return this.cards.length;
// 	}
// }
// /**
//  * 場札クラス
//  */
// export class ClsFields {
// 	/**
// 	 * プロパティ
// 	 */
// 	// private static sprLayer: g.E;
// 	public static len: number = 10;
// 	private fields: ClsField[];
// 	/**
// 	 * コンストラクタ
// 	 * @param scene g.Scene シーン
// 	 * @param cards カードクラス(複数)
// 	 */
// 	constructor(scene: g.Scene, cards: ClsCard[]) {
// 		// 初期化
// 		this.fields = new Array<ClsField>(ClsFields.len);
// 		for (let i = 0; i < this.fields.length; i++) {
// 			this.fields[i] = new ClsField(scene, i);
// 		}
// 		// カードを積む
// 		for (let i = 0; i < 44; i++) {
// 			this.fields[i % 10].stackCard(cards.shift() as ClsCard);
// 		}
// 		// 表示
// 		this.fields.forEach(ele => {
// 			ele.show();
// 			console.log(ele);
// 		});
// 		// レイヤー
// 		// ClsFields.sprLayer = spriteLayer(scene);
// 	}
// 	/**
// 	 * 場札クラスの取得
// 	 * @param idx 場札クラスのインデックス
// 	 * @returns ClsField 場札クラス
// 	 */
// 	getField(idx: number): ClsField {
// 		return this.fields[idx];
// 	}
// 	/**
// 	 * 置ける場札のクラス番号を取得
// 	 * @param idx number 現在のフィールドのインデックス
// 	 * @param num number カードの数
// 	 * @returns number 置けるインデックス(0~9 無い場合-1)
// 	 */
// 	public canMoveIdx(idx: number, num: number): number {
// 		let retIdx: number = -1;
// 		let findSpaceIdx: number = -1;
// 		// 探査
// 		for (let i = 1; i < ClsFields.len; i++) {
// 			const searchIdx: number = (idx + i) % ClsFields.len;
// 			const searchField: ClsField = this.fields[searchIdx];
// 			// 乗せられる場所がある場合、取得し探査を終了
// 			if (searchField.frontNum === num + 1) {
// 				retIdx = searchIdx;
// 				break;
// 			}
// 			// 最初の空き場所を取得
// 			if (searchField.frontNum === 13 && findSpaceIdx === -1) {
// 				findSpaceIdx = searchIdx;
// 			}
// 		}
// 		// 乗せられる場所がなく空き場所がある場合、返り値に空き場所を設定
// 		if (retIdx === -1 && findSpaceIdx !== -1) {
// 			retIdx = findSpaceIdx;
// 		}
// 		return retIdx;
// 	}
// }
var tl = require("@akashic-extension/akashic-timeline");
var cardArea_1 = require("./cardArea");
/**
 * カード置き場クラス(場)
 */
var CardField = /** @class */ (function (_super) {
    __extends(CardField, _super);
    /**
     * コンストラクタ
     * @param gameMain ゲーム画面
     * @param x 表示X座標
     * @param y 表示Y座標
     */
    function CardField(gameMain, x, y) {
        var _this = 
        // 初期化
        _super.call(this, gameMain, x, y) || this;
        var scene = g.game.scene();
        var timeline = new tl.Timeline(scene);
        // -----------------------------
        // 衝突判定
        // -----------------------------
        _this.collisionArea = new g.FilledRect({
            scene: scene,
            width: 5,
            height: 720,
            x: (_this.width - 5) / 2 + _this.x,
            y: 0,
            cssColor: "yellow",
            opacity: 0.0,
            parent: gameMain,
        });
        // =============================
        // カードを重ねられるかどうか
        // =============================
        _this.isAddCards = function (cards) {
            if (!_this.list.length) {
                return 2; // 空き場
            }
            else {
                var lastCard = _this.list.slice(-1)[0];
                var card = cards[0];
                if (card.num + 1 === lastCard.num) {
                    return 1; // カードの上に乗せられる場合
                }
            }
            return 0; // 動かせない
        };
        // =============================
        // 位置を並べなおす
        // =============================
        _this.sortCards = function () {
            var numOpen = _this.list.filter(function (c) { return c.isOpen; }).length; // 開いてるカード数
            var numClose = _this.list.length - numOpen; // 閉じてるカード数
            var openY = Math.min(50, (740 - numClose * 10 - (_this.height - _this.y)) / numOpen); // Yの間隔
            var closeY = 10;
            var y = _this.y;
            for (var i = 0; i < _this.list.length; i++) {
                var c = _this.list[i];
                var prevC = i === 0 ? null : _this.list[i - 1];
                var shiftY = prevC && prevC.isOpen ? openY : closeY;
                var x_1 = _this.x;
                if (prevC)
                    y += shiftY;
                if (x_1 !== c.x || y !== c.y) {
                    timeline.create(c).moveTo(x_1, y, 200);
                }
                gameMain.append(c);
            }
        };
        // =============================
        // 座標からカードを取得する
        // =============================
        _this.getCards = function (x, y) {
            for (var i = _this.list.length - 1; i >= 0; i--) {
                var c = _this.list[i];
                if (!c.isOpen)
                    return null;
                if (i === _this.list.length - 1 || c.num === _this.list[i + 1].num + 1) {
                    if (g.Collision.intersect(x, y, 0, 0, c.x, c.y, c.width, c.height)) {
                        return { num: i, cards: _this.list.slice(i) };
                    }
                }
                else {
                    return null;
                }
            }
            return null;
        };
        // =============================
        // 揃っている位置の取得
        // =============================
        _this.getCompCardPos = function () {
            var num = 0;
            for (var i = _this.list.length - 1; i >= 0; i--) {
                var c = _this.list[i];
                if (c.num === num + 1 && c.isOpen) {
                    num++;
                }
                else {
                    break;
                }
            }
            if (num === 13) {
                return _this.list.length - num;
            }
            else {
                return -1;
            }
        };
        /**
         * 揃っているカードの数(上から)
         */
        _this.getCompCardNum = function () {
            var num = 1;
            for (var i = _this.list.length - 1; i > 0; i--) {
                var c = _this.list[i];
                var pre = _this.list[i - 1];
                if (pre.isOpen && (pre.num === c.num + 1)) {
                    num++;
                }
                else {
                    break;
                }
            }
            return num;
        };
        // =============================
        // スコアを算出
        // =============================
        _this.getScore = function () {
            if (!_this.list.length)
                return 0;
            var cnt = 0;
            var flgShadow = false;
            for (var i = _this.list.length - 1; i >= 0; i--) {
                var nowC = _this.list[i];
                if (!nowC.isOpen)
                    break;
                // 一番上なら必ず明るい色 add by funsuke
                if (i === _this.list.length - 1) {
                    nowC.light();
                }
                if (i !== 0) {
                    var prevC = _this.list[i - 1];
                    if (prevC.isOpen && nowC.num === prevC.num - 1) {
                        cnt++;
                        // 次があっていれば光らせる add by funsuke
                        if (!flgShadow)
                            prevC.light();
                        // del 2023.04.15 by funsuke
                        // } else {
                        // 	break;
                    }
                    else {
                        flgShadow = true;
                    }
                    if (flgShadow && prevC.isOpen) {
                        prevC.shadow();
                    }
                }
            }
            return Math.pow(cnt, 2) * 100;
        };
        /**
         * 一番上のカードの束を取得
         */
        _this.getTopCardBlocLower = function () {
            if (!_this.list[_this.list.length - 1].isOpen)
                return 0;
            return _this.list[_this.list.length - _this.getCompCardNum()].num;
        };
        return _this;
    }
    return CardField;
}(cardArea_1.CardArea));
exports.CardField = CardField;

})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}