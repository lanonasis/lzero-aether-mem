/**
 * Content Script
 * Runs on web pages for context capture and selection handling
 */

// Listen for messages from background
chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message.type === 'SAVE_SELECTION') {
    const selection = window.getSelection()?.toString().trim();
    
    if (selection) {
      // Send selection to background for saving
      chrome.runtime.sendMessage({
        type: 'CREATE_MEMORY',
        payload: {
          memory: {
            title: selection.slice(0, 50) + (selection.length > 50 ? '...' : ''),
            content: selection,
            memory_type: 'snippet',
            tags: ['selection'],
            source_url: window.location.href,
          },
        },
      });
      
      // Show visual feedback
      showSaveNotification();
    }
    
    sendResponse({ success: !!selection });
  }
  
  return true;
});

function ensureAnimationStyles(): void {
  if (document.getElementById('l0-memory-styles')) return;
  const style = document.createElement('style');
  style.id = 'l0-memory-styles';
  style.textContent = [
    '@keyframes l0SlideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }',
    '@keyframes l0SlideOut { from { transform: translateX(0); opacity: 1; } to { transform: translateX(100%); opacity: 0; } }',
  ].join('\n');
  document.head.appendChild(style);
}

function showSaveNotification(): void {
  ensureAnimationStyles();

  const wrapper = document.createElement('div');
  wrapper.style.cssText = [
    'position:fixed', 'bottom:20px', 'right:20px',
    'background:linear-gradient(135deg,#007ACC,#0E639C)',
    'color:white', 'padding:12px 20px', 'border-radius:8px',
    'font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif',
    'font-size:14px', 'box-shadow:0 4px 20px rgba(0,122,204,0.4)',
    'z-index:2147483647', 'display:flex', 'align-items:center', 'gap:8px',
    'animation:l0SlideIn 0.3s ease-out',
  ].join(';');

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', '16');
  svg.setAttribute('height', '16');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('stroke-width', '2');
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', 'M20 6L9 17l-5-5');
  svg.appendChild(path);

  wrapper.appendChild(svg);
  wrapper.appendChild(document.createTextNode('Saved to L0 Memory'));
  document.body.appendChild(wrapper);

  setTimeout(() => {
    wrapper.style.animation = 'l0SlideOut 0.3s ease-in forwards';
    setTimeout(() => wrapper.remove(), 300);
  }, 2000);
}

console.log('[L0 Memory] Content script loaded');
