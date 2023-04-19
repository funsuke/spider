export class Config extends g.FrameSprite {
	// プロパティ
	public bgmEvent: () => void;
	/**
	 * コンストラクタ
	 * @param scene シーン
	 */
	constructor(scene: g.Scene) {
		// 初期化
		super({
			scene: scene,
			src: scene.asset.getImageById("volume"),
			width: 64,
			height: 64,
			x: g.game.width - 20 - 64,
			y: 10,
			frames: [0, 1],
			frameNumber: 0,
			touchable: true,
			parent: scene,
		});
		// =============================
		// 画像押下時処理
		// =============================
		this.onPointDown.add((ev) => {
			console.log("SceneConfig::onPointDown_in");
			this.frameNumber = 1 - this.frameNumber;
			this.modified();
			this.bgmEvent();
			console.log("SceneConfig::onPointDown_out");
		});
	}
}
