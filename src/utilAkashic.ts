/**
 * 任意の配列を混ぜる
 * @param array 配列
 * @param param ゲームパラメータ
 * @returns シャッフルされた配列
 */
export function shuffleArray<T>(array: T[], rand: g.RandomGenerator): T[] {
	const shfArray = [...array];
	for (let i = shfArray.length - 1; i > 0; i--) {
		const j = Math.floor(rand.generate() * (i + 1));
		[shfArray[i], shfArray[j]] = [shfArray[j], shfArray[i]];
	}
	return shfArray;
}

/**
 * 任意の配列からランダムな要素１つを取り出す
 * @param array 配列
 * @param param ゲームパラメータ
 * @returns 要素
 */
export function getRandomValue<T>(array: T[], rand: g.RandomGenerator): T[] {
	const idx: number = Math.floor(rand.generate() * array.length);
	return array.splice(idx, 1);
}
