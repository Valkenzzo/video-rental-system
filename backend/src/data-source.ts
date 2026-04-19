import { DataSource } from "typeorm";
import { Customer } from "./entity/Customer";
import { Video } from "./entity/Video";
import { Rent } from "./entity/Rent";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    //password: "test",
    database: "video_rental",
    synchronize: true,
    logging: true,
    entities: [Customer,Video,Rent],
    subscribers: [],
    migrations: [],
});