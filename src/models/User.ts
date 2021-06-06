import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { IUser } from "./interfaces";

@Entity('users')
export class User implements IUser{

    @PrimaryGeneratedColumn({type: "int"})
    user_id!: number;

    @Column({type: "varchar", length:45})
    email!: string;

    @Column({type: "varchar", length:45})
    firstName!: string;

    @Column({type: "varchar", length:45})
    lastName!: string;

    @Column({type: "date"})
    birthday!: Date;

    constructor(email: string, firstName: string, lastName: string, birthday: Date) {
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthday = birthday;
    }

}

