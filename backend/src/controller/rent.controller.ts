import { Repository } from "typeorm";
import { Controller } from "./base.controller";
import { AppDataSource } from "../data-source";
import { Rent } from "../entity/Rent";

export class RentController extends Controller {

    repository = AppDataSource.getRepository(Rent);

}
