import { createApp } from 'vue';
import pinia from '@render/stores/index';
import App from './App.vue';
import router from './router';
import { directive } from '@render/directive/index';
import { i18n } from '@render/i18n/index';
import other from '@render/utils/other';

import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import '@render/theme/index.scss';
import VueGridLayout from 'vue-grid-layout';



const app = createApp(App);

directive(app);
other.elSvg(app);

app.use(pinia).use(router).use(ElementPlus, {
    i18n: i18n.global.t 
}).use(i18n).use(VueGridLayout).mount('#app');

