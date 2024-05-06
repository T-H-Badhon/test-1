import { PrismaClient, UserRoles } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const createAdmin = async (payload: any) => {
  const hashPassword = bcrypt.hashSync(payload.password, 12);

  const userData = {
    password: hashPassword,
    email: payload.email,
    role: UserRoles.ADMIN,
  };

  const adminData = {
    email: payload.email,
    presentAddress: payload.presentAddress,
    permanentAddress: payload.permanentAddress,
    nid: payload.nid,
    guardian: payload.guardian,
    guardianAddress: payload.guardianAddress,
  };

  const result = await prisma.$transaction(async (tx) => {
    const user = await tx.user.create({
      data: userData,
    });

    const admin = await tx.admin.create({
      data: adminData,
    });

    return admin;
  });

  return { admin: result };
};

export const userServices = {
  createAdmin,
};
