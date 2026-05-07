// ═══════════════════════════════════════════════════════
// ANIMATION CONSTANTS – Premium Fintech Motion
// ───────────────────────────────────────────────────
// We use institutional-grade easing curves and spring 
// physics for a high-end feel.
// ═══════════════════════════════════════════════════════

export const EASING = {
  soft: [0.4, 0, 0.2, 1],
  gentle: [0.22, 1, 0.36, 1], // Quart
  bounce: [0.175, 0.885, 0.32, 1.275],
  out: [0, 0, 0.2, 1],
} as const;

export const TRANSITIONS = {
  page: {
    initial: { opacity: 0, y: 10, filter: 'blur(10px)' },
    animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
    exit: { opacity: 0, y: -10, filter: 'blur(10px)' },
    transition: { duration: 0.4, ease: EASING.gentle },
  },
  stagger: {
    animate: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  },
  card: {
    initial: { opacity: 0, scale: 0.96 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.3, ease: EASING.soft },
    whileHover: { 
      y: -4, 
      scale: 1.01,
      boxShadow: '0 20px 40px rgba(0,0,0,0.3), 0 0 20px rgba(59, 130, 246, 0.1)',
      transition: { duration: 0.2, ease: 'easeOut' }
    },
  },
} as const;

export const VARIANTS = {
  fadeInUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: EASING.gentle },
  },
  list: {
    container: {
      hidden: { opacity: 0 },
      show: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1,
        },
      },
    },
    item: {
      hidden: { opacity: 0, x: -10 },
      show: { opacity: 1, x: 0 },
    },
  },
};
