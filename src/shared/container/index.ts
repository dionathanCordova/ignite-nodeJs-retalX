import { container } from "tsyringe";

import IUsersRepository from "@modules/accounts/repositories/IUsersRepository";
import UserRepository from "@modules/accounts/infra/typeorm/repositories/UserRepository";

import { ICategoryRepository } from "@modules/cars/repositories/ICategoryRepository";
import CategoryRepository from "@modules/cars/infra/typeorm/repositories/CategoryRepository";

import { ISpecificationRepository } from "@modules/cars/repositories/ISpecificationRepository";
import SpecificationRepository from "@modules/cars/infra/typeorm/repositories/SpecificationRepository";

import ICarsRepository from "@modules/cars/repositories/ICarsRepository";
import CarsRepository from "@modules/cars/infra/typeorm/repositories/CarsRepository";

container.registerSingleton<ICategoryRepository>("CategoryRepository", CategoryRepository);
container.registerSingleton<ISpecificationRepository>("SpecificationRepository", SpecificationRepository);
container.registerSingleton<IUsersRepository>("UserRepository", UserRepository);
container.registerSingleton<ICarsRepository>("CarsRepository", CarsRepository);
