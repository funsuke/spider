import tl = require("@akashic-extension/akashic-timeline");
import { CardArea } from "./cardArea";
import { GameMain } from "./gameMain";
import { SceneGame } from "./sceneGame";
import { Card } from "./card";

/**
 * カード置き場クラス(組札)
 */
export class CardFound extends CardArea {
	public sortCards: () => void;
	public isAddCards = (cards: Card[]) => { return 0 };
	public getCards = (x: number, y: number) => { return null };
	public collisionArea = null;
	/**
	 * コンストラクタ
	 * @param gameMain ゲーム画面
	 * @param x 表示X座標
	 * @param y 表示Y座標
	 */
	constructor(gameMain: GameMain, x: number, y: number) {
		// 初期化
		super(gameMain, x, y);
		const scene = g.game.scene() as SceneGame;
		const timeline = new tl.Timeline(scene);
		this.hide();
		// =============================
		// 位置を並べなおす
		// =============================
		this.sortCards = () => {
			for (let i = 0; i < this.list.length; i++) {
				const c = this.list[i];
				// 組札アニメーション
				timeline
					.create(c)
					.wait(100 * (this.list.length - i))
					.call(() => {
						gameMain.append(c);
					})
					.moveTo(this.x, this.y, 200);
			}
		};
	}
}
