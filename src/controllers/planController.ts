import { Request, Response } from "express";
const paystack = require("paystack")(process.env.PAYSTACK_SECRET_KEY);
import {
  planChargeSuccess,
  chargeSuccess,
  cancelSubscriptio,
} from "../helpers/webhookHelpers";

export async function createPlan(req: Request, res: Response) {
  try {
    const { interval, name, amount } = req.body;

    const response = await paystack.plan.create({
      name,
      amount,
      interval,
    });

    res.status(200).send({
      data: response.data,
      message: response.message,
      status: response.status,
    });
  } catch (err: any) {
    res.status(400).send({ data: {}, error: `${err.message}`, status: 1 });
  }
}

export async function getPlans(req: Request, res: Response) {
  try {
    const response = await paystack.plan.list();

    res.status(200).send({
      data: response.data,
      message: response.message,
      status: response.status,
    });
  } catch (err: any) {
    res.status(400).send({ data: {}, err: `${err.message}`, status: 1 });
  }
}

export async function addWebhook(req: Request, res: Response) {
  try {
    const data = req.body;
    console.log("webhook data: ", data);

    switch (data) {
      case (data.event = "invoice.payment_failed"):
        await cancelSubscriptio(data);
        console.log("Invoice failed");
        break;
      case (data.event = "invoice.create"):
        console.log("invoice created");
        break;
      case (data.event = "invoice.update"):
        data.data.status == "success"
          ? await planChargeSuccess(data)
          : console.log("Update Failed");
        break;
      case (data.event = "subscription.not_renew"):
        console.log("unrenewed");
        break;
      case (data.event = "subscription.disable"):
        console.log("disabled");
        break;
      case (data.event = "transfer.success"):
        console.log("transfer successful");
        break;
      case (data.event = "transfer.failed"):
        console.log("transfer failed");
        break;
      case (data.event = "transfer.reversed"):
        console.log("transfer reversed");
        break;
      case (data.event = "subscription.disable"):
        console.log("disabled");
        break;

      default:
        const obj = data.data.plan;
        console.log("Implementing charges logic...");
        // object comparison verifying if its a normal payment or a plan
        // charges for subscription and card
        Object.keys(obj).length === 0 && obj.constructor === Object
          ? await chargeSuccess(data)
          : // charge sub
            await planChargeSuccess(data);
        console.log("Successful");
        break;
    }
  } catch (err: any) {
    res.status(400).send({ data: {}, error: `${err.message}`, status: 1 });
  }
}
