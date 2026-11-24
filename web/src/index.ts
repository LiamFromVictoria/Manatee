/**
 * Manatee: Mantine-style web components.
 * Importing this module registers every <mt-*> element.
 */
import { getColorScheme, resolvedColorScheme, setColorScheme, toggleColorScheme } from './core';
import { notifications } from './components/overlays';

import './components/layout';
import './components/display';
import './components/inputs';
import './components/choice';
import './components/overlays';
import './components/navigation';
import './components/structure';
import './components/primitives';
import './components/interactive';
import './components/sliders';
import './components/media';

export * from './core';
export { notifications, type NotifyOptions } from './components/overlays';

declare global {
  interface Window {
    manatee: {
      setColorScheme: typeof setColorScheme;
      getColorScheme: typeof getColorScheme;
      resolvedColorScheme: typeof resolvedColorScheme;
      toggleColorScheme: typeof toggleColorScheme;
      notifications: typeof notifications;
    };
  }
}

window.manatee = { setColorScheme, getColorScheme, resolvedColorScheme, toggleColorScheme, notifications };
