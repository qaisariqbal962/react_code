import express from "express";
import cors from "cors";
import todosRouter from "./routes/todos.routes.js";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler.js";

const app = express();

const ALLOWED_ORIGINS = (
  process.env.CLIENT_ORIGIN || "http://localhost:5173,http://127.0.0.1:5173"
)
  .split(",")
  .map((o) => o.trim())
  .filter(Boolean);
const LOCALHOST_REGEX = /^http:\/\/(localhost|127\.0\.0\.1):\d+$/;

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests like curl/postman (no origin) and configured dev origins
      if (
        !origin ||
        ALLOWED_ORIGINS.includes(origin) ||
        LOCALHOST_REGEX.test(origin)
      ) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
  })
);
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/todos", todosRouter);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
