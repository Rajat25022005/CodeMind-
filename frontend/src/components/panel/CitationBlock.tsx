import type { Citation } from '../../types';
import './CitationBlock.css';

interface CitationBlockProps {
  citations: Citation[];
}

const CitationBlock = ({ citations }: CitationBlockProps) => {
  return (
    <div className="citation">
      {citations.map((c, idx) => (
        <div key={idx} className="citationRow">
          <span className="citationBadge">{c.badge}</span>
          <span>{c.text}</span>
        </div>
      ))}
    </div>
  );
};

export default CitationBlock;
