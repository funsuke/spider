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

// 2024/01/18 追記
// ■理不尽な詰み方を無くすシャッフルをしたい
// ・現行(Card.setNumbers)はedges(A,K),centers(5-9),others(2-4,T-Q)
// 　に分け、edgePercentsに従って振り分けるアルゴリズムにしている
// ・うまく繋がった場合はサクサクだが、特定のカードが全く無く
// 　2, 3手で毎回捲らされて詰むという場が少なくなかった
// ・つながりを意識したランダムにしたいので、必ず連結できる3枚3組(2-4,6-8,J-Kなど)と
// 　他1枚を適当にランダムした10枚10組と残り4枚で場札、山札にセットしたい
// ■場or山
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
// ｜
// ｜(A,K),(2,Q)がいつまで経っても出てこないってことになりかねないので↓の方が良いか？
// ｜(プログラムも楽？だし)
// ↓
//  ■場or山
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
// ■場4について
// ・こいつは場札の一番左奥(左下、表示上は左上?)に置く
// ・恐らく(A,K),(2,Q)になりやすいが、別にアルゴリズムがバレても構わない
// ・上(A,2)と下(Q,K)が全然来ない場合、こちらの左4つの場札を捲れば
// 　出やすいという経験値が溜まって解きやすくなるだろう

import { SceneGame } from "./sceneGame";

export function main(param: g.GameMainParameterObject): void {
	g.game.pushScene(new SceneGame(param));
}
