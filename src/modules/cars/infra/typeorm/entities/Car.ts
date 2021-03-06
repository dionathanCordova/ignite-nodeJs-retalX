import Rentals from "@modules/rentals/infra/typeorm/entities/Rentals";
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import Category from "./Category";
import Specification from "./Specification";

@Entity("cars")
export default class Car {
   constructor() {
      if (!this.id) {
         this.id = uuid();
         this.available = true;
      }
   }

   @PrimaryColumn()
   id: string;

   @Column()
   name: string;

   @Column()
   description: string;

   @Column()
   daily_rate: number;

   @Column()
   available: boolean;

   @Column()
   license_plate: string;

   @Column()
   fine_amount: number;

   @Column()
   brand: string;

   @ManyToOne(() => Category)
   @JoinColumn({ name: "category_id" })
   category: Category;

   @ManyToMany(() => Specification)
   @JoinTable({
      name: "specifications_cars",
      joinColumns: [{ name: "car_id" }],
      inverseJoinColumns: [{ name: "specification_id" }],
   })
   specification: Specification[];

   @ManyToMany(() => Rentals)
   rentals: Rentals[];

   @Column()
   category_id: string;

   @CreateDateColumn()
   created_at: Date;
}
