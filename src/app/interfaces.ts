import { Express } from 'express';
import Queue from "bull";
// App architecture types
export interface IApp {
  express: Express;
  middlewares(): void;
  schedule(): void;
}

export interface IMailQueue {
  bull: Queue.Queue;
  name: string;
  handle: any;
  listener: any;
}