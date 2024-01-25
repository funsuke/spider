// import { ClsCard } from "./clsCard";
// import { ClsFields } from "./clsField";

// /**
//  * 山札クラス
//  */
// class ClsDeck {
// 	/**
// 	 * プロパティ
// 	 */
// 	private left: number;
// 	private top: number;
// 	private cards: ClsCard[];

// 	/**
// 	 * コンストラクタ
// 	 * @param scene g.Scene シーン
// 	 * @param idx number インデックス
// 	 */
// 	constructor(scene: g.Scene, idx: number) {
// 		// 初期化
// 		this.left = g.game.width - 20 - ClsCard.width / 2;
// 		this.top = g.game.height - 10 - ClsCard.height - 10 * idx;
// 		this.cards = new Array<ClsCard>(ClsFields.len);
// 	}

// 	/**
// 	 * カードを積む
// 	 * @param clsCard ClsCard
// 	 */
// 	stackCard(card: ClsCard): void {
// 		// カードを積む
// 		this.cards.push(card);
// 		// カードの位置を設定
// 		card.x = this.left;
// 		card.y = this.top;
// 		card.setSceneXY();
// 	}

// 	/**
// 	 * 表示
// 	 */
// 	show(): void {
// 		// 全てのカードを消してから一番上？のカードを表示
// 		this.cards.forEach(ele => {
// 			ele.hide();
// 		});
// 		this.cards[this.cards.length - 1].show();
// 	}

// 	/**
// 	 * 山札から場札に配る
// 	 * @param clsFields ClsField 場札クラス
// 	 * @param isFirst boolean 最初かどうか
// 	 */
// 	moveToFields(fields: ClsFields, isFirst: boolean = false): void {
// 		for (let i = 0; i < ClsFields.len; i++) {
// 			const card: ClsCard = this.cards.pop() as ClsCard;
// 			card.show();
// 			card.moveToField(fields.getField(i), isFirst);
// 			card.idxInField = fields.getField(i).length - 1;
// 			card.makeClickFunc(fields, i);
// 		}
// 	}
// }

// /**
//  * 山札クラス(複数) main.tsで１つ使用
//  */
// export class ClsDecks {
// 	/**
// 	 * プロパティ
// 	 */
// 	public static len: number = 6;
// 	private decks: ClsDeck[];		// デッキクラス
// 	private clickE: g.E;				// クリックできるエンティティ
// 	private fields: ClsFields;	// フィールドクラス(複数)

// 	/**
// 	 * コンストラクタ
// 	 * @param scene g.Scene シーン
// 	 * @param cards ClsCard[] カードクラス
// 	 * @param fields 場札クラス(複数)
// 	 */
// 	constructor(scene: g.Scene, cards: ClsCard[], fields: ClsFields) {
// 		// -----------------------------
// 		// 初期化
// 		// -----------------------------
// 		// デッキクラス
// 		this.decks = new Array<ClsDeck>(ClsDecks.len);
// 		for (let i = 0; i < ClsDecks.len; i++) {
// 			this.decks[i] = new ClsDeck(scene, i);
// 		}
// 		// クリック用エンティティ
// 		this.clickE = new g.E({
// 			scene: scene,
// 			width: ClsCard.width,
// 			height: ClsCard.height,
// 			x: g.game.width - 20 - ClsCard.width / 2,
// 			y: g.game.height - 10 - ClsCard.height - 10 * 5,
// 			touchable: true,
// 		});
// 		// クリック用エンティティイベント
// 		this.clickE.onPointUp.add((ev) => {
// 			this.moveToFields();
// 		});
// 		// フィールドクラス
// 		this.fields = fields;
// 		// -----------------------------
// 		// カードを積む
// 		// -----------------------------
// 		for (let i = 0; i < ClsDecks.len; i++) {
// 			this.decks[i % ClsDecks.len].stackCard(cards.shift() as ClsCard);
// 		}
// 		// カードの表示
// 		for (let i = 0; i < ClsDecks.len; i++) {
// 			this.decks[i].show();
// 		}
// 	}

// 	/**
// 	 * カードを配る
// 	 * @returns void
// 	 */
// 	moveToFields(isFirst: boolean = false): void {
// 		if (this.decks.length <= 0) return;
// 		this.decks.pop()?.moveToFields(this.fields, isFirst);
// 		this.clickE.y += 10;
// 	}
// }

import { Card } from "./card";
import { CardArea } from './cardArea';
import { GameMain } from "./gameMain";

/**
 * カード置き場クラス(山札)
 */
export class CardDeck extends CardArea {
	public sortCards: () => void;
	public collisionArea = null;
	/**
	 * コンストラクタ
	 * @param gameMain ゲーム画面
	 * @param x 表示X位置
	 * @param y 表示Y位置
	 */
	constructor(gameMain: GameMain, x: number, y: number) {
		// 初期化
		super(gameMain, x, y);
		this.touchable = true;
		// =============================
		// 位置を並べなおす
		// =============================
		this.sortCards = () => {
			for (let i = 0; i < this.list.length; i++) {
				const c = this.list[i];
				c.x = this.x;
				c.y = this.y - (Math.floor(i / 10)) * 10;
				c.modified();
				gameMain.append(c);
			}
		};
	}
	isAddCards = (cards: Card[]) => { return 0 };
	getCards = (x: number, y: number) => { return null };
}
