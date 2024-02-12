window.gLocalAssetContainer["card"] = function(g) { (function(exports, require, module, __filename, __dirname) {
"use strict";
// import { Timeline } from "@akashic-extension/akashic-timeline";
// import { ClsField, ClsFields } from "./clsField";
// import { GameMainParameterObject } from "./parameterObject";
// import { spriteBack, spriteShadow } from "./sprite";
// import { shuffleArray } from "./util";
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
exports.Card = void 0;
// /**
//  * クラスカード
//  */
// export class ClsCard extends g.Sprite {
// 	public static width: number = 110;
// 	public static height: number = 165;
// 	public x: number;		// Scene上での位置X
// 	public y: number;		// Scene上での位置Y
// 	public idxInField: number;
// 	private _isFront: boolean;
// 	private sprShadow: g.Sprite;
// 	private _num: number;
// 	private tl: Timeline;
// 	//
// 	constructor(scene: g.Scene, cardNo: number) {
// 		super({
// 			scene: scene,
// 			src: scene.assets.nc276103 as g.ImageAsset,
// 			srcWidth: ClsCard.width,
// 			srcHeight: ClsCard.height,
// 			srcX: ClsCard.width * 13,
// 			srcY: ClsCard.height,
// 			width: ClsCard.width,
// 			height: ClsCard.height,
// 			anchorX: 0.5,
// 		});
// 		// プロパティの設定
// 		this.tl = new Timeline(scene);
// 		this._isFront = false;
// 		this._num = cardNo % 13;
// 		this.x = 0;
// 		this.y = 0;
// 		this.idxInField = -1;
// 		// 影のスプライト
// 		this.sprShadow = spriteShadow(scene);
// 		this.hideShadow();
// 		this.sprCard.append(this.sprShadow);
// 	}
// 	/**
// 	 * カードを表示
// 	 */
// 	show(): void {
// 		this.sprCard.show();
// 	}
// 	/**
// 	 * カードを隠す
// 	 */
// 	hide(): void {
// 		this.sprCard.hide();
// 	}
// 	/**
// 	 * 影を表示
// 	 */
// 	showShadow(): void {
// 		this.sprShadow.show();
// 	}
// 	/**
// 	 * 影を隠す
// 	 */
// 	hideShadow(): void {
// 		this.sprShadow.hide();
// 	}
// 	/**
// 	 * 表にしてアニメーション表示
// 	 */
// 	open(): void {
// 		if (this._isFront) return;
// 		// 表に変更
// 		this.changeFront();
// 		// アニメーション初期設定
// 		this.sprCard.scaleX = 0.0;
// 		this.show();
// 		// アニメーション
// 		this.tl.create(this.sprCard).scaleTo(1.0, 1.0, 200);
// 	}
// 	/**
// 	 * 場札に移動
// 	 * @param field ClsField 場札クラス
// 	 * @param isFirst 一番初めかどうか
// 	 */
// 	moveToField(field: ClsField, isFirst: boolean = false): void {
// 		const x: number = field.x;
// 		const y: number = field.y;
// 		console.log("ClsCar::moveField_in");
// 		// シーンに貼り付け
// 		this.setSceneXY();
// 		// アニメーション
// 		this.tl.create(this.sprCard).moveTo(x, y, 200)
// 			.call(() => {
// 				if (!isFirst) this.changeFront();
// 				if (!this._isFront) this.open();
// 				field.stackCard(this);
// 			});
// 		console.log("ClsCar::moveField_out");
// 	}
// 	/**
// 	 * 位置を設定
// 	 * @param x Scene上のX位置
// 	 * @param y Scene上のY位置
// 	 */
// 	setXY(x: number, y: number): void {
// 		this.sprCard.x = x;
// 		this.sprCard.y = y;
// 		this.sprCard.modified();
// 	}
// 	/**
// 	 * シーンに張り付け
// 	 */
// 	setSceneXY(x: number = this.x, y: number = this.y): void {
// 		if (this.sprCard.parent != null) {
// 			this.sprCard.remove();
// 		}
// 		this.setXY(x, y);
// 		this.scene.append(this.sprCard);
// 	}
// 	/**
// 	 * カードを表にする（データ上）
// 	 */
// 	changeFront(): void {
// 		this._isFront = true;
// 		this.sprCard.touchable = true;
// 		this.sprCard.srcX = ClsCard.width * this._num;
// 		this.sprCard.srcY = 0;
// 	}
// 	/**
// 	 * カードに子を追加する
// 	 * @param clsCard ClsCard
// 	 */
// 	appendClass(card: ClsCard): void {
// 		if (card.sprCard.parent != null) {
// 			card.sprCard.remove();
// 		}
// 		this.sprCard.append(card.sprCard);
// 	}
// 	/**
// 	 * 表かどうか
// 	 */
// 	get isFront(): boolean {
// 		return this._isFront;
// 	}
// 	// /**
// 	//  * カードスプライト
// 	//  */
// 	// get sprite(): g.Sprite {
// 	// 	return this.sprCard;
// 	// }
// 	/**
// 	 * カードの数字(0～12)
// 	 */
// 	get num(): number {
// 		return this._num;
// 	}
// 	/**
// 	 * カードスプライトのX位置
// 	 */
// 	// get sprX(): number {
// 	// 	return this.sprCard.x;
// 	// };
// 	// set sprX(x: number) {
// 	// 	this.sprCard.x = x;
// 	// };
// 	/**
// 	 * カードスプライトのY位置
// 	 */
// 	// get sprY(): number {
// 	// 	return this.sprCard.y;
// 	// }
// 	// set sprY(y: number) {
// 	// 	this.sprCard.y = y;
// 	// }
// 	/**
// 	 * pointUpイベントの追加
// 	 * @param fields ClsFields 場札クラス(複数)
// 	 * @param idx クリックした
// 	 */
// 	public makeClickFunc(fields: ClsFields, idx: number): void {
// 		this.sprCard.touchable = true;
// 		this.sprCard.onPointUp.add(ev => {
// 			console.log("onPointUp_in");
// 			// アップした位置がカードの内側の場合
// 			if (this.inRange(ev)) {
// 				// 移動できる場札インデックスを取得
// 				let findIdx: number = fields.canMoveIdx(idx, this._num);
// 				// 動かせる場所がある場合
// 				if (findIdx !== -1) {
// 					console.log("[" + findIdx + "]に動かせる");
// 					// フィールドから削除、Sceneに再設定
// 					fields.getField(idx).removeCards(this.idxInField);	// removeCards(idx)のidxが違う
// 					this.setSceneXY();
// 					// 指定フィールドに移動、一番上のカードを開く
// 					this.moveToField(fields.getField(findIdx));
// 					let card: ClsCard | null = fields.getField(idx).openFrontCard();
// 					if (card != null) {
// 						card.makeClickFunc(fields, idx);
// 					}
// 				} else {		// 何もない場合
// 					console.log("どこにも動かせない");
// 				}
// 			}
// 			console.log("onPointUp_out");
// 		});
// 	}
// 	/**
// 	 * 座標がカードの中か否か判定
// 	 * @param ev g.PointUpEvent ポインティング操作の終了を表すイベント
// 	 * @returns boolean カード内か否か
// 	 */
// 	private inRange(ev: g.PointUpEvent): boolean {
// 		const x = ev.point.x + ev.startDelta.x;
// 		const y = ev.point.y + ev.startDelta.y;
// 		if (x < 0) return false;
// 		if (x >= ClsCard.width) return false;
// 		if (y < 0) return false;
// 		if (y >= ClsCard.height) return false;
// 		return true;
// 	}
// 	/**
// 	 * 組札に動かす
// 	 */
// 	// public moveFound(): void {
// 	// 	;
// 	// }
// }
// // ┌───┬───┬───┬───┬───┐
// // │   │A,K│567│etc│SUM│
// // ├───┼───┼───┼───┼───┤
// // │  0│ 28│ 16│ 56│100│
// // ├───┼───┼───┼───┼───┤
// // │  1│ 20│ 24│ 56│100│
// // ├───┼───┼───┼───┼───┤
// // │  2│ 14│ 30│ 56│100│
// // ├───┼───┼───┼───┼───┤
// // │  3│ 10│ 34│ 56│100│
// // ├───┼───┼───┼───┼───┤
// // │  4│  8│ 36│ 56│100│
// // ├───┼───┼───┼───┼───┤
// // │  5│  -│   │   │   │
// // └───┴───┴───┴───┴───┘
// /**
//  * クラスカード(全数)
//  */
// export class ClsCards {
// 	private static edgePercents: number[] = [28, 20, 14, 10, 8];
// 	private static specialPercents: number = 44;
// 	private param: GameMainParameterObject;
// 	private edges: ClsCard[];
// 	private centers: ClsCard[];
// 	private others: ClsCard[];
// 	//
// 	constructor(scene: g.Scene, param: GameMainParameterObject) {
// 		this.param = param;
// 		this.edges = new Array<ClsCard>(16);		// 8*(A,K)
// 		this.centers = new Array<ClsCard>(24);	// 8*(6,7,8)
// 		this.others = new Array<ClsCard>(64);		// 8*8
// 		// set default value
// 		for (let i = 0; i < 8; i++) {
// 			// set edgeCards
// 			this.edges[i] = new ClsCard(scene, i * 13);						// A
// 			this.edges[i + 8] = new ClsCard(scene, i * 13 + 12);	// K
// 			// set centerCards
// 			this.centers[i] = new ClsCard(scene, i * 13 + 5);					// 6
// 			this.centers[i + 8] = new ClsCard(scene, i * 13 + 6);			// 7
// 			this.centers[i + 16] = new ClsCard(scene, i * 13 + 7);		// 8
// 			// set otherCards
// 			for (let j = 0; j < 4; j++) {
// 				this.others[i + 8 * j] = new ClsCard(scene, i * 13 + 1 + j);			// 2,3,4,5
// 				this.others[i + 32 + 8 * j] = new ClsCard(scene, i * 13 + 8 + j);	// 9,10,J,Q
// 			}
// 		}
// 		// shuffleArray
// 		this.edges = shuffleArray(this.edges, param);
// 		this.centers = shuffleArray(this.centers, param);
// 		this.others = shuffleArray(this.others, param);
// 	}
// 	/**
// 	 * カードの数
// 	 */
// 	get length(): number {
// 		return this.edges.length + this.centers.length + this.others.length;
// 	}
// 	/**
// 	 * ランダム(作為的)なカードを作成
// 	 * @param scene g.Scene
// 	 * @param param GameMainParameterObject
// 	 * @returns ClsCard[]
// 	 */
// 	public setCards(): ClsCard[] {
// 		const retCards: ClsCard[] = new Array<ClsCard>();
// 		// push 10*5=50枚
// 		for (let i = 0; i < ClsCards.edgePercents.length; i++) {
// 			for (let j = 0; j < 10; j++) {
// 				const idx: number = Math.floor(this.param.random.generate() * 100);
// 				if (idx < ClsCards.edgePercents[i]) {
// 					retCards.push(this.getEdges());
// 				} else if (idx < ClsCards.specialPercents) {	// 44%未満
// 					retCards.push(this.getCenters());
// 				} else {
// 					retCards.push(this.getOthers());
// 				}
// 			}
// 		}
// 		// 残りのカードをpush
// 		while (true) {
// 			if (this.length === 0) break;
// 			retCards.push(this.getRandom());
// 		}
// 		return retCards;
// 	}
// 	/**
// 	 * 端(A,K)のカードを１枚取得する
// 	 * @returns ClsCard
// 	 */
// 	private getEdges(): ClsCard {
// 		if (this.edges.length > 0) {
// 			return this.edges.shift() as ClsCard;
// 		}
// 		if (this.others.length > 0) {
// 			return this.others.shift() as ClsCard;
// 		}
// 		return this.centers.shift() as ClsCard;
// 	}
// 	/**
// 	 * 中央(6,7,8)のカードを１枚取得する
// 	 * @returns ClsCard
// 	 */
// 	private getCenters(): ClsCard {
// 		if (this.centers.length > 0) {
// 			return this.centers.shift() as ClsCard;
// 		}
// 		if (this.others.length > 0) {
// 			return this.others.shift() as ClsCard;
// 		}
// 		return this.edges.shift() as ClsCard;
// 	}
// 	/**
// 	 * その他(2,3,4,5,9,10,J,Q)のカードを１枚取得する
// 	 * @returns ClsCard
// 	 */
// 	private getOthers(): ClsCard {
// 		if (this.others.length > 0) {
// 			return this.others.shift() as ClsCard;
// 		}
// 		if (this.edges.length > 0) {
// 			return this.edges.shift() as ClsCard;
// 		}
// 		return this.centers.shift() as ClsCard;
// 	}
// 	/**
// 	 * ランダムに１枚カードを取得する
// 	 * @param param GameMainParameterObject
// 	 * @returns ClsCard
// 	 */
// 	private getRandom(): ClsCard {
// 		const idx: number = Math.floor(this.param.random.generate() * this.length);
// 		if (idx < this.edges.length) {
// 			return this.getEdges();
// 		} else if (idx < this.centers.length) {
// 			return this.getCenters();
// 		}
// 		return this.getOthers();
// 	}
// }
var tl = require("@akashic-extension/akashic-timeline");
var utilAkashic_1 = require("./utilAkashic");
/**
 * カードクラス
 */
var Card = /** @class */ (function (_super) {
    __extends(Card, _super);
    /**
     * コンストラクタ
     * @param gameMain ゲーム画面
     * @param num カードの数字
     * @param x 表示X位置
     * @param y 表示Y位置
     */
    function Card(gameMain, num, x, y) {
        var _this = this;
        // 初期化
        var scene = g.game.scene();
        _this = _super.call(this, {
            scene: scene,
            x: x,
            y: y,
            width: 110,
            height: 165,
            parent: gameMain,
        }) || this;
        var timeline = new tl.Timeline(scene);
        _this.num = num;
        _this.isOpen = false;
        _this.isShadow = false;
        _this.wait = 0;
        // -----------------------------
        // カード
        // -----------------------------
        // 裏
        var sprite = new g.FrameSprite({
            scene: scene,
            src: scene.asset.getImageById("imgCard"),
            x: 110 / 2,
            y: 165 / 2,
            anchorX: 0.5,
            anchorY: 0.5,
            width: 110,
            height: 165,
            frames: [0, 1, 2],
            frameNumber: 1,
            parent: _this,
        });
        // ベース用
        var base = new g.E({
            scene: scene,
            parent: sprite,
        });
        base.hide();
        // 表
        new g.Sprite({
            scene: scene,
            src: scene.asset.getImageById("nc276103"),
            x: 0,
            y: 0,
            srcX: Card.width * (num - 1),
            srcY: 0,
            width: Card.width,
            height: Card.height,
            parent: base,
        });
        // 影
        var sprShadow = new g.Sprite({
            scene: scene,
            src: scene.asset.getImageById("nc276103"),
            x: 0,
            y: 0,
            srcX: Card.width * 13,
            srcY: Card.height * 2,
            width: Card.width,
            height: Card.height,
            parent: base,
        });
        sprShadow.hide();
        // =============================
        // 開く
        // =============================
        _this.open = function (isAnime) {
            if (_this.isOpen)
                return;
            sprite.frameNumber = 0;
            base.show();
            _this.isOpen = true;
            if (isAnime) {
                timeline.create(sprite).scaleTo(0, 1, 200).scaleTo(1, 1, 200);
            }
        };
        // =============================
        // 閉じる
        // =============================
        _this.close = function () {
            sprite.frameNumber = 1;
            base.hide();
            _this.isOpen = false;
        };
        // =============================
        // 影を付ける
        // =============================
        _this.shadow = function () {
            if (_this.isShadow)
                return;
            sprShadow.show();
            _this.isShadow = true;
        };
        // =============================
        // 影を取る
        // =============================
        _this.light = function () {
            sprShadow.hide();
            _this.isShadow = false;
        };
        return _this;
    }
    // 意図的にシャッフルされた数列を取得する
    Card.getNumbers = function (param) {
        var num = new ClsCardNum(g.game.random).setNumbers();
        // console.log("ClsCard::getNumbers");
        // console.log(num);
        return num;
    };
    Card.width = 110;
    Card.height = 165;
    Card.cntAnimeCards = 0;
    return Card;
}(g.E));
exports.Card = Card;
// ┌──┬──┬──┬──┬──┐
// │    │A,K │678 │etc │SUM │
// ├──┼──┼──┼──┼──┤
// │   0│  28│  16│  56│ 100│ 14*2 5.3*3 7*8
// ├──┼──┼──┼──┼──┤
// │   1│  20│  24│  56│ 100│
// ├──┼──┼──┼──┼──┤
// │   2│  14│  30│  56│ 100│
// ├──┼──┼──┼──┼──┤
// │   3│  10│  34│  56│ 100│
// ├──┼──┼──┼──┼──┤
// │   4│   8│  36│  56│ 100│ 4*2 12*3 7*8
// ├──┼──┼──┼──┼──┤
// │   5│   -│    │    │    │
// └──┴──┴──┴──┴──┘
// ↓
// ┌──┬──┬──┬──┬──┐
// │    │A,K │5-9 │etc │SUM │
// ├──┼──┼──┼──┼──┤
// │   0│  32│  22│  46│ 100│ 14*2 5.3*3 7*8
// ├──┼──┼──┼──┼──┤
// │   1│  24│  30│  46│ 100│
// ├──┼──┼──┼──┼──┤
// │   2│  16│  38│  46│ 100│
// ├──┼──┼──┼──┼──┤
// │   3│   0│  54│  46│ 100│
// ├──┼──┼──┼──┼──┤
// │   4│   0│  54│  46│ 100│ 4*2 12*3 7*8
// ├──┼──┼──┼──┼──┤
// │   5│   -│    │    │    │
// └──┴──┴──┴──┴──┘
// ↓
// ┌───┬─────┬─────┬─────┐
// │      │3枚セット │ランダム  │合計      │
// ├───┼─────┼─────┼─────┤
// │   0段│    3枚3組│         1│     3*3+1｜0は最初に出てる場札or最初に出てくる山札
// ├───┼─────┼─────┼─────┤大きくなるほど終盤に出てくる
// │     1│    3枚3組│         1│     3*3+1｜
// ├───┼─────┼─────┼─────┤
// │     2│    3枚2組│         4│     3*2+4｜
// ├───┼─────┼─────┼─────┤
// │     3│    3枚2組│         4│     3*2+4｜
// ├───┼─────┼─────┼─────┤
// │     4│    3枚1組│         7│     3*1+7｜
// ├───┼─────┼─────┼─────┤
// │   All│   3枚11組│        17│   3*11+17｜33+17=50
// ├───┼─────┼─────┼─────┤
// │ (場4)│         -│         4│          ｜
// └───┴─────┴─────┼─────┘
// ↓
// ┌───┬─────┬─────┬─────┐
// │      │3枚セット │ランダム  │合計      │
// ├───┼─────┼─────┼─────┤
// │   0段│       3組│         1│     3*3+1｜最初は積み易いようにする
// ├───┼─────┼─────┼─────┤[3-5,6-8,9-J]の固定でもいいか？あるいは[1-9,2-T...,5-K]の5種類からランダム
// │ 他4段│       2組│         4│     3*2+4｜
// ├───┼─────┼─────┼─────┤
// │   All│      11組│        17│   3*11+17｜33+17=50 11組としたのは(A-3,2-4,3-5 ... T-Q,J-Kの限定ランダムにしたら)やり易いから
// ├───┼─────┼─────┼─────┤これにより最初に場にKが3枚以上出る(or Aが3枚以上出る)ことはない(A or Kが3枚はあり得る)
// │ (場4)│         -│         4│          ｜
// └───┴─────┴─────┼─────┘
var ClsCardNum = /** @class */ (function () {
    // getSequence3();
    // getRandom();
    //
    function ClsCardNum(rand) {
        this.rand = rand;
        this.sequenceNum = [];
        this.randomNum = [];
        // 数列に追加
        for (var i = 0; i < 11; i++) {
            this.sequenceNum.push(i + 1);
            this.sequenceNum.push(i + 1);
        }
        // 残りの数
        for (var i = 0; i < 13; i++) {
            var n = 2;
            if (i % 12 === 0) {
                n = 6;
            }
            else if (i % 10 === 1) {
                n = 4;
            }
            for (var j = 0; j < n; j++) {
                this.randomNum.push(i + 1);
            }
        }
        // this.edges = [];		// 8*(A,K)
        // this.centers = [];	// 8*(5,6,7,8,9)
        // this.others = [];		// 8*8
        // // set default value
        // for (let i = 0; i < 8; i++) {
        // 	// set edgeCards
        // 	this.edges.push(1);					// A
        // 	this.edges.push(13);				// K
        // 	// set centerCards
        // 	for (let j = 0; j < 5; j++) {
        // 		// 5,6,7,8,9
        // 		this.centers.push(5 + j);
        // 	}
        // 	// set otherCards
        // 	for (let j = 0; j < 3; j++) {
        // 		this.others.push(2 + j);		// 2,3,4
        // 		this.others.push(10 + j);		// 10,J,Q
        // 	}
        // }
        // // shuffleArray
        // this.edges = shuffleArray(this.edges, param);
        // this.centers = shuffleArray(this.centers, param);
        // this.others = shuffleArray(this.others, param);
    }
    ClsCardNum.prototype.getRandom = function (num) {
        if (num < 1)
            return [];
        if (num > this.randomNum.length)
            return this.randomNum;
        var array = this._getRandom();
        for (var i = 0; i < num - 1; i++) {
            array.push.apply(array, this._getRandom());
        }
        return array;
    };
    ClsCardNum.prototype.getSequence = function (num) {
        if (num < 1)
            return [];
        if (num > this.sequenceNum.length)
            return this.sequenceNum;
        var array = this._getSequence();
        for (var i = 0; i < num - 1; i++) {
            array.push.apply(array, this._getSequence());
        }
        return array;
    };
    /**
     * カードの数
     */
    // get length(): number {
    // 	return this.edges.length + this.centers.length + this.others.length;
    // }
    /**
     * ランダム(作為的)なカードを作成
     * @returns ClsCard[]
     */
    ClsCardNum.prototype.setNumbers = function () {
        //
        var array = [];
        // 事前に9連番+1の10枚2組を持っておく
        var array101 = [];
        var r = Math.floor(this.rand.generate() * 5) + 1;
        array101.push.apply(array101, this._getSequenceSpecific(r));
        array101.push.apply(array101, this._getRandom());
        var array102 = [];
        r = Math.floor(this.rand.generate() * 5) + 1;
        array102.push.apply(array102, this._getSequenceSpecific(r));
        array102.push.apply(array102, this._getRandom());
        // -----------------------------
        // 場札用(54枚)
        // -----------------------------
        array.push.apply(array, this.getRandom(4));
        for (var i = 0; i < 4; i++) {
            var array10 = [];
            array10.push.apply(array10, this.getSequence(2));
            array10.push.apply(array10, this.getRandom(4));
            array.push.apply(array, (0, utilAkashic_1.shuffleArray)(array10, this.rand));
        }
        array.push.apply(array, (0, utilAkashic_1.shuffleArray)(array101, this.rand));
        // -----------------------------
        // 山札用(50枚)
        // -----------------------------
        array.push.apply(array, (0, utilAkashic_1.shuffleArray)(array102, this.rand));
        for (var i = 0; i < 4; i++) {
            var array10 = [];
            array10.push.apply(array10, this.getSequence(2));
            array10.push.apply(array10, this.getRandom(4));
            array.push.apply(array, (0, utilAkashic_1.shuffleArray)(array10, this.rand));
        }
        // debug
        console.log("array101--------------");
        console.log.apply(console, array101);
        console.log("array102--------------");
        console.log.apply(console, array102);
        console.log("array-----------------");
        for (var i = 0; i < 10; i++) {
            console.log.apply(console, array.slice(10 * i, 10 * i + 10));
        }
        console.log.apply(console, array.slice(100));
        //
        return array;
    };
    // public setNumbers(param: GameMainParameterObject): number[] {
    // 	const retNumbers: number[] = [];
    // 	const random = param.random;
    // 	// push 10*5=50枚
    // 	for (let i = 0; i < ClsCardNum.edgePercents.length; i++) {
    // 		for (let j = 0; j < 10; j++) {
    // 			// const idx: number = Math.floor(g.game.random.generate() * 100);
    // 			const idx: number = Math.floor(random.generate() * 100);
    // 			if (idx < ClsCardNum.edgePercents[i]) {
    // 				retNumbers.push(this.getEdges());
    // 			} else if (idx < ClsCardNum.specialPercents) {
    // 				retNumbers.push(this.getCenters());
    // 			} else {
    // 				retNumbers.push(this.getOthers());
    // 			}
    // 		}
    // 	}
    // 	// 残りのカードをpush
    // 	while (this.length) {
    // 		if (this.others.length >= 10) {
    // 			retNumbers.push(this.getRandom(param));
    // 		} else {
    // 			const len: number = this.edges.length + this.centers.length;
    // 			const idx: number = Math.floor(random.generate() * len);
    // 			if (idx < this.edges.length) {
    // 				retNumbers.push(this.getEdges());
    // 			} else {
    // 				retNumbers.push(this.getCenters());
    // 			}
    // 		}
    // 	}
    // 	// // test
    // 	// for (let i = 40; i < 50; i++) {
    // 	// 	retNumbers[i] = 14;
    // 	// }
    // 	return retNumbers;
    // }
    /**
     * ランダムカードからランダムに1枚取得する
     * @returns number[]
     */
    ClsCardNum.prototype._getRandom = function () {
        var r = Math.floor(this.randomNum.length * this.rand.generate());
        return this.randomNum.splice(r, 1);
    };
    /**
     * シーケンスカードからランダムに1組(3枚)取得する
     * @returns number[]
     */
    ClsCardNum.prototype._getSequence = function () {
        var r = Math.floor(this.sequenceNum.length * this.rand.generate());
        var s = this.sequenceNum.splice(r, 1)[0];
        return [s, s + 1, s + 2];
    };
    /**
     * シーケンスカードから指定の3組(9枚)を取得する
     * @param num 始めの数字(1～5)
     * @returns number[]
     */
    ClsCardNum.prototype._getSequenceSpecific = function (num) {
        var array = [];
        for (var i = 0; i < 3; i++) {
            var idx = this.sequenceNum.indexOf(num);
            if (idx < 0)
                return array;
            var val = this.sequenceNum.splice(idx, 1)[0];
            array.push(val, val + 1, val + 2);
            num += 3;
        }
        return array;
    };
    return ClsCardNum;
}());

})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}