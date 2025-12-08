import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypePrettyCode from 'rehype-pretty-code';
import { transformerCopyButton } from '@rehype-pretty/transformers';
import rehypeStringify from 'rehype-stringify';
import { Clipboard, Check } from 'lucide-react';

export async function markdownToHtml(markdown) {
  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypePrettyCode, {
      // Optional: set your theme
      theme: 'github-dark',
      transformers: [
        transformerCopyButton({
          visibility: 'hover',
          feedbackDuration: 2000,
          jsx: ({ copied }) => (
            <button className="flex items-center gap-1 text-xs px-2 py-1 rounded bg-white/20 text-white hover:bg-white/30">
              {copied ? <Check className="w-3 h-3" /> : <Clipboard className="w-3 h-3" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          ),
        }),
      ],
    })
    .use(rehypeStringify)
    .process(markdown);

  return String(result);
}
