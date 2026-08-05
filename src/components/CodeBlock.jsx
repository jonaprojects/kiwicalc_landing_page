import React, { useMemo } from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-python';
import './CodeBlock.css';

export default function CodeBlock({ code, language = 'python', className = '' }) {
  const highlightedHtml = useMemo(() => {
    if (!code) return '';
    try {
      const grammar = Prism.languages[language] || Prism.languages.python;
      return Prism.highlight(code, grammar, language);
    } catch (err) {
      console.warn('Prism highlight error:', err);
      return code;
    }
  }, [code, language]);

  return (
    <pre className={`code-block-pre ${className}`}>
      <code
        className={`language-${language}`}
        dangerouslySetInnerHTML={{ __html: highlightedHtml }}
      />
    </pre>
  );
}
