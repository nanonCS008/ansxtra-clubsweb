/**
 * Data Adapter Layer
 * Provides a unified interface for data access that can switch between
 * local JSON files and API endpoints without changing the UI code
 */

// Feature flag to switch between local JSON and API
const USE_API = false; // Set to true when backend is ready

// API base URL (update when backend is deployed)
const API_BASE_URL = '/api';

/**
 * Fetch clubs data
 * @returns {Promise<Array>} Array of club objects
 */
export async function getClubs() {
  if (USE_API) {
    try {
      const response = await fetch(`${API_BASE_URL}/clubs`);
      if (!response.ok) throw new Error('Failed to fetch clubs');
      return await response.json();
    } catch (error) {
      console.error('Error fetching clubs from API:', error);
      throw error;
    }
  } else {
    try {
      const response = await fetch('/data/clubs.json');
      if (!response.ok) throw new Error('Failed to fetch clubs');
      return await response.json();
    } catch (error) {
      console.error('Error fetching clubs from JSON:', error);
      throw error;
    }
  }
}

/**
 * Fetch a single club by ID
 * @param {string} id - Club ID
 * @returns {Promise<Object>} Club object
 */
export async function getClubById(id) {
  if (USE_API) {
    try {
      const response = await fetch(`${API_BASE_URL}/clubs/${id}`);
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Club not found');
        }
        throw new Error('Failed to fetch club');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching club from API:', error);
      throw error;
    }
  } else {
    try {
      const clubs = await getClubs();
      const club = clubs.find(c => c.id === id);
      if (!club) {
        throw new Error('Club not found');
      }
      return club;
    } catch (error) {
      console.error('Error fetching club from JSON:', error);
      throw error;
    }
  }
}

/**
 * Get applications for a specific email
 * @param {string} email - Student email
 * @returns {Promise<Array>} Array of application objects
 */
export async function getApplications(email) {
  if (USE_API) {
    try {
      const response = await fetch(`${API_BASE_URL}/applications?email=${encodeURIComponent(email)}`);
      if (!response.ok) throw new Error('Failed to fetch applications');
      return await response.json();
    } catch (error) {
      console.error('Error fetching applications from API:', error);
      throw error;
    }
  } else {
    // Get from localStorage
    const stored = localStorage.getItem('ansxtra_applications');
    if (!stored) return [];
    
    try {
      const allApplications = JSON.parse(stored);
      // Filter by email
      const userApplications = allApplications.filter(app => app.applicant.email === email);
      
      // Enhance with club names
      const clubs = await getClubs();
      return userApplications.map(app => {
        const club = clubs.find(c => c.id === app.clubId);
        return {
          ...app,
          clubName: club ? club.name : 'Unknown Club'
        };
      });
    } catch (error) {
      console.error('Error parsing applications from localStorage:', error);
      return [];
    }
  }
}

/**
 * Create a new application
 * @param {Object} payload - Application data
 * @returns {Promise<Object>} Created application object
 */
export async function createApplication(payload) {
  if (USE_API) {
    try {
      const response = await fetch(`${API_BASE_URL}/applications`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to submit application');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error submitting application to API:', error);
      throw error;
    }
  } else {
    // Save to localStorage
    const stored = localStorage.getItem('ansxtra_applications');
    const applications = stored ? JSON.parse(stored) : [];
    
    // Check for existing application
    const existingIndex = applications.findIndex(
      app => app.clubId === payload.clubId && app.applicant.email === payload.applicant.email
    );
    
    const newApplication = {
      id: `app_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      ...payload,
      submittedAt: new Date().toISOString(),
      status: 'Submitted'
    };
    
    if (existingIndex !== -1) {
      // Update existing application
      applications[existingIndex] = newApplication;
    } else {
      // Add new application
      applications.push(newApplication);
    }
    
    localStorage.setItem('ansxtra_applications', JSON.stringify(applications));
    
    // Get club name for response
    try {
      const club = await getClubById(payload.clubId);
      return {
        ...newApplication,
        clubName: club.name
      };
    } catch {
      return newApplication;
    }
  }
}

/**
 * Update application status (for demo purposes)
 * @param {string} applicationId - Application ID
 * @param {string} newStatus - New status
 * @returns {Promise<Object>} Updated application
 */
export async function updateApplicationStatus(applicationId, newStatus) {
  if (USE_API) {
    // This would be an admin-only endpoint in production
    throw new Error('Status updates not available via API in demo mode');
  } else {
    const stored = localStorage.getItem('ansxtra_applications');
    if (!stored) throw new Error('Application not found');
    
    const applications = JSON.parse(stored);
    const appIndex = applications.findIndex(app => app.id === applicationId);
    
    if (appIndex === -1) throw new Error('Application not found');
    
    applications[appIndex].status = newStatus;
    applications[appIndex].updatedAt = new Date().toISOString();
    
    localStorage.setItem('ansxtra_applications', JSON.stringify(applications));
    return applications[appIndex];
  }
}

/**
 * Delete an application (withdraw)
 * @param {string} applicationId - Application ID
 * @returns {Promise<boolean>} Success status
 */
export async function deleteApplication(applicationId) {
  if (USE_API) {
    // This would be a DELETE endpoint in production
    throw new Error('Application withdrawal not available via API in demo mode');
  } else {
    const stored = localStorage.getItem('ansxtra_applications');
    if (!stored) return false;
    
    const applications = JSON.parse(stored);
    const filteredApplications = applications.filter(app => app.id !== applicationId);
    
    if (applications.length === filteredApplications.length) {
      return false; // Application not found
    }
    
    localStorage.setItem('ansxtra_applications', JSON.stringify(filteredApplications));
    return true;
  }
}

/**
 * Check if a student has already applied to a club
 * @param {string} clubId - Club ID
 * @param {string} email - Student email
 * @returns {Promise<Object|null>} Existing application or null
 */
export async function checkExistingApplication(clubId, email) {
  const applications = await getApplications(email);
  return applications.find(app => app.clubId === clubId) || null;
}