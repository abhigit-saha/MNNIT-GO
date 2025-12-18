// API Configuration
// In production, use relative URLs (empty string) so requests go to the same origin
// In development, use localhost:8000

const isDevelopment = import.meta.env.DEV;

export const API_BASE_URL = isDevelopment ? "http://localhost:8000" : "";
export const SOCKET_URL = isDevelopment
  ? "http://localhost:8000"
  : window.location.origin;
