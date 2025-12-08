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

function showSaveNotification(): void {
  const notification = document.createElement('div');
  notification.innerHTML = `
    <div style="
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: linear-gradient(135deg, #007ACC, #0E639C);
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      font-size: 14px;
      box-shadow: 0 4px 20px rgba(0, 122, 204, 0.4);
      z-index: 999999;
      display: flex;
      align-items: center;
      gap: 8px;
      animation: slideIn 0.3s ease-out;
    ">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M20 6L9 17l-5-5"/>
      </svg>
      Saved to L0 Memory
    </div>
    <style>
      @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
    </style>
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease-in forwards';
    notification.innerHTML += `
      <style>
        @keyframes slideOut {
          from { transform: translateX(0); opacity: 1; }
          to { transform: translateX(100%); opacity: 0; }
        }
      </style>
    `;
    setTimeout(() => notification.remove(), 300);
  }, 2000);
}

console.log('[L0 Memory] Content script loaded');
