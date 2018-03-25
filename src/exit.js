export const SIGNALS = [
  'SIGHUP',
  'SIGINT',
  'SIGQUIT',
  'SIGTERM',
];

export const exitSafe = (signal) => {
  console.log('going down', signal);
  process.exit(0);
};

const bindExitSignals = () => {
  SIGNALS.forEach((signal) => {
    process.on(signal, () => exitSafe(signal));
  });
};

export default bindExitSignals;
