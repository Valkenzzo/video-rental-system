import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CustomerDTO } from "../../../models";
import { Rent } from "./Rent";

@Entity()
export class Customer implements CustomerDTO {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    phone: string;

    @Column({ unique: true })
    idCardNumber: string;

    @Column()
    address: string;

    @Column({ default: true })
    isActive: boolean;

    @OneToMany(() => Rent, rent => rent.customer)
    rents: Rent[];

}