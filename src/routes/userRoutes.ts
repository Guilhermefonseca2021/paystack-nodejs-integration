import { Router } from "express";
import { createUser, getUser } from "../controllers/userController";
import { initializeTrans, verifyTrans } from "../controllers/paystackController";

export const useRoute = Router();

useRoute.get("/getuser/:id", getUser);
useRoute.post("/createuser", createUser);
useRoute.post("/initiatetransaction/:id", initializeTrans)
useRoute.post("/verifytransaction/:id", verifyTrans)
