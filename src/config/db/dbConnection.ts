import "reflect-metadata";
import { createConnection, Connection } from "typeorm";
import { IdbConnection } from "./interfaces";

export default class dbConnection implements IdbConnection{

  connection: Connection | null;

  constructor() {
    this.connection = null;
  }

  init(callback: Function): void {
    callback.bind(this)();
  }

  async callbackInit(): Promise<void> {
    await this.dbConnect();
  }

  async dbConnect(): Promise<Connection | undefined> {
    try {
      const connection = await createConnection();
      if (!!connection) {
        this.connection = connection;
        console.log("Connected to the database");
      }
      return connection;
    } catch (error) {
      console.log(error);
    }
  }

}