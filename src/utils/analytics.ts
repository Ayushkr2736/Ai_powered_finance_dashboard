import ReactGA from 'react-ga4';

// ═══════════════════════════════════════════════════════
// ANALYTICS UTILITY – GA4 Event Constants & Helpers
// ═══════════════════════════════════════════════════════

export const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // Replace with actual ID

export const ANALYTICS_EVENTS = {
  PAGE_VIEW: 'page_view',
  SEARCH_USAGE: 'search_usage',
  EXPORT_CSV: 'export_csv_click',
  EXECUTE_STRATEGY: 'execute_strategy_click',
  FILTER_INTERACTION: 'filter_interaction',
  NAV_EVENT: 'navigation_event',
  AI_INSIGHT_CLICK: 'ai_insight_click',
  THEME_TOGGLE: 'theme_toggle',
} as const;

export type AnalyticsEventName = typeof ANALYTICS_EVENTS[keyof typeof ANALYTICS_EVENTS];

/**
 * Initialize GA4
 */
export const initGA = () => {
  try {
    ReactGA.initialize(GA_MEASUREMENT_ID);
    console.log('[Analytics] GA4 Initialized');
  } catch (error) {
    console.warn('[Analytics] GA4 Initialization Failed:', error);
  }
};

/**
 * Track custom events
 */
export const trackGAEvent = (eventName: AnalyticsEventName, params?: Record<string, any>) => {
  ReactGA.event(eventName, params);
  
  if (import.meta.env.DEV) {
    console.log(`[Analytics] Event Tracked: ${eventName}`, params);
  }
};

/**
 * Track page views
 */
export const trackGAPageView = (path: string) => {
  ReactGA.send({ hitType: 'pageview', page: path });
  
  if (import.meta.env.DEV) {
    console.log(`[Analytics] PageView Tracked: ${path}`);
  }
};
