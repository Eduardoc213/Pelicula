module.exports = {
  HOST: "ep-wild-silence-aefcpnqr-pooler.c-2.us-east-2.aws.neon.tech",
  USER: "neondb_owner",
  PASSWORD: "npg_RUT1uzIqN7By",
  DB: "Peliculas",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};