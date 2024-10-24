const paystack = require("paystack-api")(process.env.PAYSTACK_SECRET_KEY);
import { Request, Response } from "express";
import User from "../models/userModel";

// initialize transaction
export async function initializeTrans(req: Request, res: Response) {
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

// verify transaction
export async  function verifyTrans(req: any, res: any) {
  try {
    let { id } = req.params;

    const user = await User.findById(id);

    if (user?.paystack_ref == "success")
      return res.status(401).send({
        data: {},
        message: "Transaction has been verified",
        status: 1,
      });

    const response = await paystack.transaction.verify({
      reference: user?.paystack_ref,
    });

    if (response.data.status == "success") {
      const data = {
        paystack_ref: response.data.status,
        amountDonated: response.data.amount,
      };
      await User.findByIdAndUpdate(id, data);

      return res.status(200).send({
        data: response.data,
        message: response.message,
        status: response.status,
      });
    } else {
      return res.status(200).send({
        data: response.data,
        message: response.message,
        status: response.status,
      }); 
    }
  } catch (error: any) {
    res.status(400).send({ data: {}, error: `${error.message}`, status: 1 });
  }
};
