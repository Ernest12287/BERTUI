import 'bertui/styles';
import { Link } from 'bertui/router';
import Layout from '../../components/Layout';

const posts = [
  {
    slug: 'getting-started',
    title: 'Getting Started with BertUI',
    excerpt: 'Learn how to create your first BertUI application in minutes.',
    date: 'Jan 15, 2024',
    readTime: '5 min'
  },
  {
    slug: 'routing-guide',
    title: 'Mastering File-based Routing',
    excerpt: 'Deep dive into BertUI\'s powerful routing system.',
    date: 'Jan 20, 2024',
    readTime: '8 min'
  },
  {
    slug: 'animations',
    title: 'Built-in CSS Animations',
    excerpt: 'Discover 15+ ready-to-use animation utilities.',
    date: 'Jan 25, 2024',
    readTime: '6 min'
  }
];

export default function Blog() {
  return (
    <Layout>
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem 1rem' }}>
        <h1 className="rotatein" style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>
          Blog
        </h1>
        
        <div style={{ display: 'grid', gap: '1.5rem' }}>
          {posts.map((post, index) => (
            <article 
              key={post.slug}
              className="fadein"
              style={{ 
                padding: '2rem',
                background: 'white',
                borderRadius: '12px',
                border: '1px solid #e5e7eb',
                transition: 'all 0.3s',
                animationDelay: `${index * 0.1}s`,
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <h2 style={{ marginBottom: '0.75rem', fontSize: '1.5rem' }}>
                <Link 
                  href={`/blog/${post.slug}`}
                  style={{ 
                    color: '#1f2937',
                    textDecoration: 'none'
                  }}
                >
                  {post.title}
                </Link>
              </h2>
              
              <p style={{ color: '#6b7280', marginBottom: '1rem' }}>
                {post.excerpt}
              </p>
              
              <div style={{ 
                display: 'flex', 
                gap: '1rem',
                fontSize: '0.875rem',
                color: '#9ca3af'
              }}>
                <span>📅 {post.date}</span>
                <span>⏱️ {post.readTime}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </Layout>
  );
}
