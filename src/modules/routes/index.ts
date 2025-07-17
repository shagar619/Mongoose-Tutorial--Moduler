import { Router } from "express";
import userRoute from "../user/user.route";
import mangoRoute from "../mango/mango.route";
import orderRoute from "../order/order.route";


const routes = Router();

routes.use("/users", userRoute);
routes.use("/mango", mangoRoute);
routes.use("/order", orderRoute)

export default routes;