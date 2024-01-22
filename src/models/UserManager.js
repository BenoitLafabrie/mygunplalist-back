import { PrismaClient } from "@prisma/client";
import hashPassword from "../services/AuthHelper.js";

const prisma = new PrismaClient();

const insertUser = async ({
  username,
  firstname,
  lastname,
  email,
  birthdate,
  password,
  address,
  city,
  postcode,
  country,
  gender,
}) => {
  try {
    const birthdateForPrisma = `${birthdate}T00:00:00Z`;
    const user = await prisma.users.create({
      data: {
        username,
        firstname,
        lastname,
        email,
        birthdate: birthdateForPrisma,
        password,
        address,
        city,
        postcode,
        country,
        gender,
      },
      select: {
        user_id: true,
        username: true,
        firstname: true,
        lastname: true,
        email: true,
        birthdate: true,
        role: true,
        address: true,
        city: true,
        postcode: true,
        country: true,
        gender: true,
      },
    });
    return { status: 201, data: user };
  } catch (error) {
    console.error(error);
    return { status: 500, data: "Internal Error" };
  }
};

const getAllUsers = async () => {
  try {
    const users = await prisma.users.findMany({
      select: {
        user_id: true,
        username: true,
        firstname: true,
        lastname: true,
        email: true,
        birthdate: true,
        address: true,
        city: true,
        postcode: true,
        country: true,
        gender: true,
      },
    });
    return { status: 200, data: users };
  } catch (error) {
    console.error(error);
    return { status: 500, data: "Internal Error" };
  }
};

const getUserById = async (id) => {
  try {
    const getUser = await prisma.users.findUnique({
      where: {
        user_id: parseInt(id),
      },
    });
    if (!getUser) {
      return { status: 404, data: "Not Found" };
    }
    return { status: 200, data: getUser };
  } catch (error) {
    console.error(error);
    return { status: 500, data: "Internal Error" };
  }
};

const updateUser = async (id, body) => {
  const {
    username,
    firstname,
    lastname,
    email,
    birthdate,
    role,
    password,
    address,
    city,
    postcode,
    country,
    gender,
  } = body;
  try {
    const hashedPassword = password ? await hashPassword(password) : undefined;
    const user = await prisma.users.update({
      where: {
        user_id: parseInt(id),
      },
      data: {
        username: username,
        firstname: firstname,
        lastname: lastname,
        email: email,
        birthdate: birthdate,
        role: role,
        password: hashedPassword,
        address: address,
        city: city,
        postcode: postcode,
        country: country,
        gender: gender,
      },
      select: {
        user_id: true,
        username: true,
        firstname: true,
        lastname: true,
        email: true,
        birthdate: true,
        role: true,
        address: true,
        city: true,
        postcode: true,
        country: true,
        gender: true,
      },
    });
    return { status: 200, data: user };
  } catch (error) {
    console.error(error);
    return { status: 500, data: "Internal Error" };
  }
};

export { insertUser, updateUser, getAllUsers, getUserById };
