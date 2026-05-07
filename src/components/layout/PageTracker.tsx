import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackGAPageView } from '@/utils/analytics';

/**
 * Component that tracks page views on route changes.
 * Must be rendered inside a Router context.
 */
export function PageTracker() {
  const location = useLocation();

  useEffect(() => {
    trackGAPageView(location.pathname + location.search);
  }, [location]);

  return null;
}
