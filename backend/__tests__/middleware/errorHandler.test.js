import { describe, it, expect, vi } from 'vitest';
import errorHandler from '../../src/middleware/errorHandler.js';

const mockRes = () => {
  const res = {};
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  return res;
};

describe('errorHandler', () => {
  it('returns 500 with generic message in production', () => {
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'production';

    const err = new Error('DB connection failed');
    const res = mockRes();
    errorHandler(err, {}, res, () => {});

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: 'Internal server error',
    });

    process.env.NODE_ENV = originalEnv;
  });

  it('returns error details in development', () => {
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'development';

    const err = new Error('Something broke');
    err.statusCode = 422;
    const res = mockRes();
    errorHandler(err, {}, res, () => {});

    expect(res.status).toHaveBeenCalledWith(422);
    const body = res.json.mock.calls[0][0];
    expect(body.success).toBe(false);
    expect(body.message).toBe('Something broke');
    expect(body.stack).toBeDefined();

    process.env.NODE_ENV = originalEnv;
  });

  it('defaults to 500 when no statusCode on error', () => {
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'development';
    const err = new Error('oops');
    const res = mockRes();
    errorHandler(err, {}, res, () => {});
    expect(res.status).toHaveBeenCalledWith(500);
    process.env.NODE_ENV = originalEnv;
  });
});
