import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from "@nestjs/platform-express";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as csurf from "csurf";
import * as rateLimit from "express-rate-limit";
import * as helmet from "helmet";
import * as Express from "express";
import * as process from "process";

const PORT = process.env.PORT || 8080;

const server = Express();
//Routes for google to check the health of the server
//if the server routes return "ok" then it is valid
server.get("/", (req, res) => res.send("ok"));
server.get("/_ah/health", (req, res) => res.send("ok"));

async function bootstrap() {
  //DEV ENVIRONMENT
  //const app = await NestFactory.create(AppModule, { cors: true });
  //PRODUCTION ENVIRONMENT
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  const apiDescription = `Events App yellow page. Holds a references to all events added by any user that registers as an ORGANIZER`;

  //Enable swagger documentation for this API
  const swaggerConfig = new DocumentBuilder()
                              .setTitle("Events Listings API")
                              .setDescription(apiDescription)
                              .setVersion("1.0")
                              .build();

  const doc = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup("api-docs", app, doc);

  await app.listen(PORT);

  //Set all URLS to use /api
  //app.setGlobalPrefix("api");

  //Ask Nest to use hemet and csurf middleware to regulate the number requests it takes/15 minutes
  app.use(helmet());
  app.use(csurf());
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    }),
  );

  app.enableCors();
}
bootstrap(); 