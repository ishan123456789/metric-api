import Router from "koa-router";
import { metricRouter } from "./modules/metricLogging/metric.routes";

const apiRouter = new Router();
apiRouter.get("/", (ctx) => {
    ctx.body = `
        App is running
        You can access
        * /metric/{key} Post
        * /metric/{key}/sum Get
    `
})
apiRouter.use("/metric", metricRouter.routes());

export default apiRouter;
