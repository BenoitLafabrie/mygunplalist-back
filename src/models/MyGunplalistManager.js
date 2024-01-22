import pkg from "@prisma/client";

const { PrismaClient } = pkg;

const prisma = new PrismaClient();

const insertMygunplalist = async ({ user_id }) => {
  try {
    const mygunplalist = await prisma.mygunplalist.create({
      data: {
        user_id,
      },
      select: {
        mygunplalist_id: true,
        user_id: true,
      },
    });
    return { status: 201, data: mygunplalist };
  } catch (error) {
    console.error(error);
    return { status: 500, data: "Internal Error" };
  }
};

const insertManyGunplalists = async (items) => {
  try {
    const result = await prisma.items.createMany({
      data: items.map((item) => ({
        user_id: item.user_id,
      })),
    });
    return { status: 201, data: result };
  } catch (error) {
    console.error(error);
    return { status: 500, data: "Internal Error" };
  }
};

const getAllMygunplalists = async () => {
  try {
    const getAllMygunplalists = await prisma.mygunplalist.findMany({
      select: {
        mygunplalist_id: true,
        user_id: true,
      },
    });
    return { status: 200, data: getAllMygunplalists };
  } catch (error) {
    console.error(error);
    return { status: 500, data: "Internal Error" };
  }
};

const getMygunplalistById = async (id) => {
  try {
    const getMygunplalist = await prisma.mygunplalist.findUnique({
      where: {
        user_id: parseInt(id),
      },
      include: {
        Items: {
          include: {
            Items_images: true,
            Items_props: true,
          },
        },
      },
    });
    if (!getMygunplalist) {
      insertMygunplalist({ user_id: parseInt(id) });
      return { status: 200, data: "Not found but created" };
    } else {
      return { status: 200, data: getMygunplalist };
    }
  } catch (error) {
    console.error(error);
    return { status: 500, data: "Internal Error" };
  }
};

const updateMygunplalist = async (id, body) => {
  const { item_id } = body;
  try {
    const mygunplalist = await prisma.mygunplalist.update({
      where: {
        user_id: parseInt(id),
      },
      data: {
        Items: {
          connect: {
            item_id: parseInt(item_id),
          },
        },
      },
      select: {
        mygunplalist_id: true,
        user_id: true,
        Items: {
          select: {
            item_id: true,
          },
        },
      },
    });

    console.log(mygunplalist);
    const itemsId = mygunplalist.Items[0];
    const results = { mygunplalist, itemsId };

    return { status: 200, data: results };
  } catch (error) {
    console.error(error);
    return { status: 500, data: "Internal Error" };
  }
};

const deleteMygunplalist = async (id) => {
  try {
    const myGunplaList = await prisma.mygunplalist.delete({
      where: {
        user_id: parseInt(id),
      },
    });
    return { status: 200, data: myGunplaList };
  } catch (error) {
    console.error(error);
    return { status: 500, data: "Internal Error" };
  }
};

export {
  insertMygunplalist,
  insertManyGunplalists,
  updateMygunplalist,
  deleteMygunplalist,
  getAllMygunplalists,
  getMygunplalistById,
};
