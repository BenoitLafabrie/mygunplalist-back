import pkg from "@prisma/client";

const { PrismaClient } = pkg;

const prisma = new PrismaClient();

const insertComment = async ({ comment_content, userId }) => {
  try {
    const comment = await prisma.comments.create({
      data: {
        comment_content,
        userId,
      },
      select: {
        id: true,
        comment_content: true,
        userId: true,
      },
    });
    return { status: 201, data: comment };
  } catch (error) {
    console.error(error);
    return { status: 500, data: "Internal Error" };
  }
};

const insertManyComments = async (items) => {
  try {
    const result = await prisma.items.createMany({
      data: items.map((item) => ({
        comment_content: item.comment_content,
        userId: item.userId,
      })),
    });
    return { status: 201, data: result };
  } catch (error) {
    console.error(error);
    return { status: 500, data: "Internal Error" };
  }
};

const getAllComments = async () => {
  try {
    const getAllComments = await prisma.comments.findMany({
      select: {
        id: true,
        comment_content: true,
        userId: true,
      },
    });
    return { status: 200, data: getAllComments };
  } catch (error) {
    console.error(error);
    return { status: 500, data: "Internal Error" };
  }
};

const getCommentById = async (id) => {
  try {
    const getComment = await prisma.comments.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (!getComment) {
      return { status: 404, data: "Not Found" };
    }
    return { status: 200, data: getComment };
  } catch (error) {
    console.error(error);
    return { status: 500, data: "Internal Error" };
  }
};

const updateComment = async (id, body) => {
  const { comment_content, userId } = body;
  try {
    const comment = await prisma.comments.update({
      where: {
        id: parseInt(id),
      },
      data: {
        comment_content: comment_content,
        userId: userId,
      },
      select: {
        id: true,
        comment_content: true,
        userId: true,
      },
    });
    return { status: 200, data: comment };
  } catch (error) {
    console.error(error);
    return { status: 500, data: "Internal Error" };
  }
};

const deleteComment = async (id) => {
  try {
    const comment = await prisma.comments.delete({
      where: {
        id: parseInt(id),
      },
    });
    return { status: 200, data: comment };
  } catch (error) {
    console.error(error);
    return { status: 500, data: "Internal Error" };
  }
};

export {
  insertComment,
  insertManyComments,
  updateComment,
  getAllComments,
  getCommentById,
  deleteComment,
};
