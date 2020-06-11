import lowDB from "lowdb";
// tslint:disable-next-line: no-submodule-imports
import FileSync from "lowdb/adapters/FileSync";

interface Model {
    value: number;
    t: number;
}
export class DB {
    adapter: any;
    db: any;
    /**
     * @param {*} name: {key} in the param
     */
    constructor(private name: string) {
        this.adapter = new FileSync(`${this.name}.json`);
        this.db = lowDB(this.adapter);
        // Set some defaults (required if your JSON file is empty)
        this.db.defaults({ values: [] }).write();
    }

    add(value: number) {
        const t = Date.now();
        this.db
            .get("values")
            .push({ value, t })
            .write();
    }

    /**
     *
     * @param {*} time Hours
     * ie. remove everything if inserted before 1hr
     */
    removeOldValues() {
        return this.db
            .get("values")
            .remove(({ t }: Model) => t + 60 * 60 * 1000 < Date.now())
            .write();
    }

    async getLastHourValuesSum() {
        await this.removeOldValues();
        return this.db
            .get("values")
            .value()
            .reduce((sum: number, { value }: Model) => {
                sum += value;
                return sum;
            }, 0);
    }
}
