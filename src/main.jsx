import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import '@fontsource/cormorant-garamond/latin-400.css';
import '@fontsource/cormorant-garamond/latin-400-italic.css';
import '@fontsource/cormorant-garamond/latin-500.css';
import '@fontsource/cormorant-garamond/latin-500-italic.css';
import '@fontsource/manrope/latin-400.css';
import '@fontsource/manrope/latin-500.css';
import '@fontsource/manrope/latin-600.css';
import '@/styles/index.css';
import { router } from '@/router';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
