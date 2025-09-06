/**
 * UI Utilities and Components
 */

/**
 * Show toast notification
 * @param {string} message - Message to display
 * @param {string} type - Type of toast (success, error, info)
 * @param {number} duration - Duration in milliseconds
 */
export function showToast(message, type = 'info', duration = 3000) {
  // Get or create toast container
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  
  // Create toast element
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <span>${message}</span>
    <button class="toast-close" aria-label="Close">&times;</button>
  `;
  
  // Add to container
  container.appendChild(toast);
  
  // Handle close button
  const closeBtn = toast.querySelector('.toast-close');
  closeBtn.addEventListener('click', () => {
    toast.remove();
  });
  
  // Auto remove after duration
  setTimeout(() => {
    toast.style.animation = 'slideOut 0.3s ease-out';
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

/**
 * Show modal dialog
 * @param {Object} options - Modal options
 * @returns {Promise} Promise that resolves with user's choice
 */
export function showModal(options) {
  return new Promise((resolve) => {
    const {
      title = 'Confirm',
      message = 'Are you sure?',
      confirmText = 'Confirm',
      cancelText = 'Cancel',
      type = 'confirm'
    } = options;
    
    // Create modal backdrop
    const backdrop = document.createElement('div');
    backdrop.className = 'modal-backdrop';
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
      <div class="modal-header">
        <h3>${title}</h3>
      </div>
      <div class="modal-body">
        <p>${message}</p>
      </div>
      <div class="modal-footer">
        ${type === 'confirm' ? `<button class="btn btn-ghost modal-cancel">${cancelText}</button>` : ''}
        <button class="btn btn-primary modal-confirm">${confirmText}</button>
      </div>
    `;
    
    backdrop.appendChild(modal);
    document.body.appendChild(backdrop);
    
    // Handle buttons
    const confirmBtn = modal.querySelector('.modal-confirm');
    const cancelBtn = modal.querySelector('.modal-cancel');
    
    const close = (result) => {
      backdrop.remove();
      resolve(result);
    };
    
    confirmBtn.addEventListener('click', () => close(true));
    if (cancelBtn) {
      cancelBtn.addEventListener('click', () => close(false));
    }
    
    // Close on backdrop click
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) {
        close(false);
      }
    });
    
    // Close on escape key
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        close(false);
        document.removeEventListener('keydown', handleEscape);
      }
    };
    document.addEventListener('keydown', handleEscape);
    
    // Focus confirm button
    confirmBtn.focus();
  });
}

/**
 * Create loading skeleton
 * @param {string} type - Type of skeleton (card, text, button)
 * @returns {HTMLElement} Skeleton element
 */
export function createSkeleton(type = 'text') {
  const skeleton = document.createElement('div');
  skeleton.className = 'skeleton';
  
  switch (type) {
    case 'card':
      skeleton.style.height = '300px';
      skeleton.style.borderRadius = 'var(--radius-lg)';
      break;
    case 'button':
      skeleton.style.height = '44px';
      skeleton.style.width = '120px';
      skeleton.style.borderRadius = 'var(--radius-md)';
      break;
    case 'text':
    default:
      skeleton.style.height = '20px';
      skeleton.style.width = '100%';
      skeleton.style.marginBottom = 'var(--space-2)';
      break;
  }
  
  return skeleton;
}

/**
 * Show loading state
 * @param {HTMLElement} container - Container element
 * @param {number} count - Number of skeleton items
 */
export function showLoading(container, count = 3) {
  container.innerHTML = '';
  for (let i = 0; i < count; i++) {
    container.appendChild(createSkeleton('card'));
  }
}

/**
 * Show empty state
 * @param {HTMLElement} container - Container element
 * @param {Object} options - Empty state options
 */
export function showEmptyState(container, options = {}) {
  const {
    title = 'No results found',
    message = 'Try adjusting your filters or search terms',
    icon = '🔍',
    action = null
  } = options;
  
  container.innerHTML = `
    <div class="empty-state">
      <div class="empty-state-icon">${icon}</div>
      <h3>${title}</h3>
      <p>${message}</p>
      ${action ? `<button class="btn btn-primary mt-4">${action.text}</button>` : ''}
    </div>
  `;
  
  if (action && action.handler) {
    const btn = container.querySelector('.btn');
    btn.addEventListener('click', action.handler);
  }
}

/**
 * Debounce function for search inputs
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
export function debounce(func, wait = 300) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Format date for display
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date
 */
export function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  return date.toLocaleDateString('en-US', options);
}

/**
 * Get query parameter from URL
 * @param {string} param - Parameter name
 * @returns {string|null} Parameter value or null
 */
export function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

/**
 * Set query parameter in URL
 * @param {string} param - Parameter name
 * @param {string} value - Parameter value
 */
export function setQueryParam(param, value) {
  const url = new URL(window.location);
  if (value) {
    url.searchParams.set(param, value);
  } else {
    url.searchParams.delete(param);
  }
  window.history.pushState({}, '', url);
}

/**
 * Scroll to top of page
 */
export function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Check if element is in viewport
 * @param {HTMLElement} element - Element to check
 * @returns {boolean} True if in viewport
 */
export function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

/**
 * Lazy load images
 */
export function initLazyLoading() {
  const images = document.querySelectorAll('img[data-src]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      });
    });
    
    images.forEach(img => imageObserver.observe(img));
  } else {
    // Fallback for older browsers
    images.forEach(img => {
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
    });
  }
}

/**
 * Add ripple effect to buttons
 * @param {HTMLElement} button - Button element
 */
export function addRippleEffect(button) {
  button.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    
    this.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
  });
}

// Add ripple effect styles
const style = document.createElement('style');
style.textContent = `
  .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.5);
    transform: scale(0);
    animation: ripple 0.6s ease-out;
    pointer-events: none;
  }
  
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
  
  .btn {
    position: relative;
    overflow: hidden;
  }
  
  .empty-state {
    text-align: center;
    padding: var(--space-12) var(--space-6);
  }
  
  .empty-state-icon {
    font-size: 4rem;
    margin-bottom: var(--space-4);
    opacity: 0.5;
  }
  
  .empty-state h3 {
    color: var(--color-gray-700);
    margin-bottom: var(--space-3);
  }
  
  .empty-state p {
    color: var(--color-gray-500);
  }
  
  @keyframes slideOut {
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
  
  .toast-close {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: var(--color-gray-500);
    padding: 0;
    margin-left: var(--space-3);
  }
`;
document.head.appendChild(style);