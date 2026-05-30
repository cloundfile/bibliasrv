let oracledb = null;
let pool = null;

function getOracle() {
  if (!oracledb) {
    oracledb = require('oracledb');
  }
  return oracledb;
}

async function getPool() {
  if (pool) return pool;

  const oracle = getOracle();
  oracle.outFormat = oracle.OUT_FORMAT_OBJECT;

  pool = await oracle.createPool({
    user: process.env.ORACLE_USERNAME,
    password: process.env.ORACLE_PASSWORD,
    connectionString: process.env.ORACLE_HOSTNAME,
    poolMin: 2,
    poolMax: 10,
    poolIncrement: 1,
    poolTimeout: 60,
  });

  return pool;
}

async function getConnection() {
  const p = await getPool();
  return p.getConnection();
}

async function closePool() {
  if (pool) {
    const p = pool;
    pool = null;
    await p.close();
  }
}

function lowerKeys(obj) {
  if (!obj || typeof obj !== 'object' || Array.isArray(obj)) return obj;
  const lower = {};
  for (const key of Object.keys(obj)) {
    lower[key.toLowerCase()] = obj[key];
  }
  return lower;
}

async function execute(sql, binds = [], options = {}) {
  const oracle = getOracle();
  const conn = await getConnection();
  try {
    const result = await conn.execute(sql, binds, {
      outFormat: oracle.OUT_FORMAT_OBJECT,
      ...options,
    });
    if (result.rows) {
      result.rows = result.rows.map(lowerKeys);
    }
    return result;
  } finally {
    await conn.close();
  }
}

module.exports = {
  getPool,
  getConnection,
  closePool,
  execute,
};
