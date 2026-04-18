import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { CustomerDTO } from "../../../models";

@Entity()
export class Customer implements CustomerDTO{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    phone: string;

    @Column({unique: true})
    idCardNumber: string;

    @Column()
    address: string;

    @Column({default: true})
    isActive: boolean;
}