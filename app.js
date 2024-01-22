import express from "express";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import { PrismaClient } from "@prisma/client";
import authRouter from "./src/routes/auth.js";
import rootRouter from "./src/routes/root.js";
import achievementsRouter from "./src/routes/achievements.js";
import achievementImagesRouter from "./src/routes/achievementImages.js";
import commentsRouter from "./src/routes/comments.js";
import friendsRouter from "./src/routes/friends.js";
import itemsRouter from "./src/routes/items.js";
import itemImagesRouter from "./src/routes/itemImages.js";
import itemPropsRouter from "./src/routes/itemProps.js";
import itemsStatusRouter from "./src/routes/itemStatus.js";
import myGunplalistsRouter from "./src/routes/myGunplalists.js";
import usersRouter from "./src/routes/users.js";
import userAchievementsRouter from "./src/routes/userAchievements.js";
import userImagesRouter from "./src/routes/userImages.js";
import wishlistsRouter from "./src/routes/wishlists.js";
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
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
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
app.use(express.json());
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
