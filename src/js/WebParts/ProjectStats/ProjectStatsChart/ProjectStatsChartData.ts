import { LogLevel, Logger } from "sp-pnp-js";
import StatsFieldConfiguration from "../StatsFieldConfiguration";
import ProjectStatsChartDataItem from "./ProjectStatsChartDataItem";


const LOG_TEMPLATE = "(ProjectStatsChartData) {0}: {1}";

export default class ProjectStatsChartData {
    private _items: ProjectStatsChartDataItem[];

    constructor(items: ProjectStatsChartDataItem[]) {
        this._items = items;
    }

    public getItems(): ProjectStatsChartDataItem[] {
        return this._items;
    }

    public getItemsWithValue(field: StatsFieldConfiguration, value: string): ProjectStatsChartDataItem[] {
        return this._items.filter(i => i.getValue(field) === value);
    }

    public getItem(index: number): ProjectStatsChartDataItem {
        return this._items[index];
    }

    public getCount() {
        return this._items.length;
    }

    public getAverage(field: StatsFieldConfiguration) {
        return (this.getTotal(field) / this.getCount());
    }

    public getValues(field: StatsFieldConfiguration) {
        return this._items.map(i => i.getValue(field));
    }

    public getValuesUnique(field: StatsFieldConfiguration): string[] {
        if (field.dataType !== "string") {
            Logger.log({
                message: String.format(LOG_TEMPLATE, "getValuesUnique", `Data type '${field.dataType}' not supported.`),
                level: LogLevel.Error,
            });
        }
        return this.getValues(field).filter((value, index, self) => self.indexOf(value) === index);
    }

    public getNames() {
        return this._items.map(i => i.name);
    }

    public getTotal(field: StatsFieldConfiguration) {
        if (field.dataType !== "number") {
            Logger.log({
                message: String.format(LOG_TEMPLATE, "getTotal", `Data type '${field.dataType}' not supported.`),
                level: LogLevel.Error,
            });
        }
        return this._items.map(i => i.getValue(field)).reduce((prev, curr, index) => prev += curr, 0);
    }

    public getPercentage(field: StatsFieldConfiguration, index: number) {
        if (field.dataType !== "number") {
            Logger.log({
                message: String.format(LOG_TEMPLATE, "getPercentage", `Data type '${field.dataType}' not supported.`),
                level: LogLevel.Error,
            });
        }
        return ((this._items[index].getValue(field) / this.getTotal(field)) * 100);
    }
}