/**
 * Manatee: Mantine-style web components.
 * Importing this module registers every <mt-*> element.
 */
import { getColorScheme, resolvedColorScheme, setColorScheme, toggleColorScheme } from './core';

import './components/layout';
import './components/display';
import './components/inputs';
import './components/choice';
import './components/overlays';
import './components/navigation';

export * from './core';

declare global {
  interface Window {
    manatee: {
      setColorScheme: typeof setColorScheme;
      getColorScheme: typeof getColorScheme;
      resolvedColorScheme: typeof resolvedColorScheme;
      toggleColorScheme: typeof toggleColorScheme;
    };
  }
}

window.manatee = { setColorScheme, getColorScheme, resolvedColorScheme, toggleColorScheme };
