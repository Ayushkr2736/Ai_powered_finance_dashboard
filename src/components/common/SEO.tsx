import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  canonical?: string;
}

const DEFAULT_DESCRIPTION = 'Proton Finance – Institutional-grade wealth curation and AI-powered portfolio intelligence for private clients.';
const DEFAULT_TITLE = 'Proton Finance – Wealth Curator';
const SITE_URL = 'https://proton-finance.ai';

/**
 * Reusable SEO component for managing metadata and OpenGraph tags.
 */
export function SEO({
  title,
  description = DEFAULT_DESCRIPTION,
  keywords = 'fintech, wealth management, portfolio tracker, AI finance, investment analytics',
  ogImage = `${SITE_URL}/og-image.jpg`,
  ogType = 'website',
  canonical,
}: SEOProps) {
  const fullTitle = title ? `${title} | Proton Finance` : DEFAULT_TITLE;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="canonical" href={canonical || SITE_URL} />

      {/* OpenGraph Tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonical || SITE_URL} />
      <meta property="og:site_name" content="Proton Finance" />

      {/* Twitter Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Accessibility / Theme */}
      <meta name="theme-color" content="#07080a" />
    </Helmet>
  );
}
