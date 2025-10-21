import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App.tsx'
import { ThemeProvider } from './contexts/themeContext/ThemeProvider.tsx'
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n/i18n.ts';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000,
    },
  },
});

async function prepare() {
  const { worker } = await import('./mocks/server.ts');
  await worker.start({
    onUnhandledRequest: 'bypass',
  });
}

prepare().then(() => {
  document.body.classList.remove("loading");
  document.body.classList.add("loaded");
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <I18nextProvider i18n={i18n}>
            <App />
          </I18nextProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </StrictMode>,
  );
});