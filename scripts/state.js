/**
 * State Management
 * Handles localStorage operations and application state
 */

const STORAGE_KEY = 'ansxtra_applications';
const USER_KEY = 'ansxtra_current_user';

/**
 * Get current user from session
 * @returns {Object|null} User object or null
 */
export function getCurrentUser() {
  const stored = sessionStorage.getItem(USER_KEY);
  if (!stored) return null;
  
  try {
    return JSON.parse(stored);
  } catch {
    return null;
  }
}

/**
 * Set current user in session
 * @param {Object} user - User object with email, name, grade
 */
export function setCurrentUser(user) {
  if (!user) {
    sessionStorage.removeItem(USER_KEY);
  } else {
    sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }
}

/**
 * Get all applications from localStorage
 * @returns {Array} Array of applications
 */
export function getAllApplications() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return [];
  
  try {
    return JSON.parse(stored);
  } catch (error) {
    console.error('Error parsing applications:', error);
    return [];
  }
}

/**
 * Save applications to localStorage
 * @param {Array} applications - Array of applications
 */
export function saveApplications(applications) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(applications));
}

/**
 * Clear all applications (for testing)
 */
export function clearAllApplications() {
  localStorage.removeItem(STORAGE_KEY);
}

/**
 * Get application statistics
 * @returns {Object} Statistics object
 */
export function getApplicationStats() {
  const applications = getAllApplications();
  
  return {
    total: applications.length,
    submitted: applications.filter(app => app.status === 'Submitted').length,
    underReview: applications.filter(app => app.status === 'Under Review').length,
    accepted: applications.filter(app => app.status === 'Accepted').length,
    rejected: applications.filter(app => app.status === 'Rejected').length
  };
}

/**
 * Simulate status progression for demo
 * @param {string} currentStatus - Current status
 * @returns {string} Next status in progression
 */
export function getNextStatus(currentStatus) {
  const statusProgression = {
    'Submitted': 'Under Review',
    'Under Review': 'Accepted',
    'Accepted': 'Rejected',
    'Rejected': 'Submitted'
  };
  
  return statusProgression[currentStatus] || 'Submitted';
}