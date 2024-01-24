import express from "express";
import cors from "cors";
import createError from "http-errors";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import { PrismaClient } from "@prisma/client";
import authRouter from "./src/routes/auth.mjs";
import rootRouter from "./src/routes/root.mjs";
import achievementsRouter from "./src/routes/achievements.mjs";
import achievementImagesRouter from "./src/routes/achievementImages.mjs";
import commentsRouter from "./src/routes/comments.mjs";
import friendsRouter from "./src/routes/friends.mjs";
import itemsRouter from "./src/routes/items.mjs";
import itemImagesRouter from "./src/routes/itemImages.mjs";
import itemPropsRouter from "./src/routes/itemProps.mjs";
import itemsStatusRouter from "./src/routes/itemStatus.mjs";
import myGunplalistsRouter from "./src/routes/myGunplalists.mjs";
import usersRouter from "./src/routes/users.mjs";
import userAchievementsRouter from "./src/routes/userAchievements.mjs";
import userImagesRouter from "./src/routes/userImages.mjs";
import wishlistsRouter from "./src/routes/wishlists.mjs";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
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
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app
  .listen(port, () => {
    console.info(`Server is listening on port ${port}`);
  })
  .on("error", (err) => {
    console.error("Error:", err.message);
  });

app.use(logger("dev"));
app.use(
  express.json({
    /*{ limit: "20mb" }*/
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", rootRouter);
app.use("/", authRouter);
app.use("/users", usersRouter);
app.use("/user-achievements", userAchievementsRouter);
app.use("/user-images", userImagesRouter);
app.use("/achievements", achievementsRouter);
app.use("/achievements-images", achievementImagesRouter);
app.use("/comments", commentsRouter);
app.use("/friends", friendsRouter);
app.use("/kits", itemsRouter);
app.use("/kits-images", itemImagesRouter);
app.use("/kits-props", itemPropsRouter);
app.use("/mygunplalist", myGunplalistsRouter);
app.use("/wishlist", wishlistsRouter);
app.use("/item-status", itemsStatusRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
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

export { app };
