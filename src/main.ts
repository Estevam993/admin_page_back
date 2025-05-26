import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Seeder } from "./database/seeders/seeder";
import * as session from "express-session";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const seeder = app.get(Seeder);
    await seeder.seed();

    app.use(
        session({
            secret: "1234",
            resave: false,
            saveUninitialized: false,
        }),
    );

    const config = new DocumentBuilder()
        .setTitle("Admin API")
        .setDescription("API para administração do sistema")
        .setVersion("1.0")
        .addBearerAuth()
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("api", app, document); // A documentação do Swagger ficará acessível na rota /api

    await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
