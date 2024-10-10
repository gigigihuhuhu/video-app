import markdownit from 'markdown-it';
import { full as emoji } from 'markdown-it-emoji';

export default {
  install(app) {
    app.config.globalProperties.$function = {
      goto(path) {
        app.config.globalProperties.$router.push({ path: path.trimStart('/') });
      },
      renderMarkdown(content) {
        const md = new markdownit().use(emoji);
        const res = md.render(content);
        console.log(res);
        return res;
      },
      renderMarkdownEmoji(content) {
        const md = new markdownit().use(emoji);
        const res = md.render(`:${content}:`);
        console.log(res);
        return res;
      },
    };
  }
}