import developmentConfig from './dev';
import productionConfig from './prod';
import commonConfig from './common';
import { app } from 'electron';

const configs = {
  development: developmentConfig,
  production: productionConfig,
};
const env = app.isPackaged ? 'production' : 'development';

export default () => ({
  ...commonConfig,
  ...configs[env],
});
