import ErrorBoundary from '../components/ErrorBoundary';
import GraphCanvas from '../components/GraphCanvas';
import QueryPanel from '../components/QueryPanel';

const GraphPage = () => {
  return (
    <>
      <div className="mainArea">
        <ErrorBoundary>
          <GraphCanvas />
        </ErrorBoundary>
      </div>
      <ErrorBoundary>
        <QueryPanel />
      </ErrorBoundary>
    </>
  );
};

export default GraphPage;
