import { VideoStatus } from "./enums";

export interface CustomerDTO{
    id: number;
    name: string;
    phone: string;
    idCardNumber: string;
    address: string;
    isActive: boolean;
    rents: RentDTO[];
}

export interface VideoDTO{
    id: number;
    title: string;
    dateOfPurchase: Date;
    status: VideoStatus;
    
}

export interface RentDTO{
    id: number;
    customer: CustomerDTO;
    video: VideoDTO;
    rentDate: Date;
    returnDate: Date | null;
    isActive: boolean;
    isLate: boolean;
}