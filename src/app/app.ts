import express, {Express, Request, Response, NextFunction} from "express";
import errorHandler from "../middlewares/errorHandler";
import dbConnection from "../config/db/dbConnection";
import cron from 'node-cron';
import sendMailToUsers from '../jobs/sendMailToUsers';
import * as bullBoard from 'bull-board';
import { BullAdapter } from 'bull-board/bullAdapter';
import queue from './queue';

import { IApp } from "./interfaces";

class App implements IApp {
  
  express: Express;

  constructor() {
    this.express = express();
    const connection = new dbConnection();
    connection.init(connection.dbConnect);

    this.middlewares();
    this.express.use(errorHandler);
    this.express.listen(process.env.PORT || 8000);
    console.log(`Listening on port ${process.env.PORT || 8000}`);
  }

  middlewares() {
    this.express.use(express.json({ limit: "20mb" }));
    this.express.use(express.urlencoded({ extended: true, limit: "20mb" }));
    this.express.get('/sendMails', async(req:Request, res:Response, next:NextFunction)=>{
      sendMailToUsers();
      return res.status(200).json({message:'Emails enviados'});
    });
    this.express.use('/queues', bullBoard.createBullBoard([new BullAdapter(queue.bull)]).router);
    this.express.use((error:Error): Error => {
      return new Error("Erro na execução.");
  })}

  schedule() {
    cron.schedule('0 2 * * *', async () => {
      await sendMailToUsers();
  });
  }
}

export default App;
