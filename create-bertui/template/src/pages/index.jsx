import 'bertui/styles';
import { Link } from 'bertui/router';
import Layout from '../components/Layout';

export default function Home() {
  return (
    <Layout>
      <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
        <h1 className="split fadein" data-text="Welcome to BertUI!" style={{ 
          fontSize: '3rem', 
          marginBottom: '1rem',
          background: 'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Welcome to BertUI!
        </h1>
        
        <p className="moveright" style={{ 
          fontSize: '1.25rem', 
          color: '#6b7280',
          marginBottom: '2rem' 
        }}>
          Lightning-fast React development powered by Bun ⚡
        </p>
        
        <div className="scalein" style={{ 
          display: 'flex', 
          gap: '1rem', 
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <Link href="/about" style={{
            padding: '0.75rem 1.5rem',
            background: '#10b981',
            color: 'white',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: '500',
            transition: 'transform 0.2s'
          }}>
            Learn More
          </Link>
          
          <Link href="/blog" style={{
            padding: '0.75rem 1.5rem',
            background: '#3b82f6',
            color: 'white',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: '500',
            transition: 'transform 0.2s'
          }}>
            View Blog
          </Link>
        </div>
        
        <div className="fadeup" style={{ 
          marginTop: '4rem',
          padding: '2rem',
          background: 'linear-gradient(135deg, #f0f9ff 0%, #f0fdf4 100%)',
          borderRadius: '16px',
          maxWidth: '600px',
          margin: '4rem auto 0'
        }}>
          <h2 style={{ marginBottom: '1rem' }}>✨ Features</h2>
          <ul style={{ 
            textAlign: 'left', 
            lineHeight: '2',
            color: '#374151'
          }}>
            <li>⚡ <strong>Blazing Fast</strong> - Built on Bun</li>
            <li>📁 <strong>File-based Routing</strong> - Zero config</li>
            <li>🎨 <strong>Built-in Animations</strong> - 15+ CSS utilities</li>
            <li>🔥 <strong>Hot Module Replacement</strong> - Instant updates</li>
            <li>📦 <strong>Code Splitting</strong> - Optimized bundles</li>
          </ul>
        </div>
      </div>
    </Layout>
  );
}
