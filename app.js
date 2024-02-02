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
const { fileURLToPath } = require("url");
const { dirname } = require("path");

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
    origin: "https://test.mygunplalist.com",
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
