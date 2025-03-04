import Router from "koa-router";
import { Context } from "koa";
import { fetchUpcomingEvents } from "../modules/event-searcher";

export const registerRoutes = (router: Router): void => {
  router.get("/health", async (ctx: Context) => {
    ctx.status = 200;
    ctx.body = {};
  });

  router.get("/list-events", async (ctx: Context) => {
    ctx.status = 200;
    ctx.body = await fetchUpcomingEvents(ctx.query.keyword as string);
  });
};
