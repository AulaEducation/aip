import { Router } from 'express';
import healthRouter from './health';

expect.extend({
  toBeEqualToFunction(received, argument) {
    if (typeof received !== 'function') {
      return {
        message: () =>
          `expected ${received} to be a function`,
        pass: false,
      };
    }

    if (typeof argument !== 'function') {
      return {
        message: () =>
          `expected ${argument} to be a function`,
        pass: false,
      };
    }

    if (received.name !== argument.name) {
      return {
        message: () =>
          `expected ${received} to have the same name than ${argument}`,
        pass: false,
      };
    }

    return {
      message: () =>
        `expected ${received} to have the same name than ${argument}`,
      pass: true,
    };
  },
});

describe('Health router', () => {
  it('should be a router', (done) => {
    expect(healthRouter).toBeEqualToFunction(Router());
    done();
  });

  it('should have a GET route mounted on /health', (done) => {
    expect(healthRouter.stack[0].route.path).toBe('/health');
    expect(healthRouter.stack[0].route.stack[0].method).toBe('get');
    expect(healthRouter.stack[0].route.stack[0].handle(null, {
      sendStatus: (status) => {
        expect(status).toBe(200);
      },
    }));
    done();
  });

  it('should send a 200 OK', (done) => {
    expect(healthRouter.stack[0].route.path).toBe('/health');
    expect(healthRouter.stack[0].route.stack[0].method).toBe('get');

    healthRouter.stack[0].route.stack[0].handle(null, {
      sendStatus: (status) => {
        expect(status).toBe(200);
        done();
      },
    });
  });
});
