import childProcess from 'child_process';
import { Router } from 'express';
import getUpdateRouter, { forceUpdate } from './update';

childProcess.exec = jest.fn();

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

describe('Kill process for update', () => {
  it('should send a kill signal', (done) => {
    forceUpdate();
    expect(childProcess.exec).toHaveBeenCalledWith('kill -2 1');
    done();
  });
});

describe('Update router', () => {
  const logMock = jest.fn();
  const updateRouter = getUpdateRouter({
    log: {
      log: logMock,
    },
  });

  it('should be a router', (done) => {
    expect(updateRouter).toBeEqualToFunction(Router());
    done();
  });

  it('should have a POST route mounted on /', (done) => {
    expect(updateRouter.stack[0].route.path).toBe('/');
    expect(updateRouter.stack[0].route.stack[0].method).toBe('post');
    done();
  });

  it('should log and kill process', (done) => {
    expect(updateRouter.stack[0].route.path).toBe('/');
    expect(updateRouter.stack[0].route.stack[0].method).toBe('post');
    updateRouter.stack[0].route.stack[0].handle();
    expect(logMock).toHaveBeenCalledWith('Requesting AIP code update');
    expect(childProcess.exec).toHaveBeenCalledWith('kill -2 1');
    done();
  });
});
