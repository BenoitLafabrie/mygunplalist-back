const { PrismaClient } = require("@prisma/client");
const {
  insertItemStatus,
  getItemStatusById,
  updateItemStatus,
} = require("../models/ItemStatusManager");

const prisma = new PrismaClient();

const createItemStatusController = (req, res) => {
  insertItemStatus(req.body)
    .then(({ status, data }) => {
      res.status(status).send(data);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

const getOneItemStatusController = (req, res) => {
  getItemStatusById(req.params.id)
    .then(({ status, data }) => {
      res.status(status).send(data);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

const updateItemStatusController = (req, res) => {
  updateItemStatus({ id: req.params.id, body: req.body })
    .then(({ status, data }) => {
      res.status(status).send(data);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
};

const deleteItemStatusFromGunplaList = async (item_status_ids) => {
  try {
    const results = await prisma.item_status.deleteMany({
      where: {
        item_status_id: {
          in: item_status_ids.map((id) => parseInt(id)),
        },
      },
    });

    // check that it's the right mygunplalist where items are deleted

    return { status: 200, data: results };
  } catch (error) {
    console.error(error);
    return { status: 500, data: "Internal Error" };
  }
};

module.exports = {
  createItemStatusController,
  getOneItemStatusController,
  updateItemStatusController,
  deleteItemStatusFromGunplaList,
};
