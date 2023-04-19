import { Card } from "./card";
import { GameMain } from "./gameMain";
import { SceneGame } from "./sceneGame";

/**
 * カードエリア抽象クラス
 */
export abstract class CardArea extends g.Sprite {
	public list: Card[];
	public addCards: (cards: Card[]) => void;
	public cutCards: (num: number) => void;
	public getScore: () => number;
	public isAddCards: (cards: Card[]) => number;
	public getCards: (x: number, y: number) => { num: number; cards: Card[] } | null;
	public sortCards: () => void;
	public collisionArea: g.FilledRect;

	/**
	 * コンストラクタ
	 * @param gameMain ゲーム画面
	 * @param x 表示X位置
	 * @param y 表示Y位置
	 */
	constructor(gameMain: GameMain, x: number, y: number) {
		// 初期化
		const scene = g.game.scene() as SceneGame;
		super({
			scene: scene,
			src: scene.asset.getImageById("nc276103"),
			x: x,
			y: y,
			width: 110,
			height: 165,
			srcX: 110 * 13,
			srcY: 165 * 3,
			parent: gameMain,
		});
		this.list = [];
		// =============================
		// カードを重ねる
		// =============================
		this.addCards = (cards) => {
			this.list = this.list.concat(cards);
		};
		// =============================
		// カードを取得する
		// =============================
		this.cutCards = (num) => {
			this.list = this.list.slice(0, num);
		};
		// =============================
		// スコアを算出
		// =============================
		this.getScore = () => {
			return 0;
		};
	}
}
