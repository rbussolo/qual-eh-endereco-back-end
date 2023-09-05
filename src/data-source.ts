import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "bussolo",
  database: "qual-endereco",
  synchronize: true,
  logging: false,
  entities: ["src/modules/countries/entities/*.ts",
    "src/modules/states/entities/*.ts",
    "src/modules/cities/entities/*.ts",
    "src/modules/neighborhoods/entities/*.ts",
    "src/modules/addresses/entities/*.ts"],
  migrations: ["src/database/migrations/*.ts"],
  subscribers: [],
});

