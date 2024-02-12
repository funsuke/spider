window.gLocalAssetContainer["main"] = function(g) { (function(exports, require, module, __filename, __dirname) {
"use strict";
// https://github.com/hanakusogame/spider
// 既存スパイダーとの比較点
// ・１クリック移動
// ・置ける場合、空きではなく(場札の)山に移動
// ・山札（ダブルクリック or 数frame待つ）
// ・確率を勉強しまっせ（上にA,Kを出にくくする）
// ・Score(クリア時) 135200+残り秒数
// ・戻るボタンを付ける
// ・数秒動かないとヒント（ボタンは付けない）
// ・待ち時間はクリア後も動くようする
// ・（出来たら）クリア演出
// ・デッキ2組(スート1組8セット,104枚)、54枚が場札(6666555555,24+30)、50枚が山札
// ■ 点数計算
//   場札(10箇所) : (揃っているカード - 1) ^ 2 x 100
//   組札(8組) : 13 ^ 2 * 100 + 残り時間
// ・現行＞上から揃ってるカードを計算
// ・初心＞途中でも揃ってるカードを計算
// ■ 表示
// ・プレイ数(内部保持：クリア数)
// ・クリア率
// ・ベストスコア
// ・平均スコア
//   nxt = ave + (scr-ave) / (ply+1)
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
var sceneGame_1 = require("./sceneGame");
function main(param) {
    g.game.pushScene(new sceneGame_1.SceneGame(param));
}
exports.main = main;

})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}