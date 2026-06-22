const Sentry = require("@sentry/node");

// Asegurar que las variables de entorno estén cargadas para Sentry
require('dotenv').config();

Sentry.init({
  dsn: process.env.SENTRY_DSN || "",
  environment: process.env.NODE_ENV || "development",
  tracesSampleRate: 1.0
});
