import type { TraceStep } from '../../types';
import './TraceBar.css';

interface TraceBarProps {
  steps: TraceStep[];
}

const TraceBar = ({ steps }: TraceBarProps) => {
  return (
    <div className="traceBar">
      {steps.map((step, idx) => (
        <span key={idx}>
          <span className={`traceStep ${step.done ? 'done' : ''}`}>
            {step.done ? '✓' : '○'} {step.label}
          </span>
          {idx < steps.length - 1 && <span className="traceArrow"> → </span>}
        </span>
      ))}
    </div>
  );
};

export default TraceBar;
