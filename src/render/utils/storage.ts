
/**
 * 永久缓存
 * @method set 设置临时缓存
 * @method get 获取临时缓存
 * @method remove 移除临时缓存
 * @method clear 移除全部临时缓存
 */

const { setItem, getItem, delItem, isExist, clear } = window.session;

export const Local = {
	// 设置临时缓存
	set(key: string, val: any) {
		window.localStorage.setItem(key, JSON.stringify(val));
	},
	// 获取临时缓存
	get(key: string) {
		let json = <string>window.localStorage.getItem(key);
		return JSON.parse(json);
	},
	// 移除临时缓存
	remove(key: string) {
		window.localStorage.removeItem(key);
	},
	// 移除全部临时缓存
	clear() {
		window.localStorage.clear();
	},
};

/**
 * 永久缓存
 * @method set 设置临时缓存
 * @method get 获取临时缓存
 * @method remove 移除临时缓存
 * @method clear 移除全部临时缓存
 */
export const Session = {
	// 设置永久缓存
	set(key: string, val: any) {
		setItem(key, val);
	},
	// 获取临时缓存
	async get(key: string) {
		return await getItem(key);
	},
	// 移除临时缓存
	remove(key: string) {
		delItem(key);
	},
	// 移除全部临时缓存
	removeAll() {
		clear();
	},
	async has(key: string) {
		return await isExist(key);
	}
};
