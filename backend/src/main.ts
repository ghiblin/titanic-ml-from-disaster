import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

const whitelist = ["http://localhost:3000", "http://frontend:3000"];

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: function (origin, callback) {
      console.log(`Checking CORS for ${origin}...`);
      if (!origin || whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  });
  await app.listen(4000);
}
bootstrap();
