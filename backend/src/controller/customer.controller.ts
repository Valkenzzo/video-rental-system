import { Controller } from "./base.controller";
import { AppDataSource } from "../data-source";
import { Customer } from "../entity/Customer";

export class CustomerController extends Controller {

    repository = AppDataSource.getRepository(Customer);

    // Felülírjuk arrow functionként → megmarad a this kötés
    getAll = async (req, res) => {
        try {
            const customers = await this.repository.find({
                relations: ['rents', 'rents.video']
            });
            res.json(customers);
        } catch (err) {
            this.handleError(res, err);
        }
    };

    getOne = async (req, res) => {
        try {
            const id = req.params['id'];

            const customer = await this.repository.findOne({
                where: { id },
                relations: ['rents', 'rents.video']
            });

            if (!customer) {
                return this.handleError(res, null, 404, 'No entity exists with the given id');
            }

            res.json(customer);

        } catch (err) {
            this.handleError(res, err);
        }
    };

    // Hibakezelés felülírása
    handleError (res, err, status = 500, message = 'Unknown server error')  {

        if (err) console.error(err);

        // MySQL duplicate entry
        if (err?.code === 'ER_DUP_ENTRY' || err?.errno === 1062) {
            return res.status(400).json({
                error: 'A megadott személyi szám már létezik a rendszerben.'
            });
        }

        // fallback a base controllerre
        return super.handleError(res, err, status, message);
    };
}
