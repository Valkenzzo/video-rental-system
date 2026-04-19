import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Customer } from "./Customer";
import { Video } from "./Video";

@Entity()
export class Rent {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Customer, customer => customer.rents, { eager: true })
    customer: Customer;

    @ManyToOne(() => Video, video => video.rents, { eager: true })
    video: Video;

    @Column()
    rentDate: Date;

    @Column({ nullable: true })
    returnDate: Date;

    @Column({ default: true })
    isActive: boolean;
}
