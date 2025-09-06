/**
 * Form Validation Utilities
 */

/**
 * Validate email format and domain
 * @param {string} email - Email to validate
 * @returns {Object} Validation result with isValid and error message
 */
export function validateEmail(email) {
  if (!email) {
    return { isValid: false, error: 'Email is required' };
  }
  
  // Basic email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { isValid: false, error: 'Please enter a valid email address' };
  }
  
  // Check for student domain
  if (!email.endsWith('@student.amnuaysilpa.ac.th')) {
    return { isValid: false, error: 'Please use your @student.amnuaysilpa.ac.th email' };
  }
  
  return { isValid: true, error: null };
}

/**
 * Validate full name
 * @param {string} name - Name to validate
 * @returns {Object} Validation result
 */
export function validateName(name) {
  if (!name || name.trim().length === 0) {
    return { isValid: false, error: 'Full name is required' };
  }
  
  if (name.trim().length < 3) {
    return { isValid: false, error: 'Please enter your full name' };
  }
  
  // Check for at least first and last name
  const parts = name.trim().split(/\s+/);
  if (parts.length < 2) {
    return { isValid: false, error: 'Please enter both first and last name' };
  }
  
  return { isValid: true, error: null };
}

/**
 * Validate grade selection
 * @param {string} grade - Grade to validate
 * @returns {Object} Validation result
 */
export function validateGrade(grade) {
  const validGrades = ['7', '8', '9', '10', '11', '12'];
  
  if (!grade) {
    return { isValid: false, error: 'Please select your grade' };
  }
  
  if (!validGrades.includes(grade)) {
    return { isValid: false, error: 'Please select a valid grade (7-12)' };
  }
  
  return { isValid: true, error: null };
}

/**
 * Validate motivation text
 * @param {string} motivation - Motivation text to validate
 * @returns {Object} Validation result
 */
export function validateMotivation(motivation) {
  if (!motivation || motivation.trim().length === 0) {
    return { isValid: false, error: 'Please tell us why you want to join' };
  }
  
  if (motivation.trim().length < 50) {
    return { isValid: false, error: 'Please provide more detail (minimum 50 characters)' };
  }
  
  if (motivation.length > 500) {
    return { isValid: false, error: 'Please keep your response under 500 characters' };
  }
  
  return { isValid: true, error: null };
}

/**
 * Validate availability selection
 * @param {Array} availability - Array of selected days
 * @returns {Object} Validation result
 */
export function validateAvailability(availability) {
  if (!availability || availability.length === 0) {
    return { isValid: false, error: 'Please select at least one day you\'re available' };
  }
  
  return { isValid: true, error: null };
}

/**
 * Validate entire application form
 * @param {Object} formData - Form data object
 * @returns {Object} Validation result with field-specific errors
 */
export function validateApplicationForm(formData) {
  const errors = {};
  let isValid = true;
  
  // Validate name
  const nameResult = validateName(formData.name);
  if (!nameResult.isValid) {
    errors.name = nameResult.error;
    isValid = false;
  }
  
  // Validate grade
  const gradeResult = validateGrade(formData.grade);
  if (!gradeResult.isValid) {
    errors.grade = gradeResult.error;
    isValid = false;
  }
  
  // Validate email
  const emailResult = validateEmail(formData.email);
  if (!emailResult.isValid) {
    errors.email = emailResult.error;
    isValid = false;
  }
  
  // Validate motivation
  const motivationResult = validateMotivation(formData.motivation);
  if (!motivationResult.isValid) {
    errors.motivation = motivationResult.error;
    isValid = false;
  }
  
  // Validate availability
  const availabilityResult = validateAvailability(formData.availability);
  if (!availabilityResult.isValid) {
    errors.availability = availabilityResult.error;
    isValid = false;
  }
  
  // Check agreement
  if (!formData.agreement) {
    errors.agreement = 'You must agree to the terms';
    isValid = false;
  }
  
  return { isValid, errors };
}

/**
 * Sanitize input to prevent XSS
 * @param {string} input - Input to sanitize
 * @returns {string} Sanitized input
 */
export function sanitizeInput(input) {
  if (!input) return '';
  
  const div = document.createElement('div');
  div.textContent = input;
  return div.innerHTML;
}