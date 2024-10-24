import { Router } from "express";
const planRoute = Router();
import { createPlan, getPlans } from "../controllers/planController";

planRoute.get("/getPlans", getPlans)
planRoute.post("/createplans", createPlan)

export default planRoute;
