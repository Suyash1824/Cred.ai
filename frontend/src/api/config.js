/**
 * Cred.ai API Configuration
 * 
 * USE_MOCKS is enabled by default for demo and frontend development.
 * Set VITE_USE_MOCKS=false in .env to connect to the live FastAPI backend.
 */
export const USE_MOCKS = import.meta.env.VITE_USE_MOCKS !== 'false';
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

// Simulates realistic network latency when using mocks for high quality UI demo
export const mockDelay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms));

