/** Tiny toast helper — appends a message to #toast-region (rendered in BaseLayout). */
export function toast(message: string, kind: 'info' | 'success' | 'error' = 'info', ms = 3200): void {
  const region = document.getElementById('toast-region');
  if (!region) return;

  const el = document.createElement('div');
  el.className = `toast${kind === 'success' ? ' toast--success' : kind === 'error' ? ' toast--error' : ''}`;
  el.textContent = message;
  region.appendChild(el);

  window.setTimeout(() => {
    el.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
    el.style.opacity = '0';
    el.style.transform = 'translateY(10px)';
    window.setTimeout(() => el.remove(), 260);
  }, ms);
}
