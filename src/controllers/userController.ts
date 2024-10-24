import { Request, Response } from "express";
import User from "../models/userModel";

export async function createUser(req: Request, res: Response) {
  const { email, fullname } = req.body;

  const user = new User({
    fullname,
    email
  });
  await user.save();

  res.status(201).send({
    data: user,
    message: "User created successfully",
    status: 0,
  });
}

export async function getUser(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    res.status(201).send({
      user,
      message: "Found user Details",
      status: 0,
    });
  } catch (err: any) {
    res.status(500).send({ data: {}, error: err.message, status: 1 });
  }
}
