import { Link } from 'bertui/router';

export default function Home() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <nav style={{
        padding: '1.5rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)'
      }}>
        <h2 style={{ color: 'white', margin: 0, fontSize: '1.5rem', fontWeight: 'bold' }}>
          ⚡ BertUI
        </h2>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <Link to="/" style={{ color: 'white', textDecoration: 'none', fontWeight: '500' }}>
            Home
          </Link>
          <Link to="/about" style={{ color: 'rgba(255, 255, 255, 0.8)', textDecoration: 'none', fontWeight: '500' }}>
            About
          </Link>
          <Link to="/blog" style={{ color: 'rgba(255, 255, 255, 0.8)', textDecoration: 'none', fontWeight: '500' }}>
            Blog
          </Link>
        </div>
      </nav>

      <main style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '4rem 2rem',
        textAlign: 'center'
      }}>
        <h1 style={{
          fontSize: 'clamp(2.5rem, 8vw, 5rem)',
          color: 'white',
          marginBottom: '1.5rem',
          fontWeight: '900',
          lineHeight: '1.1',
          textShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
        }}>
          Build Lightning-Fast
          <br />
          React Apps
        </h1>

        <p style={{
          fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
          color: 'rgba(255, 255, 255, 0.9)',
          marginBottom: '3rem',
          maxWidth: '700px',
          margin: '0 auto 3rem',
          lineHeight: '1.6'
        }}>
          File-based routing • Zero config • Blazing fast HMR • Powered by Bun
        </p>

        <div style={{
          display: 'flex',
          gap: '1rem',
          justifyContent: 'center',
          flexWrap: 'wrap',
          marginBottom: '5rem'
        }}>
          <Link to="/blog" style={{
            padding: '1rem 2.5rem',
            background: 'white',
            color: '#667eea',
            borderRadius: '50px',
            textDecoration: 'none',
            fontWeight: '600',
            fontSize: '1.1rem',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
            transition: 'all 0.3s',
            display: 'inline-block'
          }}>
            Get Started →
          </Link>
          <Link to="/about" style={{
            padding: '1rem 2.5rem',
            background: 'rgba(255, 255, 255, 0.2)',
            color: 'white',
            border: '2px solid white',
            borderRadius: '50px',
            textDecoration: 'none',
            fontWeight: '600',
            fontSize: '1.1rem',
            backdropFilter: 'blur(10px)',
            transition: 'all 0.3s',
            display: 'inline-block'
          }}>
            Learn More
          </Link>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem',
          marginTop: '4rem'
        }}>
          <FeatureCard 
            icon="⚡"
            title="Lightning Fast"
            description="Built on Bun for incredible speed. Instant dev server startup and blazing fast HMR."
          />
          <FeatureCard 
            icon="📁"
            title="File-Based Routing"
            description="Create pages/about.jsx and get /about route. Dynamic routes with [param] syntax."
          />
          <FeatureCard 
            icon="🎨"
            title="Zero Config"
            description="No webpack, no babel, no config files. Just write React and ship."
          />
          <FeatureCard 
            icon="🔥"
            title="Hot Module Replacement"
            description="See your changes instantly without losing component state."
          />
        </div>

        <div style={{
          marginTop: '5rem',
          padding: '3rem',
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          borderRadius: '20px',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          <h2 style={{ color: 'white', fontSize: '2rem', marginBottom: '1rem' }}>
            Ready to build something amazing?
          </h2>
          <p style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '1.1rem', marginBottom: '2rem' }}>
            Get started in seconds with a single command
          </p>
          <code style={{
            display: 'inline-block',
            padding: '1rem 2rem',
            background: 'rgba(0, 0, 0, 0.3)',
            color: '#4ade80',
            borderRadius: '10px',
            fontSize: '1.1rem',
            fontFamily: 'monospace'
          }}>
            bunx create-bertui my-app
          </code>
        </div>
      </main>

      <footer style={{
        padding: '2rem',
        textAlign: 'center',
        color: 'rgba(255, 255, 255, 0.7)',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <p>Built with BertUI • MIT License</p>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div style={{
      padding: '2rem',
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      borderRadius: '15px',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      textAlign: 'left',
      transition: 'all 0.3s'
    }}>
      <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{icon}</div>
      <h3 style={{ color: 'white', fontSize: '1.4rem', marginBottom: '0.5rem' }}>
        {title}
      </h3>
      <p style={{ color: 'rgba(255, 255, 255, 0.8)', lineHeight: '1.6' }}>
        {description}
      </p>
    </div>
  );
}