window.gLocalAssetContainer["utilAkashic"] = function(g) { (function(exports, require, module, __filename, __dirname) {
"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomValue = exports.shuffleArray = void 0;
/**
 * 任意の配列を混ぜる
 * @param array 配列
 * @param param ゲームパラメータ
 * @returns シャッフルされた配列
 */
function shuffleArray(array, rand) {
    var _a;
    var shfArray = __spreadArray([], array, true);
    for (var i = shfArray.length - 1; i > 0; i--) {
        var j = Math.floor(rand.generate() * (i + 1));
        _a = [shfArray[j], shfArray[i]], shfArray[i] = _a[0], shfArray[j] = _a[1];
    }
    return shfArray;
}
exports.shuffleArray = shuffleArray;
/**
 * 任意の配列からランダムな要素１つを取り出す
 * @param array 配列
 * @param param ゲームパラメータ
 * @returns 要素
 */
function getRandomValue(array, rand) {
    var idx = Math.floor(rand.generate() * array.length);
    return array.splice(idx, 1);
}
exports.getRandomValue = getRandomValue;

})(g.module.exports, g.module.require, g.module, g.filename, g.dirname);
}