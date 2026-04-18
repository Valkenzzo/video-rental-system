import { Repository } from "typeorm";
import { Controller } from "./base.controller";
import { AppDataSource } from "../data-source";
import { Customer } from "../entity/Customer";

export class CustomerController extends Controller {

    repository = AppDataSource.getRepository(Customer);

    handleError(res, err, status = 500, message = 'Unknown server error') {

        if (err) {
            console.error(err);
        }
        // MySQL duplicate entry
        if (err.code === 'ER_DUP_ENTRY' || err.errno === 1062) {



            return res.status(status).json({
                error: 'A megadott személyi szám már létezik a rendszerben.'
            });
        }


        // fallback a base controller logikájára
        return super.handleError(res, err, status, message);
    }
}
