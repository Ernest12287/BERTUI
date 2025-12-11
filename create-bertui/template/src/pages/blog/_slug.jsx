import 'bertui/styles';
import { Link } from 'bertui/router';
import Layout from '../../components/Layout';

const posts = {
  'getting-started': {
    title: 'Getting Started with BertUI',
    date: 'Jan 15, 2024',
    readTime: '5 min',
    content: `
      BertUI makes it incredibly easy to build fast React applications. 
      
      Simply run \`bunx create-bertui my-app\` and you're ready to go!
      
      The file-based routing system means you can start building pages immediately 
      without any configuration. Just create a file in src/pages/ and it automatically 
      becomes a route.
      
      Built on Bun for maximum performance, with hot module replacement that feels instant.
    `
  },
  'routing-guide': {
    title: 'Mastering File-based Routing',
    date: 'Jan 20, 2024',
    readTime: '8 min',
    content: `
      BertUI's routing system is inspired by Next.js but optimized for Bun's speed.
      
      Create dynamic routes using [param] syntax:
      - src/pages/user/[id].jsx → /user/:id
      - src/pages/blog/[slug].jsx → /blog/:slug
      
      Access params in your component via props.params. Navigation is handled with 
      the Link component or navigate() function for programmatic routing.
      
      Every route is automatically code-split for optimal performance.
    `
  },
  'animations': {
    title: 'Built-in CSS Animations',
    date: 'Jan 25, 2024',
    readTime: '6 min',
    content: `
      BertUI comes with 15+ CSS animation utilities ready to use:
      
      - .fadein - Smooth fade in
      - .scalein - Scale from center
      - .bouncein - Playful bounce effect
      - .moveright / .moveleft - Slide from sides
      - .slideup / .slidedown - Vertical slides
      - .rotatein - Rotate and fade
      - .pulse - Continuous pulsing
      - .shake - Attention grabber
      - .split - Advanced text splitting
      
      Just add the className to any element and watch it come to life!
    `
  }
};

export default function BlogPost({ params }) {
  const post = posts[params.slug];
  
  if (!post) {
    return (
      <Layout>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 1rem', textAlign: 'center' }}>
          <h1 className="shake" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
            Post Not Found
          </h1>
          <p style={{ color: '#6b7280', marginBottom: '2rem' }}>
            The blog post you're looking for doesn't exist.
          </p>
          <Link href="/blog" style={{
            display: 'inline-block',
            padding: '0.75rem 1.5rem',
            background: '#10b981',
            color: 'white',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: '500'
          }}>
            ← Back to Blog
          </Link>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <article style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 1rem' }}>
        <h1 className="slidedown" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
          {post.title}
        </h1>
        
        <div className="fadein" style={{ 
          display: 'flex',
          gap: '1rem',
          color: '#6b7280',
          marginBottom: '2rem',
          fontSize: '0.875rem'
        }}>
          <span>📅 {post.date}</span>
          <span>⏱️ {post.readTime}</span>
        </div>
        
        <div className="scalein" style={{ 
          fontSize: '1.125rem',
          lineHeight: '1.8',
          color: '#374151',
          whiteSpace: 'pre-line'
        }}>
          {post.content}
        </div>
        
        <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid #e5e7eb' }}>
          <Link href="/blog" style={{
            display: 'inline-block',
            padding: '0.75rem 1.5rem',
            background: '#10b981',
            color: 'white',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: '500'
          }}>
            ← Back to Blog
          </Link>
        </div>
      </article>
    </Layout>
  );
}
