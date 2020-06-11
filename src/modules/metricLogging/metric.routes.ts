import Router from "koa-router";
import { MetricController } from "./metric.controller";

const metricRouter = new Router();

const metricController: MetricController = new MetricController();
metricRouter
    .post("/:key", metricController.addNewValue)
    .get("/:key/sum", metricController.getSum);
export { metricRouter };
