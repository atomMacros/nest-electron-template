<template>
  <el-form
    :rules="rules"
    :model="state.form_data"
    ref="ruleFormRef"
    size="large"
    status-icon
    label-width="auto"
    class="login-content-form"
  >
    <el-form-item class="login-animation1" prop="account">
      <el-input
        text
        placeholder="用户名"
        v-model="state.form_data.account"
        clearable
        autocomplete="off"
      >
        <template #prefix>
          <el-icon class="el-input__icon"><ele-User /></el-icon>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item class="login-animation2" prop="password">
      <el-input
        :type="state.isShowPassword ? 'text' : 'password'"
        placeholder="密码"
        v-model="state.form_data.password"
        autocomplete="off"
      >
        <template #prefix>
          <el-icon class="el-input__icon"><ele-Unlock /></el-icon>
        </template>
        <template #suffix>
          <i
            class="iconfont el-input__icon login-content-password"
            :class="
              state.isShowPassword ? 'icon-yincangmima' : 'icon-xianshimima'
            "
            @click="state.isShowPassword = !state.isShowPassword"
          >
          </i>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item class="login-animation3" prop="code">
      <el-col :span="15">
        <el-input
          text
          maxlength="4"
          :placeholder="$t('message.account.accountPlaceholder3')"
          v-model="state.form_data.code"
          clearable
          autocomplete="off"
        >
          <template #prefix>
            <el-icon class="el-input__icon"><ele-Position /></el-icon>
          </template>
        </el-input>
      </el-col>
      <el-col :span="1"></el-col>
      <el-col :span="8">
        <verify-code-img :height="38" @update:Code="getCode"></verify-code-img>
        <!-- <div @click="getCode" v-html="state.svg_html"></div> -->
        <!-- <el-button class="login-content-code" v-waves>1234</el-button> -->
      </el-col>
    </el-form-item>
    <el-form-item class="login-animation4">
      <el-button
        type="primary"
        class="login-content-submit"
        round
        v-waves
        @click="onSignIn"
        :loading="state.loading.signIn"
      >
        <span>登录</span>
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts" name="loginAccount">
import {
  reactive,
  onMounted,
  defineAsyncComponent,
  ref,
  toRefs,
  toRaw,
} from "vue";
import { useRoute, useRouter } from "vue-router";
import { FormInstance, FormRules } from "element-plus";
import { useUserInfo } from "@render/stores/userInfo";

// const { signIn } = window.electron;
// 定义变量内容
const route = useRoute();
const router = useRouter();
const VerifyCodeImg = defineAsyncComponent(
  () => import("@render/components/verifyCodeImg/index.vue")
);



const ruleFormRef = ref<FormInstance>();

const state = reactive({
  isShowPassword: false,
  form_data: {
    account: "admin",
    password: "admin",
    code: "",
    verify_code: "",
  },
  loading: {
    signIn: false,
  },
  svg_html: null,
});

const validateCode = (rule: any, value: any, callback: any) => {
  if (value == "") {
    callback(new Error("请输入验证码"));
  } else if (value !== state.form_data.verify_code) {
    callback(new Error("请输入正确的验证码"));
  } else {
    callback();
  }
};

const rules = reactive<FormRules>({
  account: [{ required: true, message: "请输入用户名", trigger: "change" }],
  password: [{ required: true, message: "请输入密码", trigger: "change" }],
  code: [
    { required: true, message: "请输入验证码", trigger: "change" },
    { validator: validateCode, trigger: "change" },
  ],
});

const getCode = (v) => {
  console.log(v);
  state.form_data.verify_code = v;
};

// 登录
const onSignIn = async (el) => {
  ruleFormRef.value.validate((isValid) => {
    if (isValid) {
      state.loading.signIn = true;
      const params = toRaw(state.form_data);
      useUserInfo()
        .signIn({
          ...params,
        })
        .then((res) => {
          if (route.query?.redirect && route.query) {
            router.push({
              path: (route.query?.redirect ?? "") as string,
              query:
                Object.keys(route.query?.params ?? {}).length > 0
                  ? JSON.parse((route.query?.params ?? "{}") as string)
                  : {},
            });
            state.loading.signIn = false;
          } else {
            router.push("/");
          }
        });
    }
  });
};
</script>

<style scoped lang="scss">
.svg {
  div {
    display: flex;
    align-items: center;
  }
}
.login-content-form {
  margin-top: 20px;

  .login-content-password {
    display: inline-block;
    width: 20px;
    cursor: pointer;

    &:hover {
      color: #909399;
    }
  }

  .login-content-code {
    width: 100%;
    padding: 0;
    font-weight: bold;
    letter-spacing: 5px;
  }

  .login-content-submit {
    width: 100%;
    letter-spacing: 2px;
    font-weight: 300;
    margin-top: 15px;
  }
}
</style>
