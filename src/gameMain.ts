import tl = require("@akashic-extension/akashic-timeline");
import { Card } from "./card";
import { CardArea } from "./cardArea";
import { CardDeck } from "./cardDeck";
import { CardBlock, CardField } from "./cardField";
import { CardFound } from "./cardFound";
import { GameMainParameterObject } from "./parameterObject";
import { SceneGame } from "./sceneGame";

export class GameMain extends g.E {
	public mateState: number = 0;
	private getMateState: () => number;
	/**
	 * コンストラクタ
	 */
	constructor(param: GameMainParameterObject) {
		// 初期化
		const scene = g.game.scene() as SceneGame;
		super({ scene: scene, width: g.game.width, height: g.game.height, touchable: true });
		const timeline = new tl.Timeline(scene);
		// 山札置き場
		const deckArea = new CardDeck(this, 1170, 550);
		// 組札置き場
		const foundAreas: CardFound[] = [];
		for (let i = 0; i < 8; i++) {
			// const foundArea = new ClsFound(this, 1170, 40 * i + 100);
			const foundArea = new CardFound(this, g.game.width - 20 - Card.width / 2, 40 * i + 100);
			foundAreas.push(foundArea);
		}
		// 場札置き場
		const fieldAreas: CardField[] = [];
		for (let i = 0; i < 10; i++) {
			const fieldArea = new CardField(this, 115 * i + 20, 10);
			this.append(fieldArea);
			fieldAreas.push(fieldArea);
		}
		// =============================
		// ゲームの状態(詰み判定)
		// =============================
		this.getMateState = (): number => {
			console.log("********gameMain::getMateState_in");
			let canMove: boolean = false;
			for (let i = 0; i < fieldAreas.length; i++) {
				// console.log("fieldAreas.index = " + i);
				// console.log("fieldAreas[i].list.length = " + fieldAreas[i].list.length);
				if (fieldAreas[i].list.length === 0) continue;
				const lower: number = fieldAreas[i].getTopCardBlocLower();
				// console.log("lower = " + lower);
				for (let j = 1; j < fieldAreas.length; j++) {
					// console.log("----------------");
					const dst: CardField = fieldAreas[(i + j) % fieldAreas.length];
					const dstLen: number = dst.list.length;
					const card: Card = dst.list[dstLen - 1];
					// console.log("    dst.index = " + ((i + j) % fieldAreas.length));
					// console.log("    dst.list.length = " + dst.list.length);
					if (dstLen === 0 || (card.isOpen && card.num === lower + 1)) {
						// if (dst.list.length > 0) {
						// 	console.log("    dst.list[dst.list.length - 1].num = " + dst.list[dst.list.length - 1].num);
						// }
						canMove = true;
						break;
					}
				}
				if (canMove) break;
			}
			// 一番上のカード束が全部場に付いた状態のとき詰み(山札を取らせる)
			let isNotPluralAll: boolean = true;
			const blocks: CardBlock[] = new Array<CardBlock>(fieldAreas.length);
			for (let i = 0; i < fieldAreas.length; i++) {
				const src: CardField = fieldAreas[i];
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
			const blockExists = (srcB: CardBlock, idx: number): number => {
				console.log("srcIdx = " + idx);
				console.log("srcU = " + srcB.upper);
				console.log("srcL = " + srcB.lower);
				let retIdx: number = -1;
				for (let i = 1; i < fieldAreas.length; i++) {
					console.log("--------");
					const dstIdx: number = (idx + i) % fieldAreas.length;
					const dstB: CardBlock = blocks[dstIdx];
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
			let idx: number = -1;
			for (let i = 0; i < fieldAreas.length; i++) {
				if (blocks[i].upper !== 1) continue;
				idx = i;
				while (idx >= 0) {
					if (blocks[idx].lower === 13) break;
					idx = blockExists(blocks[idx], idx);
				}
				if (idx >= 0 && blocks[idx].lower === 13) break;
			}
			// 動かせない場合
			if ((!canMove || isNotPluralAll) && idx < 0) {
				// 山札がない場合、完全詰み(GameOver)
				if (deckArea.list.length === 0) return 2;
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
		const cards: Card[] = [];
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
		const cardNum: number[] = Card.getNumbers(param);
		// console.log(cardNum);
		for (let i = 0; cardNum.length; i++) {
			const c = new Card(this, cardNum.pop(), 0, 0);
			cards.push(c);
		}
		// 山札にセット
		deckArea.addCards(cards);
		deckArea.sortCards();
		// 移動(表示は更新しない)定義
		const stack: { srcArea: CardArea; dstArea: CardArea; num: number }[] = [];
		const move = (srcArea: CardArea, dstArea: CardArea, num: number): void => {
			const p = dstArea.list.length;
			dstArea.addCards(srcArea.list.slice(num));
			srcArea.cutCards(num);
			stack.push({ srcArea: dstArea, dstArea: srcArea, num: p });
		};
		// 場札に配る（最初の処理)
		while (deckArea.list.length > 104 - 54) {
			fieldAreas.forEach((area, i) => {
				if (!(deckArea.list.length > 104 - 54)) return;
				move(deckArea, area, deckArea.list.length - 1);
			});
		}
		// 積んでるか確認
		this.mateState = this.getMateState();
		// 場札ソート
		fieldAreas.forEach((area, i) => {
			area.sortCards();
			area.list.slice(-1)[0].open(true);
		});
		// =============================
		// 場札に配るイベント
		// =============================
		deckArea.onPointDown.add(() => {
			if (!scene.isStart) return;
			// 空白の列を避ける del by funsuke 2023.04.16
			// if (fieldAreas.some((area) => area.list.length === 0)) {
			// 	scene.playSound("se_miss");
			// 	return;
			// }
			// 各列に配る
			fieldAreas.forEach((area) => {
				if (!deckArea.list.length) return;
				move(deckArea, area, deckArea.list.length - 1);
				area.list.slice(-1)[0].open(true);
				area.sortCards();
			});
			// 動かすのに成功
			scene.playSound("se_move");
			setScore();
			gameClear();
			// アニメーション
			timeline.create(this).wait(200).call(() => {
				if (autoMove()) {
					setScore();
					gameClear();
				}
			});
			this.mateState = this.getMateState();
		});
		// =============================
		// 揃っているかどうかの確認と移動
		// =============================
		let compCnt: number = 0;
		const autoMove = (): boolean => {
			for (let i = 0; i < fieldAreas.length; i++) {
				const area = fieldAreas[i];
				const num = area.getCompCardPos();
				if (num !== -1) {
					move(area, foundAreas[compCnt], num);
					if (area.list.length) {
						timeline.create(this).wait(1300).call(() => {
							area.sortCards();
							// ここでエラー何もないのにopenしようとした
							if (area.list.length) {
								area.list.slice(-1)[0].open(true);
							}
						});
					}
					foundAreas[compCnt].sortCards();
					compCnt++;
					// 詰んでるか確認
					this.mateState = this.getMateState();
					return true;
				}
			}
			return false;
		};
		// =============================
		// スコア集計
		// =============================
		const setScore = (): void => {
			let score = 0;
			fieldAreas.forEach((area) => {
				score += area.getScore();
			});
			score += 13 ** 2 * compCnt * 100;
			scene.addScore(score - g.game.vars.gameState.score);
		};
		// =============================
		// クリア判定とクリア処理
		// =============================
		const gameClear = (): void => {
			if (compCnt < 8) return;
			// クリア処理
			scene.playSound("se_clear");
			scene.isClear = true;
		};
		// =============================
		// 移動処理まとめ(場札間移動)
		// =============================
		const moveSub = (srcArea: CardField, dstArea: CardField, cardsNum: number): void => {
			move(srcArea, dstArea, cardsNum);
			srcArea.sortCards();
			dstArea.sortCards();
			if (srcArea.list.length) srcArea.list.slice(-1)[0].open(true);
			setScore();
			gameClear();
			// アニメーション
			timeline.create(this).wait(200).call(() => {
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
		this.onPointDown.add((ev) => {
			if (!scene.isStart) return;
			// bkCards = null;
			// bkArea = null;
			let isMoved: boolean = false;
			// 元ダブルクリック時処理
			for (let i = 0; i < fieldAreas.length; i++) {
				const srcArea = fieldAreas[i];
				// 動かそうとしているカード(複数)の取得
				const cards = srcArea.getCards(ev.point.x, ev.point.y);
				if (!cards) continue;
				let moveArea: CardField = null;
				let moveSpaceArea: CardField = null;
				for (let j = 1; j < fieldAreas.length; j++) {
					const dstArea = fieldAreas[(i + j) % fieldAreas.length];
					const isAddPattern: number = dstArea.isAddCards(cards.cards);
					if (isAddPattern === 1) {		// カードの上に乗せられる場合
						if (cards.cards.length + dstArea.getCompCardNum() === 13) {
							moveSub(srcArea, dstArea, cards.num);
							isMoved = true;
							break;
						}
						if (moveArea === null) {
							moveArea = dstArea;
						}
					} else if (isAddPattern === 2 && moveSpaceArea === null) {	// 空き場
						moveSpaceArea = dstArea;
					}
				}
				// まだ動かしていない場合
				if (!isMoved) {
					// 場札カードの上に置ける場合
					if (moveArea !== null) {
						moveSub(srcArea, moveArea, cards.num);
						this.mateState = this.getMateState();
					} else if (moveSpaceArea !== null) {
						// 場札空白に置ける場合
						moveSub(srcArea, moveSpaceArea, cards.num);
						this.mateState = this.getMateState();
					} else {
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
		scene.setTimeout(() => {
			setScore();
		}, 200);
	}
}
