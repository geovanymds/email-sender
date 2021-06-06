import { createConnection, Connection } from "typeorm";

export interface IdbConnection {

  connection: Connection | null;

  init(callback: Function): void;

  callbackInit(): Promise<void>;

  dbConnect(): Promise<Connection | undefined>;
}