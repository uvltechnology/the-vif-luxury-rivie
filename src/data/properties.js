/**
 * Properties data - Now fetched from backend API
 * This file is kept for backwards compatibility with any legacy imports
 * All components should use the API service layer: src/services/api.js
 * 
 * Images are served from the backend at /uploads/images/ path
 */

// Base URL for images (use BACKEND_URL env or derive from VITE_API_URL origin)
const ENV_API_URL = typeof import.meta !== 'undefined' ? import.meta.env?.VITE_API_URL : null;
const ENV_BACKEND_URL = typeof import.meta !== 'undefined' ? import.meta.env?.VITE_BACKEND_URL : null;

function getOriginFromApiUrl(apiUrl) {
  try {
    const u = new URL(apiUrl);
    return `${u.protocol}//${u.hostname}${u.port ? ':'+u.port : ''}`;
  } catch {
    return null;
  }
}

const API_BASE = ENV_BACKEND_URL || getOriginFromApiUrl(ENV_API_URL) || 'http://localhost:3000';

// Helper to get image URL
export const getImageUrl = (path) => {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  return `${API_BASE}${path.startsWith('/') ? '' : '/'}${path}`;
};

// Legacy export - use API instead
export const properties = [];

export default properties;
