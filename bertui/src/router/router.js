// src/router/Router.jsx
import { useState, useEffect, createContext, useContext } from 'react';

// Router context
const RouterContext = createContext(null);

export function useRouter() {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('useRouter must be used within a Router component');
  }
  return context;
}

export function useParams() {
  const { params } = useRouter();
  return params;
}

export function Router({ routes, children }) {
  const [currentRoute, setCurrentRoute] = useState(null);
  const [params, setParams] = useState({});

  useEffect(() => {
    // Match initial route
    matchAndSetRoute(window.location.pathname);

    // Handle browser navigation
    const handlePopState = () => {
      matchAndSetRoute(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  function matchAndSetRoute(pathname) {
    // Try exact match first (static routes)
    for (const route of routes) {
      if (route.type === 'static' && route.path === pathname) {
        setCurrentRoute(route);
        setParams({});
        return;
      }
    }

    // Try dynamic routes
    for (const route of routes) {
      if (route.type === 'dynamic') {
        const pattern = route.path.replace(/\[([^\]]+)\]/g, '([^/]+)');
        const regex = new RegExp('^' + pattern + '$');
        const match = pathname.match(regex);

        if (match) {
          // Extract params
          const paramNames = [...route.path.matchAll(/\[([^\]]+)\]/g)].map(m => m[1]);
          const extractedParams = {};
          paramNames.forEach((name, i) => {
            extractedParams[name] = match[i + 1];
          });

          setCurrentRoute(route);
          setParams(extractedParams);
          return;
        }
      }
    }

    // No match found - 404
    setCurrentRoute(null);
    setParams({});
  }

  function navigate(path) {
    window.history.pushState({}, '', path);
    matchAndSetRoute(path);
  }

  const routerValue = {
    currentRoute,
    params,
    navigate,
    pathname: window.location.pathname
  };

  return (
    <RouterContext.Provider value={routerValue}>
      {currentRoute ? (
        <currentRoute.component />
      ) : (
        children || <NotFound />
      )}
    </RouterContext.Provider>
  );
}

export function Link({ to, children, className, ...props }) {
  const { navigate } = useRouter();

  function handleClick(e) {
    e.preventDefault();
    navigate(to);
  }

  return (
    <a href={to} onClick={handleClick} className={className} {...props}>
      {children}
    </a>
  );
}

function NotFound() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <h1 style={{ fontSize: '6rem', margin: 0 }}>404</h1>
      <p style={{ fontSize: '1.5rem', color: '#666' }}>Page not found</p>
      <a href="/" style={{ color: '#10b981', textDecoration: 'none', fontSize: '1.2rem' }}>
        Go home
      </a>
    </div>
  );
}