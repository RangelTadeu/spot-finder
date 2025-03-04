import Koa from "koa";
import Router from "koa-router";
import { registerRoutes } from "./routes";

export default function start() {
  const app = new Koa();

  const router = new Router();
  registerRoutes(router);

  app.use(router.routes());

  app.listen(3000).on("listening", () => {
    console.log("Server started on port 3000");
  });
}
