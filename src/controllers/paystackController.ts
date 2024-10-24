const paystack = require("paystack-api")(process.env.PAYSTACK_SECRET_KEY);
import { Request, Response } from "express";
import User from "../models/userModel";

// initialize transaction
const initializeTrans = async (req: Request, res: Response) => {
  try {
    let { id } = req.params;
    const { email, amount, plan } = req.body;

    const response = await paystack.transaction.initialize({
      email,
      amount,
      plan, // optional but we'll use for subscription
    });
    const data = {
      paystack_ref: response.data.reference,
    };

    await User.findByIdAndUpdate(id, data);

    res.status(200).send({
      data: response.data,
      message: response.message,
      status: response.status,
    });
  } catch (err: any) {
    res.status(400).send({ data: {}, error: `${err.message}`, status: 1 });
  }
};

export default initializeTrans;
