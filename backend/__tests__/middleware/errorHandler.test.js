import { describe, it, expect, vi } from 'vitest';

const mockRes = () => {
  const res = {};
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  return res;
};

const mockReq = { originalUrl: '/test', method: 'POST' };

describe('errorHandler', () => {
  it('returns 500 with generic message in production', async () => {
    vi.doMock('../../src/config/env.js', () => ({
      default: { NODE_ENV: 'production' },
    }));
    const { default: errorHandler } = await import('../../src/middleware/errorHandler.js');

    const err = new Error('DB connection failed');
    const res = mockRes();
    errorHandler(err, mockReq, res, () => {});

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: 'Internal server error',
    });

    vi.restoreAllMocks();
    vi.resetModules();
  });

  it('returns message without stack for 4xx in development', async () => {
    vi.doMock('../../src/config/env.js', () => ({
      default: { NODE_ENV: 'development' },
    }));
    const { default: errorHandler } = await import('../../src/middleware/errorHandler.js');

    const err = new Error('Bad request');
    err.statusCode = 400;
    const res = mockRes();
    errorHandler(err, mockReq, res, () => {});

    expect(res.status).toHaveBeenCalledWith(400);
    const body = res.json.mock.calls[0][0];
    expect(body.success).toBe(false);
    expect(body.message).toBe('Bad request');
    expect(body.stack).toBeUndefined();

    vi.restoreAllMocks();
    vi.resetModules();
  });

  it('returns generic message for 500 even in development', async () => {
    vi.doMock('../../src/config/env.js', () => ({
      default: { NODE_ENV: 'development' },
    }));
    const { default: errorHandler } = await import('../../src/middleware/errorHandler.js');

    const err = new Error('internal secret leaked');
    const res = mockRes();
    errorHandler(err, mockReq, res, () => {});

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: 'Internal server error',
    });

    vi.restoreAllMocks();
    vi.resetModules();
  });
});
