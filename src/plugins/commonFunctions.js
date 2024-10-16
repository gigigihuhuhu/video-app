import markdownit from 'markdown-it';
import { full as emoji } from 'markdown-it-emoji';

export default {
  install(app) {
    app.config.globalProperties.$function = {
      goto(path) {
        if(path.includes('http://') || path.includes('https://')){
          window.open(path);
        }
        else{
          app.config.globalProperties.$router.push({ path: path.trimStart('/') });
        }
      },
      renderMarkdown(content) {
        const md = new markdownit().use(emoji);
        const res = md.render(content);
        return res;
      },
      renderMarkdownEmoji(content) {
        const md = new markdownit().use(emoji);
        const res = md.render(`:${content}:`);
        return res;
      },
    };
  }
}