import { ParameterizedContext } from "koa";
import { DB } from "../../common/db";

export class MetricController {
    /**
     *  @route /metric/:key
     *  @method post
     */
    async addNewValue(ctx: ParameterizedContext<any, any>): Promise<void> {
        try {
            const key = ctx.params.key;
            const { value } = ctx.request.body || {};
            if (!key || !value || !+value) {
                throw new Error("Invalid input");
            }
            new DB(key).add(parseInt(value, 10));
            ctx.body = "{}";
        } catch (e) {
            ctx.log.error("Error", e);
            ctx.throw(400, e.message || e);
        }
    }
    /**
     *  @route /metric/:key/sum
     *  @method get
     */
    async getSum(ctx: ParameterizedContext<any, any>): Promise<void> {
        try {
            const key = ctx.params.key;
            if (!key) {
                throw new Error("Invalid input");
            }
            new DB(key).getLastHourValuesSum();
            ctx.body = await new DB(key).getLastHourValuesSum();
        } catch (e) {
            ctx.log.error("Error", e);
            ctx.throw(400, e.message || e);
        }
    }
}
