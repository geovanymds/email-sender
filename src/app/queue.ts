import Queue from "bull";
import mailSender from "../jobs/mailSender";
import {IMailQueue} from './interfaces';
import redis from "../config/redis";

class MailQueue implements IMailQueue{
  bull: Queue.Queue;
  name: string;

  constructor() {
    this.bull = new Queue(mailSender.key, { redis });
    this.name = mailSender.key;
  }

  async add(data: any) {
    return this.bull.add(data, null);
  }

  handle(job:any) {
    mailSender.handle(job);
  }

  listener() {
    mailSender.listener();
  }

  async process() {
    this.bull.process(async (job, done) => {
      try {
        const result = await this.handle(job);
        await this.listener();
        done(null, result);
      } catch (error) {
        done(error, null);
      }
    });

    this.bull.on("completed", async (job, result) => {
      console.log(`Job ${job.id} completed`);
    });

    this.bull.on("failed", (job, err) => {
      console.log(`Job ${job.id} failed`);
      console.log(err);
    });
    console.log(`queueItem runing on ${redis.host}:${redis.port}`);
  }
  async test() {
    return this.bull.isReady();
  }
}

export default new MailQueue();
