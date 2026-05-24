import { useState } from 'react';
import { useStore } from './store';

const getParseUrl = () => {
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000';
  return `${apiBaseUrl.replace(/\/$/, '')}/pipelines/parse`;
};

export const SubmitButton = () => {
  const nodes = useStore((state) => state.nodes);
  const edges = useStore((state) => state.edges);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch(getParseUrl(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nodes, edges }),
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const payload = await response.json();
      setResult(payload);
    } catch (requestError) {
      setResult(null);
      setError(requestError instanceof Error ? requestError.message : 'Failed to submit pipeline');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="submit-bar">
        <button className="submit-btn" type="button" onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </div>

      {(result || error) && (
        <div
          className="vs-alert-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby={error ? 'submission-error-title' : 'submission-result-title'}
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              setResult(null);
              setError('');
            }
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setResult(null);
              setError('');
            }
          }}
          tabIndex={-1}
          ref={(el) => el && el.focus()}
        >
          <div className="vs-alert">
            {error ? (
              <>
                <h3 id="submission-error-title">Submission failed</h3>
                <p>{error}</p>
              </>
            ) : (
              <>
                <h3 id="submission-result-title">Pipeline parse result</h3>
                <div className="vs-alert-stats">
                  <div className="vs-stat">
                    <div className="vs-stat-value">{result?.num_nodes ?? 0}</div>
                    <div className="vs-stat-label">Nodes</div>
                  </div>
                  <div className="vs-stat">
                    <div className="vs-stat-value">{result?.num_edges ?? 0}</div>
                    <div className="vs-stat-label">Edges</div>
                  </div>
                  <div className="vs-stat">
                    <div className="vs-stat-value">{result?.is_dag ? 'Yes' : 'No'}</div>
                    <div className="vs-stat-label">DAG</div>
                  </div>
                </div>
              </>
            )}
            <div style={{ marginTop: 12, display: 'flex', justifyContent: 'flex-end' }}>
              <button
                className="submit-btn"
                type="button"
                onClick={() => {
                  setResult(null);
                  setError('');
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
