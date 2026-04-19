import express from "express";
import { CustomerController } from "./controller/customer.controller";
import { VideoController } from "./controller/video.controller";
import { RentController } from "./controller/rent.controller";

export const appRouter=express.Router();

const customerController=new CustomerController();

appRouter.get('/customer', customerController.getAll);
appRouter.get('/customer/:id', customerController.getOne);
appRouter.post('/customer', customerController.create);
appRouter.put('/customer', customerController.update);
appRouter.delete('/customer/:id', customerController.delete);

const videoController=new VideoController();

appRouter.get('/video', videoController.getAll);
appRouter.post('/video', videoController.create);
appRouter.get('/video/:id', videoController.getOne);
appRouter.put('/video', videoController.update);
appRouter.delete('/video/:id', videoController.delete);

const rentController=new RentController();

appRouter.get('/rent', rentController.getAll);
appRouter.post('/rent', rentController.create);
appRouter.delete('/rent/:id', rentController.delete);