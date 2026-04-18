import { VideoStatus } from "./enums";

export interface CustomerDTO{
    id: number;
    name: string;
    phone: string;
    idCardNumber: string;
    address: string;
    isActive: boolean;
}

export interface VideoDTO{
    id: number;
    title: string;
    dateOfPurchase: Date;
    status: VideoStatus;
    
}