import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Customer } from "./Customer";
import { Video } from "./Video";
import { RentDTO } from "../../../models";

@Entity()
export class Rent implements RentDTO{
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Customer, customer => customer.rents, { eager: true })
    customer: Customer;

    @ManyToOne(() => Video, video => video.rents, { eager: true })
    video: Video;

    @Column()
    rentDate: string;

   
    @Column({ default: true })
    isActive: boolean;

    @Column({ default: false })
    isLate: boolean;
}
