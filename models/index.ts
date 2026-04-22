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
    dateOfPurchase: string;
    status: VideoStatus;
    
}

export interface RentDTO{
    id: number;
    customer: CustomerDTO;
    video: VideoDTO;
    rentDate: string;
    isActive: boolean;
    isLate: boolean;
}