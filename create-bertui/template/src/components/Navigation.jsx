import { Link } from 'bertui/router';

export default function Navigation() {
  return (
    <nav style={{ 
      padding: '1rem 2rem',
      borderBottom: '1px solid #e5e7eb',
      background: 'white',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <div style={{ 
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Link href="/" style={{ 
          fontSize: '1.5rem',
          fontWeight: 'bold',
          textDecoration: 'none',
          background: 'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          BertUI
        </Link>
        
        <div style={{ display: 'flex', gap: '2rem' }}>
          <Link href="/" style={{
            textDecoration: 'none',
            color: '#4b5563',
            fontWeight: '500',
            transition: 'color 0.2s'
          }}>
            Home
          </Link>
          <Link href="/about" style={{
            textDecoration: 'none',
            color: '#4b5563',
            fontWeight: '500',
            transition: 'color 0.2s'
          }}>
            About
          </Link>
          <Link href="/blog" style={{
            textDecoration: 'none',
            color: '#4b5563',
            fontWeight: '500',
            transition: 'color 0.2s'
          }}>
            Blog
          </Link>
        </div>
      </div>
    </nav>
  );
}
