import { useRef } from 'react';
import './QueryInput.css';

const QueryInput = () => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInput = () => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 80) + 'px';
  };

  return (
    <div className="rpInputArea">
      <div className="rpInputWrap">
        <textarea
          ref={textareaRef}
          className="rpTextarea"
          rows={1}
          placeholder="Ask about any decision, function, or module…"
          onInput={handleInput}
        />
        <button className="rpSend" aria-label="Send message">↑</button>
      </div>
      <div className="rpHint">⌘↵ to send · Traces from git history</div>
    </div>
  );
};

export default QueryInput;
