import cors from "@koa/cors";
import Koa from "koa";
import bodyParser from "koa-bodyparser";
import compress from "koa-compress";
import helmet from "koa-helmet";
import pino from "koa-pino-logger";
import apiRouter from "./routes";
import { KoaReqLogger } from "koa-req-logger";
import { logger } from "./common/logger";

const app = new Koa();
// Add request logger
const requestLogger = new KoaReqLogger({
    pinoOptions: {
        name: "hfc-order-stats",
        level: process.env.DEBUG_LEVEL || "debug",
    },
});
app.use(helmet())
    .use(bodyParser())
    .use(
        pino({
            level: process.env.DEBUG_LEVEL || "debug",
        }),
    )
    .use(
        compress({
            threshold: 2048,
            flush: require("zlib").Z_SYNC_FLUSH,
        }),
    )
    .use(requestLogger.getMiddleware())
    .use(apiRouter.routes())
    .use(cors({}));

const port = process.env.PORT || 8080;
logger.info(`Server running on port http://localhost:${port}`);
export default app.listen(port);
