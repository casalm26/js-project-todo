// Breakpoint values
const breakpoints = {
  mobile: '480px',
  tablet: '768px',
  desktop: '1024px',
  large: '1200px',
};

// Media query helpers
export const media = {
  mobile: `@media (max-width: ${breakpoints.mobile})`,
  tablet: `@media (max-width: ${breakpoints.tablet})`,
  desktop: `@media (min-width: ${breakpoints.tablet})`,
  large: `@media (min-width: ${breakpoints.large})`,
  
  // More specific helpers
  mobileOnly: `@media (max-width: ${breakpoints.tablet})`,
  tabletUp: `@media (min-width: ${breakpoints.tablet})`,
  desktopUp: `@media (min-width: ${breakpoints.desktop})`,
  largeUp: `@media (min-width: ${breakpoints.large})`,
  
  // Between breakpoints
  mobileToTablet: `@media (min-width: ${breakpoints.mobile}) and (max-width: ${breakpoints.tablet})`,
  tabletToDesktop: `@media (min-width: ${breakpoints.tablet}) and (max-width: ${breakpoints.desktop})`,
};

// Device-based helpers (alternative naming)
export const device = {
  mobile: media.mobileOnly,
  tablet: media.tablet,
  desktop: media.tabletUp,
  large: media.largeUp,
};

export default media; 