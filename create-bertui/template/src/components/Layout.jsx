import Navigation from './Navigation';
import '../styles/global.css';

export default function Layout({ children }) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navigation />
      
      <main style={{ flex: 1 }}>
        {children}
      </main>
      
      <footer style={{ 
        padding: '2rem 1rem',
        textAlign: 'center',
        borderTop: '1px solid #e5e7eb',
        background: '#f9fafb',
        color: '#6b7280'
      }}>
        <p>Built with ❤️ using BertUI</p>
      </footer>
    </div>
  );
}
