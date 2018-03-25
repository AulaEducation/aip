import bindExitSignals, { exitSafe, SIGNALS } from './exit';

describe('Handle exit', () => {
  it('should include signals', () => {
    const s = [
      'SIGHUP',
      'SIGINT',
      'SIGQUIT',
      'SIGTERM',
    ];

    expect(SIGNALS).toEqual(s);
  });

  it('should bind all signals', (done) => {
    const { on } = process.on;
    process.on = jest.fn();

    bindExitSignals();

    expect(process.on).toHaveBeenCalledTimes(SIGNALS.length);

    process.on = on;
    done();
  });

  it('should exit safely', (done) => {
    const { exit } = process.exit;
    const { log } = console.log;
    const fakeExit = jest.fn();
    const fakeLog = jest.fn();
    process.exit = fakeExit;
    console.log = fakeLog;

    exitSafe(SIGNALS[0]);

    process.exit = exit;
    console.log = log;

    expect(fakeLog).toHaveBeenCalledWith('going down', SIGNALS[0]);
    expect(fakeExit).toHaveBeenCalledWith(0);

    done();
  });
});
