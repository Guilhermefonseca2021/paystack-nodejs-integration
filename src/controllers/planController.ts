import { Request, Response } from "express";
const paystack = require("paystack-api")(process.env.PAYSTACK_SECRET_KEY);

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
