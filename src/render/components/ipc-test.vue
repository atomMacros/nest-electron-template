<script setup lang="ts">
import { ref } from "vue";

const props = defineProps({
  title: {
    type: String,
    default: "测试ipc与事件流",
  },
});

const { sendMsg: sendMsgToMainProcess, onReplyMsg } = window.electron;

const log = ref("");
const msg = ref("");

async function sendMsg() {
  try {
    log.value += `【渲染进程发出的消息】:${msg.value} \n`;
    const data = await sendMsgToMainProcess(msg.value);
    log.value += `${data}  \n`;
  } catch (error) {
    console.error(error);
  }
}

onReplyMsg((msg: string) => {
  log.value += `${msg}  \n`;
});

async function serviceTest() {
  try {
    fetch("http://localhost:3000/user").then((res) => res.text()).then(res => {
      const text = JSON.stringify(res)
      log.value += `接口返回的消息：${text} \n`
    });
  } catch (error) {
    console.error(error);
  }
}

</script>

<template>
  <h1>{{ props.title }}</h1>

  <textarea v-model="log" cols="60" rows="10" disabled />
  <div style="margin-top: 20px">
    <input v-model="msg" type="text" placeholder="send msg to main process" />
    <button style="margin-left: 20px" @click="sendMsg">Send</button>
    <button style="margin-left: 20px" @click="serviceTest">接口测试(localhost)</button>
  </div>
</template>

<style></style>
