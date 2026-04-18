import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { CustomerDTO, VideoDTO } from "../../../models";
import { VideoStatus } from "../../../models/enums";

@Entity()
export class Video implements VideoDTO{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    dateOfPurchase: Date;

    @Column()
    status: VideoStatus;

}