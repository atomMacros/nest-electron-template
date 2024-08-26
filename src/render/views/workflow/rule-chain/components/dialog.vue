<template>
	<div class="system-user-dialog-container">
		<el-dialog :title="state.dialog.title" v-model="state.dialog.isShowDialog" width="769px">
			<el-form ref="userDialogFormRef" :model="state.ruleForm" size="default" label-width="90px">
				<el-row :gutter="35">
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="名称">
							<el-input v-model="state.ruleForm.name" placeholder="请输入名称" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="描述文字">
							<el-input v-model="state.ruleForm.desc" placeholder="请输入描述性文字" clearable></el-input>
						</el-form-item>
					</el-col>
					<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
						<el-form-item label="是否启用">
							<el-select v-model="state.ruleForm.isEnable" placeholder="请选择" clearable class="w100">
								<el-option label="启用" :value="1"></el-option>
								<el-option label="不启用" :value="0"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="onCancel" size="default">取 消</el-button>
					<el-button type="primary" @click="onSubmit" size="default">{{ state.dialog.submitTxt }}</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script setup lang="ts" name="ruleChain">
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()

// 定义子组件向父组件传值/事件
const emit = defineEmits(['refresh']);

// 定义变量内容
const userDialogFormRef = ref();
const state = reactive({
	ruleForm: {
		name: '',
		desc: '',
		isEnable: 1,
		createTime: new Date().toLocaleString(),
	},
	deptData: [] as DeptTreeType[], // 部门数据
	dialog: {
		isShowDialog: false,
		type: '',
		title: '',
		submitTxt: '',
	},
});

// 打开弹窗
const openDialog = (type: string, row: any) => {
	if (type === 'edit') {
		state.ruleForm = row;
		state.dialog.title = '修改用户';
		state.dialog.submitTxt = '修 改';
	} else {
		state.dialog.title = '新增用户';
		state.dialog.submitTxt = '新 增';
		// 清空表单，此项需加表单验证才能使用
		// nextTick(() => {
		// 	userDialogFormRef.value.resetFields();
		// });
	}
	state.dialog.isShowDialog = true;
	getMenuData();
};
// 关闭弹窗
const closeDialog = () => {
	state.dialog.isShowDialog = false;
};
// 取消
const onCancel = () => {
	closeDialog();
};
// 提交
const onSubmit = () => {
	router.push('/workflow/rule-chain/form/2')
	closeDialog();
	emit('refresh');
	// if (state.dialog.type === 'add') { }
};
// 初始化部门数据
const getMenuData = () => {
	state.deptData.push({
		deptName: 'TianHai',
		createTime: new Date().toLocaleString(),
		status: true,
		sort: Math.random(),
		describe: '顶级部门',
		id: Math.random(),
		children: [
			{
				deptName: 'IT外包服务',
				createTime: new Date().toLocaleString(),
				status: true,
				sort: Math.random(),
				describe: '总部',
				id: Math.random(),
			},
			{
				deptName: '资本控股',
				createTime: new Date().toLocaleString(),
				status: true,
				sort: Math.random(),
				describe: '分部',
				id: Math.random(),
			},
		],
	});
};

// 暴露变量
defineExpose({
	openDialog,
});
</script>
