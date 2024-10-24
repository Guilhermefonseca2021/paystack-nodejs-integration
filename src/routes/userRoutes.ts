import { Router } from "express";
import { createUser, getUser } from "../controllers/userController";
import initializeTrans from "../controllers/paystackController";

export const useRoute = Router();

useRoute.get("/getuser/:id", getUser);
useRoute.post("/createuser", createUser);
useRoute.post("/initiatetransaction/:id", initializeTrans)
