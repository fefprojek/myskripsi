import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'

// #region debug-point A:main-runtime
const dbgMain = (hypothesisId: string, location: string, msg: string, data?: Record<string, unknown>) => {
  try {
    fetch('http://127.0.0.1:7777/event', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sessionId: 'treegame-runtime-errors',
        runId: 'pre',
        hypothesisId,
        location,
        msg: `[DEBUG] ${msg}`,
        data,
        ts: Date.now(),
      }),
    }).catch(() => {});
  } catch {}
};

dbgMain('A', 'main.tsx:bootstrap', 'app-bootstrap', {
  href: typeof window !== 'undefined' ? window.location.href : '',
  ua: typeof navigator !== 'undefined' ? navigator.userAgent : '',
});

if (typeof window !== 'undefined') {
  window.addEventListener('error', (ev) => {
    dbgMain('A', 'window.onerror', 'runtime-error', {
      message: ev.message,
      filename: ev.filename,
      lineno: ev.lineno,
      colno: ev.colno,
      stack: ev.error?.stack ?? '',
    });
  });

  window.addEventListener('unhandledrejection', (ev) => {
    dbgMain('D', 'window.onunhandledrejection', 'unhandled-rejection', {
      reason: ev.reason && typeof ev.reason === 'object' && 'stack' in ev.reason
        ? (ev.reason as { stack?: string }).stack ?? ''
        : String(ev.reason ?? ''),
    });
  });
}
// #endregion

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
