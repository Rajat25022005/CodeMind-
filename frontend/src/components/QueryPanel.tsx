import { mockMessages } from '../data/mockData';
import MessageBubble from './panel/MessageBubble';
import QueryInput from './panel/QueryInput';
import './QueryPanel.css';

/**
 * QueryPanel
 * Right panel "Decision Trail" Q&A interface with message history,
 * citations, reasoning traces, and streaming input.
 */
const QueryPanel = () => {
  return (
    <aside className="rightPanel" id="query-panel">
      <div className="rpHeader">
        <div>
          <div className="rpTitle">Decision Trail</div>
          <div className="rpSub">Multi-hop reasoning · Ollama llama3</div>
        </div>
        <div className="rpHeaderActions">
          <button className="rpNavIcon" title="Clear">🗑</button>
          <button className="rpNavIcon" title="Export">↗</button>
        </div>
      </div>

      <div className="rpMessages">
        {mockMessages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
      </div>

      <QueryInput />
    </aside>
  );
};

export default QueryPanel;
