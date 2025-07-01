/// <reference types="vite/client" />

declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.module.scss' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.module.sass' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.module.less' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.module.styl' {
  const classes: { [key: string]: string };
  export default classes;
}

// Allow TypeScript to understand .svg imports
// This is a common pattern in React projects using Vite
declare module '*.svg' {
  import * as React from 'react';
  export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

// Add this to help with CSS module imports
declare module '*.css';
declare module '*.scss';
declare module '*.sass';
declare module '*.less';

// Add module declarations for your components
declare module './components/Navbar';
declare module './pages/Home';
declare module './pages/SavedQuotes';
