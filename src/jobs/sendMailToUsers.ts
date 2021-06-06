import {getRepository} from "typeorm";
import { User } from "../models/index";
import queue from '../app/queue';

export default async function sendMailToUsers() {

  try {

    const UserRepository = getRepository(User);

    const users = await UserRepository.find();

    if(!users) {
      throw new Error("No recorded found for users.");
    }

    await Promise.all(users.map(async (user)=>{
      queue.add(user);
    }));

  } catch (error) {
    throw(new Error(error));
  }

}
