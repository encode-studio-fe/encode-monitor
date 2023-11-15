Vue.use(encodeMonitor.MonitorVue);
encodeMonitor.init({
  debug: true,
  silentConsole: true,
  maxBreadcrumbs: 10,
  dsn: 'http://localhost:2021/errors/upload',
});
