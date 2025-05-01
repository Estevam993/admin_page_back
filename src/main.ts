import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Seeder } from "./database/seeders/seeder";
import * as session from "express-session";

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

    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
