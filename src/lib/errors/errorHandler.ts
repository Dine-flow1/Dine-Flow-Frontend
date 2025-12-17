import { ApiError, AuthenticationError, AuthorizationError } from './apiError';

export interface ErrorResponse {
  error: string;
  message: string;
  statusCode: number;
  timestamp: string;
  details?: any;
}

export function handleApiError(error: unknown): ErrorResponse {
  console.error('API Error:', error);

  if (error instanceof ApiError) {
    return {
      error: error.name,
      message: error.message,
      statusCode: error.statusCode,
      timestamp: error.timestamp,
      details: error.details,
    };
  }

  if (error instanceof Error) {
    return {
      error: 'InternalError',
      message: error.message,
      statusCode: 500,
      timestamp: new Date().toISOString(),
    };
  }

  return {
    error: 'UnknownError',
    message: 'An unknown error occurred',
    statusCode: 500,
    timestamp: new Date().toISOString(),
  };
}

export function isAuthenticationError(error: unknown): boolean {
  return error instanceof AuthenticationError;
}

export function isAuthorizationError(error: unknown): boolean {
  return error instanceof AuthorizationError;
}

export function shouldRedirectToLogin(error: unknown): boolean {
  return (
    error instanceof AuthenticationError ||
    (error instanceof ApiError && error.statusCode === 401)
  );
}

export function handleAuthError(error: unknown): void {
  if (shouldRedirectToLogin(error)) {
    if (typeof window !== 'undefined') {
      const userRole = localStorage.getItem('userRole');
      if (userRole === 'manager') {
        window.location.href = '/managers/login';
      } else {
        window.location.href = '/login';
      }
    }
  }
}