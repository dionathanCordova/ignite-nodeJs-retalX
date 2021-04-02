import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("users")
export default class Users {
   @PrimaryColumn()
   id: string;

   @Column()
   name: string;

   @Column()
   password: string;

   @Column()
   email: string;

   @Column()
   avatar: string;

   @Column()
   driver_license: string;

   @Column()
   isAdmin: boolean;

   @CreateDateColumn()
   created_at: Date;

   constructor() {
      if (!this.id) {
         this.id = uuid();
      }
   }
}
