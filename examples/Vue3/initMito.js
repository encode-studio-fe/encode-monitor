RootVue.use(encode_monitor.MitoVue);
encode_monitor.init({
  debug: true,
  silentConsole: true,
  maxBreadcrumbs: 10,
  dsn: 'http://localhost:2021/errors/upload',
});
