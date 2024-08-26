<template>
	<div class="chart-scrollbar layout-padding">
		<div class="chart-warp layout-padding-auto layout-padding-view">
			<div class="chart-warp-top" >
				<ChartHead />
			</div>
			<div class="chart-warp-bottom" style="width: 100%;">
				<!-- 中间 -->
				<div class="big-data-down-center" style="width: 100% !important; ">
					<div class="big-data-down-center-one">
						<div class="big-data-down-center-one-content">
							<div style="height: 100%" ref="chartsCenterOneRef"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts" name="chartIndex">
import { defineAsyncComponent, reactive, onMounted, watch, nextTick, onActivated, ref } from 'vue';
import * as echarts from 'echarts';
import 'echarts-wordcloud';
import { storeToRefs } from 'pinia';
import { useTagsViewRoutes } from '@render/stores/tagsViewRoutes';

// 引入组件
const ChartHead = defineAsyncComponent(() => import('@render/views/chart/head.vue'));

// 定义变量内容
const chartsCenterOneRef = ref();
const chartsMonitorRef = ref();
const chartsInvestmentRef = ref();
const storesTagsViewRoutes = useTagsViewRoutes();
const { isTagsViewCurrenFull } = storeToRefs(storesTagsViewRoutes);
const state = reactive({
	myCharts: [] as EmptyArrayType,
});

// 初始化中间图表1
const initChartsCenterOne = () => {
	const myChart = echarts.init(chartsCenterOneRef.value);
	const option = {
		grid: {
			top: 15,
			right: 15,
			bottom: 20,
			left: 30,
		},
		tooltip: {},
		series: [
			{
				type: 'wordCloud',
				sizeRange: [20, 60],
				rotationRange: [0, 0],
				rotationStep: 45,
				// gridSize: Math.random() * 20 + 5,
				shape: 'circle',
				width: '100%',
				height: '100%',
				textStyle: {
					fontFamily: 'sans-serif',
					fontWeight: 'bold',
					color: function () {
						return `rgb(${[Math.round(Math.random() * 160), Math.round(Math.random() * 160), Math.round(Math.random() * 160)].join(',')})`;
					},
				},
				data: Array.from({length: 100}).map((item, index) => ({
					name: `常用功能${ index+1 }`,
					value: parseInt(`${ Math.random() * 100 }`)
				}))
			},
		],
	};
	myChart.setOption(option);
	state.myCharts.push(myChart);
};


// 批量设置 echarts resize
const initEchartsResizeFun = () => {
	nextTick(() => {
		for (let i = 0; i < state.myCharts.length; i++) {
			state.myCharts[i].resize();
		}
	});
};
// 批量设置 echarts resize
const initEchartsResize = () => {
	window.addEventListener('resize', initEchartsResizeFun);
};
// 页面加载时
onMounted(() => {
	initChartsCenterOne();
	initEchartsResize();
});
// 由于页面缓存原因，keep-alive
onActivated(() => {
	initEchartsResizeFun();
});
// 监听 pinia 中的 tagsview 开启全屏变化，重新 resize 图表，防止不出现/大小不变等
watch(
	() => isTagsViewCurrenFull.value,
	() => {
		initEchartsResizeFun();
	}
);
</script>

<style scoped lang="scss">
@import './chart.scss';
</style>
