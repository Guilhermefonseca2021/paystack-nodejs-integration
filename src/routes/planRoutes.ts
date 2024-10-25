import { Router } from "express";
const planRoute = Router();
import { addWebhook, createPlan, getPlans } from "../controllers/planController";

planRoute.get("/getPlans", getPlans)
planRoute.post("/createplans", createPlan)
planRoute.post("/paystackWebhook", addWebhook);

export default planRoute;
