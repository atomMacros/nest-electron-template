import { RouteRecordRaw } from 'vue-router';

/**
 * 建议：路由 path 路径与文件夹名称相同，找文件可浏览器地址找，方便定位文件位置
 *
 * 路由meta对象参数说明
 * meta: {
 *      title:          菜单栏及 tagsView 栏、菜单搜索名称（国际化）
 *      ExternalLink：        是否超链接菜单，开启外链条件，`1、isLink: 链接地址不为空 2、isIframe:false`
 *      hidden：        是否隐藏此路由
 *      cache：   是否缓存组件状态
 *      affix：       是否固定在 tagsView 栏上
 *      isIframe：      是否内嵌窗口，开启条件，`1、isIframe:true 2、isLink：链接地址不为空`
 *      roles：         当前路由权限标识，取角色管理。控制路由显示、隐藏。超级管理员：admin 普通角色：common
 *      icon：          菜单、tagsView 图标，阿里：加 `iconfont xxx`，fontawesome：加 `fa xxx`
 * }
 */

// 扩展 RouteMeta 接口
declare module 'vue-router' {
	interface RouteMeta {
		title?: string;
		ExternalLink?: string;
		hidden?: boolean;
		cache?: boolean;
		affix?: boolean;
		isIframe?: boolean;
		roles?: string[];
		icon?: string;
	}
}

/**
 * 定义动态路由
 * 前端添加路由，请在顶级节点的 `children 数组` 里添加
 * @description 未开启 isRequestRoutes 为 true 时使用（前端控制路由），开启时第一个顶级 children 的路由将被替换成接口请求回来的路由数据
 * @description 各字段请查看 `@render/views/system/menu/component/addMenu.vue 下的 ruleForm`
 * @returns 返回路由菜单数据
 */
export const dynamicRoutes: Array<RouteRecordRaw> = [
	{
		path: '/',
		name: '/',
		component: () => import('@render/layout/index.vue'),
		redirect: '/home',
		meta: {
			cache: true,
		},
		children: [
			{
				path: '/home',
				name: 'home',
				component: () => import('@render/views/home/index.vue'),
				meta: {
					title: 'message.router.home',
					ExternalLink: '',
					hidden: false,
					cache: true,
					affix: true,
					isIframe: false,
					roles: ['admin', 'common'],
					icon: 'iconfont icon-shouye',
				},
			},
			{
				path: '/system',
				name: 'system',
				component: () => import('@render/layout/routerView/parent.vue'),
				redirect: '/system/menu',
				meta: {
					title: 'message.router.system',
					ExternalLink: '',
					hidden: false,
					cache: true,
					affix: false,
					isIframe: false,
					roles: ['admin', 'common'],
					icon: 'iconfont icon-xitongshezhi',
				},
				children: [
					{
						path: '/system/menu',
						name: 'systemMenu',
						component: () => import('@render/views/system/menu/index.vue'),
						meta: {
							title: 'message.router.systemMenu',
							ExternalLink: '',
							hidden: false,
							cache: true,
							affix: false,
							isIframe: false,
							roles: ['admin', 'common'],
							icon: 'iconfont icon-caidan',
						},
					},
					{
						path: '/system/role',
						name: 'systemRole',
						component: () => import('@render/views/system/role/index.vue'),
						meta: {
							title: 'message.router.systemRole',
							ExternalLink: '',
							hidden: false,
							cache: true,
							affix: false,
							isIframe: false,
							roles: ['admin', 'common'],
							icon: 'ele-ColdDrink',
						},
					},
					{
						path: '/system/user',
						name: 'systemUser',
						component: () => import('@render/views/system/user/index.vue'),
						meta: {
							title: 'message.router.systemUser',
							ExternalLink: '',
							hidden: false,
							cache: true,
							affix: false,
							isIframe: false,
							roles: ['admin', 'common'],
							icon: 'iconfont icon-icon-',
						},
					},
					{
						path: '/system/dept',
						name: 'systemDept',
						component: () => import('@render/views/system/dept/index.vue'),
						meta: {
							title: 'message.router.systemDept',
							ExternalLink: '',
							hidden: false,
							cache: true,
							affix: false,
							isIframe: false,
							roles: ['admin', 'common'],
							icon: 'ele-OfficeBuilding',
						},
					},
					{
						path: '/system/dic',
						name: 'systemDic',
						component: () => import('@render/views/system/dic/index.vue'),
						meta: {
							title: 'message.router.systemDic',
							ExternalLink: '',
							hidden: false,
							cache: true,
							affix: false,
							isIframe: false,
							roles: ['admin', 'common'],
							icon: 'ele-SetUp',
						},
					},
				],
			},
			{
				path: '/menu',
				name: 'menu',
				component: () => import('@render/layout/routerView/parent.vue'),
				redirect: '/menu/menu1',
				meta: {
					title: 'message.router.menu',
					ExternalLink: '',
					hidden: false,
					cache: true,
					affix: false,
					isIframe: false,
					roles: ['admin', 'common'],
					icon: 'iconfont icon-caidan',
				},
				children: [
					{
						path: '/menu/menu1',
						name: 'menu1',
						component: () => import('@render/layout/routerView/parent.vue'),
						redirect: '/menu/menu1/menu11',
						meta: {
							title: 'message.router.menu1',
							ExternalLink: '',
							hidden: false,
							cache: true,
							affix: false,
							isIframe: false,
							roles: ['admin', 'common'],
							icon: 'iconfont icon-caidan',
						},
						children: [
							{
								path: '/menu/menu1/menu11',
								name: 'menu11',
								component: () => import('@render/views/menu/menu1/menu11/index.vue'),
								meta: {
									title: 'message.router.menu11',
									ExternalLink: '',
									hidden: false,
									cache: true,
									affix: false,
									isIframe: false,
									roles: ['admin', 'common'],
									icon: 'iconfont icon-caidan',
								},
							},
							{
								path: '/menu/menu1/menu12',
								name: 'menu12',
								component: () => import('@render/layout/routerView/parent.vue'),
								redirect: '/menu/menu1/menu12/menu121',
								meta: {
									title: 'message.router.menu12',
									ExternalLink: '',
									hidden: false,
									cache: true,
									affix: false,
									isIframe: false,
									roles: ['admin', 'common'],
									icon: 'iconfont icon-caidan',
								},
								children: [
									{
										path: '/menu/menu1/menu12/menu121',
										name: 'menu121',
										component: () => import('@render/views/menu/menu1/menu12/menu121/index.vue'),
										meta: {
											title: 'message.router.menu121',
											ExternalLink: '',
											hidden: false,
											cache: true,
											affix: false,
											isIframe: false,
											roles: ['admin', 'common'],
											icon: 'iconfont icon-caidan',
										},
									},
									{
										path: '/menu/menu1/menu12/menu122',
										name: 'menu122',
										component: () => import('@render/views/menu/menu1/menu12/menu122/index.vue'),
										meta: {
											title: 'message.router.menu122',
											ExternalLink: '',
											hidden: false,
											cache: true,
											affix: false,
											isIframe: false,
											roles: ['admin', 'common'],
											icon: 'iconfont icon-caidan',
										},
									},
								],
							},
							{
								path: '/menu/menu1/menu13',
								name: 'menu13',
								component: () => import('@render/views/menu/menu1/menu13/index.vue'),
								meta: {
									title: 'message.router.menu13',
									ExternalLink: '',
									hidden: false,
									cache: true,
									affix: false,
									isIframe: false,
									roles: ['admin', 'common'],
									icon: 'iconfont icon-caidan',
								},
							},
						],
					},
					{
						path: '/menu/menu2',
						name: 'menu2',
						component: () => import('@render/views/menu/menu2/index.vue'),
						meta: {
							title: 'message.router.menu2',
							ExternalLink: '',
							hidden: false,
							cache: true,
							affix: false,
							isIframe: false,
							roles: ['admin', 'common'],
							icon: 'iconfont icon-caidan',
						},
					},
				],
			},
			{
				path: '/workflow',
				name: 'workflow',
				component: () => import('@render/layout/routerView/parent.vue'),
				redirect: '/workflow/rule-chain',
				meta: {
					title: 'message.router.workflow',
					ExternalLink: '',
					hidden: false,
					cache: true,
					affix: false,
					isIframe: false,
					roles: ['admin', 'common'],
					icon: 'iconfont icon-xitongshezhi',
				},
				children: [
					{
						path: '/workflow/rule-chain',
						name: 'ruleChain',
						component: () => import('@render/views/workflow/rule-chain/index.vue'),
						meta: {
							title: 'message.router.ruleChain',
							ExternalLink: '',
							hidden: false,
							cache: true,
							affix: false,
							isIframe: false,
							roles: ['admin', 'common'],
							icon: 'iconfont icon-caidan',
						},
					},
					{
						path: '/workflow/rule-chain/form/:id',
						name: 'ruleChainForm',
						component: () => import('@render/views/workflow/rule-chain/form.vue'),
						meta: {
							title: 'message.router.ruleChainForm',
							ExternalLink: '',
							hidden: true,
							cache: true,
							affix: false,
							isIframe: false,
							roles: ['admin', 'common'],
							icon: 'iconfont icon-caidan',
						},
					},
				],
			},
			{
				path: '/chart',
				name: 'chartIndex',
				component: () => import('@render/views/chart/index.vue'),
				meta: {
					title: 'message.router.chartIndex',
					ExternalLink: '',
					hidden: false,
					cache: true,
					affix: false,
					isIframe: false,
					roles: ['admin', 'common'],
					icon: 'iconfont icon-ico_shuju',
				},
			},
			{
				path: '/tools',
				name: 'tools',
				component: () => import('@render/views/tools/index.vue'),
				meta: {
					title: 'message.router.tools',
					ExternalLink: '',
					hidden: false,
					cache: true,
					affix: false,
					isIframe: false,
					roles: ['admin', 'common'],
					icon: 'iconfont icon-gongju',
				},
			},
		],
	},
];

/**
 * 定义404、401界面
 * @link 参考：https://next.router.vuejs.org/zh/guide/essentials/history-mode.html#netlify
 */
export const notFoundAndNoPower = [
	{
		path: '/:path(.*)*',
		name: 'notFound',
		component: () => import('@render/views/error/404.vue'),
		meta: {
			title: 'message.staticRoutes.notFound',
			hidden: true,
		},
	},
	{
		path: '/401',
		name: 'noPower',
		component: () => import('@render/views/error/401.vue'),
		meta: {
			title: 'message.staticRoutes.noPower',
			hidden: true,
		},
	},
];

/**
 * 定义静态路由（默认路由）
 * 此路由不要动，前端添加路由的话，请在 `dynamicRoutes 数组` 中添加
 * @description 前端控制直接改 dynamicRoutes 中的路由，后端控制不需要修改，请求接口路由数据时，会覆盖 dynamicRoutes 第一个顶级 children 的内容（全屏，不包含 layout 中的路由出口）
 * @returns 返回路由菜单数据
 */
export const staticRoutes: Array<RouteRecordRaw> = [
	{
		path: '/login',
		name: 'login',
		component: () => import('@render/views/login/index.vue'),
		meta: {
			title: '登录',
		},
	},
];
