// src/App.jsx
import { useState } from 'react';

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 className="split fadein" style={styles.title}>
          ⚡ Welcome to BertUI
        </h1>
        <p className="moveright" style={styles.subtitle}>
          Lightning-fast React development powered by Bun
        </p>
      </header>

      <main style={styles.main}>
        <div className="scalein" style={styles.card}>
          <h2 style={styles.cardTitle}>Interactive Counter</h2>
          <p style={styles.count}>{count}</p>
          <div style={styles.buttonGroup}>
            <button 
              onClick={() => setCount(count - 1)} 
              style={styles.button}
              className="bouncein"
            >
              Decrease
            </button>
            <button 
              onClick={() => setCount(0)} 
              style={{...styles.button, ...styles.resetButton}}
            >
              Reset
            </button>
            <button 
              onClick={() => setCount(count + 1)} 
              style={styles.button}
              className="bouncein"
            >
              Increase
            </button>
          </div>
        </div>

        <div className="slideup" style={styles.features}>
          <h3 style={styles.featuresTitle}>Features</h3>
          <ul style={styles.featureList}>
            <li className="fadein">⚡ Blazing Fast - Built on Bun</li>
            <li className="fadein">🎨 Built-in Animations - 15+ CSS utilities</li>
            <li className="fadein">🔥 Hot Module Replacement - Instant updates</li>
            <li className="fadein">📦 Zero Config - Works out of the box</li>
            <li className="fadein">🚀 Production Ready - Optimized builds</li>
          </ul>
        </div>

        <div style={styles.footer}>
          <p>Edit <code style={styles.code}>src/App.jsx</code> and save to test HMR</p>
        </div>
      </main>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  header: {
    textAlign: 'center',
    padding: '4rem 2rem 2rem',
  },
  title: {
    fontSize: '3.5rem',
    fontWeight: 'bold',
    margin: '0 0 1rem',
    textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
  },
  subtitle: {
    fontSize: '1.25rem',
    opacity: 0.9,
    margin: 0,
  },
  main: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '2rem',
  },
  card: {
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    borderRadius: '20px',
    padding: '3rem',
    marginBottom: '2rem',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  },
  cardTitle: {
    fontSize: '1.5rem',
    marginBottom: '2rem',
    textAlign: 'center',
  },
  count: {
    fontSize: '4rem',
    fontWeight: 'bold',
    textAlign: 'center',
    margin: '2rem 0',
  },
  buttonGroup: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
  },
  button: {
    padding: '1rem 2rem',
    fontSize: '1rem',
    fontWeight: '600',
    border: 'none',
    borderRadius: '10px',
    background: 'rgba(255, 255, 255, 0.2)',
    color: 'white',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
  },
  resetButton: {
    background: 'rgba(239, 68, 68, 0.3)',
  },
  features: {
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    borderRadius: '20px',
    padding: '2rem',
    border: '1px solid rgba(255, 255, 255, 0.2)',
  },
  featuresTitle: {
    fontSize: '1.5rem',
    marginBottom: '1rem',
  },
  featureList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  footer: {
    textAlign: 'center',
    marginTop: '3rem',
    opacity: 0.8,
  },
  code: {
    background: 'rgba(0, 0, 0, 0.3)',
    padding: '0.25rem 0.5rem',
    borderRadius: '4px',
    fontFamily: 'monospace',
  },
};