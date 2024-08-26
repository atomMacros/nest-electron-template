<template>
  <el-config-provider :size="getGlobalComponentSize" :locale="getGlobalI18n">
    <router-view v-show="themeConfig.lockScreenTime > 1" />
    <LockScreen v-if="themeConfig.isLockScreen" />
    <Setings ref="setingsRef" v-show="themeConfig.lockScreenTime > 1" />
    <CloseFull v-if="!themeConfig.isLockScreen" />
    <!-- <Upgrade v-if="getVersion" /> -->
  </el-config-provider>
</template>

<script setup lang="ts" name="app">
import {
  defineAsyncComponent,
  computed,
  ref,
  onBeforeMount,
  onMounted,
  onUnmounted,
  nextTick,
  watch,
} from "vue";
import { isNavigationFailure, useRoute, useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { storeToRefs } from "pinia";
import { useTagsViewRoutes } from "@render/stores/tagsViewRoutes";
import { useThemeConfig } from "@render/stores/themeConfig";
import other from "@render/utils/other";
import { Local, Session } from "@render/utils/storage";
import mittBus from "@render/utils/mitt";
import setIntroduction from "@render/utils/setIconfont";

// 引入组件
const LockScreen = defineAsyncComponent(
  () => import("@render/layout/lockScreen/index.vue")
);
const Setings = defineAsyncComponent(
  () => import("@render/layout/navBars/breadcrumb/setings.vue")
);
const CloseFull = defineAsyncComponent(
  () => import("@render/layout/navBars/breadcrumb/closeFull.vue")
);
const Upgrade = defineAsyncComponent(
  () => import("@render/layout/upgrade/index.vue")
);

// 定义变量内容
const { messages, locale } = useI18n();
const setingsRef = ref();
const route = useRoute();
const router = useRouter();
const stores = useTagsViewRoutes();
const storesThemeConfig = useThemeConfig();
const { themeConfig } = storeToRefs(storesThemeConfig);

const { show } = window.win;

// 获取版本号
const getVersion = computed(() => {
  let isVersion = false;
  if (route.path !== "/login") {
    // @ts-ignore
    if (
      (Local.get("version") && Local.get("version") !== __VERSION__) ||
      !Local.get("version")
    )
      isVersion = true;
  }
  return isVersion;
});
// 获取全局组件大小
const getGlobalComponentSize = computed(() => {
  return other.globalComponentSize();
});
// 获取全局 i18n
const getGlobalI18n = computed(() => {
  return messages.value[locale.value];
});
// 设置初始化，防止刷新时恢复默认
onBeforeMount(() => {});

// 页面加载时
onMounted(() => {
  show();
  nextTick(async () => {
    // 监听布局配'置弹窗点击打开
    mittBus.on("openSetingsDrawer", () => {
      setingsRef.value.openDrawer();
    });
    // 获取缓存中的布局配置
    if (Local.get("themeConfig")) {
      storesThemeConfig.setThemeConfig({
        themeConfig: Local.get("themeConfig"),
      });
      document.documentElement.style.cssText = Local.get("themeConfigStyle");
    }
    let isFull = await Session.has("isTagsViewCurrenFull");
    // 获取缓存中的全屏配置
    if (isFull) {
      let fullScreen = await Session.get("isTagsViewCurrenFull");
      stores.setCurrenFullscreen(fullScreen);
    }
  });
});
// 页面销毁时，关闭监听布局配置/i18n监听
onUnmounted(() => {
  mittBus.off("openSetingsDrawer", () => {});
});
// 监听路由的变化，设置网站标题
watch(
  () => route.path,
  () => {
    other.useTitle();
  },
  {
    deep: true,
  }
);
</script>
