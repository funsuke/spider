import tl = require("@akashic-extension/akashic-timeline");
import { Button } from "./button";
import { Config } from "./config";
import { GameMain } from "./gameMain";
import { GameMainParameterObject, RPGAtsumaruWindow } from "./parameterObject";
import { SaveData } from "./saveData";

declare const window: RPGAtsumaruWindow;

/**
 * シーン
 */
export class SceneGame extends g.Scene {
	// プロパティ
	public timeLine: tl.Timeline;
	public addScore: (score: number) => void;
	public isDebug: boolean = false;
	public isStart: boolean = false;
	public isClear: boolean;
	public font: g.Font;
	public timeLimit: number = 180;	// 制限時間(180秒)
	public time: number;
	public reset: () => void;
	public boardId: number = 1;
	private saveData: SaveData;
	private layer0: g.E;
	private bgmPlayer: g.AudioPlayer;
	private isCheat: boolean;

	/**
	 * コンストラクタ
	 * @param param ゲームパラメータ
	 */
	constructor(param: GameMainParameterObject) {
		// 初期化
		super({
			game: g.game,
			assetIds: [
				"title", "nc298326",
				"nc276103", "imgCard",	// カード
				"number", "number_red", "glyph",	// number用
				"score", "time", "start", "undo",	// 表示用
				"result",
				"se_start", "se_timeUp",					// 効果音
				"se_move", "se_miss", "se_clear",
				"volume",													// config関連
				"cheat",
			],
		});
		this.timeLine = new tl.Timeline(this);
		const version: string = "ver. 1.00";
		this.isClear = false;

		// 市場コンテンツのランキングモードでは、g.game.vars.gameState.score の値をスコアとして扱います
		g.game.vars.gameState = { score: 0 };

		/**
		 * シーン読み込み時処理
		 */
		this.onLoad.add(() => {
			// -----------------------------
			// BGM再生
			// -----------------------------
			const bgm = this.asset.getAudioById("nc298326");
			this.bgmPlayer = bgm.play();
			this.bgmPlayer.changeVolume(this.isDebug ? 0.0 : 0.2);
			// -----------------------------
			// 背景
			// -----------------------------
			new g.FilledRect({
				scene: this,
				width: g.game.width,
				height: g.game.height,
				cssColor: "#600000",
				parent: this,
				opacity: param.isAtsumaru || this.isDebug ? 1.0 : 0.9,
			});
			// レイヤー0
			this.layer0 = new g.E({ scene: this, parent: this, });
			// -----------------------------
			// ビットマップフォント
			// -----------------------------
			// ビットマップフォント(黒)を生成
			this.font = new g.BitmapFont({
				src: this.asset.getImageById("number"),
				glyphInfo: JSON.parse(this.asset.getTextById("glyph").data),
			});

			// -----------------------------
			// タイトル
			// -----------------------------
			const title = new g.Sprite({ scene: this, src: this.asset.getImageById("title") });
			this.append(title);
			// タイトルアニメーション
			this.timeLine
				.create(title)
				.wait(this.isDebug ? 1000 : 3000)
				.moveBy(-1280, 0, 200)
				.call(() => {
					this.sceneMain(param);
				});
			// -----------------------------
			// バージョン情報
			// -----------------------------
			// フォント
			const font = new g.DynamicFont({
				game: g.game,
				fontFamily: "monospace",
				size: 24,
			});
			new g.Label({
				scene: this,
				font: font,
				fontSize: 24,
				text: version,
				textColor: "white",
				parent: title,
			});
			// -----------------------------
			// コンフィグ
			// -----------------------------
			const config = new Config(this);
			config.bgmEvent = () => {
				if (!this.isDebug) {
					if (config.frameNumber === 0) {
						this.bgmPlayer.changeVolume(0.2);
					} else {
						this.bgmPlayer.changeVolume(0.0);
					}
				}
			};
			// -----------------------------
			// セーブデータ表示用ラベル
			// -----------------------------
			this.saveData = new SaveData(this, 0, g.game.height - 500);
			title.append(this.saveData);
			this.saveData.updateSaveData();
		});
	}
	/**
	 * 効果音を先生する
	 * @param name 再生するアセットID
	 */
	playSound(name: string): void {
		(this.asset.getAudioById(name) as g.AudioAsset).play().changeVolume(0.8);
	}
	/**
	 * メインシーン
	 * @param param ゲームメインパラメータ
	 */
	sceneMain(param: GameMainParameterObject): void {
		// メインゲーム
		let gameMain = new GameMain(param);
		// -----------------------------
		// ビットマップフォント(赤)を生成
		// -----------------------------
		const fontRed = new g.BitmapFont({
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
		const lblScore = new g.Label({
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
		const lblTime = new g.Label({
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
		const rctFg = new g.FilledRect({
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
		const sprState = new g.FrameSprite({
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
		const fontClear = new g.DynamicFont({
			game: g.game,
			fontFamily: "monospace",
			size: 50,
			fontWeight: "bold",
			fontColor: "white",
		});
		const lblClear = new g.Label({
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
		// アツマール処理
		// -----------------------------
		const btnExtend = new Button(this, ["継続"], 1000, 280, 260);
		const btnReset = new Button(this, ["リセット"], 1000, 520, 260);
		const btnRanking = new Button(this, ["ランキング"], 1000, 400, 260);
		if (param.isAtsumaru || this.isDebug) {
			// 継続ボタン
			btnExtend.modified();
			this.append(btnExtend);
			btnExtend.pushEvent = () => {
				this.saveData.hide();
				this.isStart = true;
				sprState.hide();
				rctFg.opacity = 0;
				btnReset.hide();
				btnRanking.hide();
				btnExtend.hide();
			};
			// リセットボタン
			btnReset.modified();
			this.append(btnReset);
			btnReset.pushEvent = () => {
				this.reset();
			};
			// ランキングボタン
			btnRanking.modified();
			this.append(btnRanking);
			btnRanking.pushEvent = () => {
				window.RPGAtsumaru.scoreboards.display(this.boardId);
			};
		};

		// =============================
		// updateHandler
		// =============================
		const updateHandler = (): void => {
			if ((this.time < 0 || this.isClear) && this.isStart) {
				// ボタン表示メソッド
				const showButton = (): void => {
					btnReset.show();
					btnRanking.show();
					if (!this.isClear) {
						btnExtend.show();
					}
				};
				// スコアに残り秒を足す
				if (this.isClear) {
					this.addScore(Math.ceil(this.time));
				}
				// セーブデータ表示
				this.append(this.saveData);
				if (g.game.vars.gameState.score !== 0) {
					this.saveData.calcSaveData(this.isClear ? true : false);
				}
				if (!this.isCheat) {
					this.saveData.show();
				}
				// アツマール処理
				this.setTimeout(() => {
					if (param.isAtsumaru) {
						window.RPGAtsumaru.scoreboards.setRecord(this.boardId, g.game.vars.gameState.score).then(() => {
							showButton();
						});
					}
					if (this.isDebug) {
						showButton();
					}
				}, 500);
				// 終了表示
				sprState.frameNumber = 1;
				sprState.x = g.game.width / 2;
				sprState.modified();
				sprState.show();
				// クリア
				lblClear.text = this.isClear ? "クリア! 残り" + Math.ceil(this.time) + "秒" : "";
				lblClear.invalidate();
				// FrontGround
				rctFg.cssColor = "black";
				rctFg.opacity = 0.3;
				rctFg.modified();
				//
				this.isStart = false;
			}
			// 更新の停止
			if (this.time < 0) {
				this.onUpdate.remove(updateHandler);
				this.playSound("se_timeUp");
			}
			// カウントダウン処理
			this.time -= 1 / g.game.fps;
			lblTime.text = "" + Math.ceil(this.time);
			lblTime.invalidate();
			// ラスト5秒の点滅
			if (this.time <= 5 && !this.isClear) {
				rctFg.opacity = (this.time - Math.floor(this.time)) / 3;
				rctFg.modified();
			}
		};

		// =============================
		// スコア追加
		// =============================
		this.addScore = (score) => {
			if (score === 0) return;
			if (!this.isStart) return;
			let s: number = g.game.vars.gameState.score - 13 ** 2 * 8 * 100;
			if (s > 180 || (s > 0 && s <= 180 && score >= 100)) {
				this.isCheat = true;
				g.game.vars.gameState.score = 0;
				new g.Sprite({
					scene: this,
					src: this.asset.getImageById("cheat"),
					parent: this,
				});
				return;
			}
			g.game.vars.gameState.score += score;
			// スコアアップアニメーション
			this.timeLine.create(this).every((e: number, p: number) => {
				lblScore.text = "" + (g.game.vars.gameState.score - Math.floor(score * (1 - p))) + "P";
				lblScore.invalidate();
			}, 500);
			// 追加スコア表示用ラベル
			const label = new g.Label({
				scene: this,
				text: (score >= 0 ? "+" : "") + score,
				font: fontRed,
				fontSize: 32,
				x: 200,
				y: 580,
				width: 610,
				widthAutoAdjust: false,
				textAlign: "right",
				opacity: 0.0,
				parent: this,
			});
			// 追加スコアアニメーション
			this.timeLine
				.create(label).every((e: number, p: number) => {
					label.opacity = p;
				}, 100)
				.wait(500)
				.call(() => {
					label.destroy();
				});
		};
		// =============================
		// リセット処理
		// =============================
		this.reset = (): void => {
			// チートフラグ
			this.isCheat = false;
			// クリアフラグ
			this.isClear = false;
			// 個人成績
			this.saveData.hide();
			// ゲーム画面
			gameMain.destroy();
			gameMain = new GameMain(param);
			this.layer0.append(gameMain);
			// タイマー
			this.time = this.timeLimit;
			lblTime.text = "" + this.time;
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
			this.setTimeout(() => {
				sprState.hide();
			}, 1000);
			this.playSound("se_start");
			// 各種ボタン
			btnExtend.hide();
			btnReset.hide();
			btnRanking.hide();
			// FrontGround
			rctFg.opacity = 0;
			rctFg.cssColor = "red";
			rctFg.modified();
			// 更新イベント
			this.onUpdate.remove(updateHandler);
			this.onUpdate.add(updateHandler);
			//
			this.isStart = true;
		};
		// 初回リセット
		this.reset();
	}
}
