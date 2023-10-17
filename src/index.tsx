import { hydrateRoot } from 'react-dom/client';

import { App } from './app';

const container = document.getElementById('root');

if (!container) {
  throw new Error('Failed to find application container element');
}

hydrateRoot(container, <App />);
