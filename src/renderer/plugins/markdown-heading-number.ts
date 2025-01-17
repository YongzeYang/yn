import type { Plugin } from '@fe/context'
import type { FrontMatterAttrs } from '@fe/types'

export default {
  name: 'markdown-heading-number',
  register: ctx => {
    ctx.theme.addStyles(`
      .markdown-view .markdown-body h1.show-number { counter-reset: h2counter; }
      .markdown-view .markdown-body h2.show-number { counter-reset: h3counter; }
      .markdown-view .markdown-body h3.show-number { counter-reset: h4counter; }
      .markdown-view .markdown-body h4.show-number { counter-reset: h5counter; }
      .markdown-view .markdown-body h5.show-number { counter-reset: h6counter; }

      .markdown-view .markdown-body h2.show-number:before {
        counter-increment: h2counter;
        content: counter(h2counter) ".\\0000a0\\0000a0";
      }

      .markdown-view .markdown-body h3.show-number:before {
        counter-increment: h3counter;
        content: counter(h2counter) "."
                counter(h3counter) ".\\0000a0\\0000a0";
      }

      .markdown-view .markdown-body h4.show-number:before {
        counter-increment: h4counter;
        content: counter(h2counter) "."
                counter(h3counter) "."
                counter(h4counter) ".\\0000a0\\0000a0";
      }

      .markdown-view .markdown-body h5.show-number:before {
        counter-increment: h5counter;
        content: counter(h2counter) "."
                counter(h3counter) "."
                counter(h4counter) "."
                counter(h5counter) ".\\0000a0\\0000a0";
      }

      .markdown-view .markdown-body h6.show-number:before {
        counter-increment: h6counter;
        content: counter(h2counter) "."
                counter(h3counter) "."
                counter(h4counter) "."
                counter(h5counter) "."
                counter(h6counter) ".\\0000a0\\0000a0";
      }
    `)

    ctx.markdown.registerPlugin(md => {
      const headingOpen = md.renderer.rules.heading_open!

      md.renderer.rules.heading_open = function (tokens, idx, opt, env, slf) {
        const attrs: FrontMatterAttrs = env.attributes
        if (attrs.headingNumber) {
          const token = tokens[idx]
          token.attrJoin('class', 'show-number')
        }

        return headingOpen.call(this, tokens, idx, opt, env, slf)
      }
    })
  }
} as Plugin
