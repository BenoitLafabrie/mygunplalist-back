const express = require("express");
const cors = require("cors");
const createError = require("http-errors");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const { PrismaClient } = require("@prisma/client");
const authRouter = require("./src/routes/auth");
const rootRouter = require("./src/routes/root");
const achievementsRouter = require("./src/routes/achievements");
const achievementImagesRouter = require("./src/routes/achievementImages");
const commentsRouter = require("./src/routes/comments");
const friendsRouter = require("./src/routes/friends");
const itemsRouter = require("./src/routes/items");
const itemImagesRouter = require("./src/routes/itemImages");
const itemPropsRouter = require("./src/routes/itemProps");
const itemsStatusRouter = require("./src/routes/itemStatus");
const myGunplalistsRouter = require("./src/routes/myGunplalists");
const usersRouter = require("./src/routes/users");
const userAchievementsRouter = require("./src/routes/userAchievements");
const userImagesRouter = require("./src/routes/userImages");
const wishlistsRouter = require("./src/routes/wishlists");

const prisma = new PrismaClient();

process.on("SIGINT", async () => {
  await prisma.$disconnect();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  await prisma.$disconnect();
  process.exit(0);
});

const app = express();
const port = 3000;

app.use(
  cors({
    origin: process.env.VITE_APP_FRONTEND_URL,
  })
);

app
  .listen(port, "0.0.0.0", () => {
    console.info(`Server is listening on port ${port}`);
  })
  .on("error", (err) => {
    console.error("Error:", err.message);
  });

app.use(logger("dev"));
app.use(
  express.json({
    /* limit: "20mb", */
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/", rootRouter);
app.use("/api/", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/user-achievements", userAchievementsRouter);
app.use("/api/user-images", userImagesRouter);
app.use("/api/achievements", achievementsRouter);
app.use("/api/achievements-images", achievementImagesRouter);
app.use("/api/comments", commentsRouter);
app.use("/api/friends", friendsRouter);
app.use("/api/kits", itemsRouter);
app.use("/api/kits-images", itemImagesRouter);
app.use("/api/kits-props", itemPropsRouter);
app.use("/api/mygunplalist", myGunplalistsRouter);
app.use("/api/wishlist", wishlistsRouter);
app.use("/api/item-status", itemsStatusRouter);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json(err.message);
});

module.exports = { app };
