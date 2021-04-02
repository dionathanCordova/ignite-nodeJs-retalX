import { Router } from "express";
import multer from "multer";

import CreateCategoryController from "../modules/cars/useCases/createCategory/CreaeteCategoryController";
import ImportCategoryController from "../modules/cars/useCases/ImportCategory/ImportCategoryController";
import ListCategoriesController from "../modules/cars/useCases/listCategories/ListCategoriesController";

const categoryRouter = Router();

const upload = multer({
   dest: "./tmp",
});

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoriesController = new ListCategoriesController();

categoryRouter.post("/create", createCategoryController.handle);
categoryRouter.get("/list", listCategoriesController.handle);
categoryRouter.post("/import", upload.single("file"), importCategoryController.handle);

export default categoryRouter;
