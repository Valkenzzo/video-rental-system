import { Repository } from "typeorm";
import { Controller } from "./base.controller";
import { AppDataSource } from "../data-source";
import { Video } from "../entity/Video";

export class VideoController extends Controller {

    repository = AppDataSource.getRepository(Video);

}
