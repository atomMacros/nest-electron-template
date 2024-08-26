export default {
  jwt_config: {
    secret: 'secretKey', // JWT token 签名密文 (密钥)
    signOptions: { expiresIn: '10s' }, // 签名有效时间
  },
  statusMonitorConfig: {
    pageTitle: '服务监控',
    port: 3000,
    path: '/status',
    ignoreStartsWith: '/healt/alive',
    spans: [
      {
        interval: 1, // Every second
        retention: 60, // Keep 60 datapoints in memory
      },
      {
        interval: 5, // Every 5 seconds
        retention: 60,
      },
      {
        interval: 15, // Every 15 seconds
        retention: 60,
      },
    ],
    chartVisibility: {
      cpu: true,
      mem: true,
      load: true,
      responseTime: true,
      rps: true,
      statusCodes: true,
    },
    healthChecks: [],
  },
};
