import Car from "@modules/cars/infra/typeorm/entities/Car";
import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("rentals")
export default class Rentals {
   @PrimaryColumn()
   id: string;

   @Column()
   car_id: string;

   @Column()
   user_id: string;

   @Column()
   start_date: Date;

   @Column()
   end_date: Date;

   @Column()
   expected_return_date: Date;

   @Column()
   total: number;

   @CreateDateColumn()
   created_at: Date;

   @UpdateDateColumn()
   updated_at: Date;

   constructor() {
      if (!this.id) {
         this.id = uuid();
      }
   }
}