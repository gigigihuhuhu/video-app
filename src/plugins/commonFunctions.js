export default {
  install(app) {
    app.config.globalProperties.$function = {
      goto(path) {
        app.config.globalProperties.$router.push({ path: path.trimStart('/') });
      }
    };
  }
}