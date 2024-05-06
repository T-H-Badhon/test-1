import { Request, Response } from "express";
import { userServices } from "./user.services";

const createAdmin = async (req: Request, res: Response) => {
  const payload = req.body;

  const result = await userServices.createAdmin(payload);

  res.send({
    data: result,
  });
};

export const userControllers = {
  createAdmin,
};
