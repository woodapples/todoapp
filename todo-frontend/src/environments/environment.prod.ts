// Production environment configuration
export const environment = {
  production: true,
  apiBaseUrl: 'http://localhost:8080/api/todos', // Absolute URL für Production
  enableDebug: false,
  secure: false,
  changeOrigin: true,
  logLevel: 'debug',
  bypass: null,
};
