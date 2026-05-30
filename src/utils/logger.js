const logger = {
  info(message, data) {
    const timestamp = new Date().toISOString();
    const payload = data ? ` ${JSON.stringify(data)}` : '';
    console.log(`[INFO] ${timestamp} - ${message}${payload}`);
  },

  warn(message, data) {
    const timestamp = new Date().toISOString();
    const payload = data ? ` ${JSON.stringify(data)}` : '';
    console.warn(`[WARN] ${timestamp} - ${message}${payload}`);
  },

  error(message, err) {
    const timestamp = new Date().toISOString();
    const detail = err ? ` ${err.message || err}` : '';
    console.error(`[ERROR] ${timestamp} - ${message}${detail}`);
  },
};

module.exports = logger;
