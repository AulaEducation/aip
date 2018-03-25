import { Router } from 'express';
import getIdentityRouter from './identity';

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

describe('Identity router', () => {
  it('should return a router', (done) => {
    const router = getIdentityRouter({});
    expect(router).toBeEqualToFunction(Router());
    done();
  });

  it('should have a POST route mounted on /', (done) => {
    const router = getIdentityRouter({});
    expect(router.stack[0].route.path).toBe('/');
    expect(router.stack[0].route.stack[0].method).toBe('post');
    done();
  });

  describe('Identity request', () => {
    const mockLog = jest.fn();
    const mockErr = jest.fn();
    const mockStoreIdentity = jest.fn().mockImplementation((i) => {
      if (i === 'test@aula.education') {
        return { id: i };
      }
      return null;
    });

    const mockFilter = jest.fn().mockImplementation(i => i);

    const router = getIdentityRouter({
      log: {
        log: mockLog,
        error: mockErr,
      },
      filter: {
        filter: mockFilter,
      },
      store: {
        getIdentity: mockStoreIdentity,
      },
    });

    it('should request an identity and succeed', (done) => {
      const id = 'test@aula.education';

      const req = {
        body: {
          id,
        },
      };

      const res = {};

      const next = () => {
        expect(mockLog).toHaveBeenCalledWith('Fetch Identity for', id, 'success');
        expect(mockStoreIdentity).toHaveBeenCalledWith(id);
        expect(mockFilter).toHaveBeenCalledWith({ id });
        expect(res.body).toEqual({ id });
        done();
      };

      router.stack[0].route.stack[0].handle(req, res, next);
    });

    it('should request an identity and fail', (done) => {
      const id = 'yop@aula.education';

      const req = {
        body: {
          id,
        },
      };

      const res = {};

      const next = () => {
        expect(mockErr).toHaveBeenCalledWith('Fetch Identity for', id, 'not found');
        expect(mockStoreIdentity).toHaveBeenCalledWith(id);
        expect(mockFilter).toHaveBeenCalledWith(null);
        expect(res.body).toBeNull();
        done();
      };

      router.stack[0].route.stack[0].handle(req, res, next);
    });
  });
});
