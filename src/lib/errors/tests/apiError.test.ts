import { describe, it as test, expect } from 'vitest';
import { ApiError, AuthenticationError, AuthorizationError } from '../apiError';

describe('ApiError', () => {
  test('creates basic ApiError', () => {
    const error = new ApiError('Test error', 400);
    expect(error.message).toBe('Test error');
    expect(error.statusCode).toBe(400);
    expect(error.name).toBe('ApiError');
    expect(error.timestamp).toBeDefined();
  });

  test('creates AuthenticationError', () => {
    const error = new AuthenticationError('Auth failed');
    expect(error.message).toBe('Auth failed');
    expect(error.statusCode).toBe(401);
    expect(error.name).toBe('AuthenticationError');
  });

  test('creates AuthorizationError', () => {
    const error = new AuthorizationError('Access denied');
    expect(error.message).toBe('Access denied');
    expect(error.statusCode).toBe(403);
    expect(error.name).toBe('AuthorizationError');
  });

  test('toJSON returns proper structure', () => {
    const error = new ApiError('Test', 500, { detail: 'test' });
    const json = error.toJSON();
    expect(json.name).toBe('ApiError');
    expect(json.message).toBe('Test');
    expect(json.statusCode).toBe(500);
    expect(json.details).toEqual({ detail: 'test' });
  });
});

