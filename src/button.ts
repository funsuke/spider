/**
 * ボタンクラス
 */
export class Button extends g.FilledRect {

	static font: g.Font;

	public chkEnable: (ev: g.PointDownEvent) => boolean;
	// プッシュイベント
	public pushEvent!: (ev: g.PointUpEvent) => void;

	private num: number = 0;
	private label: g.Label;

	/**
	 * コンストラクタ
	 * @param scene シーン
	 * @param s 表示文字列
	 * @param x 表示X位置
	 * @param y 表示Y位置
	 * @param w 表示幅
	 * @param h 表示高さ
	 */
	constructor(scene: g.Scene, s: string[], x: number = 0, y: number = 0, w: number = 200, h: number = 100) {
		// -----------------------------
		// 親クラス(ボタン周りの線の色：黒)
		// -----------------------------
		super({
			scene: scene,
			cssColor: "black",
			width: w,
			height: h,
			x: x,
			y: y,
			touchable: true,
		});
		//
		this.chkEnable = (ev) => true;
		// -----------------------------
		// フォントの設定
		// -----------------------------
		if (Button.font == null) {
			Button.font = new g.DynamicFont({
				game: g.game,
				fontFamily: "monospace",
				size: 48,
			});
		}
		// -----------------------------
		// ベースの色(白)
		// -----------------------------
		const base = new g.FilledRect({
			scene: scene,
			x: 2, y: 2,
			width: w - 4, height: h - 4,
			cssColor: "white",
		});
		this.append(base);
		// -----------------------------
		// ラベル実体
		// -----------------------------
		this.label = new g.Label({
			scene: scene,
			font: Button.font,
			text: s[0],
			fontSize: 48,
			textColor: "black",
			widthAutoAdjust: false,
			textAlign: "center",
			width: w - 4,
		});
		this.label.y = (h - 4 - this.label.height) / 2;
		this.label.modified();
		base.append(this.label);
		// =============================
		// ポイントダウンイベント
		// =============================
		this.onPointDown.add((ev) => {
			if (!this.chkEnable(ev)) return;
			// 灰色にする
			base.cssColor = "gray";
			base.modified();
			// 文字列が2つ以上の場合それに変更
			if (s.length !== 1) {
				this.num = (this.num + 1) % s.length;
				this.label.text = s[this.num];
				this.label.invalidate();
			}
		});
		// =============================
		// ポイントアップイベント
		// =============================
		this.onPointUp.add((ev) => {
			// 白色にする
			base.cssColor = "white";
			base.modified();
			// プッシュイベントを実行
			this.pushEvent(ev);
		});
	}
}
