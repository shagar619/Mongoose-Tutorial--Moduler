import { Router } from "express";
import { mangoController } from "./mango.controller";


const mangoRoute = Router();

mangoRoute.post("/", mangoController.CreateMango);
mangoRoute.get("/:mangoId", mangoController.getMangoById);
mangoRoute.patch("/:mangoId", mangoController.updateMango);
mangoRoute.delete("/:mangoId", mangoController.deleteMangoById);
mangoRoute.get("/", mangoController.getMangos);

export default mangoRoute;