import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CustomerDTO, VideoDTO } from "../../../models";
import { VideoStatus } from "../../../models/enums";
import { Rent } from "./Rent";

@Entity()
export class Video implements VideoDTO {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    dateOfPurchase: Date;

    @Column()
    status: VideoStatus;

    @OneToMany(() => Rent, rent => rent.video)
    rents: Rent[];


}