import { defineStore } from 'pinia';
import { Session } from '@render/utils/storage';
import { useLoginApi } from '@render/api/login';
import { use } from 'echarts/types/src/extension';

/**
 * 用户信息
 * @methods setUserInfos 设置用户信息
 */
export const useUserInfo = defineStore('userInfo', {
	state: (): UserInfosState => ({
		userInfos: {
			userName: '',
			avatar: '',
			time: 0,
			roles: [],
			authBtnList: [],
		},
	}),
	actions: {
		async signIn(params) {
			const loginApi = useLoginApi()
			const res = await loginApi.signIn(params)
			let { data } = res;
			Session.set('token', data.token);
			this.userInfos = data;
		},
		async setUserInfos() {
			// 存储用户信息到浏览器缓存
			let isExist = await Session.has('userInfo')
			if (isExist) {
				this.userInfos = await Session.get('userInfo');
			} else {
				const userInfos: any = await this.getApiUserInfo();
				this.userInfos = userInfos;
			}
		},
		// 模拟接口数据
		async getApiUserInfo() {
			return new Promise((resolve) => {
				setTimeout(async () => {
					let isExist = await Session.has('userInfo')
					// 模拟数据，请求接口时，记得删除多余代码及对应依赖的引入
					const userName = isExist ? null : await Session.get('userName');
					// 模拟数据
					let defaultRoles: Array<string> = [];
					let defaultAuthBtnList: Array<string> = [];
					// admin 页面权限标识，对应路由 meta.roles，用于控制路由的显示/隐藏
					let adminRoles: Array<string> = ['admin'];
					// admin 按钮权限标识
					let adminAuthBtnList: Array<string> = ['btn.add', 'btn.del', 'btn.edit', 'btn.link'];
					// test 页面权限标识，对应路由 meta.roles，用于控制路由的显示/隐藏
					let testRoles: Array<string> = ['common'];
					// test 按钮权限标识
					let testAuthBtnList: Array<string> = ['btn.add', 'btn.link'];
					// 不同用户模拟不同的用户权限
					if (userName === 'admin') {
						defaultRoles = adminRoles;
						defaultAuthBtnList = adminAuthBtnList;
					} else {
						defaultRoles = testRoles;
						defaultAuthBtnList = testAuthBtnList;
					}
					// 用户信息模拟数据
					const userInfos = {
						userName: userName,
						avatar:
							userName === 'admin'
								? 'https://img2.baidu.com/it/u=1978192862,2048448374&fm=253&fmt=auto&app=138&f=JPEG?w=504&h=500'
								: 'https://img2.baidu.com/it/u=2370931438,70387529&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
						time: new Date().getTime(),
						roles: defaultRoles,
						authBtnList: defaultAuthBtnList,
					};
					resolve(userInfos);
				}, 0);
			});
		},
	},
});
