import { SceneGame } from "./sceneGame";

export type TypeSaveData = {
	ply: number;		// プレイ数
	win: number;		// 勝利数
	max: number;		// ベストスコア
	ave: number;		// 平均スコア
};

/**
 * セーブデータ
 */
export class SaveData extends g.Sprite {
	private lblPly: g.Label;
	private lblWin: g.Label;
	private lblMax: g.Label;
	private lblAve: g.Label;
	/**
	 * コンストラクタ
	 * @param scene シーン
	 */
	constructor(scene: SceneGame, x: number, y: number) {
		// 初期化
		super({
			scene: scene,
			src: scene.asset.getImageById("result"),
			width: 365,
			height: 500,
			x: x,
			y: y,
		});
		scene.append(this);
		// ラベルパラメータ
		const paraLabel: g.LabelParameterObject = {
			scene: scene,
			text: "0",
			font: scene.font,
			fontSize: 20,
			width: 320,
			textAlign: "right",
			widthAutoAdjust: false,
			parent: this,
		};
		// ラベル 360 => 720-500 => 140
		paraLabel.y = 140;
		this.lblPly = new g.Label(paraLabel);
		paraLabel.y += 90;
		this.lblWin = new g.Label(paraLabel);
		paraLabel.y += 90;
		this.lblMax = new g.Label(paraLabel);
		paraLabel.y += 90;
		this.lblAve = new g.Label(paraLabel);
	}
	/**
	 * セーブデータを計算して、ローカルストレージに保存する
	 * @param flgClear クリアしたかどうか
	 * @returns TypeSaveData セーブデータ
	 */
	public calcSaveData(flgClear: boolean): void {
		let saveData: TypeSaveData = { ply: 0, win: 0, max: 0, ave: 0 };
		const score: number = g.game.vars.gameState.score;
		// 取得
		saveData = this.getSaveData();
		// 計算
		saveData.ply += 1;
		if (flgClear) {
			saveData.win += 1;
			saveData.ave += (score - saveData.ave) / saveData.win;
		}
		if (score > saveData.max) saveData.max = score;
		// console.log("calcSaveData");
		// console.log(saveData);
		// 更新
		this.updateSaveData(saveData);
		// 保存
		this.setSaveData(saveData);
	}
	/**
	 * 表示データの更新
	 * @param saveData セーブデータ
	 */
	public updateSaveData(saveData: TypeSaveData = null): void {
		if (saveData === null) {
			saveData = this.getSaveData();
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
	}
	/**
	 * セーブデータの取得
	 * @returns TypeSaveData セーブデータ
	 */
	private getSaveData(): TypeSaveData {
		let saveData: TypeSaveData = {
			ply: 0,
			win: 0,
			max: 0,
			ave: 0,
		};
		if (window.localStorage) {
			// console.log("getSaveDataでlocalStorageは使えます");
			const data = JSON.parse(localStorage.getItem("gm28806_saveData"));
			// console.log(data);
			if (data !== null) saveData = data;
		} else {
			// console.log("getSaveDataでlocalStorageは使えませんでした");
		}
		return saveData;
	}
	/**
	 * セーブデータを保存する
	 * @param saveData TypeSaveData セーブデータ
	 */
	private setSaveData(saveData: TypeSaveData): void {
		if (window.localStorage) {
			// console.log("setSaveDataでlocalStorageは使えます");
			const json = JSON.stringify(saveData, undefined, 1);
			// console.log(json);
			localStorage.setItem("gm28806_saveData", json);
		} else {
			// console.log("setSaveDataでlocalStorageは使えませんでした");
		}
	}
}
