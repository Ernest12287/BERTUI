import 'bertui/styles';
import { Link } from 'bertui/router';
import Layout from '../components/Layout';

export default function About() {
  return (
    <Layout>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 1rem' }}>
        <h1 className="bouncein" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
          About BertUI
        </h1>
        
        <div className="fadein">
          <p style={{ fontSize: '1.125rem', lineHeight: '1.8', color: '#4b5563', marginBottom: '2rem' }}>
            BertUI is a modern React development framework that combines the blazing speed of Bun 
            with the elegance of file-based routing and built-in CSS animations.
          </p>
          
          <p style={{ fontSize: '1.125rem', lineHeight: '1.8', color: '#4b5563' }}>
            Built for developers who want to move fast without sacrificing code quality or user experience.
          </p>
        </div>
        
        <div className="slideup" style={{ 
          marginTop: '3rem',
          padding: '2rem',
          background: '#f9fafb',
          borderRadius: '12px',
          border: '2px solid #e5e7eb'
        }}>
          <h2 style={{ marginBottom: '1.5rem', fontSize: '1.75rem' }}>
            Why BertUI?
          </h2>
          
          <div style={{ display: 'grid', gap: '1.5rem' }}>
            <div className="fadein" style={{ animationDelay: '0.1s' }}>
              <h3 style={{ color: '#10b981', marginBottom: '0.5rem' }}>⚡ Speed</h3>
              <p style={{ color: '#6b7280' }}>
                Leverages Bun's native performance for faster builds and hot reloads.
              </p>
            </div>
            
            <div className="fadein" style={{ animationDelay: '0.2s' }}>
              <h3 style={{ color: '#3b82f6', marginBottom: '0.5rem' }}>🎯 Simplicity</h3>
              <p style={{ color: '#6b7280' }}>
                File-based routing means no complex configuration - just create files and go.
              </p>
            </div>
            
            <div className="fadein" style={{ animationDelay: '0.3s' }}>
              <h3 style={{ color: '#8b5cf6', marginBottom: '0.5rem' }}>💪 Power</h3>
              <p style={{ color: '#6b7280' }}>
                Built-in animations, code splitting, and modern tooling out of the box.
              </p>
            </div>
          </div>
        </div>
        
        <div style={{ marginTop: '3rem', textAlign: 'center' }}>
          <Link href="/" style={{
            display: 'inline-block',
            padding: '0.75rem 1.5rem',
            background: '#10b981',
            color: 'white',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: '500'
          }}>
            ← Back to Home
          </Link>
        </div>
      </div>
    </Layout>
  );
}
