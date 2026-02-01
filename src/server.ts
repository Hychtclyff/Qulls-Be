import { buildUp } from "./common/configs/app.js";
import "dotenv/config";
const start = async () => {
  const app = await buildUp();

  try {
    await app.listen({
      port: app.config.PORT,
      host: "0.0.0.0",
    });
    app.log.info(`🚀 Sentinel running on port ${app.config.PORT}/api/v1s`);
    console.log(`➡️  API URL: http://localhost:${app.config.PORT}/api/v1`);
    console.log(`📄 Docs URL: http://localhost:${app.config.PORT}/docs`); // Link Swagger
    console.log(`\n`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
